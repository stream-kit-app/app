import type { Modal } from '$lib/core/modal';
import type { TimerPlatform, TimerRecord } from './stored-timer';
import { DEFAULT_TIMER_PLATFORMS } from './stored-timer';

import { normalizeTimerMessages, saveTimer } from '../db/repository';

import TimerForm from '../ui/timer-form.svelte';
import { translate } from '$lib/i18n';

import { getApp } from '$lib/core/registry';
import { getTimersService } from './get-timers';

export type TimerProps = {
	id?: number;
	name?: string;
	messages?: string[];
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
	messages: string[] = $state(['']);
	intervalMinSec: number = $state(300);
	intervalMaxSec: number = $state(600);
	minChatLines: number = $state(0);
	enabled: boolean = $state(true);
	platforms: TimerPlatform[] = $state([...DEFAULT_TIMER_PLATFORMS]);
	onlineOnly: boolean = $state(false);
	formErrors: { name?: string; messages?: string } | null = $state(null);

	constructor(props: TimerProps = {}) {
		this.id = props.id;
		this.name = props.name ?? '';
		this.messages = props.messages?.length ? [...props.messages] : [''];
		this.intervalMinSec = props.intervalMinSec ?? 300;
		this.intervalMaxSec = props.intervalMaxSec ?? 600;
		this.minChatLines = props.minChatLines ?? 0;
		this.enabled = props.enabled ?? true;
		this.platforms = props.platforms?.length ? [...props.platforms] : [...DEFAULT_TIMER_PLATFORMS];
		this.onlineOnly = props.onlineOnly ?? false;
	}

	static createDraft(): Timer {
		return new Timer();
	}

	static fromRecord(record: TimerRecord): Timer {
		return new Timer({
			id: record.id,
			name: record.name,
			messages: record.messages.length > 0 ? [...record.messages] : [''],
			intervalMinSec: record.intervalMinSec,
			intervalMaxSec: record.intervalMaxSec,
			minChatLines: record.minChatLines,
			enabled: record.enabled,
			platforms: record.platforms,
			onlineOnly: record.onlineOnly
		});
	}

	toRecord(): TimerRecord {
		if (this.id == null) {
			throw new Error('Timer must be saved before converting to a record');
		}

		return {
			id: this.id,
			name: this.name.trim(),
			messages: normalizeTimerMessages(this.messages),
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

	validateForm(): boolean {
		const errors: { name?: string; messages?: string } = {};

		if (!this.name.trim()) {
			errors.name = translate('Name is required');
		}

		if (normalizeTimerMessages(this.messages).length === 0) {
			errors.messages = translate('Add at least one message');
		}

		if (this.intervalMinSec < 30) {
			errors.messages = translate('Minimum interval must be at least 30 seconds');
		}

		if (Object.keys(errors).length === 0) {
			this.formErrors = null;
			return true;
		}

		this.formErrors = errors;
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
				messages: this.messages,
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
			this.messages = row.messages.length > 0 ? [...row.messages] : [''];
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
