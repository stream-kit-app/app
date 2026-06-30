import type { CommandMatch } from '@stream-kit/core';
import type { PluginAppApi } from '@stream-kit/plugin';
import type { CommandRecord } from '@stream-kit/plugin';

import { isOnCooldown, markCooldown, type CooldownState } from './cooldown';
import { hasPermission } from './permissions';

type CommandContext = Record<string, unknown> & {
	command: string;
	args?: Record<string, string>;
	user: string;
	userId: string;
	message: string;
	role: string;
};

function buildCommandContext(
	context: CommandContext,
	match: CommandMatch
): CommandContext {
	return {
		...context,
		command: match.command,
		args: match.args,
		...match.args
	};
}

export function executeCommand(
	app: PluginAppApi,
	command: CommandRecord,
	context: CommandContext,
	source: CommandRecord['sources'][number],
	cooldownState: CooldownState,
	match: CommandMatch
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
		data: buildCommandContext(context, match)
	});

	markCooldown(
		cooldownState,
		command.id,
		context.userId,
		command.cooldownGlobalMs,
		command.cooldownUserMs
	);
}
