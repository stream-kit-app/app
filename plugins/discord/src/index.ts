import type { DiscordPluginApi, DiscordPluginController } from './lib/discord';
import type { Plugin } from '@stream-kit/plugin';

import { configureFieldValueResolver } from './get-field-value';
import { createSendMessageHandler } from './handler/message/send-message';
import { createAddRoleHandler } from './handler/role/add-role';
import { createRemoveRoleHandler } from './handler/role/remove-role';
import {
	createDiscordPluginApi,
	isDiscordConnectionConfigured
} from './lib/discord';
import { createMessageReceivedTrigger } from './trigger/message/received';
import { createRoleAddedTrigger } from './trigger/role/added';
import { createRoleRemovedTrigger } from './trigger/role/removed';
import { createVoiceJoinTrigger } from './trigger/voice/join';
import { createVoiceLeaveTrigger } from './trigger/voice/leave';
import { createVoiceMoveTrigger } from './trigger/voice/move';

export type {
	MessageReceivedContext,
	RoleChangedContext,
	VoiceStateChangedContext
} from './contexts';
export type { DiscordPluginApi } from './lib/discord';

const plugin: Plugin = (app) => {
	configureFieldValueResolver(app);
	let discordApi: DiscordPluginController | undefined;

	const warnUnavailable = () => {
		app.toast.create({
			title: 'Discord plugin unavailable',
			description: 'The Discord plugin is disabled or could not be started.',
			variant: 'warning'
		});
	};

	const syncGetValue = (getValue: (key: string) => string | boolean | number | undefined) => {
		discordApi?.setGetValue(getValue);
	};

	const publicApi: DiscordPluginApi = {
		get isConnected() {
			return discordApi?.isConnected ?? false;
		},
		get isConnecting() {
			return discordApi?.isConnecting ?? false;
		},
		get isInviting() {
			return discordApi?.isInviting ?? false;
		},
		get connectionError() {
			return discordApi?.connectionError;
		},
		get botUser() {
			return discordApi?.botUser;
		},
		get guildCount() {
			return discordApi?.guildCount ?? 0;
		},
		connect: async () => {
			if (!discordApi) {
				warnUnavailable();
				return;
			}

			await discordApi.connect();
		},
		disconnect: async () => {
			await discordApi?.disconnect();
		},
		startInviteOAuth: async () => {
			if (!discordApi) {
				warnUnavailable();
				return;
			}

			await discordApi.startInviteOAuth();
		},
		subscribe: (listener) => discordApi?.subscribe(listener) ?? (() => {}),
		sendMessage: async (channelId, content) =>
			discordApi?.sendMessage(channelId, content) ?? false,
		addRole: async (guildId, userId, roleId) =>
			discordApi?.addRole(guildId, userId, roleId) ?? false,
		removeRole: async (guildId, userId, roleId) =>
			discordApi?.removeRole(guildId, userId, roleId) ?? false,
		getGuildItems: () => discordApi?.getGuildItems() ?? [],
		getChannelItems: (guildId) => discordApi?.getChannelItems(guildId) ?? [],
		getRoleItems: (guildId) => discordApi?.getRoleItems(guildId) ?? []
	};

	return {
		name: 'Discord',
		description: 'Connect a Discord bot for messages, roles, and voice events.',
		icon: 'ri:discord-fill',
		api: publicApi,
		isConfigured: ({ getValue }) => isDiscordConnectionConfigured(getValue),
		settings: [
			{
				type: 'alert',
				name: 'Connected',
				description: 'Your Discord bot is connected to the Gateway.',
				variant: 'success',
				visible: () => publicApi.isConnected
			},
			{
				type: 'alert',
				name: 'Connecting',
				description: 'Connecting to the Discord Gateway…',
				variant: 'default',
				visible: () => publicApi.isConnecting && !publicApi.isConnected
			},
			{
				type: 'alert',
				name: 'Not connected',
				description:
					'Paste your bot token and connect. Enable Message Content and Server Members intents in the Discord Developer Portal.',
				variant: 'warning',
				visible: () =>
					!publicApi.isConnected && !publicApi.isConnecting && !publicApi.connectionError
			},
			{
				type: 'alert',
				name: 'Connection error',
				description: 'Failed to connect to Discord. Check the bot token and privileged intents.',
				variant: 'error',
				visible: () =>
					Boolean(publicApi.connectionError) &&
					!publicApi.isConnected &&
					!publicApi.isConnecting
			},
			{
				type: 'text',
				key: 'bot-token',
				inputType: 'password',
				name: 'Bot token',
				placeholder: 'Paste your Discord bot token',
				required: true,
				secret: true,
				sync: 'device'
			},
			{
				type: 'button',
				name: 'Connect',
				variant: 'outline',
				visible: () => !publicApi.isConnected,
				onClick: async ({ getValue }) => {
					syncGetValue(getValue);

					try {
						await publicApi.connect();
						app.toast.create({
							title: 'Connected',
							description: 'Discord bot Gateway is connected.',
							variant: 'success'
						});
					} catch {
						app.toast.create({
							title: 'Connection failed',
							description:
								publicApi.connectionError ??
								'Could not connect to Discord. Check the bot token and intents.',
							variant: 'error'
						});
					}
				}
			},
			{
				type: 'button',
				name: 'Disconnect',
				variant: 'outline',
				visible: () => publicApi.isConnected,
				onClick: async () => {
					await publicApi.disconnect();
					app.toast.create({
						title: 'Disconnected',
						description: 'Discord bot connection closed.',
						variant: 'default'
					});
				}
			},
			{
				type: 'button',
				name: 'Invite bot to server',
				variant: 'outline',
				onClick: () => publicApi.startInviteOAuth()
			}
		],
		triggers: [
			{
				name: 'Discord',
				children: [
					{
						name: 'Message',
						children: [createMessageReceivedTrigger(app)]
					},
					{
						name: 'Role',
						children: [createRoleAddedTrigger(app), createRoleRemovedTrigger(app)]
					},
					{
						name: 'Voice',
						children: [
							createVoiceJoinTrigger(app),
							createVoiceLeaveTrigger(app),
							createVoiceMoveTrigger(app)
						]
					}
				]
			}
		],
		handlers: [
			{
				name: 'Discord',
				children: [
					{
						name: 'Message',
						children: [createSendMessageHandler(app)]
					},
					{
						name: 'Role',
						children: [createAddRoleHandler(app), createRemoveRoleHandler(app)]
					}
				]
			}
		],
		onEnable: async ({ getValue }) => {
			discordApi = createDiscordPluginApi(app);
			syncGetValue(getValue);
			await discordApi.boot();
		},
		onSave: async ({ getValue }) => {
			syncGetValue(getValue);
		},
		onDisable: async () => {
			await discordApi?.disconnect();
		}
	};
};

export default plugin;
