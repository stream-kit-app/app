import type { StoredActionHandler } from '@stream-kit/plugin/action';
import type { CommandPermissions, CommandSource } from './stored-command';

import type { Command } from './command.svelte';

export const COMMANDS_EXPORT_VERSION = 1;

export type ExportedCommand = {
	name: string;
	group: string;
	enabled: boolean;
	commandNames: string[];
	sources: CommandSource[];
	permissions: CommandPermissions;
	cooldownGlobalMs: number | null;
	cooldownUserMs: number | null;
	handlers: StoredActionHandler[];
};

export type CommandsExportFile = {
	version: typeof COMMANDS_EXPORT_VERSION;
	exportedAt: string;
	commands: ExportedCommand[];
};

export function isExportableCommand(command: Command): boolean {
	return command.id != null && command.ownerPluginKey == null;
}

export function buildCommandsExport(commands: Command[]): CommandsExportFile {
	return {
		version: COMMANDS_EXPORT_VERSION,
		exportedAt: new Date().toISOString(),
		commands: commands.filter(isExportableCommand).map((command) => ({
			name: command.name,
			group: command.group,
			enabled: command.enabled,
			commandNames: [...command.commandNames],
			sources: [...command.sources],
			permissions: {
				roles: [...command.permissions.roles]
			},
			cooldownGlobalMs: command.cooldownGlobalMs,
			cooldownUserMs: command.cooldownUserMs,
			handlers: command.handlers.map((handler) => handler.toStored())
		}))
	};
}
