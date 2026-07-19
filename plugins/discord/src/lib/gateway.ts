import type {
	DiscordChannel,
	DiscordGuild,
	DiscordGuildMember,
	DiscordMessage,
	DiscordRole,
	DiscordUser,
	DiscordVoiceState,
	GatewayPayload
} from './types';
import type {
	MessageReceivedContext,
	RoleChangedContext,
	VoiceStateChangedContext
} from '../contexts';

import { DISCORD_EVENTS, emitDiscordEvent } from './event-hub';
import { createEmptyGuildCache, type CachedGuild, type DiscordRestClient } from './rest';
import { ChannelType } from './types';

const GATEWAY_VERSION = 10;
const ENCODING = 'json';

/** Guilds | GuildMembers | GuildVoiceStates | GuildMessages | MessageContent */
export const DISCORD_INTENTS =
	(1 << 0) | (1 << 1) | (1 << 7) | (1 << 9) | (1 << 15);

const Opcode = {
	Dispatch: 0,
	Heartbeat: 1,
	Identify: 2,
	Resume: 6,
	Reconnect: 7,
	InvalidSession: 9,
	Hello: 10,
	HeartbeatAck: 11
} as const;

type GatewayCallbacks = {
	onReady: (user: DiscordUser) => void;
	onResumed: () => void;
	onDisconnected: (error?: string) => void;
	onGuildsUpdated: () => void;
};

export type DiscordGateway = {
	connect: (gatewayUrl: string) => void;
	disconnect: () => void;
	readonly guilds: Map<string, CachedGuild>;
	getGuildName: (guildId: string) => string;
	getChannelName: (guildId: string | undefined, channelId: string) => string;
	getRoleName: (guildId: string, roleId: string) => string;
};

function displayName(user: DiscordUser): string {
	return user.global_name?.trim() || user.username;
}

function voiceKey(guildId: string, userId: string): string {
	return `${guildId}:${userId}`;
}

