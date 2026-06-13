import type { CommandRecord } from '@stream-kit/plugin';

export function findMatchingCommand(
	commands: CommandRecord[],
	trigger: string
): CommandRecord | undefined {
	const normalized = trigger.trim().replace(/^!+/, '').toLowerCase();

	return commands.find(
		(command) => command.enabled && command.commandNames.includes(normalized)
	);
}
