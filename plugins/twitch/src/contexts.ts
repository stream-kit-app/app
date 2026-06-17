import type { TwitchChatMessage } from '@stream-kit/core';

export type TwitchBaseContext = {
	broadcasterId: string;
	channel: string;
};

export type ChatMessageContext = TwitchBaseContext & {
	user: string;
	userId: string;
	message: string;
	role: string;
	msg: TwitchChatMessage;
};

export type WhisperContext = TwitchBaseContext & {
	user: string;
	message: string;
};

export type CheerContext = ChatMessageContext & {
	bits: number;
};

export type RedemptionContext = ChatMessageContext & {
	rewardId: string;
};

export type CommandContext = ChatMessageContext & {
	command: string;
};

export type HypeChatContext = ChatMessageContext & {
	amount: number;
};

export type SubContext = TwitchBaseContext & {
	user: string;
	tier: string;
	months?: number;
};

export type GiftSubContext = TwitchBaseContext & {
	user: string;
	tier: string;
	giftCount: number;
};

export type CommunitySubContext = TwitchBaseContext & {
	user: string;
	giftCount: number;
};

export type RaidContext = TwitchBaseContext & {
	user: string;
	viewers: number;
};

export type ModerationContext = TwitchBaseContext & {
	user: string;
	duration?: number;
};

export type UserJoinPartContext = TwitchBaseContext & {
	user: string;
};

export type StreamContext = TwitchBaseContext & {
	streamId?: string;
};

export type FollowContext = TwitchBaseContext & {
	user: string;
	userId: string;
};

export type ChannelUpdateContext = TwitchBaseContext & {
	title: string;
	game: string;
};

export type PointsRedemptionContext = TwitchBaseContext & {
	user: string;
	userId: string;
	rewardId: string;
	rewardTitle: string;
	redemptionId: string;
	input: string;
};

export type HypeTrainContext = TwitchBaseContext & {
	level: number;
	total: number;
	progress: number;
	goal: number;
};

export type PollContext = TwitchBaseContext & {
	pollId: string;
	title: string;
};

export type PredictionContext = TwitchBaseContext & {
	predictionId: string;
	title: string;
};

export type EventSubModerationContext = TwitchBaseContext & {
	user: string;
	userId: string;
	reason?: string;
};

export type TwitchContext =
	| ChatMessageContext
	| WhisperContext
	| CheerContext
	| RedemptionContext
	| CommandContext
	| HypeChatContext
	| SubContext
	| GiftSubContext
	| CommunitySubContext
	| RaidContext
	| ModerationContext
	| UserJoinPartContext
	| StreamContext
	| FollowContext
	| ChannelUpdateContext
	| PointsRedemptionContext
	| HypeTrainContext
	| PollContext
	| PredictionContext
	| EventSubModerationContext;
