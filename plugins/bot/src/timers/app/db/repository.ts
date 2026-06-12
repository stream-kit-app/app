import type { TimerRecord } from '../lib/stored-timer';

import { db } from '$db/index';
import { eq, inArray } from 'drizzle-orm';

import { DEFAULT_TIMER_PLATFORMS } from '../lib/stored-timer';
import type { StoredActionHandler } from '$lib/core/action/stored-action';
import { botTimers } from './schema';

export type SaveTimerInput = {
	name: string;
	handlers: StoredActionHandler[];
	intervalMinSec: number;
	intervalMaxSec: number;
	minChatLines: number;
	enabled: boolean;
	platforms: TimerRecord['platforms'];
	onlineOnly: boolean;
};

export async function getTimers(): Promise<TimerRecord[]> {
	return db.select().from(botTimers);
}

export async function saveTimer(input: SaveTimerInput, id?: number): Promise<TimerRecord> {
	const now = new Date();
	const platforms = input.platforms.length > 0 ? input.platforms : DEFAULT_TIMER_PLATFORMS;
	const intervalMinSec = Math.max(30, input.intervalMinSec);
	const intervalMaxSec = Math.max(intervalMinSec, input.intervalMaxSec);

	if (id != null) {
		const [row] = await db
			.update(botTimers)
			.set({
				name: input.name.trim(),
				handlers: input.handlers,
				intervalMinSec,
				intervalMaxSec,
				minChatLines: Math.max(0, input.minChatLines),
				enabled: input.enabled,
				platforms,
				onlineOnly: input.onlineOnly,
				updatedAt: now
			})
			.where(eq(botTimers.id, id))
			.returning();

		return row;
	}

	const [row] = await db
		.insert(botTimers)
		.values({
			name: input.name.trim(),
			handlers: input.handlers,
			intervalMinSec,
			intervalMaxSec,
			minChatLines: Math.max(0, input.minChatLines),
			enabled: input.enabled,
			platforms,
			onlineOnly: input.onlineOnly,
			createdAt: now,
			updatedAt: now
		})
		.returning();

	return row;
}

export async function updateTimersEnabled(ids: number[], enabled: boolean): Promise<void> {
	if (ids.length === 0) {
		return;
	}

	await db
		.update(botTimers)
		.set({
			enabled,
			updatedAt: new Date()
		})
		.where(inArray(botTimers.id, ids));
}

export async function deleteTimers(ids: number[]): Promise<void> {
	if (ids.length === 0) {
		return;
	}

	await db.delete(botTimers).where(inArray(botTimers.id, ids));
}
