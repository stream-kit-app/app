import type { PointHistoryEntry, PointHistoryKind } from './types';

export const WATCH_TIME_AGGREGATE_MS = 60 * 60 * 1000;
export const MAX_HISTORY_ENTRIES_PER_USER = 500;

export type AppendPointHistoryInput = {
	userId: string;
	amount: number;
	balanceAfter: number;
	source: string;
	kind: PointHistoryKind;
	now?: Date;
};

function entryTimestamp(entry: PointHistoryEntry): number {
	return Date.parse(entry.updatedAt ?? entry.createdAt);
}

export function trimPointHistory(entries: PointHistoryEntry[]): PointHistoryEntry[] {
	const byUser = new Map<string, PointHistoryEntry[]>();

	for (const entry of entries) {
		const list = byUser.get(entry.userId) ?? [];
		list.push(entry);
		byUser.set(entry.userId, list);
	}

	const trimmed: PointHistoryEntry[] = [];

	for (const userEntries of byUser.values()) {
		const sorted = userEntries.sort((left, right) => entryTimestamp(right) - entryTimestamp(left));
		trimmed.push(...sorted.slice(0, MAX_HISTORY_ENTRIES_PER_USER));
	}

	return trimmed.sort((left, right) => entryTimestamp(right) - entryTimestamp(left));
}

export function appendPointHistoryEntry(
	history: PointHistoryEntry[],
	input: AppendPointHistoryInput
): PointHistoryEntry[] {
	const now = input.now ?? new Date();
	const nowIso = now.toISOString();

	if (input.kind === 'watch-time' && input.source === 'watch-time') {
		const latest = history
			.filter(
				(entry) =>
					entry.userId === input.userId &&
					entry.kind === 'watch-time' &&
					entry.source === 'watch-time'
			)
			.sort((left, right) => entryTimestamp(right) - entryTimestamp(left))[0];

		if (latest && now.getTime() - entryTimestamp(latest) <= WATCH_TIME_AGGREGATE_MS) {
			const updated: PointHistoryEntry = {
				...latest,
				amount: latest.amount + input.amount,
				balanceAfter: input.balanceAfter,
				updatedAt: nowIso
			};

			return trimPointHistory(
				history.map((entry) => (entry.id === latest.id ? updated : entry))
			);
		}
	}

	const entry: PointHistoryEntry = {
		id: crypto.randomUUID(),
		userId: input.userId,
		amount: input.amount,
		balanceAfter: input.balanceAfter,
		source: input.source,
		kind: input.kind,
		createdAt: nowIso
	};

	return trimPointHistory([entry, ...history]);
}

export function getUserPointHistory(
	history: PointHistoryEntry[],
	userId: string
): PointHistoryEntry[] {
	return history
		.filter((entry) => entry.userId === userId)
		.sort((left, right) => entryTimestamp(right) - entryTimestamp(left));
}
