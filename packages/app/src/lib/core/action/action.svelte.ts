import type { Modal } from '../modal';
import type { HandlerTriggerContext } from './handler-context';
import type {
	ActionLayoutUpdate,
	ActionRecord,
	StoredActionHandler,
	StoredActionTrigger
} from './stored-action';
import type { ActionFormErrors } from './validate-form';

import {
	deleteAction,
	deleteActions,
	getActions,
	normalizeActionGroup,
	reorderActionsLayout,
	saveAction,
	updateActionEnabled,
	updateActionsEnabled,
	updateActionsQueue
} from '$db/repositories/actions';

import ActionForm from '$lib/components/core/action/action-form.svelte';
import { translate } from '$lib/i18n';

import { hasEnabledProcessTrigger } from '../process/is-process-trigger';
import { getApp } from '../registry';
import { ActionExecution } from './action-execution.svelte';
import { ActionHandler } from './action-handler.svelte';
import { applyLayoutUpdates, buildDndLayout, compareActionsByLayout, dndLayoutToUpdates, getGroupOrder } from './action-layout';
import { ActionTrigger } from './action-trigger.svelte';
import { resolveHandlerDefinition, resolveTriggerDefinition } from './definition-id';
import { HandlerDefinitions } from './handler';
import { migrateLegacyHandlerFields } from './handler-field';
import { HandlerDefinition } from './handler/handler-definition.svelte';
import { runHandlerChain } from './run-handler-chain';
import { DEFAULT_ACTION_GROUP } from './stored-action';
import { TriggerDefinitions } from './trigger';
import { TriggerDefinition } from './trigger/trigger-definition.svelte';
import { validateActionForm } from './validate-form';

type ActionFormSnapshot = {
	name: string;
	group: string;
	queueId: number | null;
	triggers: StoredActionTrigger[];
	handlers: StoredActionHandler[];
};

export type ActionProps = {
	name?: string;
	group?: string;
	groupSortOrder?: number;
	sortOrder?: number;
	id?: number;
	enabled?: boolean;
	queueId?: number | null;
	triggers?: ActionTrigger[];
	handlers?: ActionHandler[];
};

export class Actions {
	triggers = new TriggerDefinitions();
	actions = new HandlerDefinitions();
	items: Action[] = $state.raw([]);

	add(action: Action): void {
		if (action.id != null && this.items.some((item) => item.id === action.id)) {
			return;
		}

		this.items = [...this.items, action].sort(compareActionsByLayout);
	}

	async applyLayout(updates: ActionLayoutUpdate[]): Promise<void> {
		if (updates.length === 0) {
			return;
		}

		this.items = applyLayoutUpdates(this.items, updates);
		await reorderActionsLayout(updates);
	}

	async delete(id: number): Promise<void> {
		const action = this.items.find((item) => item.id === id);

		if (!action) {
			return;
		}

		this.deactivate(action);
		await deleteAction(id);
		this.items = this.items.filter((item) => item.id !== id);
	}

	async load(): Promise<void> {
		// Tear down any currently active subscriptions before replacing items so
		// repeated loads (e.g. a future reload) don't leak trigger subscriptions.
		for (const existing of this.items) {
			this.deactivate(existing);
		}

		const rows = await getActions();
		const loaded: Action[] = [];

		for (const row of rows) {
			const migratedRecord = Action.migrateStoredDefinitionIds(row, this);
			const action = Action.fromRecord(migratedRecord);
			loaded.push(action);

			if (action.enabled) {
				this.activate(action);
			}

			if (migratedRecord !== row && row.id != null) {
				await saveAction(
					{
						name: row.name,
						group: row.group,
						enabled: row.enabled ?? true,
						queueId: row.queueId ?? null,
						triggers: migratedRecord.triggers,
						handlers: migratedRecord.handlers
					},
					row.id
				);
			}
		}

		this.items = loaded;
	}

	hasEnabledProcessTrigger(): boolean {
		return hasEnabledProcessTrigger(this.items);
	}

