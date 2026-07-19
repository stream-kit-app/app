export type DiscordBaseContext = {
	guildId: string;
	guild: string;
};

export type MessageReceivedContext = DiscordBaseContext & {
	channelId: string;
	channel: string;
	user: string;
	userId: string;
	username: string;
	message: string;
	messageId: string;
};

export type RoleChangedContext = DiscordBaseContext & {
	user: string;
	userId: string;
	username: string;
	roleId: string;
	role: string;
};

export type VoiceStateChangedContext = DiscordBaseContext & {
	user: string;
	userId: string;
	username: string;
	channelId: string;
	channel: string;
	previousChannelId: string;
	previousChannel: string;
};

export type DiscordContext =
	| MessageReceivedContext
	| RoleChangedContext
	| VoiceStateChangedContext;
