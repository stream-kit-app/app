import type {
	DiscordChannel,
	DiscordGuild,
	DiscordRole,
	DiscordUser,
	GatewayBotResponse
} from './types';

const API_BASE = 'https://discord.com/api/v10';
const USER_AGENT = 'StreamKitDiscord (https://stream-kit.app, 0.1.0)';

export class DiscordRestClient {
	constructor(private readonly getToken: () => string | undefined) {}

	private async request<T>(
		method: string,
		path: string,
		body?: unknown
	): Promise<{ ok: true; data: T } | { ok: false; status: number; message: string }> {
		const token = this.getToken();

		if (!token) {
			return { ok: false, status: 0, message: 'Bot token is not set.' };
		}

		try {
			const response = await fetch(`${API_BASE}${path}`, {
				method,
				headers: {
					Authorization: `Bot ${token}`,
					'Content-Type': 'application/json',
					'User-Agent': USER_AGENT
				},
				body: body === undefined ? undefined : JSON.stringify(body)
			});

			if (response.status === 204) {
				return { ok: true, data: undefined as T };
			}

			const text = await response.text();
			let data: unknown = undefined;

			if (text) {
				try {
					data = JSON.parse(text) as unknown;
				} catch {
					data = text;
				}
			}

			if (!response.ok) {
				const message =
					data &&
					typeof data === 'object' &&
					'message' in data &&
					typeof (data as { message: unknown }).message === 'string'
						? (data as { message: string }).message
						: `Discord API error (${response.status})`;

				return { ok: false, status: response.status, message };
			}

			return { ok: true, data: data as T };
		} catch (error) {
			return {
				ok: false,
				status: 0,
				message: error instanceof Error ? error.message : 'Discord API request failed.'
			};
		}
	}

	async getGatewayBot(): Promise<
		{ ok: true; data: GatewayBotResponse } | { ok: false; message: string }
	> {
		const result = await this.request<GatewayBotResponse>('GET', '/gateway/bot');

		if (!result.ok) {
			return { ok: false, message: result.message };
		}

		return { ok: true, data: result.data };
	}

	async getCurrentUser(): Promise<
		{ ok: true; data: DiscordUser } | { ok: false; message: string }
	> {
		const result = await this.request<DiscordUser>('GET', '/users/@me');

		if (!result.ok) {
			return { ok: false, message: result.message };
		}

		return { ok: true, data: result.data };
	}

	async getGuild(guildId: string): Promise<
		{ ok: true; data: DiscordGuild } | { ok: false; message: string }
	> {
		const result = await this.request<DiscordGuild>('GET', `/guilds/${guildId}`);

		if (!result.ok) {
			return { ok: false, message: result.message };
		}

		return { ok: true, data: result.data };
	}

	async getGuildChannels(guildId: string): Promise<
		{ ok: true; data: DiscordChannel[] } | { ok: false; message: string }
	> {
		const result = await this.request<DiscordChannel[]>(
			'GET',
			`/guilds/${guildId}/channels`
		);

		if (!result.ok) {
			return { ok: false, message: result.message };
		}

		return { ok: true, data: result.data };
	}

	async sendMessage(
		channelId: string,
		content: string
	): Promise<{ ok: true } | { ok: false; message: string }> {
		const result = await this.request('POST', `/channels/${channelId}/messages`, {
			content
		});

		if (!result.ok) {
			return { ok: false, message: result.message };
		}

		return { ok: true };
	}

	async addRole(
		guildId: string,
		userId: string,
		roleId: string
	): Promise<{ ok: true } | { ok: false; message: string }> {
		const result = await this.request(
			'PUT',
			`/guilds/${guildId}/members/${userId}/roles/${roleId}`
		);

		if (!result.ok) {
			return { ok: false, message: result.message };
		}

		return { ok: true };
	}

	async removeRole(
		guildId: string,
		userId: string,
		roleId: string
	): Promise<{ ok: true } | { ok: false; message: string }> {
		const result = await this.request(
			'DELETE',
			`/guilds/${guildId}/members/${userId}/roles/${roleId}`
		);

		if (!result.ok) {
			return { ok: false, message: result.message };
		}

		return { ok: true };
	}
}

export type CachedGuild = {
	id: string;
	name: string;
	roles: Map<string, DiscordRole>;
	channels: Map<string, DiscordChannel>;
};

export function createEmptyGuildCache(id: string, name: string): CachedGuild {
	return {
		id,
		name,
		roles: new Map(),
		channels: new Map()
	};
}
