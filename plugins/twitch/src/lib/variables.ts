import type { HandlerFieldVariable } from '@stream-kit/core';

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

export const CHAT_TEXT_VARIABLES: HandlerFieldVariable[] = [
	USERNAME_VARIABLE,
	MESSAGE_VARIABLE,
	CHANNEL_VARIABLE,
	ROLE_VARIABLE
];

export const USER_TEXT_VARIABLES: HandlerFieldVariable[] = [USERNAME_VARIABLE, CHANNEL_VARIABLE];

/** For username fields that target the triggering user. */
export const TARGET_USER_VARIABLES: HandlerFieldVariable[] = [USERNAME_VARIABLE];

export const MESSAGE_TEXT_VARIABLES: HandlerFieldVariable[] = [
	USERNAME_VARIABLE,
	MESSAGE_VARIABLE
];

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

	return variables;
}
