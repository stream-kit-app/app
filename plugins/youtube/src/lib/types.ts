export type YouTubeAuthorDetails = {
	channelId: string;
	channelUrl: string;
	displayName: string;
	profileImageUrl: string;
	isVerified: boolean;
	isChatOwner: boolean;
	isChatSponsor: boolean;
	isChatModerator: boolean;
};

export type YouTubeLiveChatMessageType =
	| 'textMessageEvent'
	| 'superChatEvent'
	| 'superStickerEvent'
	| 'newSponsorEvent'
	| 'memberMilestoneChatEvent'
	| 'membershipGiftingEvent'
	| 'giftMembershipReceivedEvent'
	| 'giftEvent'
	| 'userBannedEvent'
	| 'messageDeletedEvent'
	| 'pollEvent'
	| 'sponsorOnlyModeStartedEvent'
	| 'sponsorOnlyModeEndedEvent'
	| 'chatEndedEvent'
	| 'tombstone';

export type YouTubeLiveChatMessage = {
	kind: 'youtube#liveChatMessage';
	id: string;
	snippet: {
		type: YouTubeLiveChatMessageType;
		liveChatId: string;
		authorChannelId?: string;
		publishedAt: string;
		hasDisplayContent?: boolean;
		displayMessage?: string;
		textMessageDetails?: {
			messageText: string;
		};
		superChatDetails?: {
			amountMicros: string;
			currency: string;
			amountDisplayString: string;
			userComment?: string;
			tier: number;
		};
		superStickerDetails?: {
			amountMicros: string;
			currency: string;
			amountDisplayString: string;
			tier: number;
			superStickerMetadata?: {
				stickerId: string;
				altText: string;
				language: string;
			};
		};
		newSponsorDetails?: {
			memberLevelName?: string;
			isUpgrade?: boolean;
		};
		memberMilestoneChatDetails?: {
			userComment?: string;
			memberMonth: number;
			memberLevelName?: string;
		};
		membershipGiftingDetails?: {
			giftMembershipsCount: number;
			giftMembershipsLevelName?: string;
		};
		giftMembershipReceivedDetails?: {
			memberLevelName?: string;
			gifterChannelId: string;
			associatedMembershipGiftingMessageId: string;
		};
		giftEventDetails?: {
			giftMetadata?: {
				jewelsAmount: number;
				giftName: string;
				giftUrl?: string;
				altText?: string;
			};
		};
		userBannedDetails?: {
			bannedUserDetails: {
				channelId: string;
				displayName: string;
			};
			banType: 'permanent' | 'temporary';
			banDurationSeconds?: string;
		};
		messageDeletedDetails?: {
			deletedMessageId: string;
		};
		pollDetails?: {
			metadata?: {
				questionText: string;
				status: 'unknown' | 'active' | 'closed';
				options?: Array<{
					optionText: string;
					tally?: string;
				}>;
			};
		};
	};
	authorDetails?: YouTubeAuthorDetails;
};

export type YouTubeLiveChatMessageListResponse = {
	kind: 'youtube#liveChatMessageListResponse';
	nextPageToken?: string;
	pollingIntervalMillis?: number;
	offlineAt?: string;
	items?: YouTubeLiveChatMessage[];
};

export type YouTubeLiveBroadcast = {
	kind: 'youtube#liveBroadcast';
	id: string;
	snippet: {
		channelId: string;
		title: string;
		liveChatId?: string;
		actualStartTime?: string;
		actualEndTime?: string;
	};
	status: {
		lifeCycleStatus: 'created' | 'ready' | 'testing' | 'live' | 'complete' | 'revoked';
		privacyStatus: string;
	};
};

export type YouTubeLiveBroadcastListResponse = {
	kind: 'youtube#liveBroadcastListResponse';
	items?: YouTubeLiveBroadcast[];
};

export type YouTubeChannel = {
	kind: 'youtube#channel';
	id: string;
	snippet: {
		title: string;
		customUrl?: string;
	};
};

export type YouTubeChannelListResponse = {
	kind: 'youtube#channelListResponse';
	items?: YouTubeChannel[];
};

export type YouTubeTokenResponse = {
	access_token: string;
	expires_in: number;
	refresh_token?: string;
	token_type: string;
	scope: string;
};

export type YouTubeChannelInfo = {
	channelId: string;
	channelTitle: string;
	customUrl?: string;
};

export type YouTubeLiveStreamInfo = {
	broadcastId: string;
	liveChatId: string;
	title: string;
	actualStartTime?: string;
};
