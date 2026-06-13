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
	SuperChatContext,
	SuperStickerContext
} from '../contexts';
import type { YouTubeApiClient } from './api-client';
import type { YouTubeChannelInfo, YouTubeLiveChatMessage, YouTubeLiveStreamInfo } from './types';
import type { PluginAppApi } from '@stream-kit/plugin';

import { YOUTUBE_EVENTS } from './event-hub';
import { resolveUserRole } from './role';

type ChatHandler = (context: unknown) => void;

const chatHandlers = new Map<string, Set<ChatHandler>>();
let activeMonitor: (() => void) | undefined;

function getMessageText(message: YouTubeLiveChatMessage): string {
	return message.snippet.textMessageDetails?.messageText ?? message.snippet.displayMessage ?? '';
}

function buildBaseContext(
	message: YouTubeLiveChatMessage,
	channel: YouTubeChannelInfo,
	liveStream: YouTubeLiveStreamInfo
) {
	return {
		channelId: channel.channelId,
		channel: channel.channelTitle,
		liveChatId: liveStream.liveChatId,
		broadcastId: liveStream.broadcastId
	};
}

function emit(eventKey: string, context: unknown): void {
	const handlers = chatHandlers.get(eventKey);

	if (!handlers) {
		return;
	}

	for (const handler of handlers) {
		handler(context);
	}
}

function routeMessage(
	message: YouTubeLiveChatMessage,
	channel: YouTubeChannelInfo,
	liveStream: YouTubeLiveStreamInfo
): void {
	const base = buildBaseContext(message, channel, liveStream);
	const author = message.authorDetails;
	const user = author?.displayName ?? '';
	const userId = author?.channelId ?? message.snippet.authorChannelId ?? '';

	switch (message.snippet.type) {
		case 'textMessageEvent':
			emit(YOUTUBE_EVENTS.CHAT_MESSAGE, {
				...base,
				user,
				userId,
				message: getMessageText(message),
				role: resolveUserRole(author),
				raw: message
			} satisfies ChatMessageContext);
			break;
		case 'superChatEvent': {
			const details = message.snippet.superChatDetails;
			emit(YOUTUBE_EVENTS.SUPER_CHAT, {
				...base,
				user,
				userId,
				message: details?.userComment ?? message.snippet.displayMessage ?? '',
				role: resolveUserRole(author),
				amount: details?.amountDisplayString ?? '',
				amountMicros: Number(details?.amountMicros ?? 0),
				currency: details?.currency ?? '',
				tier: details?.tier ?? 0,
				raw: message
			} satisfies SuperChatContext);
			break;
		}
		case 'superStickerEvent': {
			const details = message.snippet.superStickerDetails;
			emit(YOUTUBE_EVENTS.SUPER_STICKER, {
				...base,
				user,
				userId,
				message:
					details?.superStickerMetadata?.altText ?? message.snippet.displayMessage ?? '',
				role: resolveUserRole(author),
				amount: details?.amountDisplayString ?? '',
				amountMicros: Number(details?.amountMicros ?? 0),
				currency: details?.currency ?? '',
				tier: details?.tier ?? 0,
				stickerId: details?.superStickerMetadata?.stickerId ?? '',
				raw: message
			} satisfies SuperStickerContext);
			break;
		}
		case 'newSponsorEvent':
			emit(YOUTUBE_EVENTS.NEW_MEMBER, {
				...base,
				user,
				userId,
				memberLevelName: message.snippet.newSponsorDetails?.memberLevelName ?? '',
				isUpgrade: message.snippet.newSponsorDetails?.isUpgrade ?? false,
				raw: message
			} satisfies NewMemberContext);
			break;
		case 'memberMilestoneChatEvent': {
			const details = message.snippet.memberMilestoneChatDetails;
			emit(YOUTUBE_EVENTS.MEMBER_MILESTONE, {
				...base,
				user,
				userId,
				message: details?.userComment ?? message.snippet.displayMessage ?? '',
				memberMonth: details?.memberMonth ?? 0,
				memberLevelName: details?.memberLevelName ?? '',
				raw: message
			} satisfies MemberMilestoneContext);
			break;
		}
		case 'membershipGiftingEvent': {
			const details = message.snippet.membershipGiftingDetails;
			emit(YOUTUBE_EVENTS.MEMBERSHIP_GIFT, {
				...base,
				user,
				userId,
				giftCount: details?.giftMembershipsCount ?? 0,
				memberLevelName: details?.giftMembershipsLevelName ?? '',
				raw: message
			} satisfies MembershipGiftContext);
			break;
		}
		case 'giftMembershipReceivedEvent': {
			const details = message.snippet.giftMembershipReceivedDetails;
			emit(YOUTUBE_EVENTS.GIFT_MEMBERSHIP_RECEIVED, {
				...base,
				user,
				userId,
				memberLevelName: details?.memberLevelName ?? '',
				gifterChannelId: details?.gifterChannelId ?? '',
				raw: message
			} satisfies GiftMembershipReceivedContext);
			break;
		}
		case 'giftEvent': {
			const details = message.snippet.giftEventDetails?.giftMetadata;
			emit(YOUTUBE_EVENTS.GIFT, {
				...base,
				user,
				userId,
				giftName: details?.giftName ?? '',
				jewelsAmount: details?.jewelsAmount ?? 0,
				raw: message
			} satisfies GiftContext);
			break;
		}
		case 'userBannedEvent': {
			const details = message.snippet.userBannedDetails;
			emit(YOUTUBE_EVENTS.USER_BANNED, {
				...base,
				user: details?.bannedUserDetails.displayName ?? '',
				userId: details?.bannedUserDetails.channelId ?? '',
				banType: details?.banType ?? 'permanent',
				duration: details?.banDurationSeconds
					? Number(details.banDurationSeconds)
					: undefined,
				moderator: user,
				raw: message
			} satisfies ModerationContext);
			break;
		}
		case 'messageDeletedEvent':
			emit(YOUTUBE_EVENTS.MESSAGE_DELETED, {
				...base,
				user,
				userId,
				deletedMessageId: message.snippet.messageDeletedDetails?.deletedMessageId ?? '',
				raw: message
			} satisfies MessageDeletedContext);
			break;
		case 'pollEvent': {
			const metadata = message.snippet.pollDetails?.metadata;
			emit(YOUTUBE_EVENTS.POLL, {
				...base,
				user,
				userId,
				question: metadata?.questionText ?? '',
				status: metadata?.status ?? 'unknown',
				raw: message
			} satisfies PollContext);
			break;
		}
		case 'sponsorOnlyModeStartedEvent':
			emit(YOUTUBE_EVENTS.SPONSORS_ONLY_STARTED, {
				...base,
				raw: message
			} satisfies SponsorsOnlyContext);
			break;
		case 'sponsorOnlyModeEndedEvent':
			emit(YOUTUBE_EVENTS.SPONSORS_ONLY_ENDED, {
				...base,
				raw: message
			} satisfies SponsorsOnlyContext);
			break;
		case 'chatEndedEvent':
			emit(YOUTUBE_EVENTS.CHAT_ENDED, {
				...base,
				raw: message
			} satisfies ChatEndedContext);
			break;
	}
}

