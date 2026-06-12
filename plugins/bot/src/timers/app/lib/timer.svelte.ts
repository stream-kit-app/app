import type { Modal } from '$lib/core/modal';
import type { Action } from '$lib/core/action/action.svelte';
import type { HandlerTriggerContext } from '$lib/core/action/handler-context';
import { runHandlerChain } from '$lib/core/action/run-handler-chain';
import { ActionHandler } from '$lib/core/action/action-handler.svelte';
import { HandlerDefinition } from '$lib/core/action/handler/handler-definition.svelte';
import { migrateLegacyHandlerFields } from '$lib/core/action/handler-field';
import type { TimerPlatform, TimerRecord } from './stored-timer';
import { DEFAULT_TIMER_PLATFORMS } from './stored-timer';

import { saveTimer } from '../db/repository';

import TimerForm from '../ui/timer-form.svelte';
import { translate } from '$lib/i18n';

import { getApp } from '$lib/core/registry';
import { getTimersService } from './get-timers';
import type { TimerFormErrors } from './validate-form';
import { validateTimerForm } from './validate-form';
import {
	hasHandlerErrors,
	validateHandlerFields
} from '$lib/core/action/validate-form';

export type TimerProps = {
	id?: number;
	name?: string;
	handlers?: ActionHandler[];
	intervalMinSec?: number;
	intervalMaxSec?: number;
	minChatLines?: number;
	enabled?: boolean;
	platforms?: TimerPlatform[];
	onlineOnly?: boolean;
};

export class Timer {
	id?: number;
	modalId?: string;
	name: string = $state('');
	handlers: ActionHandler[] = $state([]);
	intervalMinSec: number = $state(300);
	intervalMaxSec: number = $state(600);
	minChatLines: number = $state(0);
	enabled: boolean = $state(true);
	platforms: TimerPlatform[] = $state([...DEFAULT_TIMER_PLATFORMS]);
	onlineOnly: boolean = $state(false);
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
	}

	get hasUnavailableDefinitions(): boolean {
		return this.handlers.some((handler) => !handler.definition.isAvailable);
	}

	static createDraft(): Timer {
		return new Timer();
	}

	static fromRecord(record: TimerRecord): Timer {
		const app = getApp();
		const handlers = record.handlers.map((stored) => {
			const definition =
				app.actions.actions.find(stored.handlerTypeId) ??
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
			onlineOnly: record.onlineOnly
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
			createdAt: new Date(),
			updatedAt: new Date()
		};
	}

	open(): Modal {
		this.modalId =
			this.id != null ? `timer-${this.id}` : `timer-draft-${crypto.randomUUID()}`;
		const app = getApp();

		const modal =
			app.modals.get(this.modalId) ??
			app.createModal({
				id: this.modalId,
				title:
					this.id != null
						? translate('Edit {name}', { name: this.name })
						: translate('New Timer'),
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

		getApp().modals.get(this.modalId)?.close();
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
		const baseErrors = validateTimerForm({
			name: this.name,
			handlersCount: this.handlers.length,
			platforms: this.platforms,
			intervalMinSec: this.intervalMinSec
		});

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

		const app = getApp();
		const timers = getTimersService();
		const wasNew = this.id == null;
		const row = await saveTimer(
			{
				name: this.name.trim(),
				handlers: this.handlers.map((handler) => handler.toStored()),
				intervalMinSec: this.intervalMinSec,
				intervalMaxSec: this.intervalMaxSec,
				minChatLines: this.minChatLines,
				enabled: this.enabled,
				platforms: this.platforms,
				onlineOnly: this.onlineOnly
			},
			this.id
		);

		if (row) {
			this.id = row.id;
			this.enabled = row.enabled;
		}

		if (wasNew && row) {
			timers.add(this);
		} else if (row) {
			timers.items = timers.items.map((item) => (item.id === row.id ? this : item));
		}

		app.toast.create({
			title: translate('Timer saved'),
			description: translate('The timer has been saved successfully'),
			variant: 'success'
		});

		this.close();

		return true;
	}
}
