import type { PluginAppApi } from '@stream-kit/plugin';
import type { SelectItem } from '@stream-kit/plugin';

import { DISCORD_CLIENT_ID } from '../config';
import { createDiscordGateway, isTextLikeChannel, type DiscordGateway } from './gateway';
import { DiscordRestClient, type CachedGuild } from './rest';
import type { DiscordUser } from './types';

type DiscordStateListener = () => void;
type GetValue = (key: string) => string | boolean | number | undefined;

/** View Channel | Send Messages | Manage Roles | Read Message History */
const BOT_INVITE_PERMISSIONS = String((1 << 10) | (1 << 11) | (1 << 28) | (1 << 16));

export type DiscordPluginApi = {
	readonly isConnected: boolean;
	readonly isConnecting: boolean;
	readonly isInviting: boolean;
	readonly connectionError: string | undefined;
	readonly botUser: DiscordUser | undefined;
	readonly guildCount: number;
	connect(): Promise<void>;
	disconnect(): Promise<void>;
	startInviteOAuth(): Promise<void>;
	subscribe(listener: DiscordStateListener): () => void;
	sendMessage(channelId: string, content: string): Promise<boolean>;
	addRole(guildId: string, userId: string, roleId: string): Promise<boolean>;
	removeRole(guildId: string, userId: string, roleId: string): Promise<boolean>;
	getGuildItems(): SelectItem[];
	getChannelItems(guildId?: string): SelectItem[];
	getRoleItems(guildId?: string): SelectItem[];
};

export type DiscordPluginController = DiscordPluginApi & {
	boot(): Promise<void>;
	setGetValue(getValue: GetValue): void;
};

export function isDiscordConnectionConfigured(getValue: GetValue): boolean {
	return Boolean(String(getValue('bot-token') ?? '').trim());
}

function readBotToken(getValue: GetValue): string | undefined {
	const token = String(getValue('bot-token') ?? '').trim();
	return token || undefined;
}

