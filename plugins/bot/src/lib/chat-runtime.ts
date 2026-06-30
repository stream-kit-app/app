import type { BotSettings } from '../settings/bot-settings';
import type { ChatModerationContext } from './moderation-engine';
import type { TimerScheduler } from './timer-scheduler';
import type { CommandRecord, PluginAppApi } from '@stream-kit/plugin';

import { parseCommand } from '@stream-kit/core';

import { createCooldownTracker } from '../commands/lib/cooldown';
import { executeCommand } from '../commands/lib/execute-command';
import { findMatchingCommand } from '../commands/lib/match-command';
import { tryExecuteBuiltinCommand } from './builtin-commands';
import { subscribeBotChatMessages } from './chat-message-hub';
import { evaluateModeration } from './moderation-engine';

export type ChatRuntimeDeps = {
	settings: BotSettings;
	fetchModRules: () => Promise<import('../moderation/app/lib/stored-mod-rule').ModRuleRecord[]>;
	getCommands: () => CommandRecord[];
	timerScheduler?: TimerScheduler;
};

async function handleChatMessage(
	app: PluginAppApi,
	deps: ChatRuntimeDeps,
	context: ChatModerationContext,
	cooldownState: ReturnType<typeof createCooldownTracker>
): Promise<void> {
	if (deps.settings.moderationEnabled) {
		const rules = await deps.fetchModRules();
		const moderated = await evaluateModeration(app, rules, context);

		if (moderated) {
			return;
		}
	}

	if (deps.settings.enabled) {
		deps.timerScheduler?.onChatLine();
	}

	if (!deps.settings.enabled) {
		return;
	}

	if (
		(context.source === 'twitch' && !deps.settings.platforms.twitch) ||
		(context.source === 'youtube' && !deps.settings.platforms.youtube)
	) {
		return;
	}

	const matchResult = findMatchingCommand(
		deps.getCommands(),
		context.message,
		deps.settings.prefix
	);

	if (matchResult) {
		executeCommand(
			app,
			matchResult.command,
			{
				...context,
				command: matchResult.match.command
			},
			context.source,
			cooldownState,
			matchResult.match
		);
		return;
	}

	const commandName = parseCommand(context.message, deps.settings.prefix);

	if (!commandName) {
		return;
	}

	await tryExecuteBuiltinCommand(
		app,
		deps,
		{
			userId: context.userId,
			channel: context.channel,
			broadcasterId: context.broadcasterId,
			liveChatId: context.liveChatId,
			source: context.source
		},
		commandName,
		cooldownState
	);
}

export function createChatRuntime(app: PluginAppApi, deps: ChatRuntimeDeps): () => void {
	const cooldownState = createCooldownTracker();

	return subscribeBotChatMessages(app, (context) => {
		void handleChatMessage(app, deps, context, cooldownState).catch((error) => {
			console.error('Failed to handle chat message', error);
		});
	});
}