export function startChatMonitor(
	_client: PluginAppApi,
	client: YouTubeApiClient,
	channel: YouTubeChannelInfo,
	liveStream: YouTubeLiveStreamInfo
): () => void {
	activeMonitor?.();

	const seenMessageIds = new Set<string>();
	let pageToken: string | undefined;
	let pollingTimer: ReturnType<typeof setTimeout> | undefined;
	let stopped = false;

	function scheduleNextPoll(delayMs: number): void {
		if (stopped) {
			return;
		}

		pollingTimer = setTimeout(poll, delayMs);
	}

	const poll = async () => {
		if (stopped) {
			return;
		}

		const response = await client.listLiveChatMessages(liveStream.liveChatId, pageToken);

		if (!response) {
			scheduleNextPoll(5000);
			return;
		}

		if (response.offlineAt) {
			stopped = true;
			emit(YOUTUBE_EVENTS.CHAT_ENDED, {
				channelId: channel.channelId,
				channel: channel.channelTitle,
				liveChatId: liveStream.liveChatId,
				broadcastId: liveStream.broadcastId,
				raw: undefined
			} satisfies ChatEndedContext);
			return;
		}

		for (const message of response.items ?? []) {
			if (seenMessageIds.has(message.id)) {
				continue;
			}

			seenMessageIds.add(message.id);
			routeMessage(message, channel, liveStream);
		}

		pageToken = response.nextPageToken;
		scheduleNextPoll(response.pollingIntervalMillis ?? 5000);
	};

	void poll();

	const dispose = () => {
		stopped = true;

		if (pollingTimer) {
			clearTimeout(pollingTimer);
		}
	};

	activeMonitor = dispose;
	return dispose;
}

export function subscribeYouTubeEvent<TContext>(
	eventKey: string,
	handler: (context: TContext) => void
): () => void {
	let handlers = chatHandlers.get(eventKey);

	if (!handlers) {
		handlers = new Set();
		chatHandlers.set(eventKey, handlers);
	}

	const wrapped: ChatHandler = (context) => {
		handler(context as TContext);
	};

	handlers.add(wrapped);

	return () => {
		handlers?.delete(wrapped);

		if (handlers?.size === 0) {
			chatHandlers.delete(eventKey);
		}
	};
}

export function subscribeChatMessages(
	filter: (context: ChatMessageContext) => boolean,
	handler: (context: ChatMessageContext) => void
): () => void {
	return subscribeYouTubeEvent<ChatMessageContext>(YOUTUBE_EVENTS.CHAT_MESSAGE, (context) => {
		if (filter(context)) {
			handler(context);
		}
	});
}
