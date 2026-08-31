import type { HandlerTriggerContext, PluginAppApi } from '@stream-kit/plugin';
import type { Action, Modal } from '@stream-kit/plugin/action';
import type { StoredActionHandler } from '@stream-kit/plugin/action';
import {
	ActionHandler,
	HandlerDefinition,
	addHandlerToChain,
	cloneHandlerInChain,
	createHandlerFields,
	flattenActionHandlers,
	handlerFromStoredWithResolver,
	hasHandlerErrors,
	removeHandlerFromChain,
	reorderBranchHandlersInChain,
	runHandlerChain,
	type HandlerBranch,
	validateHandlerFields
} from '@stream-kit/plugin/action';
import type { TimerPlatform, TimerRecord } from './stored-timer';
import { DEFAULT_TIMER_PLATFORMS } from './stored-timer';

import TimerForm from '../ui/timer-form.svelte';
import TimerFormFooter from '../ui/timer-form-footer.svelte';
import { getTimersService } from './get-timers';
import type { TimerFormErrors } from './validate-form';
import { validateTimerForm } from './validate-form';

export type TimerProps = {
	id?: string;
	name?: string;
	handlers?: ActionHandler[];
	intervalMinSec?: number;
	intervalMaxSec?: number;
	minChatLines?: number;
	enabled?: boolean;
	platforms?: TimerPlatform[];
	onlineOnly?: boolean;
	createdAt?: Date;
	updatedAt?: Date;
};

export class Timer {
	id?: string;
	modalId?: string;
	name: string = $state('');
	handlers: ActionHandler[] = $state([]);
	intervalMinSec: number = $state(300);
	intervalMaxSec: number = $state(600);
	minChatLines: number = $state(0);
	enabled: boolean = $state(true);
	platforms: TimerPlatform[] = $state([...DEFAULT_TIMER_PLATFORMS]);
	onlineOnly: boolean = $state(false);
	createdAt?: Date;
	updatedAt?: Date;
	formErrors: TimerFormErrors | null = $state(null);

	constructor(props: TimerProps = {}) {
		this.id = props.id;
		this.name = props.name ?? '';
		this.handlers = props.handlers ?? [];
		this.intervalMinSec = props.intervalMinSec ?? 300;
		this.intervalMaxSec = props.intervalMaxSec ?? 600;
		this.minChatLines = props.minChatLines ?? 0;
		this.enabled = props.enabled ?? true;
		this.platforms = props.platforms?.length ? [...props.platforms] : [...DEFAULT_TIMER_PLATFORMS];
		this.onlineOnly = props.onlineOnly ?? false;
		this.createdAt = props.createdAt;
		this.updatedAt = props.updatedAt;
	}

	get hasUnavailableDefinitions(): boolean {
		return this.handlers.some((handler) => !handler.definition.isAvailable);
	}

	get isFormOpen(): boolean {
		return this.modalId != null;
	}

	static createDraft(): Timer {
		return new Timer();
	}

	static createFrom(source: Timer): Timer {
		const app = getTimersService().requireApp();
		const sourceName = source.name.trim() || app.i18n.translate('Untitled timer');

		return new Timer({
			name: app.i18n.translate('Copy of {name}', { name: sourceName }),
			handlers: source.handlers.map((handler) => ActionHandler.clone(handler)),
			intervalMinSec: source.intervalMinSec,
			intervalMaxSec: source.intervalMaxSec,
			minChatLines: source.minChatLines,
			enabled: source.enabled,
			platforms: [...source.platforms],
			onlineOnly: source.onlineOnly
		});
	}

	private static handlersFromStored(
		stored: StoredActionHandler[],
		app: PluginAppApi
	): ActionHandler[] {
		const resolveDefinition = (handlerTypeId: string) => app.actions.findHandler(handlerTypeId);

		return stored.map((item) =>
			handlerFromStoredWithResolver(
				item,
				resolveDefinition,
				Timer.createUnavailableHandlerDefinition
			)
		);
	}

	static fromRecord(record: TimerRecord, app: PluginAppApi): Timer {
		const handlers = Timer.handlersFromStored(record.handlers, app);
		return new Timer({
			id: record.id,
			name: record.name,
			handlers,
			intervalMinSec: record.intervalMinSec,
			intervalMaxSec: record.intervalMaxSec,
			minChatLines: record.minChatLines,
			enabled: record.enabled,
			platforms: record.platforms,
			onlineOnly: record.onlineOnly,
			createdAt: record.createdAt,
			updatedAt: record.updatedAt
		});
	}

	private static createUnavailableHandlerDefinition(id: string): HandlerDefinition {
		const definition = new HandlerDefinition({
			id,
			name: id
		});
		definition.setAvailable(false);

		return definition;
	}

	toRecordFields(): Omit<TimerRecord, 'id'> {
		const now = new Date();

		return {
			name: this.name.trim(),
			handlers: this.handlers.map((handler) => handler.toStored()),
			intervalMinSec: this.intervalMinSec,
			intervalMaxSec: this.intervalMaxSec,
			minChatLines: this.minChatLines,
			enabled: this.enabled,
			platforms: this.platforms,
			onlineOnly: this.onlineOnly,
			createdAt: this.createdAt ?? now,
			updatedAt: this.updatedAt ?? now
		};
	}

