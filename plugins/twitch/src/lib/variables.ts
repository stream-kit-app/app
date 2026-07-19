import type { TwitchChatBadge, TwitchChatEmote, TwitchChatMessage } from '@stream-kit/core';
import type { HandlerFieldVariable } from '@stream-kit/plugin';
import type { ChatMessage } from '@twurple/chat';

import { buildEmoteImageUrl } from '@twurple/chat';

import { resolveBadgeUrl } from './badge-cache';

export const USERNAME_VARIABLE: HandlerFieldVariable = {
	key: 'username',
	label: 'Username'
};

export const MESSAGE_VARIABLE: HandlerFieldVariable = {
	key: 'message',
	label: 'Trigger message'
};

export const CHANNEL_VARIABLE: HandlerFieldVariable = {
	key: 'channel',
	label: 'Channel'
};

export const ROLE_VARIABLE: HandlerFieldVariable = {
	key: 'role',
	label: 'User role'
};

export const TIER_VARIABLE: HandlerFieldVariable = {
	key: 'tier',
	label: 'Subscription tier'
};

export const MONTHS_VARIABLE: HandlerFieldVariable = {
	key: 'months',
	label: 'Subscription months'
};

export const GIFT_COUNT_VARIABLE: HandlerFieldVariable = {
	key: 'giftCount',
	label: 'Gift count'
};

export const VIEWERS_VARIABLE: HandlerFieldVariable = {
	key: 'viewers',
	label: 'Raid viewers'
};

export const MSG_VARIABLE: HandlerFieldVariable = {
	key: 'msg',
	label: 'Chat message (JSON)'
};

export const CHAT_TEXT_VARIABLES: HandlerFieldVariable[] = [
	USERNAME_VARIABLE,
	MESSAGE_VARIABLE,
	CHANNEL_VARIABLE,
	ROLE_VARIABLE,
	MSG_VARIABLE
];

export const USER_TEXT_VARIABLES: HandlerFieldVariable[] = [USERNAME_VARIABLE, CHANNEL_VARIABLE];

/** For username fields that target the triggering user. */
export const TARGET_USER_VARIABLES: HandlerFieldVariable[] = [USERNAME_VARIABLE];

export const MESSAGE_TEXT_VARIABLES: HandlerFieldVariable[] = [USERNAME_VARIABLE, MESSAGE_VARIABLE];

export const SUBSCRIPTION_TEXT_VARIABLES: HandlerFieldVariable[] = [
	USERNAME_VARIABLE,
	CHANNEL_VARIABLE,
	TIER_VARIABLE,
	MONTHS_VARIABLE
];

export const GIFT_SUB_TEXT_VARIABLES: HandlerFieldVariable[] = [
	...SUBSCRIPTION_TEXT_VARIABLES,
	GIFT_COUNT_VARIABLE
];

export const RAID_TEXT_VARIABLES: HandlerFieldVariable[] = [
	USERNAME_VARIABLE,
	CHANNEL_VARIABLE,
	VIEWERS_VARIABLE
];

export type { TwitchChatBadge, TwitchChatEmote, TwitchChatMessage } from '@stream-kit/core';

function twitchEmoteUrl(emoteId: string): string {
	return buildEmoteImageUrl(emoteId, { backgroundType: 'dark', size: '3.0' });
}

function mapToRecord(map: Map<string, string>): Record<string, string> {
	return Object.fromEntries(map);
}

function badgesToContext(badges: Map<string, string>): TwitchChatBadge[] {
	return [...badges.entries()].map(([id, version]) => ({
		id,
		version,
		url: resolveBadgeUrl(id, version || '1')
	}));
}

function emotesToContext(emoteOffsets: Map<string, string[]>): TwitchChatEmote[] {
	return [...emoteOffsets.entries()].map(([id, positions]) => ({
		id,
		positions,
		url: twitchEmoteUrl(id)
	}));
}

