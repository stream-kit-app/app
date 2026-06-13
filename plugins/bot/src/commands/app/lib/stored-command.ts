export type {
	CommandPermissions,
	CommandRecord,
	CommandSource,
	NewCommandRecord
} from '@stream-kit/plugin';

import type { CommandPermissions, CommandSource } from '@stream-kit/plugin';

export const DEFAULT_COMMAND_PERMISSIONS: CommandPermissions = {
	roles: ['everyone']
};

export const DEFAULT_COMMAND_SOURCES: CommandSource[] = ['twitch'];
