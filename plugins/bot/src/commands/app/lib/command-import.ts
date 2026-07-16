import type { StoredActionHandler } from '@stream-kit/plugin/action';
import type { CommandPermissions, CommandSource, NewCommandRecord } from './stored-command';
import {
	DEFAULT_COMMAND_GROUP,
	DEFAULT_COMMAND_PERMISSIONS,
	DEFAULT_COMMAND_SOURCES
} from './stored-command';

import {
	COMMANDS_EXPORT_VERSION,
	type CommandsExportFile,
	type ExportedCommand
} from './command-export';

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function withFreshHandlerIds(handler: StoredActionHandler): StoredActionHandler {
	const next: StoredActionHandler = {
		...handler,
		id: crypto.randomUUID(),
		fields: structuredClone(handler.fields)
	};

	if (handler.thenHandlers) {
		next.thenHandlers = handler.thenHandlers.map(withFreshHandlerIds);
	}

	if (handler.elseHandlers) {
		next.elseHandlers = handler.elseHandlers.map(withFreshHandlerIds);
	}

	return next;
}

function parseSources(value: unknown): CommandSource[] {
	if (!Array.isArray(value)) {
		return [...DEFAULT_COMMAND_SOURCES];
	}

	const sources = value.filter(
		(item): item is CommandSource => item === 'twitch' || item === 'youtube'
	);

	return sources.length > 0 ? sources : [...DEFAULT_COMMAND_SOURCES];
}

function parsePermissions(value: unknown): CommandPermissions {
	if (!isRecord(value) || !Array.isArray(value.roles)) {
		return { ...DEFAULT_COMMAND_PERMISSIONS };
	}

	const roles = value.roles.filter((role): role is string => typeof role === 'string');

	return {
		roles: roles.length > 0 ? roles : [...DEFAULT_COMMAND_PERMISSIONS.roles]
	};
}

function parseCooldown(value: unknown): number | null {
	if (value == null) {
		return null;
	}

	if (typeof value === 'number' && Number.isFinite(value)) {
		return value;
	}

	return null;
}

function parseExportedCommand(value: unknown, index: number): ExportedCommand {
	if (!isRecord(value)) {
		throw new Error(`Command at index ${index} is invalid`);
	}

	if (typeof value.name !== 'string' || value.name.trim().length === 0) {
		throw new Error(`Command at index ${index} is missing a name`);
	}

	if (!Array.isArray(value.commandNames) || value.commandNames.length === 0) {
		throw new Error(`Command "${value.name}" is missing command names`);
	}

	const commandNames = value.commandNames.filter(
		(name): name is string => typeof name === 'string' && name.trim().length > 0
	);

	if (commandNames.length === 0) {
		throw new Error(`Command "${value.name}" is missing command names`);
	}

	if (!Array.isArray(value.handlers)) {
		throw new Error(`Command "${value.name}" is missing handlers`);
	}

	return {
		name: value.name,
		group: typeof value.group === 'string' ? value.group : DEFAULT_COMMAND_GROUP,
		enabled: typeof value.enabled === 'boolean' ? value.enabled : true,
		commandNames,
		sources: parseSources(value.sources),
		permissions: parsePermissions(value.permissions),
		cooldownGlobalMs: parseCooldown(value.cooldownGlobalMs),
		cooldownUserMs: parseCooldown(value.cooldownUserMs),
		handlers: value.handlers as StoredActionHandler[]
	};
}

export function parseCommandsExport(raw: string): CommandsExportFile {
	let parsed: unknown;

	try {
		parsed = JSON.parse(raw);
	} catch {
		throw new Error('File is not valid JSON');
	}

	if (!isRecord(parsed)) {
		throw new Error('Commands export file is invalid');
	}

	if (parsed.version !== COMMANDS_EXPORT_VERSION) {
		throw new Error(`Unsupported commands export version: ${String(parsed.version)}`);
	}

	if (!Array.isArray(parsed.commands)) {
		throw new Error('Commands export file is missing a commands array');
	}

	if (parsed.commands.length === 0) {
		throw new Error('Commands export file contains no commands');
	}

	return {
		version: COMMANDS_EXPORT_VERSION,
		exportedAt:
			typeof parsed.exportedAt === 'string' ? parsed.exportedAt : new Date().toISOString(),
		commands: parsed.commands.map(parseExportedCommand)
	};
}

export function exportedCommandToNewRecord(command: ExportedCommand): NewCommandRecord {
	return {
		name: command.name,
		group: command.group,
		enabled: command.enabled,
		commandNames: command.commandNames,
		sources: command.sources,
		permissions: command.permissions,
		cooldownGlobalMs: command.cooldownGlobalMs,
		cooldownUserMs: command.cooldownUserMs,
		handlers: command.handlers.map(withFreshHandlerIds)
	};
}
