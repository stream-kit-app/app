import type { StoredActionHandler } from '$lib/core/action/stored-action';

export type CommandSource = 'twitch' | 'youtube';

export type CommandPermissions = {
	roles: string[];
};

export type CommandRecord = {
	id: string;
	name: string;
	commandNames: string[];
	handlers: StoredActionHandler[];
	sources: CommandSource[];
	permissions: CommandPermissions;
	cooldownGlobalMs: number | null;
	cooldownUserMs: number | null;
	enabled: boolean;
	createdAt: Date;
	updatedAt: Date;
};

export type NewCommandRecord = {
	id?: string;
	name: string;
	commandNames: string[];
	handlers: StoredActionHandler[];
	sources?: CommandSource[];
	permissions?: CommandPermissions;
	cooldownGlobalMs?: number | null;
	cooldownUserMs?: number | null;
	enabled?: boolean;
	createdAt: Date;
	updatedAt: Date;
};

export const DEFAULT_COMMAND_PERMISSIONS: CommandPermissions = {
	roles: ['everyone']
};

export const DEFAULT_COMMAND_SOURCES: CommandSource[] = ['twitch'];