export function createDiscordGateway(
	getToken: () => string | undefined,
	_rest: DiscordRestClient,
	callbacks: GatewayCallbacks
): DiscordGateway {
	const guilds = new Map<string, CachedGuild>();
	const voiceStates = new Map<string, string | null>();
	let socket: WebSocket | undefined;
	let heartbeatTimer: ReturnType<typeof setInterval> | undefined;
	let heartbeatIntervalMs = 0;
	let lastSequence: number | null = null;
	let sessionId: string | undefined;
	let resumeGatewayUrl: string | undefined;
	let botUserId: string | undefined;
	let intentionalClose = false;
	let reconnectTimer: ReturnType<typeof setTimeout> | undefined;
	let identifyResume = false;

	function clearHeartbeat(): void {
		if (heartbeatTimer) {
			clearInterval(heartbeatTimer);
			heartbeatTimer = undefined;
		}
	}

	function clearReconnect(): void {
		if (reconnectTimer) {
			clearTimeout(reconnectTimer);
			reconnectTimer = undefined;
		}
	}

	function send(payload: GatewayPayload): void {
		if (!socket || socket.readyState !== WebSocket.OPEN) {
			return;
		}

		socket.send(JSON.stringify(payload));
	}

	function startHeartbeat(interval: number): void {
		clearHeartbeat();
		heartbeatIntervalMs = interval;
		heartbeatTimer = setInterval(() => {
			send({ op: Opcode.Heartbeat, d: lastSequence });
		}, interval);
	}

	function upsertGuild(raw: DiscordGuild): CachedGuild {
		let guild = guilds.get(raw.id);

		if (!guild) {
			guild = createEmptyGuildCache(raw.id, raw.name);
			guilds.set(raw.id, guild);
		} else {
			guild.name = raw.name;
		}

		if (raw.roles) {
			guild.roles.clear();
			for (const role of raw.roles) {
				guild.roles.set(role.id, role);
			}
		}

		if (raw.channels) {
			for (const channel of raw.channels) {
				guild.channels.set(channel.id, { ...channel, guild_id: raw.id });
			}
		}

		return guild;
	}

	function upsertChannel(channel: DiscordChannel): void {
		const guildId = channel.guild_id;

		if (!guildId) {
			return;
		}

		let guild = guilds.get(guildId);

		if (!guild) {
			guild = createEmptyGuildCache(guildId, guildId);
			guilds.set(guildId, guild);
		}

		guild.channels.set(channel.id, channel);
	}

	function upsertRoles(guildId: string, roles: DiscordRole[]): void {
		const guild = guilds.get(guildId);

		if (!guild) {
			return;
		}

		for (const role of roles) {
			guild.roles.set(role.id, role);
		}
	}

	function handleMessageCreate(raw: DiscordMessage): void {
		if (!raw.guild_id || raw.author.bot) {
			return;
		}

		if (botUserId && raw.author.id === botUserId) {
			return;
		}

		const context: MessageReceivedContext = {
			guildId: raw.guild_id,
			guild: getGuildName(raw.guild_id),
			channelId: raw.channel_id,
			channel: getChannelName(raw.guild_id, raw.channel_id),
			user: displayName(raw.author),
			userId: raw.author.id,
			username: raw.author.username,
			message: raw.content,
			messageId: raw.id
		};

		emitDiscordEvent(DISCORD_EVENTS.MESSAGE_RECEIVED, context);
	}

	function handleMemberUpdate(
		guildId: string,
		member: DiscordGuildMember,
		previousRoles?: string[]
	): void {
		const user = member.user;

		if (!user || previousRoles === undefined) {
			return;
		}

		const nextRoles = member.roles ?? [];
		const previous = new Set(previousRoles);
		const next = new Set(nextRoles);

		for (const roleId of next) {
			if (previous.has(roleId)) {
				continue;
			}

			const context: RoleChangedContext = {
				guildId,
				guild: getGuildName(guildId),
				user: displayName(user),
				userId: user.id,
				username: user.username,
				roleId,
				role: getRoleName(guildId, roleId)
			};

			emitDiscordEvent(DISCORD_EVENTS.ROLE_ADDED, context);
		}

		for (const roleId of previous) {
			if (next.has(roleId)) {
				continue;
			}

			const context: RoleChangedContext = {
				guildId,
				guild: getGuildName(guildId),
				user: displayName(user),
				userId: user.id,
				username: user.username,
				roleId,
				role: getRoleName(guildId, roleId)
			};

			emitDiscordEvent(DISCORD_EVENTS.ROLE_REMOVED, context);
		}
	}

	function handleVoiceStateUpdate(state: DiscordVoiceState): void {
		const guildId = state.guild_id;

		if (!guildId) {
			return;
		}

		const key = voiceKey(guildId, state.user_id);
		const previousChannelId = voiceStates.has(key) ? voiceStates.get(key) ?? null : null;
		const nextChannelId = state.channel_id;
		voiceStates.set(key, nextChannelId);

		const user = state.member?.user;
		const username = user?.username ?? state.user_id;
		const display = user ? displayName(user) : username;

		const base: Omit<
			VoiceStateChangedContext,
			'channelId' | 'channel' | 'previousChannelId' | 'previousChannel'
		> = {
			guildId,
			guild: getGuildName(guildId),
			user: display,
			userId: state.user_id,
			username
		};

		if (!previousChannelId && nextChannelId) {
			emitDiscordEvent(DISCORD_EVENTS.VOICE_JOIN, {
				...base,
				channelId: nextChannelId,
				channel: getChannelName(guildId, nextChannelId),
				previousChannelId: '',
				previousChannel: ''
			} satisfies VoiceStateChangedContext);
			return;
		}

		if (previousChannelId && !nextChannelId) {
			emitDiscordEvent(DISCORD_EVENTS.VOICE_LEAVE, {
				...base,
				channelId: '',
				channel: '',
				previousChannelId,
				previousChannel: getChannelName(guildId, previousChannelId)
			} satisfies VoiceStateChangedContext);
			return;
		}

		if (
			previousChannelId &&
			nextChannelId &&
			previousChannelId !== nextChannelId
		) {
			emitDiscordEvent(DISCORD_EVENTS.VOICE_MOVE, {
				...base,
				channelId: nextChannelId,
				channel: getChannelName(guildId, nextChannelId),
				previousChannelId,
				previousChannel: getChannelName(guildId, previousChannelId)
			} satisfies VoiceStateChangedContext);
		}
	}

	const memberRoleCache = new Map<string, string[]>();

	function handleDispatch(event: string, data: unknown): void {
		switch (event) {
			case 'READY': {
				const ready = data as {
					user: DiscordUser;
					session_id: string;
					resume_gateway_url?: string;
					guilds?: Array<{ id: string; unavailable?: boolean }>;
				};

				botUserId = ready.user.id;
				sessionId = ready.session_id;
				resumeGatewayUrl = ready.resume_gateway_url;
				callbacks.onReady(ready.user);

				if (ready.guilds) {
					for (const stub of ready.guilds) {
						if (!guilds.has(stub.id)) {
							guilds.set(stub.id, createEmptyGuildCache(stub.id, stub.id));
						}
					}
				}

				callbacks.onGuildsUpdated();
				break;
			}
			case 'RESUMED':
				callbacks.onResumed();
				break;
			case 'GUILD_CREATE': {
				const guild = data as DiscordGuild & {
					voice_states?: DiscordVoiceState[];
					members?: DiscordGuildMember[];
				};

				upsertGuild(guild);

				if (guild.voice_states) {
					for (const state of guild.voice_states) {
						const gid = state.guild_id ?? guild.id;
						voiceStates.set(voiceKey(gid, state.user_id), state.channel_id);
					}
				}

				if (guild.members) {
					for (const member of guild.members) {
						if (member.user) {
							memberRoleCache.set(
								voiceKey(guild.id, member.user.id),
								[...member.roles]
							);
						}
					}
				}

				callbacks.onGuildsUpdated();
				break;
			}
			case 'GUILD_UPDATE': {
				const guild = data as DiscordGuild;
				upsertGuild(guild);
				callbacks.onGuildsUpdated();
				break;
			}
			case 'GUILD_DELETE': {
				const deleted = data as { id: string; unavailable?: boolean };

				if (!deleted.unavailable) {
					guilds.delete(deleted.id);
					callbacks.onGuildsUpdated();
				}

				break;
			}
			case 'CHANNEL_CREATE':
			case 'CHANNEL_UPDATE': {
				upsertChannel(data as DiscordChannel);
				callbacks.onGuildsUpdated();
				break;
			}
			case 'CHANNEL_DELETE': {
				const channel = data as DiscordChannel;

				if (channel.guild_id) {
					guilds.get(channel.guild_id)?.channels.delete(channel.id);
					callbacks.onGuildsUpdated();
				}

				break;
			}
			case 'GUILD_ROLE_CREATE':
			case 'GUILD_ROLE_UPDATE': {
				const payload = data as { guild_id: string; role: DiscordRole };
				upsertRoles(payload.guild_id, [payload.role]);
				callbacks.onGuildsUpdated();
				break;
			}
			case 'GUILD_ROLE_DELETE': {
				const payload = data as { guild_id: string; role_id: string };
				guilds.get(payload.guild_id)?.roles.delete(payload.role_id);
				callbacks.onGuildsUpdated();
				break;
			}
			case 'MESSAGE_CREATE':
				handleMessageCreate(data as DiscordMessage);
				break;
			case 'GUILD_MEMBER_UPDATE': {
				const payload = data as DiscordGuildMember & { guild_id: string };
				const userId = payload.user?.id;

				if (!userId) {
					break;
				}

				const key = voiceKey(payload.guild_id, userId);
				const previousRoles = memberRoleCache.get(key);
				memberRoleCache.set(key, [...(payload.roles ?? [])]);
				handleMemberUpdate(payload.guild_id, payload, previousRoles);
				break;
			}
			case 'VOICE_STATE_UPDATE':
				handleVoiceStateUpdate(data as DiscordVoiceState);
				break;
			default:
				break;
		}
	}

	function identify(): void {
		const token = getToken();

		if (!token) {
			callbacks.onDisconnected('Bot token is not set.');
			return;
		}

		send({
			op: Opcode.Identify,
			d: {
				token,
				intents: DISCORD_INTENTS,
				properties: {
					os: 'stream-kit',
					browser: 'stream-kit',
					device: 'stream-kit'
				}
			}
		});
	}

	function resume(): void {
		const token = getToken();

		if (!token || !sessionId) {
			identify();
			return;
		}

		send({
			op: Opcode.Resume,
			d: {
				token,
				session_id: sessionId,
				seq: lastSequence
			}
		});
	}

	function scheduleReconnect(url?: string): void {
		clearReconnect();
		reconnectTimer = setTimeout(() => {
			connect(url ?? resumeGatewayUrl ?? lastGatewayUrl);
		}, 2_500);
	}

	let lastGatewayUrl = '';

	function connect(gatewayUrl: string): void {
		intentionalClose = false;
		clearReconnect();
		lastGatewayUrl = gatewayUrl;

		if (socket) {
			try {
				socket.close();
			} catch {
				// ignore
			}
			socket = undefined;
		}

		const url = new URL(gatewayUrl);
		url.searchParams.set('v', String(GATEWAY_VERSION));
		url.searchParams.set('encoding', ENCODING);

		socket = new WebSocket(url.toString());

		socket.addEventListener('open', () => {
			// wait for HELLO
		});

		socket.addEventListener('message', (event) => {
			let payload: GatewayPayload;

			try {
				payload = JSON.parse(String(event.data)) as GatewayPayload;
			} catch {
				return;
			}

			if (typeof payload.s === 'number') {
				lastSequence = payload.s;
			}

			switch (payload.op) {
				case Opcode.Hello: {
					const hello = payload.d as { heartbeat_interval: number };
					startHeartbeat(hello.heartbeat_interval);

					if (identifyResume && sessionId) {
						resume();
					} else {
						identify();
					}

					identifyResume = false;
					break;
				}
				case Opcode.HeartbeatAck:
					break;
				case Opcode.Reconnect:
					identifyResume = true;
					socket?.close();
					break;
				case Opcode.InvalidSession: {
					const canResume = Boolean(payload.d);
					sessionId = canResume ? sessionId : undefined;
					identifyResume = canResume;
					setTimeout(() => {
						if (canResume) {
							resume();
						} else {
							identify();
						}
					}, 1_500);
					break;
				}
				case Opcode.Dispatch:
					if (payload.t) {
						handleDispatch(payload.t, payload.d);
					}
					break;
				default:
					break;
			}
		});

		socket.addEventListener('close', () => {
			clearHeartbeat();
			socket = undefined;

			if (intentionalClose) {
				callbacks.onDisconnected();
				return;
			}

			identifyResume = Boolean(sessionId);
			scheduleReconnect(resumeGatewayUrl ?? lastGatewayUrl);
			callbacks.onDisconnected('Discord Gateway disconnected. Reconnecting…');
		});

		socket.addEventListener('error', () => {
			// close handler will reconnect
		});
	}

	function disconnect(): void {
		intentionalClose = true;
		clearHeartbeat();
		clearReconnect();
		identifyResume = false;
		sessionId = undefined;
		resumeGatewayUrl = undefined;
		lastSequence = null;
		guilds.clear();
		voiceStates.clear();
		memberRoleCache.clear();
		botUserId = undefined;

		if (socket) {
			try {
				socket.close(1000, 'disconnect');
			} catch {
				// ignore
			}
			socket = undefined;
		}
	}

	function getGuildName(guildId: string): string {
		return guilds.get(guildId)?.name ?? guildId;
	}

	function getChannelName(guildId: string | undefined, channelId: string): string {
		if (!guildId) {
			return channelId;
		}

		return guilds.get(guildId)?.channels.get(channelId)?.name ?? channelId;
	}

	function getRoleName(guildId: string, roleId: string): string {
		return guilds.get(guildId)?.roles.get(roleId)?.name ?? roleId;
	}

	return {
		connect,
		disconnect,
		guilds,
		getGuildName,
		getChannelName,
		getRoleName
	};
}

export function isTextLikeChannel(channel: DiscordChannel): boolean {
	return (
		channel.type === ChannelType.GuildText ||
		channel.type === ChannelType.GuildAnnouncement ||
		channel.type === ChannelType.GuildForum
	);
}
