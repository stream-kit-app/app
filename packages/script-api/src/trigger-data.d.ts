/** Stubs for types referenced by plugin trigger contexts. */
type TwitchChatMessage = {
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
	badges: { id: string; version: string; url: string }[];
	badgeInfo: Record<string, string>;
	emotes: { id: string; positions: string[]; url: string }[];
	userInfo: {
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
};

type ProcessEventContext = {
	executable?: string;
	fullPath?: string;
	name?: string;
	parentProcessId?: number;
	path?: string;
	processId?: number;
};

type AppLifecycleEvent = 'started' | 'exit';

type AppLifecycleContext = {
	event: AppLifecycleEvent;
};


type TwitchChatBadge = {
	id: string;
	version: string;
	url: string;
};
type TwitchChatEmote = {
	id: string;
	positions: string[];
	url: string;
};
type TwitchChatUserInfo = {
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
type TwitchBaseContext = {
	broadcasterId: string;
	channel: string;
};
type ChatMessageContext = TwitchBaseContext & {
	user: string;
	userId: string;
	message: string;
	role: string;
	msg: TwitchChatMessage;
};
type WhisperContext = TwitchBaseContext & {
	user: string;
	message: string;
};
type CheerContext = ChatMessageContext & {
	bits: number;
};
type RedemptionContext = ChatMessageContext & {
	rewardId: string;
};
type CommandContext = ChatMessageContext & {
	command: string;
	args: Record<string, string>;
};
type HypeChatContext = ChatMessageContext & {
	amount: number;
};
type SubContext = TwitchBaseContext & {
	user: string;
	tier: string;
	months?: number;
};
type GiftSubContext = TwitchBaseContext & {
	user: string;
	tier: string;
	giftCount: number;
};
type CommunitySubContext = TwitchBaseContext & {
	user: string;
	giftCount: number;
};
type RaidContext = TwitchBaseContext & {
	user: string;
	viewers: number;
};
type ModerationContext = TwitchBaseContext & {
	user: string;
	duration?: number;
};
type UserJoinPartContext = TwitchBaseContext & {
	user: string;
};
type StreamContext = TwitchBaseContext & {
	streamId?: string;
};
type FollowContext = TwitchBaseContext & {
	user: string;
	userId: string;
};
type ChannelUpdateContext = TwitchBaseContext & {
	title: string;
	game: string;
};
type PointsRedemptionContext = TwitchBaseContext & {
	user: string;
	userId: string;
	rewardId: string;
	rewardTitle: string;
	redemptionId: string;
	input: string;
};
type HypeTrainContext = TwitchBaseContext & {
	level: number;
	total: number;
	progress: number;
	goal: number;
};
type PollContext = TwitchBaseContext & {
	pollId: string;
	title: string;
};
type PredictionContext = TwitchBaseContext & {
	predictionId: string;
	title: string;
};
type EventSubModerationContext = TwitchBaseContext & {
	user: string;
	userId: string;
	reason?: string;
};
type TwitchContext = | ChatMessageContext
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
type YouTubeAuthorDetails = {
	channelId: string;
	channelUrl: string;
	displayName: string;
	profileImageUrl: string;
	isVerified: boolean;
	isChatOwner: boolean;
	isChatSponsor: boolean;
	isChatModerator: boolean;
};
type YouTubeLiveChatMessageType = | 'textMessageEvent'
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
type YouTubeLiveChatMessage = {
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
type YouTubeLiveChatMessageListResponse = {
	kind: 'youtube#liveChatMessageListResponse';
	nextPageToken?: string;
	pollingIntervalMillis?: number;
	offlineAt?: string;
	items?: YouTubeLiveChatMessage[];
};
type YouTubeLiveBroadcast = {
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
type YouTubeLiveBroadcastListResponse = {
	kind: 'youtube#liveBroadcastListResponse';
	items?: YouTubeLiveBroadcast[];
};
type YouTubeChannel = {
	kind: 'youtube#channel';
	id: string;
	snippet: {
		title: string;
		customUrl?: string;
	};
};
type YouTubeChannelListResponse = {
	kind: 'youtube#channelListResponse';
	items?: YouTubeChannel[];
};
type YouTubeTokenResponse = {
	access_token: string;
	expires_in: number;
	refresh_token?: string;
	token_type: string;
	scope: string;
};
type YouTubeChannelInfo = {
	channelId: string;
	channelTitle: string;
	customUrl?: string;
};
type YouTubeLiveStreamInfo = {
	broadcastId: string;
	liveChatId: string;
	title: string;
	actualStartTime?: string;
};
type YouTubeBaseContext = {
	channelId: string;
	channel: string;
	liveChatId: string;
	broadcastId: string;
};
type SuperChatContext = YouTubeBaseContext & {
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
type SuperStickerContext = SuperChatContext & {
	stickerId: string;
};
type NewMemberContext = YouTubeBaseContext & {
	user: string;
	userId: string;
	memberLevelName: string;
	isUpgrade: boolean;
	raw: YouTubeLiveChatMessage;
};
type MemberMilestoneContext = YouTubeBaseContext & {
	user: string;
	userId: string;
	message: string;
	memberMonth: number;
	memberLevelName: string;
	raw: YouTubeLiveChatMessage;
};
type MembershipGiftContext = YouTubeBaseContext & {
	user: string;
	userId: string;
	giftCount: number;
	memberLevelName: string;
	raw: YouTubeLiveChatMessage;
};
type GiftMembershipReceivedContext = YouTubeBaseContext & {
	user: string;
	userId: string;
	memberLevelName: string;
	gifterChannelId: string;
	raw: YouTubeLiveChatMessage;
};
type GiftContext = YouTubeBaseContext & {
	user: string;
	userId: string;
	giftName: string;
	jewelsAmount: number;
	raw: YouTubeLiveChatMessage;
};
type MessageDeletedContext = YouTubeBaseContext & {
	user: string;
	userId: string;
	deletedMessageId: string;
	raw: YouTubeLiveChatMessage;
};
type SponsorsOnlyContext = YouTubeBaseContext & {
	raw: YouTubeLiveChatMessage;
};
type ChatEndedContext = YouTubeBaseContext & {
	raw: YouTubeLiveChatMessage | undefined;
};
type YouTubeContext = | ChatMessageContext
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
type SceneChangedContext = {
	sceneName: string;
	sceneUuid: string;
};
type OutputStateContext = {
	outputActive: boolean;
	outputState: string;
	outputPath?: string;
};
type RecordFileChangedContext = {
	newOutputPath: string;
};
type TransitionContext = {
	transitionName: string;
	transitionUuid?: string;
};
type InputStateContext = {
	inputName: string;
	inputUuid?: string;
	inputMuted?: boolean;
	inputEnabled?: boolean;
};
type MediaContext = {
	inputName: string;
	inputUuid?: string;
};
type MediaActionContext = {
	inputName: string;
	inputUuid?: string;
	mediaAction: string;
};
type FilterContext = {
	sourceName: string;
	filterName: string;
	filterEnabled: boolean;
};
type ReplayBufferContext = OutputStateContext;
type VirtualCamContext = OutputStateContext;
type StudioModeContext = {
	studioModeEnabled: boolean;
};
type ObsContext = | SceneChangedContext
	| OutputStateContext
	| RecordFileChangedContext
	| TransitionContext
	| InputStateContext
	| MediaContext
	| MediaActionContext
	| FilterContext
	| ReplayBufferContext
	| VirtualCamContext
	| StudioModeContext;
type ScheduleRepeat = 'once' | 'daily' | 'weekly';
type ScheduleEventContext = {
	kind: 'cron' | 'scheduled';
	firedAt: string;
	scheduledAt: string;
	cronExpression?: string;
	date?: string;
	time?: string;
	repeat?: ScheduleRepeat;
	weekday?: string;
};
type WsMessageContext = {
	connectionId: string;
	connectionName: string;
	url: string;
	message: string;
	isJson: boolean;
	data?: unknown;
	/** Logical connections that share the same pooled socket. */
	affectedConnectionIds?: string[];
};
type WsConnectionStateContext = {
	connectionId: string;
	connectionName: string;
	url: string;
	/** Logical connections that share the same pooled socket. */
	affectedConnectionIds?: string[];
};
type OverlayMessageContext = {
	overlayId: string;
	event: string;
	payload: unknown;
	/** JSON string of `payload`. */
	message: string;
	timestamp: number;
};

type TriggerDataUnion = ProcessEventContext | AppLifecycleContext | TwitchBaseContext | ChatMessageContext | WhisperContext | CheerContext | RedemptionContext | CommandContext | HypeChatContext | SubContext | GiftSubContext | CommunitySubContext | RaidContext | ModerationContext | UserJoinPartContext | StreamContext | FollowContext | ChannelUpdateContext | PointsRedemptionContext | HypeTrainContext | PollContext | PredictionContext | EventSubModerationContext | TwitchContext | YouTubeBaseContext | SuperChatContext | SuperStickerContext | NewMemberContext | MemberMilestoneContext | MembershipGiftContext | GiftMembershipReceivedContext | GiftContext | MessageDeletedContext | SponsorsOnlyContext | ChatEndedContext | YouTubeContext | SceneChangedContext | OutputStateContext | RecordFileChangedContext | TransitionContext | InputStateContext | MediaContext | MediaActionContext | FilterContext | ReplayBufferContext | VirtualCamContext | StudioModeContext | ObsContext | ScheduleEventContext | WsMessageContext | WsConnectionStateContext | OverlayMessageContext;
