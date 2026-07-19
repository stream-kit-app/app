export type DiscordUser = {
	id: string;
	username: string;
	global_name?: string | null;
	discriminator?: string;
	bot?: boolean;
};

export type DiscordRole = {
	id: string;
	name: string;
	color?: number;
	position?: number;
};

export type DiscordChannel = {
	id: string;
	name?: string;
	type: number;
	guild_id?: string;
};

export type DiscordGuild = {
	id: string;
	name: string;
	roles?: DiscordRole[];
	channels?: DiscordChannel[];
};

export type DiscordMessage = {
	id: string;
	channel_id: string;
	guild_id?: string;
	author: DiscordUser;
	content: string;
	timestamp?: string;
};

export type DiscordGuildMember = {
	user?: DiscordUser;
	nick?: string | null;
	roles: string[];
};

export type DiscordVoiceState = {
	guild_id?: string;
	channel_id: string | null;
	user_id: string;
	member?: DiscordGuildMember;
	session_id?: string;
	deaf?: boolean;
	mute?: boolean;
	self_deaf?: boolean;
	self_mute?: boolean;
};

export type GatewayBotResponse = {
	url: string;
	shards: number;
	session_start_limit?: {
		total: number;
		remaining: number;
		reset_after: number;
		max_concurrency: number;
	};
};

export type GatewayPayload = {
	op: number;
	d?: unknown;
	s?: number | null;
	t?: string | null;
};

export const ChannelType = {
	GuildText: 0,
	GuildVoice: 2,
	GuildAnnouncement: 5,
	GuildStageVoice: 13,
	GuildForum: 15
} as const;
