import type { CommandMatch } from '@stream-kit/core';
import type { PluginAppApi } from '@stream-kit/plugin';
import type { CommandRecord } from '@stream-kit/plugin';

import { getCommandsService } from '../app/lib/get-commands';
import { sendChatMessage } from '../../lib/send-chat-message';
import {
	formatCooldownChatMessage,
	getCooldownBlock,
	markCooldown,
	type CooldownState
} from './cooldown';
import { hasPermission } from './permissions';

type CommandContext = Record<string, unknown> & {
	command: string;
	args?: Record<string, string>;
	user: string;
	userId: string;
	message: string;
	role: string;
	channel?: string;
	broadcasterId?: string;
	liveChatId?: string;
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

export async function executeCommand(
	app: PluginAppApi,
	command: CommandRecord,
	context: CommandContext,
	source: CommandRecord['sources'][number],
	cooldownState: CooldownState,
	match: CommandMatch,
	prefix: string
): Promise<void> {
	if (!command.sources.includes(source)) {
		return;
	}

	const botApi = app.plugins.tryGet<{
		roles: {
			isMember: (
				roleId: string,
				identity: { userId?: string; username?: string; platform?: string }
			) => boolean;
		};
	}>('bot');

	if (
		!hasPermission(command.permissions, context.role, {
			isInCustomRole: (roleId) =>
				botApi?.roles.isMember(roleId, {
					userId: context.userId.startsWith('twitch:') || context.userId.startsWith('youtube:')
						? context.userId
						: `${source === 'youtube' ? 'youtube' : 'twitch'}:${context.userId}`,
					username: context.user,
					platform: source === 'youtube' ? 'youtube' : 'twitch'
				}) ?? false
		})
	) {
		return;
	}

	const cooldownBlock = getCooldownBlock(
		cooldownState,
		command.id,
		context.userId,
		command.cooldownGlobalMs,
		command.cooldownUserMs
	);

	if (cooldownBlock) {
		await sendChatMessage(
			app,
			source,
			{
				channel: context.channel,
				broadcasterId: context.broadcasterId,
				liveChatId: context.liveChatId
			},
			formatCooldownChatMessage(match.command, prefix, cooldownBlock)
		);

		return;
	}

	// Reserve cooldown before handlers run so overlapping chat events cannot both execute.
	markCooldown(
		cooldownState,
		command.id,
		context.userId,
		command.cooldownGlobalMs,
		command.cooldownUserMs
	);

	await getCommandsService().runByIdAsync(command.id, {
		trigger: 'Command',
		data: buildCommandContext(context, match)
	});
}
