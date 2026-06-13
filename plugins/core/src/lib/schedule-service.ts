import type { Action, ActionTrigger } from '@stream-kit/plugin';

import type { ScheduleEventContext } from '../contexts';
import { computeNextRun } from './compute-next-run';
import type { ScheduleConfig } from './schedule-types';

const MAX_TIMEOUT_MS = 2_147_483_647;

type ScheduleEntry = {
	action: Action;
	trigger: ActionTrigger;
	config: ScheduleConfig;
	nextDueAt: number;
};

export class ScheduleService {
	private entries = new Map<object, ScheduleEntry>();
	private timer: ReturnType<typeof setTimeout> | undefined;

	register(action: Action, trigger: ActionTrigger, config: ScheduleConfig): void {
		const nextRun = computeNextRun(config, new Date());

		if (!nextRun) {
			console.warn('Schedule trigger could not compute a next run', config);
			return;
		}

		this.entries.set(trigger, {
			action,
			trigger,
			config,
			nextDueAt: nextRun.getTime()
		});

		this.reschedule();
	}

	unregister(trigger: object): void {
		this.entries.delete(trigger);
		this.reschedule();
	}

	stop(): void {
		if (this.timer) {
			clearTimeout(this.timer);
			this.timer = undefined;
		}

		this.entries.clear();
	}

	private reschedule(): void {
		if (this.timer) {
			clearTimeout(this.timer);
			this.timer = undefined;
		}

		if (this.entries.size === 0) {
			return;
		}

		const now = Date.now();
		let nextWakeAt = Number.POSITIVE_INFINITY;

		for (const entry of this.entries.values()) {
			nextWakeAt = Math.min(nextWakeAt, entry.nextDueAt);
		}

		const delay = Math.min(Math.max(0, nextWakeAt - now), MAX_TIMEOUT_MS);
		this.timer = setTimeout(() => this.tick(), delay);
	}

	private tick(): void {
		const now = Date.now();
		const dueEntries = [...this.entries.values()].filter((entry) => entry.nextDueAt <= now);

		for (const entry of dueEntries) {
			const scheduledAt = new Date(entry.nextDueAt);
			const context = buildScheduleEventContext(entry.config, scheduledAt);
			entry.action.fire(entry.trigger, context);

			if (entry.config.kind === 'scheduled' && entry.config.repeat === 'once') {
				this.entries.delete(entry.trigger);
				continue;
			}

			const nextRun = computeNextRun(entry.config, new Date(now + 1_000));

			if (!nextRun) {
				this.entries.delete(entry.trigger);
				continue;
			}

			entry.nextDueAt = nextRun.getTime();
		}

		this.reschedule();
	}
}

function buildScheduleEventContext(
	config: ScheduleConfig,
	scheduledAt: Date
): ScheduleEventContext {
	const firedAt = new Date().toISOString();
	const scheduledAtIso = scheduledAt.toISOString();

	if (config.kind === 'cron') {
		return {
			kind: 'cron',
			firedAt,
			scheduledAt: scheduledAtIso,
			cronExpression: config.expression
		};
	}

	return {
		kind: 'scheduled',
		firedAt,
		scheduledAt: scheduledAtIso,
		date: config.date,
		time: config.time,
		repeat: config.repeat,
		weekday: config.weekday
	};
}

export function createTestScheduleContext(kind: 'cron' | 'scheduled'): ScheduleEventContext {
	const now = new Date().toISOString();

	if (kind === 'cron') {
		return {
			kind: 'cron',
			firedAt: now,
			scheduledAt: now,
			cronExpression: '0 9 * * *'
		};
	}

	return {
		kind: 'scheduled',
		firedAt: now,
		scheduledAt: now,
		date: '2026-06-11',
		time: '09:00',
		repeat: 'daily'
	};
}
