import type { Commands } from './commands.svelte';

import { commands } from '../../../lib/instances';

export function getCommandsService(): Commands {
	return commands;
}

export function tryGetCommandsService(): Commands | undefined {
	return commands;
}