	activate(action: Action): void {
		if (!action.enabled) {
			return;
		}

		this.deactivate(action);

		const app = getApp();

		for (const trigger of action.triggers) {
			if (!trigger.definition.isAvailable) {
				continue;
			}

			try {
				trigger.definition.activate?.(action, trigger);
			} catch (error) {
				console.warn(`Failed to activate trigger ${trigger.definition.id}`, error);
				app.toast.create({
					title: translate('Trigger could not be started'),
					description: translate('{name} could not be started.', {
						name: trigger.definition.name
					}),
					variant: 'warning'
				});
			}
		}
	}

	deactivate(action: Action): void {
		for (const trigger of action.triggers) {
			if (!trigger.definition.isAvailable) {
				continue;
			}

			trigger.definition.deactivate?.(action, trigger);
		}
	}

	async deleteBulk(ids: number[]): Promise<void> {
		const toDelete = this.items.filter(
			(action) => action.id != null && ids.includes(action.id)
		);

		if (toDelete.length === 0) {
			return;
		}

		for (const action of toDelete) {
			this.deactivate(action);
			action.commitFormChanges();
			action.close();
		}

		await deleteActions(toDelete.map((action) => action.id!));

		const deletedIds = new Set(toDelete.map((action) => action.id));
		this.items = this.items.filter((item) => item.id == null || !deletedIds.has(item.id));

		const app = getApp();

		app.toast.create({
			title: translate('Actions deleted'),
			description: translate('{count} actions have been deleted.', {
				count: toDelete.length
			}),
			variant: 'success'
		});
	}

	async setEnabledBulk(ids: number[], enabled: boolean): Promise<void> {
		const toUpdate = this.items.filter(
			(action) => action.id != null && ids.includes(action.id) && action.enabled !== enabled
		);

		if (toUpdate.length === 0) {
			return;
		}

		for (const action of toUpdate) {
			action.enabled = enabled;

			if (enabled) {
				this.activate(action);
			} else {
				this.deactivate(action);
			}
		}

		const app = getApp();

		try {
			await updateActionsEnabled(
				toUpdate.map((action) => action.id!),
				enabled
			);
		} catch (error) {
			// Roll back every optimistic change so the UI matches persistence.
			for (const action of toUpdate) {
				action.enabled = !enabled;

				if (action.enabled) {
					this.activate(action);
				} else {
					this.deactivate(action);
				}
			}

			console.error('Failed to persist bulk action enabled state', error);
			app.toast.create({
				title: translate('Actions could not be updated'),
				description: translate('The changes were not saved. Please try again.'),
				variant: 'error'
			});

			return;
		}

		app.toast.create({
			title: translate(enabled ? 'Actions enabled' : 'Actions disabled'),
			description: translate(
				enabled
					? '{count} actions have been enabled.'
					: '{count} actions have been disabled.',
				{ count: toUpdate.length }
			),
			variant: 'success'
		});
	}

	async updateBulk(
		ids: number[],
		changes: { group?: string; groupOrder?: string[] }
	): Promise<void> {
		if (ids.length === 0 || changes.group === undefined) {
			return;
		}

		const app = getApp();
		const targetGroup = normalizeActionGroup(changes.group);
		const idSet = new Set(ids);
		const layout = buildDndLayout(this.items);

		for (const group of Object.keys(layout)) {
			layout[group] = (layout[group] ?? []).filter((item) => !idSet.has(item.id));
		}

		if (!layout[targetGroup]) {
			layout[targetGroup] = [];
		}

		for (const id of ids) {
			const action = this.items.find((item) => item.id === id);

			if (action?.id != null) {
				layout[targetGroup].push({ id: action.id, action });
			}
		}

		let nextGroupOrder = changes.groupOrder ?? getGroupOrder(layout);

		if (!nextGroupOrder.includes(targetGroup)) {
			nextGroupOrder = [...nextGroupOrder, targetGroup];
		}

		nextGroupOrder = nextGroupOrder.filter((group) => (layout[group]?.length ?? 0) > 0);

		await this.applyLayout(dndLayoutToUpdates(layout, nextGroupOrder));

		app.toast.create({
			title: translate('Selected actions updated'),
			description: translate('Moved {count} actions to group.', { count: ids.length }),
			variant: 'success'
		});
	}

