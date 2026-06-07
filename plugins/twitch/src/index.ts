import type { TwitchPluginApi, TwitchPluginController } from './lib/twitch';
import type { Plugin } from '@stream-kit/app/api';

import { createCommercialHandler } from './handler/channel/commercial';
import { createModAddHandler, createModRemoveHandler } from './handler/channel/moderator';
import { createRaidCancelHandler } from './handler/channel/raid-cancel';
import { createRaidStartHandler } from './handler/channel/raid-start';
import { createVipAddHandler, createVipRemoveHandler } from './handler/channel/vip';
import { createAnnouncementHandler } from './handler/chat/announcement';
import { createClearChatHandler } from './handler/chat/clear-chat';
import { createDeleteMessageHandler } from './handler/chat/delete-message';
import { createSendMessageHandler } from './handler/chat/send-message';
import { createChatSettingsHandler } from './handler/chat/settings';
import { createShoutoutHandler } from './handler/chat/shoutout';
import { createWhisperHandler } from './handler/chat/whisper';
import { createClipHandler } from './handler/clips/create';
import { createBanHandler } from './handler/moderation/ban';
import { createShieldModeHandler } from './handler/moderation/shield';
import { createUnbanHandler } from './handler/moderation/unban';
import { createWarnHandler } from './handler/moderation/warn';
import { createPointsCancelHandler, createPointsFulfillHandler } from './handler/points/redemption';
import { createPollStartHandler } from './handler/polls/create';
import { createPollEndHandler } from './handler/polls/end';
import { createPredictionCancelHandler } from './handler/predictions/cancel';
import { createPredictionStartHandler } from './handler/predictions/create';
import { createPredictionEndHandler } from './handler/predictions/end';
import { createPredictionLockHandler } from './handler/predictions/lock';
import { createTwitchPluginApi } from './lib/twitch';
import { createFollowTrigger } from './trigger/channel/follow';
import { createChannelUpdateTrigger } from './trigger/channel/update';
import { createCheerTrigger } from './trigger/chat/cheer';
import { createCommandTrigger } from './trigger/chat/command';
import { createHypeChatTrigger } from './trigger/chat/hype';
import { createChatMessageTrigger } from './trigger/chat/message';
import { createRedemptionTrigger } from './trigger/chat/redemption';
import { createWhisperTrigger } from './trigger/chat/whisper';
import { createUserJoinTrigger } from './trigger/engagement/join';
import { createUserPartTrigger } from './trigger/engagement/part';
import { createHypeTrainBeginTrigger } from './trigger/hype/begin';
import { createHypeTrainEndTrigger } from './trigger/hype/end';
import { createHypeTrainProgressTrigger } from './trigger/hype/progress';
import { createBanTrigger } from './trigger/moderation/ban';
import { createChannelBanTrigger } from './trigger/moderation/ban-es';
import { createShieldModeBeginTrigger } from './trigger/moderation/shield-begin';
import { createShieldModeEndTrigger } from './trigger/moderation/shield-end';
import { createTimeoutTrigger } from './trigger/moderation/timeout';
import { createChannelUnbanTrigger } from './trigger/moderation/unban-es';
import { createPointsRedeemedTrigger } from './trigger/points/redeemed';
import { createPollBeginTrigger } from './trigger/polls/begin';
import { createPollEndTrigger } from './trigger/polls/end';
import { createPredictionBeginTrigger } from './trigger/predictions/begin';
import { createPredictionEndTrigger } from './trigger/predictions/end';
import { createPredictionLockTrigger } from './trigger/predictions/lock';
import { createIncomingRaidTrigger } from './trigger/raids/incoming';
import { createStreamOfflineTrigger } from './trigger/stream/offline';
import { createStreamOnlineTrigger } from './trigger/stream/online';
import { createCommunitySubTrigger } from './trigger/subscriptions/community';
import { createGiftSubTrigger } from './trigger/subscriptions/gift';
import { createResubTrigger } from './trigger/subscriptions/resub';
import { createSubTrigger } from './trigger/subscriptions/sub';

export type { ChatMessageContext, TwitchContext } from './contexts';
export type { TwitchPluginApi } from './lib/twitch';

