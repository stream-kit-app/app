import type { PluginAppApi } from '@stream-kit/plugin';

import {
	formatCooldownChatMessage,
	getCooldownBlock,
	markCooldown,
	type CooldownState
} from '../commands/lib/cooldown';
import type { BotSettings } from '../settings/bot-settings';
import type { ChatRuntimeDeps } from './chat-runtime';
import { sendChatMessage } from './send-chat-message';

type TwitchStreamApi = {
	readonly userId?: string;
	readonly isConnected?: boolean;
	readonly client?: {
		streams: {
			getStreamByUserId(userId: string): Promise<{ startDate: Date } | null>;
		};
	};
};

type YouTubeStreamApi = {
	readonly isLive?: boolean;
	readonly liveStream?: { actualStartTime?: string };
};

const BUILTIN_COOLDOWN_MS = 5_000;
const BUILTIN_COMMAND_ID = '__builtin__';

type BuiltinContext = {
	userId: string;
	channel?: string;
	broadcasterId?: string;
	liveChatId?: string;
	source: 'twitch' | 'youtube';
};

function formatUptime(startDate: Date): string {
	const totalSeconds = Math.floor((Date.now() - startDate.getTime()) / 1000);
	const hours = Math.floor(totalSeconds / 3600);
	const minutes = Math.floor((totalSeconds % 3600) / 60);
	const seconds = totalSeconds % 60;

	if (hours > 0) {
		return `${hours}h ${minutes}m ${seconds}s`;
	}

	if (minutes > 0) {
		return `${minutes}m ${seconds}s`;
	}

	return `${seconds}s`;
}

async function getUptimeMessage(
	app: PluginAppApi,
	source: 'twitch' | 'youtube'
): Promise<string> {
	if (source === 'youtube') {
		const youtube = app.plugins.tryGet<YouTubeStreamApi>('youtube');
		const startTime = youtube?.liveStream?.actualStartTime;

		if (!youtube?.isLive || !startTime) {
			return 'Stream is offline.';
		}

		return `Stream has been live for ${formatUptime(new Date(startTime))}.`;
	}

	const twitch = app.plugins.tryGet<TwitchStreamApi>('twitch');

	if (!twitch?.isConnected || !twitch.userId || !twitch.client?.streams) {
		return 'Stream is offline.';
	}

	const stream = await twitch.client.streams.getStreamByUserId(twitch.userId);

	if (!stream) {
		return 'Stream is offline.';
	}

	return `Stream has been live for ${formatUptime(stream.startDate)}.`;
}

function getCommandsMessage(app: PluginAppApi, prefix: string): string {
	const commands = app.commands
		.getSnapshot()
		.filter((command) => command.enabled)
		.flatMap((command) => command.commandNames.map((name) => `${prefix}${name}`));

	if (commands.length === 0) {
		return 'No custom commands configured.';
	}

	return `Commands: ${commands.join(', ')}`;
}

function getBotStatusMessage(settings: BotSettings): string {
	return settings.enabled
		? `Bot is enabled. Command prefix: ${settings.prefix}`
		: 'Bot is currently disabled.';
}

export async function tryExecuteBuiltinCommand(
	app: PluginAppApi,
	deps: ChatRuntimeDeps,
	context: BuiltinContext,
	commandName: string,
	cooldownState: CooldownState
): Promise<boolean> {
	const cooldownBlock = getCooldownBlock(
		cooldownState,
		BUILTIN_COMMAND_ID,
		context.userId,
		BUILTIN_COOLDOWN_MS,
		null
	);

	if (cooldownBlock) {
		await sendChatMessage(
			app,
			context.source,
			{
				channel: context.channel,
				broadcasterId: context.broadcasterId,
				liveChatId: context.liveChatId
			},
			formatCooldownChatMessage(commandName, deps.settings.prefix, cooldownBlock)
		);

		return true;
	}

	let response: string | null = null;

	switch (commandName) {
		case 'commands':
			response = getCommandsMessage(app, deps.settings.prefix);
			break;
		case 'uptime':
			response = await getUptimeMessage(app, context.source);
			break;
		case 'bot':
			response = getBotStatusMessage(deps.settings);
			break;
		default:
			return false;
	}

	await sendChatMessage(
		app,
		context.source,
		{
			channel: context.channel,
			broadcasterId: context.broadcasterId,
			liveChatId: context.liveChatId
		},
		response
	);

	markCooldown(cooldownState, BUILTIN_COMMAND_ID, context.userId, BUILTIN_COOLDOWN_MS, null);

	return true;
}
