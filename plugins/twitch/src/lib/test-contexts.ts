import type { PluginAppApi } from '@stream-kit/plugin';
import type { ChatMessage } from '@twurple/chat';

import type {
	ChannelUpdateContext,
	ChatMessageContext,
	CheerContext,
	CommandContext,
	CommunitySubContext,
	EventSubModerationContext,
	FollowContext,
	GiftSubContext,
	HypeChatContext,
	HypeTrainContext,
	ModerationContext,
	PointsRedemptionContext,
	PollContext,
	PredictionContext,
	RaidContext,
	RedemptionContext,
	StreamContext,
	SubContext,
	UserJoinPartContext,
	WhisperContext
} from '../contexts';
import { getBroadcasterId, getBroadcasterName } from './broadcaster';
import { setBadgeUrl } from './badge-cache';
import { chatMessageToContext } from './variables';

function createBase(app: PluginAppApi) {
	return {
		broadcasterId: getBroadcasterId(app) ?? '123456789',
		channel: getBroadcasterName(app) ?? 'testchannel'
	};
}

function createMockChatMessage(overrides: Partial<ChatMessage> = {}): ChatMessage {
	return {
		channelId: '123456789',
		id: 'test-message-id',
		date: new Date('2024-01-01T12:00:00.000Z'),
		isCheer: false,
		isRedemption: false,
		isHypeChat: false,
		isFirst: false,
		isReturningChatter: false,
		isHighlight: false,
		isReply: false,
		bits: 0,
		rewardId: undefined,
		hypeChatLocalizedAmount: 0,
		hypeChatLevel: 0,
		parentMessageUserName: undefined,
		parentMessageText: undefined,
		parentMessageUserDisplayName: undefined,
		emoteOffsets: new Map([['425618', ['0-5']]]),
		userInfo: {
			userId: '999001',
			userName: 'TestUser',
			displayName: 'TestUser',
			color: '#9147FF',
			badges: new Map([
				['subscriber', '12'],
				['premium', '1']
			]),
			badgeInfo: new Map([['subscriber', '25']]),
			isMod: false,
			isBroadcaster: false,
			isVip: false,
			isSubscriber: true
		},
		...overrides
	} as ChatMessage;
}

export function createTestChatMessageContext(app: PluginAppApi): ChatMessageContext {
	const base = createBase(app);
	const message = '!test hello from stream kit';

	setBadgeUrl('subscriber', '12', 'https://static-cdn.jtvnw.net/badges/v1/5d9f2208-5dd8-11e7-8513-2ff4adfae661/3');
	setBadgeUrl('premium', '1', 'https://static-cdn.jtvnw.net/badges/v1/bbbe0db0-a598-423e-86d0-f9fb98ca1933/3');

	return {
		...base,
		user: 'TestUser',
		userId: '999001',
		message,
		role: 'everyone',
		msg: chatMessageToContext(createMockChatMessage(), message)
	};
}

export function createTestWhisperContext(app: PluginAppApi): WhisperContext {
	return {
		...createBase(app),
		user: 'TestUser',
		message: 'Test whisper message'
	};
}

export function createTestCheerContext(app: PluginAppApi): CheerContext {
	return {
		...createTestChatMessageContext(app),
		bits: 100
	};
}

export function createTestRedemptionContext(app: PluginAppApi): RedemptionContext {
	return {
		...createTestChatMessageContext(app),
		rewardId: 'test-reward-id'
	};
}

export function createTestCommandContext(app: PluginAppApi): CommandContext {
	return {
		...createTestChatMessageContext(app),
		command: '!test'
	};
}

export function createTestHypeChatContext(app: PluginAppApi): HypeChatContext {
	return {
		...createTestChatMessageContext(app),
		amount: 500
	};
}

export function createTestSubContext(app: PluginAppApi): SubContext {
	return {
		...createBase(app),
		user: 'TestUser',
		tier: '1000',
		months: 1
	};
}

export function createTestGiftSubContext(app: PluginAppApi): GiftSubContext {
	return {
		...createBase(app),
		user: 'TestUser',
		tier: '1000',
		giftCount: 5
	};
}

export function createTestCommunitySubContext(app: PluginAppApi): CommunitySubContext {
	return {
		...createBase(app),
		user: 'TestUser',
		giftCount: 10
	};
}

export function createTestRaidContext(app: PluginAppApi): RaidContext {
	return {
		...createBase(app),
		user: 'RaidLeader',
		viewers: 25
	};
}

export function createTestModerationContext(app: PluginAppApi): ModerationContext {
	return {
		...createBase(app),
		user: 'TestUser',
		duration: 600
	};
}

export function createTestUserJoinPartContext(app: PluginAppApi): UserJoinPartContext {
	return {
		...createBase(app),
		user: 'TestUser'
	};
}

export function createTestStreamContext(app: PluginAppApi): StreamContext {
	return {
		...createBase(app),
		streamId: 'test-stream-id'
	};
}

export function createTestFollowContext(app: PluginAppApi): FollowContext {
	return {
		...createBase(app),
		user: 'TestUser',
		userId: '999001'
	};
}

export function createTestChannelUpdateContext(app: PluginAppApi): ChannelUpdateContext {
	return {
		...createBase(app),
		title: 'Test Stream Title',
		game: 'Just Chatting'
	};
}

export function createTestPointsRedemptionContext(app: PluginAppApi): PointsRedemptionContext {
	return {
		...createBase(app),
		user: 'TestUser',
		userId: '999001',
		rewardId: 'test-reward-id',
		rewardTitle: 'Test Reward',
		redemptionId: 'test-redemption-id',
		input: 'Test redemption input'
	};
}

export function createTestHypeTrainContext(app: PluginAppApi): HypeTrainContext {
	return {
		...createBase(app),
		level: 2,
		total: 500,
		progress: 250,
		goal: 500
	};
}

export function createTestPollContext(app: PluginAppApi): PollContext {
	return {
		...createBase(app),
		pollId: 'test-poll-id',
		title: 'Test Poll'
	};
}

export function createTestPredictionContext(app: PluginAppApi): PredictionContext {
	return {
		...createBase(app),
		predictionId: 'test-prediction-id',
		title: 'Test Prediction'
	};
}

export function createTestEventSubModerationContext(app: PluginAppApi): EventSubModerationContext {
	return {
		...createBase(app),
		user: 'TestUser',
		userId: '999001',
		reason: 'Test moderation reason'
	};
}
