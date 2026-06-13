import type { HandlerFieldVariable } from '@stream-kit/plugin';

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
	set('channelId', record.channelId);
	set('username', record.user);
	set('user', record.user);
	set('userId', record.userId);
	set('message', record.message);
	set('role', record.role);
	set('command', record.command);
	set('amount', record.amount);
	set('tier', record.tier);
	set('memberMonth', record.memberMonth);
	set('memberLevelName', record.memberLevelName);
	set('giftCount', record.giftCount);
	set('giftName', record.giftName);
	set('jewelsAmount', record.jewelsAmount);
	set('banType', record.banType);
	set('duration', record.duration);
	set('question', record.question);
	set('title', record.title);
	set('broadcastId', record.broadcastId);
	set('deletedMessageId', record.deletedMessageId);

	return variables;
}
