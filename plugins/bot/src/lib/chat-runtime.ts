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
		await executeCommand(
			app,
			matchResult.command,
			{
				...context,
				command: matchResult.match.command
			},
			context.source,
			cooldownState,
			matchResult.match,
			deps.settings.prefix
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

/**
 * Longest a single chat line may hold up the next one. A command that runs longer (a
 * delay, TTS, a chat send while disconnected) keeps running in the background, but
 * later commands and moderation are no longer blocked behind it.
 */
const MESSAGE_TURN_TIMEOUT_MS = 30_000;

function settleWithin(work: Promise<void>, timeoutMs: number): Promise<void> {
	return new Promise((resolve) => {
		const timer = setTimeout(() => {
			console.warn(`[bot] Chat message still processing after ${timeoutMs / 1000}s; continuing`);
			resolve();
		}, timeoutMs);

		work
			.catch((error) => {
				console.error('Failed to handle chat message', error);
			})
			.finally(() => {
				clearTimeout(timer);
				resolve();
			});
	});
}

export function createChatRuntime(app: PluginAppApi, deps: ChatRuntimeDeps): () => void {
	const cooldownState = createCooldownTracker();
	let chain: Promise<void> = Promise.resolve();

	return subscribeBotChatMessages(app, (context) => {
		// Process chat lines one at a time so cooldown replies cannot race ahead of
		// an in-flight command that still has handlers sending chat — but never let
		// one line block the rest of chat indefinitely.
		chain = chain.then(() =>
			settleWithin(handleChatMessage(app, deps, context, cooldownState), MESSAGE_TURN_TIMEOUT_MS)
		);
	});
}