	async assignQueueBulk(ids: number[], queueId: number | null): Promise<void> {
		if (ids.length === 0) {
			return;
		}

		await updateActionsQueue(ids, queueId);

		const idSet = new Set(ids);

		for (const action of this.items) {
			if (action.id != null && idSet.has(action.id)) {
				action.queueId = queueId;
			}
		}

		getApp().toast.create({
			title: translate('Selected actions updated'),
			description: translate('Updated queue for {count} actions.', { count: ids.length }),
			variant: 'success'
		});
	}

	runById(id: number, context: HandlerTriggerContext): boolean {
		const action = this.items.find((item) => item.id === id);

		if (!action) {
			return false;
		}

		void action.runHandlers(context.data, context.trigger).catch((error) => {
			console.error('Action run failed', error);
		});

		return true;
	}
}

export class Action {
	id?: number;
	modalId?: string;
	name: string = $state('');
	group: string = $state(DEFAULT_ACTION_GROUP);
	groupSortOrder: number = $state(0);
	sortOrder: number = $state(0);
	enabled: boolean = $state(true);
	queueId: number | null = $state(null);
	triggers: ActionTrigger[] = $state([]);
	handlers: ActionHandler[] = $state([]);

	formErrors: ActionFormErrors | null = $state(null);
	execution = new ActionExecution();
	private _formSnapshot: ActionFormSnapshot | null = null;

	constructor(props: ActionProps = {}) {
		this.id = props.id;
		this.name = props.name ?? '';
		this.group = normalizeActionGroup(props.group);
		this.groupSortOrder = props.groupSortOrder ?? 0;
		this.sortOrder = props.sortOrder ?? 0;
		this.enabled = props.enabled ?? true;
		this.queueId = props.queueId ?? null;
		this.triggers = props.triggers ?? [];
		this.handlers = props.handlers ?? [];
	}

	get hasUnavailableDefinitions(): boolean {
		return (
			this.triggers.some((trigger) => !trigger.definition.isAvailable) ||
			this.handlers.some((handler) => !handler.definition.isAvailable)
		);
	}

	get isFormOpen(): boolean {
		return this.modalId != null;
	}

	get hasTestableTriggers(): boolean {
		return this.triggers.some(
			(trigger) => trigger.definition.isAvailable && trigger.definition.onTest != null
		);
	}

	static createDraft(): Action {
		return new Action({ queueId: getApp().actionQueues.defaultQueueId });
	}

	static createFrom(source: Action): Action {
		const sourceName = source.name.trim() || translate('Untitled action');

		return new Action({
			name: translate('Copy of {name}', { name: sourceName }),
			group: source.group,
			enabled: source.enabled,
			queueId: source.queueId,
			triggers: source.triggers.map((trigger) => ActionTrigger.clone(trigger)),
			handlers: source.handlers.map((handler) => ActionHandler.clone(handler))
		});
	}

	static fromRecord(record: ActionRecord): Action {
		const app = getApp();
		// Unresolved trigger/handler types are loaded as unavailable placeholders
		// (like handlers below) so actions are never silently dropped from the UI
		// while their data still lives in the database.
		const triggers = record.triggers.map((stored) => {
			const definition =
				resolveTriggerDefinition(app.actions.triggers, stored.triggerTypeId) ??
				Action.createUnavailableTriggerDefinition(stored.triggerTypeId);

			return new ActionTrigger(definition, {
				id: stored.id,
				conditions: stored.conditions
			});
		});

		const handlers = record.handlers.map((stored) => {
			const definition =
				resolveHandlerDefinition(app.actions.actions, stored.handlerTypeId) ??
				Action.createUnavailableHandlerDefinition(stored.handlerTypeId);

			return new ActionHandler(definition, {
				id: stored.id,
				fields: migrateLegacyHandlerFields(stored)
			});
		});

		return new Action({
			id: record.id,
			name: record.name,
			group: record.group,
			groupSortOrder: record.groupSortOrder,
			sortOrder: record.sortOrder,
			enabled: record.enabled ?? true,
			queueId: record.queueId ?? getApp().actionQueues.defaultQueueId,
			triggers,
			handlers
		});
	}

