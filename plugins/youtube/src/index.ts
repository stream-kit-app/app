import type { YouTubePluginApi, YouTubePluginController } from './lib/youtube';
import type { Plugin } from '@stream-kit/app/api';

import { createDeleteMessageHandler } from './handler/chat/delete-message';
import { createSendMessageHandler } from './handler/chat/send-message';
import { createYouTubePluginApi } from './lib/youtube';
import { createCommandTrigger } from './trigger/chat/command';
import { createGiftTrigger } from './trigger/chat/gift';
import { createChatMessageTrigger } from './trigger/chat/message';
import {
	createChatEndedTrigger,
	createSponsorsOnlyEndedTrigger,
	createSponsorsOnlyStartedTrigger
} from './trigger/chat/mode';
import { createPollTrigger } from './trigger/chat/poll';
import { createSuperChatTrigger } from './trigger/chat/super-chat';
import { createSuperStickerTrigger } from './trigger/chat/super-sticker';
import { createMembershipGiftTrigger } from './trigger/membership/gift';
import { createGiftMembershipReceivedTrigger } from './trigger/membership/gift-received';
import { createMemberMilestoneTrigger } from './trigger/membership/milestone';
import { createNewMemberTrigger } from './trigger/membership/new-member';
import { createUserBannedTrigger } from './trigger/moderation/ban';
import { createMessageDeletedTrigger } from './trigger/moderation/message-deleted';
import { createStreamOfflineTrigger } from './trigger/stream/offline';
import { createStreamOnlineTrigger } from './trigger/stream/online';

export type { ChatMessageContext, YouTubeContext } from './contexts';
export type { YouTubePluginApi } from './lib/youtube';

const plugin: Plugin = (app) => {
	let youtubeApi: YouTubePluginController | undefined;
	const warnUnavailable = () => {
		app.toast.create({
			title: 'YouTube plugin unavailable',
			description: 'The YouTube plugin is disabled or could not be started.',
			variant: 'warning'
		});
	};
	const publicApi: YouTubePluginApi = {
		get isConnected() {
			return youtubeApi?.isConnected ?? false;
		},
		get isAuthenticating() {
			return youtubeApi?.isAuthenticating ?? false;
		},
		get accessToken() {
			return youtubeApi?.accessToken;
		},
		get channelId() {
			return youtubeApi?.channelId;
		},
		get channelTitle() {
			return youtubeApi?.channelTitle;
		},
		get liveChatId() {
			return youtubeApi?.liveChatId;
		},
		get liveStream() {
			return youtubeApi?.liveStream;
		},
		get client() {
			return youtubeApi?.client;
		},
		startOAuth: async () => {
			if (!youtubeApi) {
				warnUnavailable();
				return;
			}

			await youtubeApi.startOAuth();
		},
		disconnect: async () => {
			if (!youtubeApi) {
				return;
			}

			await youtubeApi.disconnect();
		},
		subscribe: (listener) => youtubeApi?.subscribe(listener) ?? (() => {})
	};

	return {
		name: 'YouTube',
		description: 'Connect and manage YouTube Live chat and stream events.',
		icon: 'ri:youtube-line',
		api: publicApi,
		isConfigured: () => publicApi.isConnected,
		settings: [
			{
				type: 'alert',
				name: 'Connected',
				description: 'Your YouTube account is connected.',
				variant: 'success',
				visible: () => publicApi.isConnected
			},
			{
				type: 'alert',
				name: 'Not connected',
				description: 'Connect your YouTube account to use YouTube triggers and handlers.',
				variant: 'warning',
				visible: () => !publicApi.isConnected
			},
			{
				type: 'alert',
				name: 'Live stream active',
				description: 'Your channel is currently live and chat is being monitored.',
				variant: 'success',
				visible: () => publicApi.isConnected && publicApi.liveChatId != null
			},
			{
				type: 'alert',
				name: 'Not live',
				description: 'Start a YouTube live broadcast to enable chat triggers.',
				variant: 'warning',
				visible: () => publicApi.isConnected && publicApi.liveChatId == null
			},
			{
				type: 'button',
				name: 'Connect your YouTube account',
				variant: 'outline',
				visible: () => !publicApi.isConnected,
				onClick: () => publicApi.startOAuth()
			},
			{
				type: 'button',
				name: 'Disconnect your YouTube account',
				variant: 'outline',
				visible: () => publicApi.isConnected,
				onClick: () => publicApi.disconnect()
			}
		],
		triggers: [
			{
				name: 'YouTube',
				children: [
					{
						name: 'Chat',
						children: [
							createChatMessageTrigger(app),
							createCommandTrigger(app),
							createSuperChatTrigger(app),
							createSuperStickerTrigger(app),
							createGiftTrigger(app),
							createPollTrigger(app),
							createSponsorsOnlyStartedTrigger(app),
							createSponsorsOnlyEndedTrigger(app),
							createChatEndedTrigger(app)
						]
					},
					{
						name: 'Membership',
						children: [
							createNewMemberTrigger(app),
							createMemberMilestoneTrigger(app),
							createMembershipGiftTrigger(app),
							createGiftMembershipReceivedTrigger(app)
						]
					},
					{
						name: 'Moderation',
						children: [createUserBannedTrigger(app), createMessageDeletedTrigger(app)]
					},
					{
						name: 'Stream',
						children: [createStreamOnlineTrigger(app), createStreamOfflineTrigger(app)]
					}
				]
			}
		],
		handlers: [
			{
				name: 'YouTube',
				children: [
					{
						name: 'Chat',
						children: [createSendMessageHandler(app), createDeleteMessageHandler(app)]
					}
				]
			}
		],
		onBoot: async ({ store }) => {
			youtubeApi = createYouTubePluginApi(app, store);
			await youtubeApi.boot();
		}
	};
};

export default plugin;