export function chatMessageToContext(msg: ChatMessage, message = ''): TwitchChatMessage {
	const { userInfo } = msg;

	return {
		channelId: msg.channelId,
		id: msg.id,
		message,
		date: msg.date.toISOString(),
		isCheer: msg.isCheer,
		isRedemption: msg.isRedemption,
		isHypeChat: msg.isHypeChat,
		isFirst: msg.isFirst,
		isReturningChatter: msg.isReturningChatter,
		isHighlight: msg.isHighlight,
		isReply: msg.isReply,
		bits: msg.bits,
		rewardId: msg.rewardId,
		hypeChatLocalizedAmount: msg.hypeChatLocalizedAmount,
		hypeChatLevel: msg.hypeChatLevel,
		parentMessageUserName: msg.parentMessageUserName,
		parentMessageText: msg.parentMessageText,
		parentMessageUserDisplayName: msg.parentMessageUserDisplayName,
		badges: badgesToContext(userInfo.badges),
		badgeInfo: mapToRecord(userInfo.badgeInfo),
		emotes: emotesToContext(msg.emoteOffsets),
		userInfo: {
			userId: userInfo.userId,
			userName: userInfo.userName,
			displayName: userInfo.displayName,
			color: userInfo.color,
			userType: userInfo.userType,
			isMod: userInfo.isMod,
			isBroadcaster: userInfo.isBroadcaster,
			isVip: userInfo.isVip,
			isSubscriber: userInfo.isSubscriber,
			isArtist: userInfo.isArtist,
			isFounder: userInfo.isFounder
		}
	};
}

export function chatMessageToJson(msg: ChatMessage, message = ''): string {
	return JSON.stringify(chatMessageToContext(msg, message));
}

export function contextToVariables(context: unknown): Record<string, string> {
	if (!context || typeof context !== 'object') {
		return {};
	}

	const record = context as Record<string, unknown>;
	const variables: Record<string, string> = {};

	const set = (key: string, value: unknown) => {
		if (value === undefined || value === null) {
			return;
		}

		variables[key] = String(value);
	};

	set('channel', record.channel);
	set('broadcasterId', record.broadcasterId);
	set('username', record.user);
	// Runtime alias for trigger context field `user`; use `{username}` in the UI.
	set('user', record.user);
	set('userId', record.userId);
	set('message', record.message);
	set('role', record.role);
	set('command', record.command);
	set('bits', record.bits);
	set('amount', record.amount);
	set('tier', record.tier);
	set('months', record.months);
	set('giftCount', record.giftCount);
	set('viewers', record.viewers);
	set('duration', record.duration);
	set('rewardId', record.rewardId);
	set('reward', record.rewardId);
	set('rewardTitle', record.rewardTitle);
	set('redemptionId', record.redemptionId);
	set('input', record.input);
	set('title', record.title);
	set('game', record.game);
	set('pollId', record.pollId);
	set('predictionId', record.predictionId);
	set('streamId', record.streamId);
	set('level', record.level);
	set('total', record.total);
	set('reason', record.reason);
	set('goalId', record.goalId);
	set('type', record.type);
	set('description', record.description);
	set('currentAmount', record.currentAmount);
	set('targetAmount', record.targetAmount);
	set('isAchieved', record.isAchieved);
	set('campaignId', record.campaignId);
	set('charityName', record.charityName);
	set('currency', record.currency);
	set('durationSeconds', record.durationSeconds);
	set('isAutomatic', record.isAutomatic);
	set('requester', record.requester);
	set('requesterId', record.requesterId);

	if (record.msg && typeof record.msg === 'object') {
		variables.msg = JSON.stringify(record.msg);
	}

	if (record.args && typeof record.args === 'object' && !Array.isArray(record.args)) {
		for (const [key, value] of Object.entries(record.args as Record<string, unknown>)) {
			set(key, value);
		}
	}

	return variables;
}