	static migrateStoredDefinitionIds(record: ActionRecord, actions: Actions): ActionRecord {
		let migrated = false;

		const triggers = record.triggers.map((stored) => {
			const resolved = resolveTriggerDefinition(actions.triggers, stored.triggerTypeId);

			if (resolved && resolved.id !== stored.triggerTypeId) {
				migrated = true;

				return {
					...stored,
					triggerTypeId: resolved.id
				};
			}

			return stored;
		});

		const handlers = record.handlers.map((stored) => {
			const resolved = resolveHandlerDefinition(actions.actions, stored.handlerTypeId);

			if (resolved && resolved.id !== stored.handlerTypeId) {
				migrated = true;

				return {
					...stored,
					handlerTypeId: resolved.id
				};
			}

			return stored;
		});

		if (!migrated) {
			return record;
		}

		return {
			...record,
			triggers,
			handlers
		};
	}

	private static createUnavailableTriggerDefinition(id: string): TriggerDefinition {
		const definition = new TriggerDefinition({
			id,
			name: id
		});
		definition.setAvailable(false);

		return definition;
	}

	private static createUnavailableHandlerDefinition(id: string): HandlerDefinition {
		const definition = new HandlerDefinition({
			id,
			name: id
		});
		definition.setAvailable(false);

		return definition;
	}

	captureFormSnapshot(): void {
		this._formSnapshot = {
			name: this.name,
			group: this.group,
			queueId: this.queueId,
			triggers: this.triggers.map((trigger) => structuredClone(trigger.toStored())),
			handlers: this.handlers.map((handler) => structuredClone(handler.toStored()))
		};
	}

	commitFormChanges(): void {
		this._formSnapshot = null;
	}

	discardFormChanges(): void {
		const snapshot = this._formSnapshot;

		if (!snapshot) {
			return;
		}

		const app = getApp();
		const shouldReactivate = this.id != null && this.enabled;

		if (shouldReactivate) {
			app.actions.deactivate(this);
		}

		this.name = snapshot.name;
		this.group = snapshot.group;
		this.queueId = snapshot.queueId;
		this.triggers = this.triggersFromStored(snapshot.triggers);
		this.handlers = this.handlersFromStored(snapshot.handlers);
		this.formErrors = null;

		if (shouldReactivate) {
			app.actions.activate(this);
		}

		this._formSnapshot = null;
	}

	private triggersFromStored(stored: StoredActionTrigger[]): ActionTrigger[] {
		const app = getApp();

		return stored.map((item) => {
			const definition =
				resolveTriggerDefinition(app.actions.triggers, item.triggerTypeId) ??
				Action.createUnavailableTriggerDefinition(item.triggerTypeId);

			return new ActionTrigger(definition, {
				id: item.id,
				conditions: structuredClone(item.conditions)
			});
		});
	}

	private handlersFromStored(stored: StoredActionHandler[]): ActionHandler[] {
		const app = getApp();

		return stored.map((item) => {
			const definition =
				resolveHandlerDefinition(app.actions.actions, item.handlerTypeId) ??
				Action.createUnavailableHandlerDefinition(item.handlerTypeId);

			return new ActionHandler(definition, {
				id: item.id,
				fields: structuredClone(item.fields)
			});
		});
	}

	open(): Modal {
		this.modalId =
			this.id != null ? `action-${this.id}` : `action-draft-${crypto.randomUUID()}`;
		const app = getApp();

		this.captureFormSnapshot();

		const modal =
			app.modals.get(this.modalId) ??
			app.createModal({
				id: this.modalId,
				title:
					this.id != null
						? translate('Edit {name}', { name: this.name })
						: translate('New Action'),
				content: ActionForm,
				props: { action: this },
				onClose: () => this.discardFormChanges()
			});

		modal.onClose = () => this.discardFormChanges();
		modal.open();
		this.formErrors = null;

		return modal;
	}

	async delete(): Promise<void> {
		if (this.id == null) {
			return;
		}

		await getApp().actions.delete(this.id);
		this.commitFormChanges();
		this.close();
	}

	close(): void {
		if (this.modalId == null) {
			return;
		}

		getApp().modals.get(this.modalId)?.close();
	}

