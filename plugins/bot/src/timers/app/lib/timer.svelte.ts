import type { HandlerTriggerContext, PluginAppApi } from '@stream-kit/plugin';
import type { Action, Modal } from '@stream-kit/plugin/action';
import {
	ActionHandler,
	HandlerDefinition,
	hasHandlerErrors,
	migrateLegacyHandlerFields,
	runHandlerChain,
	validateHandlerFields
} from '@stream-kit/plugin/action';
import type { TimerPlatform, TimerRecord } from './stored-timer';
import { DEFAULT_TIMER_PLATFORMS } from './stored-timer';

import TimerForm from '../ui/timer-form.svelte';
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

	static createDraft(): Timer {
		return new Timer();
	}

	static fromRecord(record: TimerRecord, app: PluginAppApi): Timer {
		const handlers = record.handlers.map((stored) => {
			const definition =
				app.actions.findHandler(stored.handlerTypeId) ??
				Timer.createUnavailableHandlerDefinition(stored.handlerTypeId);

			return new ActionHandler(definition, {
				id: stored.id,
				fields: migrateLegacyHandlerFields(stored)
			});
		});

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

	toRecord(): TimerRecord {
		if (this.id == null) {
			throw new Error('Timer must be saved before converting to a record');
		}

		const now = new Date();

		return {
			id: this.id,
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

	open(): Modal {
		const app = getTimersService().requireApp();
		this.modalId =
			this.id != null ? `timer-${this.id}` : `timer-draft-${crypto.randomUUID()}`;

		const modal =
			app.modal.get(this.modalId) ??
			app.modal.create({
				id: this.modalId,
				title:
					this.id != null
						? app.i18n.translate('Edit {name}', { name: this.name })
						: app.i18n.translate('New Timer'),
				content: TimerForm,
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

	addHandler(definition: HandlerDefinition): void {
		this.handlers = [...this.handlers, new ActionHandler(definition)];
	}

	removeHandler(handlerId: string): void {
		this.handlers = this.handlers.filter((handler) => handler.id !== handlerId);
	}

	runHandlers(data: unknown, triggerLabel = 'Timer'): void {
		if (!this.enabled) {
			return;
		}

		const context: HandlerTriggerContext = {
			trigger: triggerLabel,
			data
		};

		const actionProxy = this as unknown as Action;

		runHandlerChain(this.handlers, actionProxy, context);
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

		for (const handler of this.handlers) {
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
