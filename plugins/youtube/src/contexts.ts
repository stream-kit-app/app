import type { YouTubeLiveChatMessage } from './lib/types';

export type YouTubeBaseContext = {
	channelId: string;
	channel: string;
	liveChatId: string;
	broadcastId: string;
};

export type ChatMessageContext = YouTubeBaseContext & {
	user: string;
	userId: string;
	message: string;
	role: string;
	raw: YouTubeLiveChatMessage;
};

export type CommandContext = ChatMessageContext & {
	command: string;
	args: Record<string, string>;
};

export type SuperChatContext = YouTubeBaseContext & {
	user: string;
	userId: string;
	message: string;
	role: string;
	amount: string;
	amountMicros: number;
	currency: string;
	tier: number;
	raw: YouTubeLiveChatMessage;
};

export type SuperStickerContext = SuperChatContext & {
	stickerId: string;
};

export type NewMemberContext = YouTubeBaseContext & {
	user: string;
	userId: string;
	memberLevelName: string;
	isUpgrade: boolean;
	raw: YouTubeLiveChatMessage;
};

export type MemberMilestoneContext = YouTubeBaseContext & {
	user: string;
	userId: string;
	message: string;
	memberMonth: number;
	memberLevelName: string;
	raw: YouTubeLiveChatMessage;
};

export type MembershipGiftContext = YouTubeBaseContext & {
	user: string;
	userId: string;
	giftCount: number;
	memberLevelName: string;
	raw: YouTubeLiveChatMessage;
};

export type GiftMembershipReceivedContext = YouTubeBaseContext & {
	user: string;
	userId: string;
	memberLevelName: string;
	gifterChannelId: string;
	raw: YouTubeLiveChatMessage;
};

export type GiftContext = YouTubeBaseContext & {
	user: string;
	userId: string;
	giftName: string;
	jewelsAmount: number;
	raw: YouTubeLiveChatMessage;
};

export type ModerationContext = YouTubeBaseContext & {
	user: string;
	userId: string;
	banType: 'permanent' | 'temporary';
	duration?: number;
	moderator: string;
	raw: YouTubeLiveChatMessage;
};

export type MessageDeletedContext = YouTubeBaseContext & {
	user: string;
	userId: string;
	deletedMessageId: string;
	raw: YouTubeLiveChatMessage;
};

export type PollContext = YouTubeBaseContext & {
	user: string;
	userId: string;
	question: string;
	status: 'unknown' | 'active' | 'closed';
	raw: YouTubeLiveChatMessage;
};

export type SponsorsOnlyContext = YouTubeBaseContext & {
	raw: YouTubeLiveChatMessage;
};

export type ChatEndedContext = YouTubeBaseContext & {
	raw: YouTubeLiveChatMessage | undefined;
};

export type StreamContext = {
	channelId: string;
	channel: string;
	broadcastId?: string;
	title?: string;
};

export type YouTubeContext =
	| ChatMessageContext
	| CommandContext
	| SuperChatContext
	| SuperStickerContext
	| NewMemberContext
	| MemberMilestoneContext
	| MembershipGiftContext
	| GiftMembershipReceivedContext
	| GiftContext
	| ModerationContext
	| MessageDeletedContext
	| PollContext
	| SponsorsOnlyContext
	| ChatEndedContext
	| StreamContext;
