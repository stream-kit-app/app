import type { PluginAppApi } from '@stream-kit/plugin';
import type { CommandRecord } from '@stream-kit/plugin';

import { isOnCooldown, markCooldown, type CooldownState } from './cooldown';
import { hasPermission } from './permissions';

type CommandContext = Record<string, unknown> & {
	command: string;
	user: string;
	userId: string;
	message: string;
	role: string;
};

export function executeCommand(
	app: PluginAppApi,
	command: CommandRecord,
	context: CommandContext,
	source: CommandRecord['sources'][number],
	cooldownState: CooldownState
): void {
	if (!command.sources.includes(source)) {
		return;
	}

	if (!hasPermission(command.permissions, context.role)) {
		return;
	}

	if (
		isOnCooldown(
			cooldownState,
			command.id,
			context.userId,
			command.cooldownGlobalMs,
			command.cooldownUserMs
		)
	) {
		return;
	}

	app.commands.runById(command.id, {
		trigger: 'Command',
		data: context
	});

	markCooldown(
		cooldownState,
		command.id,
		context.userId,
		command.cooldownGlobalMs,
		command.cooldownUserMs
	);
}
