export type TwitchChatBadge = {
	id: string;
	version: string;
	url: string;
};

export type TwitchChatEmote = {
	id: string;
	positions: string[];
	url: string;
};

export type TwitchChatUserInfo = {
	userId: string | undefined;
	userName: string;
	displayName: string;
	color: string | undefined;
	userType: string | undefined;
	isMod: boolean;
	isBroadcaster: boolean;
	isVip: boolean;
	isSubscriber: boolean;
	isArtist: boolean;
	isFounder: boolean;
};

/** Serialized Twitch chat message payload (trigger `msg` field). */
export type TwitchChatMessage = {
	channelId: string | null;
	id: string;
	message: string;
	date: string;
	isCheer: boolean;
	isRedemption: boolean;
	isHypeChat: boolean;
	isFirst: boolean;
	isReturningChatter: boolean;
	isHighlight: boolean;
	isReply: boolean;
	bits: number;
	rewardId: string | null;
	hypeChatLocalizedAmount: number | null;
	hypeChatLevel: number | null;
	parentMessageUserName: string | null;
	parentMessageText: string | null;
	parentMessageUserDisplayName: string | null;
	badges: TwitchChatBadge[];
	badgeInfo: Record<string, string>;
	emotes: TwitchChatEmote[];
	userInfo: TwitchChatUserInfo;
};
