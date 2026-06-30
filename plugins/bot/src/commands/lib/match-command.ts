import type { CommandMatch } from '@stream-kit/core';
import { matchCommandPattern } from '@stream-kit/core';
import type { CommandRecord } from '@stream-kit/plugin';

export type CommandMatchResult = {
	command: CommandRecord;
	match: CommandMatch;
};

export function findMatchingCommand(
	commands: CommandRecord[],
	message: string,
	prefix: string
): CommandMatchResult | undefined {
	for (const command of commands) {
		if (!command.enabled) {
			continue;
		}

		for (const pattern of command.commandNames) {
			const match = matchCommandPattern(pattern, message, prefix);

			if (match) {
				return { command, match };
			}
		}
	}

	return undefined;
}
