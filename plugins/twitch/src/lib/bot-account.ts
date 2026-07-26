import type { PluginAppApi, PluginStore } from '@stream-kit/plugin';

import type { ApiClient } from '@twurple/api';



import { ApiClient as TwurpleApiClient } from '@twurple/api';

import { StaticAuthProvider } from '@twurple/auth';



import { TWITCH_CLIENT_ID } from '../config';

import { chunkTwitchChatMessages } from './chat-message';
import { describeOAuthError, parseImplicitOAuthCallback } from './oauth-callback';



const BOT_ACCESS_TOKEN_KEY = 'bot_access_token';



const BOT_SCOPES = ['user:read:email', 'user:write:chat', 'user:bot'];



type BotAccountStateListener = () => void;



export type TwitchBotAccountApi = {

	readonly isConnected: boolean;

	readonly isAuthenticating: boolean;

	readonly userId: string | undefined;

	readonly userName: string | undefined;

	startOAuth(): Promise<void>;

	disconnect(): Promise<void>;

	subscribe(listener: BotAccountStateListener): () => void;

};



export type TwitchBotAccountController = TwitchBotAccountApi & {

	boot(): Promise<void>;

	sendChatMessage(broadcasterId: string, message: string): Promise<void>;

};



export function createTwitchBotAccountApi(

	app: PluginAppApi,

	store: PluginStore,

	getMainUserId: () => string | undefined

): TwitchBotAccountController {

	const listeners = new Set<BotAccountStateListener>();

	let isConnected = false;

	let isAuthenticating = false;

	let accessToken: string | undefined;

	let userId: string | undefined;

	let userName: string | undefined;

	let client: ApiClient | undefined;



	function notify(): void {

		for (const listener of listeners) {

			listener();

		}

	}



	async function stopClient(): Promise<void> {

		client = undefined;

		userId = undefined;

		userName = undefined;

	}



	async function connect(nextAccessToken: string): Promise<void> {

		await stopClient();

		accessToken = nextAccessToken;



		const authProvider = new StaticAuthProvider(TWITCH_CLIENT_ID, nextAccessToken, BOT_SCOPES);

		client = new TwurpleApiClient({ authProvider });



		try {

			const info = await client.getTokenInfo();

			const nextUserId = info.userId ?? undefined;

			const mainUserId = getMainUserId();



			if (nextUserId && mainUserId && nextUserId === mainUserId) {

				app.toast.create({

					title: 'Same account as streamer',

					description:

						'Connect a separate Twitch account for the bot. This account matches your main Twitch connection.',

					variant: 'warning'

				});

				await store.delete(BOT_ACCESS_TOKEN_KEY);

				await stopClient();

				accessToken = undefined;

				isConnected = false;

				notify();

				return;

			}



			userId = nextUserId;

			userName = info.userName ?? undefined;

			isConnected = true;

		} catch (error) {

			console.error(error);

			await stopClient();

			accessToken = undefined;

			isConnected = false;

		}



		notify();

	}



	const api: TwitchBotAccountController = {

		get isConnected() {

			return isConnected;

		},

		get isAuthenticating() {

			return isAuthenticating;

		},

		get userId() {

			return userId;

		},

		get userName() {

			return userName;

		},

		async startOAuth() {

			if (!TWITCH_CLIENT_ID) {

				app.toast.create({

					title: 'Twitch not configured',

					description: 'Set TWITCH_CLIENT_ID in plugins/twitch/src/config.ts.',

					variant: 'warning'

				});

				return;

			}



			isAuthenticating = true;

			notify();



			const port = await app.oauth.start({ ports: [9003] });

			const url = new URL('https://id.twitch.tv/oauth2/authorize');

			const state = Math.random().toString(36).substring(2, 15);



			url.searchParams.set('response_type', 'token');

			url.searchParams.set('redirect_uri', `http://localhost:${port}`);

			url.searchParams.set('scope', BOT_SCOPES.join(' '));

			url.searchParams.set('client_id', TWITCH_CLIENT_ID);

			url.searchParams.set('state', state);



			await app.opener.openUrl(url.toString());

			void app.oauth.onUrl((value: string) => {

				const callback = parseImplicitOAuthCallback(value);



				if (callback.error) {

					isAuthenticating = false;

					app.toast.create({

						title: 'Twitch bot authorization failed',

						description: describeOAuthError(callback.error, callback.errorDescription, port),

						variant: 'error'

					});

					notify();

					return;

				}



				if (!callback.accessToken) {

					return;

				}



				void store.set(BOT_ACCESS_TOKEN_KEY, callback.accessToken);

				isAuthenticating = false;

				notify();

				void connect(callback.accessToken);

			});

			void app.oauth.onInvalidUrl(() => {

				isAuthenticating = false;

				notify();

			});

		},

		async disconnect() {

			await store.delete(BOT_ACCESS_TOKEN_KEY);

			await stopClient();

			isConnected = false;

			isAuthenticating = false;

			accessToken = undefined;

			notify();

		},

		subscribe(listener) {

			listeners.add(listener);



			return () => {

				listeners.delete(listener);

			};

		},

		async sendChatMessage(broadcasterId, message) {
			const chunks = chunkTwitchChatMessages(message);
			const targetBroadcasterId = broadcasterId.trim() || getMainUserId();

			if (chunks.length === 0 || !isConnected || !client || !userId) {
				return;
			}

			if (!targetBroadcasterId) {
				app.toast.create({
					title: 'Twitch channel unavailable',
					description: 'Connect your main Twitch account before sending bot messages.',
					variant: 'warning'
				});
				return;
			}

			try {
				for (const chunk of chunks) {
					const result = await client.asUser(userId, (ctx) =>
						ctx.chat.sendChatMessage(targetBroadcasterId, chunk)
					);

					if (!result.isSent) {
						app.toast.create({
							title: 'Message not sent',
							description:
								result.dropReasonMessage ??
								'Twitch rejected the bot message. Mod the bot account in your channel, then try again.',
							variant: 'warning'
						});
						return;
					}
				}
			} catch (error) {
				console.error(error);
				app.toast.create({
					title: 'Failed to send bot message',
					description:
						error instanceof Error
							? error.message
							: 'Could not send the message via the bot account.',
					variant: 'error'
				});
			}
		},

		async boot() {

			const storedAccessToken = await store.get<string>(BOT_ACCESS_TOKEN_KEY);



			if (storedAccessToken) {

				await connect(storedAccessToken);

			}

		}

	};



	return api;

}

