import type { HandlerFieldVariable } from '@stream-kit/plugin';

export const USERNAME_VARIABLE: HandlerFieldVariable = {
	key: 'username',
	label: 'Username'
};

export const USER_VARIABLE: HandlerFieldVariable = {
	key: 'user',
	label: 'Display name'
};

export const USER_ID_VARIABLE: HandlerFieldVariable = {
	key: 'userId',
	label: 'User ID'
};

export const MESSAGE_VARIABLE: HandlerFieldVariable = {
	key: 'message',
	label: 'Message'
};

export const GUILD_VARIABLE: HandlerFieldVariable = {
	key: 'guild',
	label: 'Server name'
};

export const GUILD_ID_VARIABLE: HandlerFieldVariable = {
	key: 'guildId',
	label: 'Server ID'
};

export const CHANNEL_VARIABLE: HandlerFieldVariable = {
	key: 'channel',
	label: 'Channel name'
};

export const CHANNEL_ID_VARIABLE: HandlerFieldVariable = {
	key: 'channelId',
	label: 'Channel ID'
};

export const ROLE_VARIABLE: HandlerFieldVariable = {
	key: 'role',
	label: 'Role name'
};

export const ROLE_ID_VARIABLE: HandlerFieldVariable = {
	key: 'roleId',
	label: 'Role ID'
};

export const MESSAGE_TEXT_VARIABLES: HandlerFieldVariable[] = [
	USERNAME_VARIABLE,
	USER_VARIABLE,
	USER_ID_VARIABLE,
	MESSAGE_VARIABLE,
	GUILD_VARIABLE,
	GUILD_ID_VARIABLE,
	CHANNEL_VARIABLE,
	CHANNEL_ID_VARIABLE
];

export const ROLE_TEXT_VARIABLES: HandlerFieldVariable[] = [
	USERNAME_VARIABLE,
	USER_VARIABLE,
	USER_ID_VARIABLE,
	GUILD_VARIABLE,
	GUILD_ID_VARIABLE,
	ROLE_VARIABLE,
	ROLE_ID_VARIABLE
];

export const VOICE_TEXT_VARIABLES: HandlerFieldVariable[] = [
	USERNAME_VARIABLE,
	USER_VARIABLE,
	USER_ID_VARIABLE,
	GUILD_VARIABLE,
	GUILD_ID_VARIABLE,
	CHANNEL_VARIABLE,
	CHANNEL_ID_VARIABLE,
	{ key: 'previousChannel', label: 'Previous channel name' },
	{ key: 'previousChannelId', label: 'Previous channel ID' }
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

	set('guild', record.guild);
	set('guildId', record.guildId);
	set('channel', record.channel);
	set('channelId', record.channelId);
	set('previousChannel', record.previousChannel);
	set('previousChannelId', record.previousChannelId);
	set('username', record.username ?? record.user);
	set('user', record.user);
	set('userId', record.userId);
	set('message', record.message);
	set('messageId', record.messageId);
	set('role', record.role);
	set('roleId', record.roleId);

	return variables;
}