const plugin: Plugin = (app) => {
	let twitchApi: TwitchPluginController | undefined;
	const warnUnavailable = () => {
		app.toast.create({
			id: 'twitch-plugin-unavailable',
			title: 'Twitch plugin unavailable',
			description: 'The Twitch plugin is disabled or could not be started.',
			variant: 'warning'
		});
	};
	const publicApi: TwitchPluginApi = {
		get isConnected() {
			return twitchApi?.isConnected ?? false;
		},
		get isAuthenticating() {
			return twitchApi?.isAuthenticating ?? false;
		},
		get accessToken() {
			return twitchApi?.accessToken;
		},
		get token() {
			return twitchApi?.token;
		},
		get userId() {
			return twitchApi?.userId;
		},
		get client() {
			return twitchApi?.client;
		},
		get chat() {
			return twitchApi?.chat;
		},
		get eventSub() {
			return twitchApi?.eventSub;
		},
		startOAuth: async () => {
			if (!twitchApi) {
				warnUnavailable();
				return;
			}

			await twitchApi.startOAuth();
		},
		disconnect: async () => {
			if (!twitchApi) {
				return;
			}

			await twitchApi.disconnect();
		},
		subscribe: (listener) => twitchApi?.subscribe(listener) ?? (() => {})
	};

	return {
		key: 'twitch',
		name: 'Twitch',
		description: 'Connect and manage the Twitch chat and EventSub integration.',
		icon: 'ri:twitch-line',
		api: publicApi,
		isConfigured: () => publicApi.isConnected,
		settings: [
			{
				type: 'alert',
				key: 'connected',
				name: 'Connected',
				description: 'Your Twitch account is connected.',
				variant: 'success',
				visible: () => publicApi.isConnected
			},
			{
				type: 'alert',
				key: 'disconnected',
				name: 'Not connected',
				description: 'Connect your Twitch account to use Twitch triggers and handlers.',
				variant: 'warning',
				visible: () => !publicApi.isConnected
			},
			{
				type: 'button',
				key: 'connect',
				name: 'Connect your Twitch account',
				variant: 'outline',
				visible: () => !publicApi.isConnected,
				onClick: () => publicApi.startOAuth()
			},
			{
				type: 'button',
				key: 'disconnect',
				name: 'Disconnect your Twitch account',
				variant: 'outline',
				visible: () => publicApi.isConnected,
				onClick: () => publicApi.disconnect()
			}
		],
		onBoot: async ({ store }) => {
			twitchApi = createTwitchPluginApi(app, store);
			await twitchApi.boot();
		},
		triggers: [
			{
				id: 'twitch',
				name: 'Twitch',
				children: [
					{
						id: 'twitch-chat',
						name: 'Chat',
						children: [
							createChatMessageTrigger(app),
							createCheerTrigger(app),
							createWhisperTrigger(app),
							createRedemptionTrigger(app),
							createCommandTrigger(app),
							createHypeChatTrigger(app)
						]
					},
					{
						id: 'twitch-subscriptions',
						name: 'Subscriptions',
						children: [
							createSubTrigger(app),
							createResubTrigger(app),
							createGiftSubTrigger(app),
							createCommunitySubTrigger(app)
						]
					},
					{ id: 'twitch-raids', name: 'Raids', children: [createIncomingRaidTrigger(app)] },
					{
						id: 'twitch-moderation',
						name: 'Moderation',
						children: [
							createBanTrigger(app),
							createTimeoutTrigger(app),
							createChannelBanTrigger(app),
							createChannelUnbanTrigger(app),
							createShieldModeBeginTrigger(app),
							createShieldModeEndTrigger(app)
						]
					},
					{
						id: 'twitch-engagement',
						name: 'Engagement',
						children: [createUserJoinTrigger(app), createUserPartTrigger(app)]
					},
					{
						id: 'twitch-stream',
						name: 'Stream',
						children: [createStreamOnlineTrigger(app), createStreamOfflineTrigger(app)]
					},
					{
						id: 'twitch-channel',
						name: 'Channel',
						children: [createFollowTrigger(app), createChannelUpdateTrigger(app)]
					},
					{
						id: 'twitch-points',
						name: 'Channel Points',
						children: [createPointsRedeemedTrigger(app)]
					},
					{
						id: 'twitch-hype',
						name: 'Hype Train',
						children: [
							createHypeTrainBeginTrigger(app),
							createHypeTrainProgressTrigger(app),
							createHypeTrainEndTrigger(app)
						]
					},
					{
						id: 'twitch-polls',
						name: 'Polls',
						children: [createPollBeginTrigger(app), createPollEndTrigger(app)]
					},
					{
						id: 'twitch-predictions',
						name: 'Predictions',
						children: [
							createPredictionBeginTrigger(app),
							createPredictionLockTrigger(app),
							createPredictionEndTrigger(app)
						]
					}
				]
			}
		],
		handlers: [
			{
				id: 'twitch',
				name: 'Twitch',
				children: [
					{
						id: 'twitch-chat',
						name: 'Chat',
						children: [
							createSendMessageHandler(app),
							createAnnouncementHandler(app),
							createClearChatHandler(app),
							createDeleteMessageHandler(app),
							createWhisperHandler(app),
							createShoutoutHandler(app),
							createChatSettingsHandler(app)
						]
					},
					{
						id: 'twitch-moderation',
						name: 'Moderation',
						children: [
							createBanHandler(app),
							createUnbanHandler(app),
							createWarnHandler(app),
							createShieldModeHandler(app)
						]
					},
					{
						id: 'twitch-channel',
						name: 'Channel',
						children: [
							createRaidStartHandler(app),
							createRaidCancelHandler(app),
							createCommercialHandler(app),
							createVipAddHandler(app),
							createVipRemoveHandler(app),
							createModAddHandler(app),
							createModRemoveHandler(app)
						]
					},
					{
						id: 'twitch-points',
						name: 'Channel Points',
						children: [createPointsFulfillHandler(app), createPointsCancelHandler(app)]
					},
					{
						id: 'twitch-polls',
						name: 'Polls',
						children: [createPollStartHandler(app), createPollEndHandler(app)]
					},
					{
						id: 'twitch-predictions',
						name: 'Predictions',
						children: [
							createPredictionStartHandler(app),
							createPredictionLockHandler(app),
							createPredictionEndHandler(app),
							createPredictionCancelHandler(app)
						]
					},
					{ id: 'twitch-clips', name: 'Clips', children: [createClipHandler(app)] }
				]
			}
		]
	};
};

export default plugin;
