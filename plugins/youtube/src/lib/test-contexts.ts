import type {
	ChatEndedContext,
	ChatMessageContext,
	GiftContext,
	GiftMembershipReceivedContext,
	MemberMilestoneContext,
	MembershipGiftContext,
	MessageDeletedContext,
	ModerationContext,
	NewMemberContext,
	PollContext,
	SponsorsOnlyContext,
	StreamContext,
	SuperChatContext,
	SuperStickerContext
} from '../contexts';
import type { YouTubeLiveChatMessage } from './types';

function createMockMessage(
	type: YouTubeLiveChatMessage['snippet']['type'],
	overrides: Partial<YouTubeLiveChatMessage> = {}
): YouTubeLiveChatMessage {
	return {
		kind: 'youtube#liveChatMessage',
		id: 'test-message-id',
		snippet: {
			type,
			liveChatId: 'test-live-chat-id',
			authorChannelId: 'test-author-id',
			publishedAt: new Date().toISOString(),
			displayMessage: 'Test message from Stream Kit',
			textMessageDetails: {
				messageText: 'Test message from Stream Kit'
			}
		},
		authorDetails: {
			channelId: 'test-author-id',
			channelUrl: 'https://youtube.com/channel/test-author-id',
			displayName: 'TestUser',
			profileImageUrl: '',
			isVerified: false,
			isChatOwner: false,
			isChatSponsor: false,
			isChatModerator: false
		},
		...overrides
	};
}

function createBase() {
	return {
		channelId: 'test-channel-id',
		channel: 'Test Channel',
		liveChatId: 'test-live-chat-id',
		broadcastId: 'test-broadcast-id'
	};
}

export function createTestChatMessageContext(): ChatMessageContext {
	const raw = createMockMessage('textMessageEvent');

	return {
		...createBase(),
		user: 'TestUser',
		userId: 'test-author-id',
		message: 'Test message from Stream Kit',
		role: 'everyone',
		raw
	};
}

export function createTestSuperChatContext(): SuperChatContext {
	const raw = createMockMessage('superChatEvent', {
		snippet: {
			type: 'superChatEvent',
			liveChatId: 'test-live-chat-id',
			authorChannelId: 'test-author-id',
			publishedAt: new Date().toISOString(),
			displayMessage: 'Test super chat',
			superChatDetails: {
				amountMicros: '5000000',
				currency: 'USD',
				tier: 1,
				userComment: 'Test super chat'
			}
		}
	});

	return {
		...createBase(),
		user: 'TestUser',
		userId: 'test-author-id',
		message: 'Test super chat',
		role: 'everyone',
		amount: '$5.00',
		amountMicros: 5_000_000,
		currency: 'USD',
		tier: 1,
		raw
	};
}

export function createTestSuperStickerContext(): SuperStickerContext {
	return {
		...createTestSuperChatContext(),
		stickerId: 'test-sticker-id'
	};
}

export function createTestNewMemberContext(): NewMemberContext {
	const raw = createMockMessage('newSponsorEvent');

	return {
		...createBase(),
		user: 'TestUser',
		userId: 'test-author-id',
		memberLevelName: 'Member',
		isUpgrade: false,
		raw
	};
}

export function createTestMemberMilestoneContext(): MemberMilestoneContext {
	const raw = createMockMessage('memberMilestoneChatEvent');

	return {
		...createBase(),
		user: 'TestUser',
		userId: 'test-author-id',
		message: 'Member milestone message',
		memberMonth: 6,
		memberLevelName: 'Member',
		raw
	};
}

export function createTestMembershipGiftContext(): MembershipGiftContext {
	const raw = createMockMessage('membershipGiftingEvent');

	return {
		...createBase(),
		user: 'TestUser',
		userId: 'test-author-id',
		giftCount: 5,
		memberLevelName: 'Member',
		raw
	};
}

export function createTestGiftMembershipReceivedContext(): GiftMembershipReceivedContext {
	const raw = createMockMessage('giftMembershipReceivedEvent');

	return {
		...createBase(),
		user: 'TestUser',
		userId: 'test-author-id',
		memberLevelName: 'Member',
		gifterChannelId: 'test-gifter-id',
		raw
	};
}

export function createTestGiftContext(): GiftContext {
	const raw = createMockMessage('giftEvent');

	return {
		...createBase(),
		user: 'TestUser',
		userId: 'test-author-id',
		giftName: 'Test Gift',
		jewelsAmount: 100,
		raw
	};
}

export function createTestModerationContext(): ModerationContext {
	const raw = createMockMessage('userBannedEvent');

	return {
		...createBase(),
		user: 'TestUser',
		userId: 'test-author-id',
		banType: 'temporary',
		duration: 600,
		moderator: 'Moderator',
		raw
	};
}

export function createTestMessageDeletedContext(): MessageDeletedContext {
	const raw = createMockMessage('messageDeletedEvent');

	return {
		...createBase(),
		user: 'TestUser',
		userId: 'test-author-id',
		deletedMessageId: 'deleted-message-id',
		raw
	};
}

export function createTestPollContext(): PollContext {
	const raw = createMockMessage('pollEvent');

	return {
		...createBase(),
		user: 'TestUser',
		userId: 'test-author-id',
		question: 'Test poll question?',
		status: 'active',
		raw
	};
}

export function createTestSponsorsOnlyContext(): SponsorsOnlyContext {
	const raw = createMockMessage('sponsorOnlyModeStartedEvent');

	return {
		...createBase(),
		raw
	};
}

export function createTestChatEndedContext(): ChatEndedContext {
	return {
		...createBase(),
		raw: undefined
	};
}

export function createTestStreamContext(): StreamContext {
	return {
		channelId: 'test-channel-id',
		channel: 'Test Channel',
		broadcastId: 'test-broadcast-id',
		title: 'Test Stream'
	};
}