	addTrigger(definition: TriggerDefinition): void {
		this.triggers = [...this.triggers, new ActionTrigger(definition)];
	}

	removeTrigger(triggerId: string): void {
		this.triggers = this.triggers.filter((trigger) => trigger.id !== triggerId);
	}

	cloneTrigger(triggerId: string): void {
		const index = this.triggers.findIndex((trigger) => trigger.id === triggerId);

		if (index === -1) {
			return;
		}

		const clone = ActionTrigger.clone(this.triggers[index]!);
		this.triggers = [
			...this.triggers.slice(0, index + 1),
			clone,
			...this.triggers.slice(index + 1)
		];
	}

	addHandler(definition: HandlerDefinition): void {
		this.handlers = [...this.handlers, new ActionHandler(definition)];
	}

	removeHandler(handlerId: string): void {
		this.handlers = this.handlers.filter((handler) => handler.id !== handlerId);
	}

	cloneHandler(handlerId: string): void {
		const index = this.handlers.findIndex((handler) => handler.id === handlerId);

		if (index === -1) {
			return;
		}

		const clone = ActionHandler.clone(this.handlers[index]!);
		this.handlers = [
			...this.handlers.slice(0, index + 1),
			clone,
			...this.handlers.slice(index + 1)
		];
	}

	fire(trigger: ActionTrigger, data: unknown): void {
		if (!this.enabled) {
			return;
		}

		void this.dispatchTrigger(trigger, data, { bypassEnabled: false }).catch((error) => {
			console.error('Action trigger dispatch failed', error);
		});
	}

	async test(): Promise<void> {
		if (!this.hasTestableTriggers) {
			getApp().toast.create({
				title: translate('No testable triggers'),
				description: translate(
					'Add a trigger that supports testing before running a test.'
				),
				variant: 'warning'
			});
			return;
		}

		this.execution.begin();

		try {
			let testedCount = 0;

			for (const trigger of this.triggers) {
				if (await this.testTrigger(trigger)) {
					testedCount += 1;
				}
			}

			getApp().toast.create({
				title: translate('Action test completed'),
				description: translate('Ran {count} trigger test(s).', { count: testedCount }),
				variant: 'success'
			});
		} finally {
			await this.execution.end();
		}
	}

	async testTrigger(trigger: ActionTrigger): Promise<boolean> {
		if (!trigger.definition.isAvailable || !trigger.definition.onTest) {
			return false;
		}

		const data = trigger.definition.onTest(this, trigger);
		await this.dispatchTrigger(trigger, data, { bypassEnabled: true });
		return true;
	}

	async dispatchTrigger(
		trigger: ActionTrigger,
		data: unknown,
		options: { bypassEnabled: boolean }
	): Promise<void> {
		if (!options.bypassEnabled && !this.enabled) {
			return;
		}

		if (!trigger.definition.isAvailable) {
			return;
		}

		const showFormVisual = this.isFormOpen;
		const trackExecution = !options.bypassEnabled;
		const trackVisual = trackExecution || showFormVisual;
		// The Test button bypasses queueing; queue-less actions run inline as before.
		const shouldQueue = !options.bypassEnabled && this.queueId != null;

		// For queued runs the "running" indicator must reflect the actual run
		// start (when the worker picks up the job), not the moment we enqueue, so
		// begin()/end() are deferred into the job below.
		if (trackVisual && !shouldQueue) {
			this.execution.begin();
		}

		if (showFormVisual) {
			this.execution.markTriggerActive(trigger.id);
		}

		if (!trigger.evaluate(data)) {
			if (trackVisual && !shouldQueue) {
				await this.execution.end();
			}

			return;
		}

		const runChain = async (): Promise<void> => {
			if (trackVisual && shouldQueue) {
				this.execution.begin();
			}

			try {
				await this.runHandlers(data, trigger.definition.name, {
					bypassEnabled: options.bypassEnabled,
					showVisual: showFormVisual
				});
			} finally {
				if (trackVisual) {
					await this.execution.end();
				}
			}
		};

		if (shouldQueue && this.queueId != null) {
			getApp().actionQueues.enqueue(this.queueId, {
				jobId: crypto.randomUUID(),
				actionId: this.id ?? null,
				actionName: this.name.trim() || translate('Untitled action'),
				run: runChain
			});
			return;
		}

		await runChain();
	}

