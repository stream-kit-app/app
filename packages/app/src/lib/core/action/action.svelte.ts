import type { Modal } from '../modal';
import { HandlerDefinitions } from './handler';
import { HandlerDefinition } from './handler/handler-definition.svelte';
import { TriggerDefinitions } from './trigger';
import { TriggerDefinition } from './trigger/trigger-definition.svelte';
import type { ActionFormErrors } from './validate-form';
import type { ActionRecord } from './stored-action';
import { DEFAULT_ACTION_GROUP } from './stored-action';

import {
	deleteAction,
	deleteActions,
	getActions,
	normalizeActionGroup,
	saveAction,
	updateActionEnabled,
	updateActionsEnabled
} from '$db/repositories/actions';

import ActionForm from '$lib/components/core/action/action-form.svelte';
import { translate } from '$lib/i18n';

import { getApp } from '../registry';
import { ActionHandler } from './action-handler.svelte';
import { ActionTrigger } from './action-trigger.svelte';
import { migrateLegacyHandlerFields } from './handler-field';
import { ActionExecution } from './action-execution.svelte';
import type { HandlerTriggerContext } from './handler-context';
import { runHandlerChain } from './run-handler-chain';
import { hasEnabledProcessTrigger } from '../process/is-process-trigger';
import { validateActionForm } from './validate-form';

export type ActionProps = {
	name?: string;
	group?: string;
	id?: number;
	enabled?: boolean;
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

		this.items = [...this.items, action];
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
		const rows = await getActions();

		for (const row of rows) {
			const action = Action.fromRecord(row);

			if (!action) {
				continue;
			}

			this.add(action);

			if (action.enabled) {
				this.activate(action);
			}
		}
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

		await updateActionsEnabled(
			toUpdate.map((action) => action.id!),
			enabled
		);

		const app = getApp();

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

	runById(id: number, context: HandlerTriggerContext): boolean {
		const action = this.items.find((item) => item.id === id);

		if (!action) {
			return false;
		}

		void action.runHandlers(context.data, context.trigger);

		return true;
	}
}

export class Action {
	id?: number;
	modalId?: string;
	name: string = $state('');
	group: string = $state(DEFAULT_ACTION_GROUP);
	enabled: boolean = $state(true);
	triggers: ActionTrigger[] = $state([]);
	handlers: ActionHandler[] = $state([]);

	formErrors: ActionFormErrors | null = $state(null);
	execution = new ActionExecution();

	constructor(props: ActionProps = {}) {
		this.id = props.id;
		this.name = props.name ?? '';
		this.group = normalizeActionGroup(props.group);
		this.enabled = props.enabled ?? true;
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
		return new Action();
	}

	static fromRecord(record: ActionRecord): Action | null {
		const app = getApp();
		const triggers = record.triggers.map((stored) => {
			const definition =
				app.actions.triggers.find(stored.triggerTypeId) ??
				Action.createUnavailableTriggerDefinition(stored.triggerTypeId);

			return new ActionTrigger(definition, {
				id: stored.id,
				conditions: stored.conditions
			});
		});

		if (triggers.length === 0 && record.triggers.length > 0) {
			return null;
		}

		const handlers = record.handlers.map((stored) => {
			const definition =
				app.actions.actions.find(stored.handlerTypeId) ??
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
			enabled: record.enabled ?? true,
			triggers,
			handlers
		});
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

	open(): Modal {
		this.modalId =
			this.id != null ? `action-${this.id}` : `action-draft-${crypto.randomUUID()}`;
		const app = getApp();

		const modal =
			app.modals.get(this.modalId) ??
			app.createModal({
				id: this.modalId,
				title:
					this.id != null
						? translate('Edit {name}', { name: this.name })
						: translate('New Action'),
				content: ActionForm,
				props: { action: this }
			});

		modal.open();
		this.formErrors = null;

		return modal;
	}

	async delete(): Promise<void> {
		if (this.id == null) {
			return;
		}

		await getApp().actions.delete(this.id);
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

	addHandler(definition: HandlerDefinition): void {
		this.handlers = [...this.handlers, new ActionHandler(definition)];
	}

	removeHandler(handlerId: string): void {
		this.handlers = this.handlers.filter((handler) => handler.id !== handlerId);
	}

	fire(trigger: ActionTrigger, data: unknown): void {
		if (!this.enabled) {
			return;
		}

		void this.dispatchTrigger(trigger, data, { bypassEnabled: false });
	}

	async test(): Promise<void> {
		if (!this.hasTestableTriggers) {
			getApp().toast.create({
				title: translate('No testable triggers'),
				description: translate('Add a trigger that supports testing before running a test.'),
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

		const showVisual = this.isFormOpen;

		if (showVisual) {
			if (!this.execution.state.isRunning) {
				this.execution.begin();
			}

			this.execution.markTriggerActive(trigger.id);
		}

		if (!trigger.evaluate(data)) {
			if (showVisual && !options.bypassEnabled) {
				await this.execution.end();
			}

			return;
		}

		await this.runHandlers(data, trigger.definition.name, {
			bypassEnabled: options.bypassEnabled,
			showVisual
		});

		if (showVisual && !options.bypassEnabled) {
			await this.execution.end();
		}
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
			data
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
				definitions: trigger.definition.conditions
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
				triggers: this.triggers.map((trigger) => trigger.toStored()),
				handlers: this.handlers.map((handler) => handler.toStored())
			},
			this.id
		);

		if (row) {
			this.id = row.id;
			this.group = normalizeActionGroup(row.group);
			this.enabled = row.enabled;
		}

		if (wasNew && row) {
			app.actions.add(this);

			if (this.enabled) {
				app.actions.activate(this);
			}
		}

		app.toast.create({
			title: translate('Action saved'),
			description: translate('The action has been saved successfully'),
			variant: 'success'
		});

		this.close();

		return true;
	}

	async setEnabled(enabled: boolean): Promise<void> {
		if (this.enabled === enabled) {
			return;
		}

		this.enabled = enabled;

		if (this.id == null) {
			return;
		}

		const app = getApp();

		if (enabled) {
			app.actions.activate(this);
		} else {
			app.actions.deactivate(this);
		}

		await updateActionEnabled(this.id, enabled);

		app.toast.create({
			title: translate(enabled ? 'Action enabled' : 'Action disabled'),
			description: translate(enabled ? '{name} has been enabled.' : '{name} has been disabled.', {
				name: this.name.trim() || translate('this action')
			}),
			variant: 'success'
		});
	}
}