export function createDiscordPluginApi(app: PluginAppApi): DiscordPluginController {
	const listeners = new Set<DiscordStateListener>();
	let getValue: GetValue = () => undefined;
	let isConnected = false;
	let isConnecting = false;
	let isInviting = false;
	let connectionError: string | undefined;
	let botUser: DiscordUser | undefined;
	let rest = new DiscordRestClient(() => readBotToken(getValue));
	let gateway: DiscordGateway | undefined;
	let oauthUrlUnlisten: Awaited<ReturnType<PluginAppApi['oauth']['onUrl']>> | undefined;
	let oauthInvalidUrlUnlisten: Awaited<
		ReturnType<PluginAppApi['oauth']['onInvalidUrl']>
	> | undefined;

	function notify(): void {
		for (const listener of listeners) {
			listener();
		}
	}

	function clearOAuthListeners(): void {
		oauthUrlUnlisten?.();
		oauthInvalidUrlUnlisten?.();
		oauthUrlUnlisten = undefined;
		oauthInvalidUrlUnlisten = undefined;
	}

	function listGuilds(): CachedGuild[] {
		return gateway ? [...gateway.guilds.values()] : [];
	}

	async function connectGateway(): Promise<void> {
		const token = readBotToken(getValue);

		if (!token) {
			connectionError = 'Bot token is required.';
			isConnecting = false;
			isConnected = false;
			notify();
			throw new Error(connectionError);
		}

		isConnecting = true;
		connectionError = undefined;
		notify();

		rest = new DiscordRestClient(() => readBotToken(getValue));
		const gatewayInfo = await rest.getGatewayBot();

		if (!gatewayInfo.ok) {
			isConnecting = false;
			isConnected = false;
			connectionError = gatewayInfo.message;
			notify();
			throw new Error(gatewayInfo.message);
		}

		gateway?.disconnect();

		await new Promise<void>((resolve, reject) => {
			let settled = false;

			const settleOk = () => {
				if (settled) {
					return;
				}

				settled = true;
				resolve();
			};

			const settleErr = (message: string) => {
				if (settled) {
					return;
				}

				settled = true;
				reject(new Error(message));
			};

			const readyTimeout = setTimeout(() => {
				settleErr('Timed out waiting for Discord Gateway READY.');
			}, 20_000);

			gateway = createDiscordGateway(
				() => readBotToken(getValue),
				rest,
				{
					onReady: (user) => {
						clearTimeout(readyTimeout);
						botUser = user;
						isConnected = true;
						isConnecting = false;
						connectionError = undefined;
						notify();
						settleOk();
					},
					onResumed: () => {
						clearTimeout(readyTimeout);
						isConnected = true;
						isConnecting = false;
						connectionError = undefined;
						notify();
						settleOk();
					},
					onDisconnected: (error) => {
						if (error?.includes('Reconnecting')) {
							connectionError = error;
							notify();
							return;
						}

						clearTimeout(readyTimeout);
						isConnected = false;
						isConnecting = false;
						if (error) {
							connectionError = error;
						}
						notify();

						if (!settled) {
							settleErr(error ?? 'Discord Gateway disconnected.');
						}
					},
					onGuildsUpdated: () => {
						notify();
					}
				}
			);

			gateway.connect(gatewayInfo.data.url);
		});
	}

	async function disconnect(): Promise<void> {
		clearOAuthListeners();
		isInviting = false;
		gateway?.disconnect();
		gateway = undefined;
		botUser = undefined;
		isConnected = false;
		isConnecting = false;
		connectionError = undefined;
		notify();
	}

	const api: DiscordPluginController = {
		get isConnected() {
			return isConnected;
		},
		get isConnecting() {
			return isConnecting;
		},
		get isInviting() {
			return isInviting;
		},
		get connectionError() {
			return connectionError;
		},
		get botUser() {
			return botUser;
		},
		get guildCount() {
			return gateway?.guilds.size ?? 0;
		},
		setGetValue(nextGetValue) {
			getValue = nextGetValue;
		},
		async connect() {
			await connectGateway();
		},
		disconnect,
		async startInviteOAuth() {
			if (!DISCORD_CLIENT_ID) {
				app.toast.create({
					title: 'Discord invite not configured',
					description:
						'Set DISCORD_CLIENT_ID in plugins/discord/src/config.ts to use the invite helper.',
					variant: 'warning'
				});
				return;
			}

			clearOAuthListeners();
			isInviting = true;
			notify();

			try {
				const port = await app.oauth.start({ ports: [9004] });
				const redirectUri = `http://127.0.0.1:${port}`;
				const url = new URL('https://discord.com/api/oauth2/authorize');
				url.searchParams.set('client_id', DISCORD_CLIENT_ID);
				url.searchParams.set('permissions', BOT_INVITE_PERMISSIONS);
				url.searchParams.set('scope', 'bot');
				url.searchParams.set('response_type', 'code');
				url.searchParams.set('redirect_uri', redirectUri);

				await app.opener.openUrl(url.toString());

				oauthUrlUnlisten = await app.oauth.onUrl((value: string) => {
					const callbackUrl = new URL(value);
					const guildId = callbackUrl.searchParams.get('guild_id');
					const error = callbackUrl.searchParams.get('error');

					isInviting = false;
					clearOAuthListeners();

					if (error) {
						app.toast.create({
							title: 'Discord invite cancelled',
							description: error,
							variant: 'warning'
						});
						notify();
						return;
					}

					app.toast.create({
						title: 'Bot invited',
						description: guildId
							? `The bot was added to guild ${guildId}. Connect with your bot token if you have not already.`
							: 'The bot was invited to a server. Connect with your bot token if you have not already.',
						variant: 'success'
					});
					notify();
				});

				oauthInvalidUrlUnlisten = await app.oauth.onInvalidUrl(() => {
					isInviting = false;
					clearOAuthListeners();
					notify();
				});
			} catch (error) {
				isInviting = false;
				clearOAuthListeners();
				notify();
				app.toast.create({
					title: 'Discord invite failed',
					description:
						error instanceof Error ? error.message : 'Could not start the invite flow.',
					variant: 'error'
				});
			}
		},
		subscribe(listener) {
			listeners.add(listener);

			return () => {
				listeners.delete(listener);
			};
		},
		async sendMessage(channelId: string, content: string): Promise<boolean> {
			const trimmed = content.trim();

			if (!channelId.trim() || !trimmed) {
				return false;
			}

			const result = await rest.sendMessage(channelId.trim(), trimmed);

			if (!result.ok) {
				app.toast.create({
					title: 'Failed to send Discord message',
					description: result.message,
					variant: 'error'
				});
				return false;
			}

			return true;
		},
		async addRole(guildId: string, userId: string, roleId: string): Promise<boolean> {
			if (!guildId.trim() || !userId.trim() || !roleId.trim()) {
				return false;
			}

			const result = await rest.addRole(guildId.trim(), userId.trim(), roleId.trim());

			if (!result.ok) {
				app.toast.create({
					title: 'Failed to add Discord role',
					description: result.message,
					variant: 'error'
				});
				return false;
			}

			return true;
		},
		async removeRole(guildId: string, userId: string, roleId: string): Promise<boolean> {
			if (!guildId.trim() || !userId.trim() || !roleId.trim()) {
				return false;
			}

			const result = await rest.removeRole(guildId.trim(), userId.trim(), roleId.trim());

			if (!result.ok) {
				app.toast.create({
					title: 'Failed to remove Discord role',
					description: result.message,
					variant: 'error'
				});
				return false;
			}

			return true;
		},
		getGuildItems() {
			return listGuilds()
				.map((guild) => ({
					value: guild.id,
					label: guild.name
				}))
				.sort((a, b) => a.label.localeCompare(b.label));
		},
		getChannelItems(guildId?: string) {
			const items: SelectItem[] = [];

			for (const guild of listGuilds()) {
				if (guildId && guild.id !== guildId) {
					continue;
				}

				for (const channel of guild.channels.values()) {
					if (!isTextLikeChannel(channel)) {
						continue;
					}

					items.push({
						value: channel.id,
						label: guildId
							? `#${channel.name ?? channel.id}`
							: `${guild.name} / #${channel.name ?? channel.id}`
					});
				}
			}

			return items.sort((a, b) => a.label.localeCompare(b.label));
		},
		getRoleItems(guildId?: string) {
			const items: SelectItem[] = [];

			for (const guild of listGuilds()) {
				if (guildId && guild.id !== guildId) {
					continue;
				}

				for (const role of guild.roles.values()) {
					if (role.name === '@everyone') {
						continue;
					}

					items.push({
						value: role.id,
						label: guildId ? role.name : `${guild.name} / ${role.name}`
					});
				}
			}

			return items.sort((a, b) => a.label.localeCompare(b.label));
		},
		async boot() {
			if (!isDiscordConnectionConfigured(getValue)) {
				return;
			}

			try {
				await connectGateway();
			} catch {
				// connectionError already set
			}
		}
	};

	return api;
}