	toRecord(): TimerRecord {
		if (this.id == null) {
			throw new Error('Timer must be saved before converting to a record');
		}

		return { id: this.id, ...this.toRecordFields() };
	}

	open(): Modal {
		const app = getTimersService().requireApp();

		this.modalId =
			this.id != null ? `timer-${this.id}` : `timer-draft-${crypto.randomUUID()}`;

		if (this.hasUnavailableDefinitions) {
			this.rebindDefinitions();
		}

		const modal =
			app.modal.get(this.modalId) ??
			app.modal.create({
				id: this.modalId,
				title:
					this.id != null
						? app.i18n.translate('Edit {name}', { name: this.name })
						: app.i18n.translate('New Timer'),
				content: TimerForm,
				footer: TimerFormFooter,
				props: { timer: this }
			});

		modal.open();
		this.formErrors = null;

		return modal;
	}

	close(): void {
		if (this.modalId == null) {
			return;
		}

		getTimersService().requireApp().modal.get(this.modalId)?.close();
	}

	async delete(): Promise<void> {
		if (this.id == null) {
			return;
		}

		await getTimersService().deleteBulk([this.id]);
		this.close();
	}

	addHandler(
		definition: HandlerDefinition,
		target?: { parentId: string; branch: HandlerBranch }
	): void {
		this.handlers = addHandlerToChain(this.handlers, definition, target);
	}

	removeHandler(handlerId: string): void {
		this.handlers = removeHandlerFromChain(this.handlers, handlerId);
	}

	cloneHandler(handlerId: string): void {
		this.handlers = cloneHandlerInChain(this.handlers, handlerId);
	}

	reorderHandlers(handlers: ActionHandler[]): void {
		this.handlers = handlers;
	}

	reorderBranchHandlers(
		parentId: string,
		branch: HandlerBranch,
		handlers: ActionHandler[]
	): void {
		this.handlers = reorderBranchHandlersInChain(this.handlers, parentId, branch, handlers);
	}

	rebindDefinitions(): void {
		if (this.isFormOpen) {
			this.rebindDefinitionsInPlace();
			return;
		}

		const app = getTimersService().requireApp();

		this.rebindDefinitionsInPlace();

		if (this.hasUnavailableDefinitions) {
			this.handlers = Timer.handlersFromStored(
				this.handlers.map((handler) => structuredClone(handler.toStored())),
				app
			);
		}
	}

	private rebindDefinitionsInPlace(): void {
		const app = getTimersService().requireApp();

		for (const handler of flattenActionHandlers(this.handlers)) {
			const resolved = app.actions.findHandler(handler.definition.id);

			if (!resolved?.isAvailable) {
				continue;
			}

			if (handler.definition === resolved) {
				continue;
			}

			const storedFields = structuredClone($state.snapshot(handler.fields));
			handler.definition = resolved;
			handler.fields = createHandlerFields(resolved.fields, storedFields);
		}
	}

	async runHandlerBranch(
		handlers: ActionHandler[],
		context: HandlerTriggerContext
	): Promise<void> {
		await runHandlerChain(handlers, this as unknown as Action, context);
	}

	runHandlers(data: unknown, triggerLabel = 'Timer'): void {
		if (!this.enabled) {
			return;
		}

		if (this.hasUnavailableDefinitions) {
			this.rebindDefinitions();
		}

		const context: HandlerTriggerContext = {
			trigger: triggerLabel,
			data,
			actionVariables: {}
		};

		void runHandlerChain(this.handlers, this as unknown as Action, context);
	}
	validateForm(): boolean {
		const app = getTimersService().requireApp();
		const baseErrors = validateTimerForm(
			{
				name: this.name,
				handlersCount: this.handlers.length,
				platforms: this.platforms,
				intervalMinSec: this.intervalMinSec
			},
			app.i18n.translate
		);

		const handlerErrors: Record<string, ReturnType<typeof validateHandlerFields>> = {};

		for (const handler of flattenActionHandlers(this.handlers)) {
			const errors = validateHandlerFields(handler.fields, handler.fieldDefinitions);
			if (hasHandlerErrors(errors)) {
				handlerErrors[handler.id] = errors;
			}
		}

		if (!baseErrors && Object.keys(handlerErrors).length === 0) {
			this.formErrors = null;
			return true;
		}

		this.formErrors = {
			name: baseErrors?.name,
			handlers: baseErrors?.handlers,
			platforms: baseErrors?.platforms,
			interval: baseErrors?.interval,
			handlerErrors
		};

		return false;
	}

	async save(): Promise<boolean> {
		if (!this.validateForm()) {
			return false;
		}

		const app = getTimersService().requireApp();

		await getTimersService().upsert(this);

		app.toast.create({
			title: app.i18n.translate('Timer saved'),
			description: app.i18n.translate('The timer has been saved successfully'),
			variant: 'success'
		});

		this.close();

		return true;
	}
}