	async runHandlers(
		data: unknown,
		triggerLabel = 'Command',
		options: { bypassEnabled?: boolean; showVisual?: boolean } = {}
	): Promise<void> {
		const { bypassEnabled = false, showVisual = false } = options;

		if (!bypassEnabled && !this.enabled) {
			return;
		}

		const context: HandlerTriggerContext = {
			trigger: triggerLabel,
			data,
			actionVariables: {}
		};

		await runHandlerChain(this.handlers, this, context, {
			onHandlerStart: (handler) => {
				if (showVisual) {
					this.execution.markHandlerActive(handler.id);
				}
			},
			onHandlerComplete: (handler) => {
				if (showVisual) {
					this.execution.markHandlerCompleted(handler.id);
				}
			}
		});
	}

	validateForm(): boolean {
		this.formErrors = validateActionForm({
			name: this.name,
			triggers: this.triggers.map((trigger) => ({
				id: trigger.id,
				conditions: $state.snapshot(trigger.conditions),
				definitions: trigger.definition.conditions,
				validateForm: trigger.definition.validateForm
			})),
			handlers: this.handlers.map((handler) => ({
				id: handler.id,
				fields: $state.snapshot(handler.fields),
				definitions: handler.definition.fields
			}))
		});

		return this.formErrors === null;
	}

	async save(): Promise<boolean> {
		if (!this.validateForm()) {
			return false;
		}

		const app = getApp();
		const wasNew = this.id == null;
		const row = await saveAction(
			{
				name: this.name.trim(),
				group: this.group,
				enabled: this.enabled,
				queueId: this.queueId,
				triggers: this.triggers.map((trigger) => trigger.toStored()),
				handlers: this.handlers.map((handler) => handler.toStored())
			},
			this.id
		);

		if (!row) {
			app.toast.create({
				title: translate('Action could not be saved'),
				description: translate('The action was not persisted. Please try again.'),
				variant: 'error'
			});

			return false;
		}

		this.id = row.id;
		this.group = normalizeActionGroup(row.group);
		this.groupSortOrder = row.groupSortOrder;
		this.sortOrder = row.sortOrder;
		this.enabled = row.enabled;
		this.queueId = row.queueId ?? null;

		if (wasNew) {
			app.actions.add(this);

			if (this.enabled) {
				app.actions.activate(this);
			}
		} else {
			app.actions.items = applyLayoutUpdates(app.actions.items, [
				{
					id: row.id,
					group: row.group,
					groupSortOrder: row.groupSortOrder,
					sortOrder: row.sortOrder
				}
			]);

			if (this.enabled) {
				app.actions.activate(this);
			}
		}

		app.toast.create({
			title: translate('Action saved'),
			description: translate('The action has been saved successfully'),
			variant: 'success'
		});

		this.commitFormChanges();
		this.close();

		return true;
	}

	async setEnabled(enabled: boolean): Promise<void> {
		if (this.enabled === enabled) {
			return;
		}

		if (this.id == null) {
			this.enabled = enabled;
			return;
		}

		const app = getApp();
		const previous = this.enabled;

		this.enabled = enabled;

		if (enabled) {
			app.actions.activate(this);
		} else {
			app.actions.deactivate(this);
		}

		try {
			await updateActionEnabled(this.id, enabled);
		} catch (error) {
			// Roll back the in-memory state and activation so the UI and runtime
			// stay consistent with what is actually persisted.
			this.enabled = previous;

			if (previous) {
				app.actions.activate(this);
			} else {
				app.actions.deactivate(this);
			}

			console.error('Failed to persist action enabled state', error);
			app.toast.create({
				title: translate('Action could not be updated'),
				description: translate('The change was not saved. Please try again.'),
				variant: 'error'
			});

			return;
		}

		app.toast.create({
			title: translate(enabled ? 'Action enabled' : 'Action disabled'),
			description: translate(
				enabled ? '{name} has been enabled.' : '{name} has been disabled.',
				{
					name: this.name.trim() || translate('this action')
				}
			),
			variant: 'success'
		});
	}
}
