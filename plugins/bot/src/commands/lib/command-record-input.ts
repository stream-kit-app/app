import type { CommandRecord, NewCommandRecord } from '@stream-kit/plugin';

import { normalizeCommandNames } from '../../lib/commands-store';
import {
	DEFAULT_COMMAND_PERMISSIONS,
	DEFAULT_COMMAND_SOURCES
} from '../app/lib/stored-command';
import { normalizeCommandGroup } from '../app/lib/command-layout';

export function toCommandRecordInput(
	input: NewCommandRecord,
	options?: { ownerPluginKey?: string }
): CommandRecord {
	const now = new Date();
	const ownerPluginKey = options?.ownerPluginKey ?? input.ownerPluginKey;

	return {
		id: input.id ?? crypto.randomUUID(),
		name: input.name.trim(),
		group: normalizeCommandGroup(input.group),
		groupSortOrder: input.groupSortOrder ?? 0,
		sortOrder: input.sortOrder ?? 0,
		commandNames: normalizeCommandNames(input.commandNames),
		handlers: input.handlers,
		sources: input.sources?.length ? [...input.sources] : [...DEFAULT_COMMAND_SOURCES],
		permissions: input.permissions ?? { ...DEFAULT_COMMAND_PERMISSIONS },
		cooldownGlobalMs: input.cooldownGlobalMs ?? null,
		cooldownUserMs: input.cooldownUserMs ?? null,
		enabled: input.enabled ?? true,
		...(ownerPluginKey ? { ownerPluginKey } : {}),
		createdAt: input.createdAt ?? now,
		updatedAt: input.updatedAt ?? now
	};
}

export function mergeCommandRecord(
	existing: CommandRecord,
	input: Partial<NewCommandRecord>,
	options?: { ownerPluginKey?: string }
): CommandRecord {
	const ownerPluginKey = options?.ownerPluginKey ?? input.ownerPluginKey ?? existing.ownerPluginKey;

	return {
		...existing,
		name: input.name?.trim() ?? existing.name,
		group: normalizeCommandGroup(input.group ?? existing.group),
		groupSortOrder: input.groupSortOrder ?? existing.groupSortOrder,
		sortOrder: input.sortOrder ?? existing.sortOrder,
		commandNames: input.commandNames ?? existing.commandNames,
		handlers: input.handlers ?? existing.handlers,
		sources: input.sources ?? existing.sources,
		permissions: input.permissions ?? existing.permissions,
		cooldownGlobalMs: input.cooldownGlobalMs ?? existing.cooldownGlobalMs,
		cooldownUserMs: input.cooldownUserMs ?? existing.cooldownUserMs,
		enabled: input.enabled ?? existing.enabled,
		...(ownerPluginKey ? { ownerPluginKey } : {}),
		updatedAt: new Date()
	};
}
