import type { Modal } from '../modal';
import type { HandlerDefinition } from './handler/handler-definition.svelte';
import type { TriggerDefinition } from './trigger/trigger-definition.svelte';
import type { ActionFormErrors } from './validate-form';
import type { ActionRecord } from '$db/schemas/actions';

import {
	deleteAction,
	getActions,
	normalizeActionGroup,
	saveAction
} from '$db/repositories/actions';
import { DEFAULT_ACTION_GROUP } from '$db/schemas/actions';

import ActionForm from '$lib/components/core/action/action-form.svelte';

import { getApp } from '../registry';
import { ActionHandler } from './action-handler.svelte';
import { ActionTrigger } from './action-trigger.svelte';
import { migrateLegacyHandlerFields } from './handler-field';
import { validateActionForm } from './validate-form';

export type ActionProps = {
	name?: string;
	group?: string;
	id?: number;
	triggers?: ActionTrigger[];
	handlers?: ActionHandler[];
};

export class Actions {
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
			this.activate(action);
		}
	}

	activate(action: Action): void {
		const app = getApp();

		for (const trigger of action.triggers) {
			try {
				trigger.definition.activate?.(action, trigger);
			} catch (error) {
				console.warn(`Failed to activate trigger ${trigger.definition.id}`, error);
				app.toast.create({
					title: 'Trigger kon niet gestart worden',
					description: `${trigger.definition.name} kon niet gestart worden.`,
					variant: 'warning'
				});
			}
		}
	}

	deactivate(action: Action): void {
		for (const trigger of action.triggers) {
			trigger.definition.deactivate?.(action, trigger);
		}
	}
}

export class Action {
	id?: number;
	modalId?: string;
	name: string = $state('');
	group: string = $state(DEFAULT_ACTION_GROUP);
	triggers: ActionTrigger[] = $state([]);
	handlers: ActionHandler[] = $state([]);

	formErrors: ActionFormErrors | null = $state(null);

	constructor(props: ActionProps = {}) {
		this.id = props.id;
		this.name = props.name ?? '';
		this.group = normalizeActionGroup(props.group);
		this.triggers = props.triggers ?? [];
		this.handlers = props.handlers ?? [];
	}

	static createDraft(): Action {
		return new Action();
	}

	static fromRecord(record: ActionRecord): Action | null {
		const app = getApp();
		const triggers = record.triggers.flatMap((stored) => {
			const definition = app.triggerDefinitions.find(stored.triggerTypeId);

			if (!definition?.isAvailable) {
				return [];
			}

			return [
				new ActionTrigger(definition, {
					id: stored.id,
					conditions: stored.conditions
				})
			];
		});

		if (triggers.length === 0 && record.triggers.length > 0) {
			return null;
		}

		const handlers = record.handlers.flatMap((stored) => {
			const definition = app.handlerDefinitions.find(stored.handlerTypeId);

			if (!definition?.isAvailable) {
				return [];
			}

			return [
				new ActionHandler(definition, {
					id: stored.id,
					fields: migrateLegacyHandlerFields(stored)
				})
			];
		});

		return new Action({
			id: record.id,
			name: record.name,
			group: record.group,
			triggers,
			handlers
		});
	}

	open(): Modal {
		this.modalId =
			this.id != null ? `action-${this.id}` : `action-draft-${crypto.randomUUID()}`;
		const app = getApp();

		const modal =
			app.modals.get(this.modalId) ??
			app.createModal({
				id: this.modalId,
				title: this.id != null ? `Edit ${this.name}` : 'New Action',
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

	fire(trigger: ActionTrigger, context: unknown): void {
		if (!trigger.evaluate(context)) {
			return;
		}

		for (const handler of this.handlers) {
			handler.definition.execute?.(this, handler, context);
		}
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
				triggers: this.triggers.map((trigger) => trigger.toStored()),
				handlers: this.handlers.map((handler) => handler.toStored())
			},
			this.id
		);

		if (row) {
			this.id = row.id;
			this.group = normalizeActionGroup(row.group);
		}

		if (wasNew && row) {
			app.actions.add(this);
			app.actions.activate(this);
		}

		app.toast.create({
			title: 'Action saved',
			description: 'The action has been saved successfully',
			variant: 'success'
		});

		this.close();

		return true;
	}
}
