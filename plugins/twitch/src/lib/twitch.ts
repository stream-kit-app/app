import type { PluginAppApi, PluginStore } from '@stream-kit/plugin';
import type { ApiClient } from '@twurple/api';
import type { TokenInfo } from '@twurple/auth';
import type { ChatClient } from '@twurple/chat';
import type { EventSubWsListener } from '@twurple/eventsub-ws';

import { ApiClient as TwurpleApiClient } from '@twurple/api';
import { StaticAuthProvider } from '@twurple/auth';
import { ChatClient as TwurpleChatClient } from '@twurple/chat';
import { EventSubWsListener as TwurpleEventSubWsListener } from '@twurple/eventsub-ws';

import { TWITCH_CLIENT_ID } from '../config';
import {
	createTwitchBotAccountApi,
	type TwitchBotAccountApi,
	type TwitchBotAccountController
} from './bot-account';
import { chunkTwitchChatMessages } from './chat-message';
import { rebindExistingMessageHandlers, resetChatListener, subscribeMessages } from './irc-setup';
import { resetEventSubSubscriptions } from './eventsub-setup';
import { clearBadgeCache, refreshBadgeCache } from './badge-cache';
import { describeOAuthError, parseImplicitOAuthCallback } from './oauth-callback';

export type ValidatedTokenInfo = TokenInfo & { userId: string };

type TwitchStateListener = () => void;

const ACCESS_TOKEN_KEY = 'access_token';

export type { TwitchBotAccountApi } from './bot-account';

export type TwitchPluginApi = {
	readonly isConnected: boolean;
	readonly isAuthenticating: boolean;
	readonly accessToken: string | undefined;
	readonly token: ValidatedTokenInfo | undefined;
	readonly userId: string | undefined;
	readonly client: ApiClient | undefined;
	readonly chat: ChatClient | undefined;
	readonly eventSub: EventSubWsListener | undefined;
	readonly botAccount: TwitchBotAccountApi;
	startOAuth(): Promise<void>;
	disconnect(): Promise<void>;
	sendChatMessageAsBot(broadcasterId: string, message: string): Promise<void>;
	subscribe(listener: TwitchStateListener): () => void;
	subscribeChatMessages: (
		filter: (context: import('../contexts').ChatMessageContext) => boolean,
		handler: (context: import('../contexts').ChatMessageContext) => void
	) => () => void;
};

export type TwitchPluginController = TwitchPluginApi & {
	boot(): Promise<void>;
};

export function createTwitchPluginApi(
	app: PluginAppApi,
	store: PluginStore
): TwitchPluginController {
	const listeners = new Set<TwitchStateListener>();
	let botAccountController: TwitchBotAccountController | undefined;
	let isConnected = false;
	let isAuthenticating = false;
	let accessToken: string | undefined;
	let token: ValidatedTokenInfo | undefined;
	let userId: string | undefined;
	let client: ApiClient | undefined;
	let chat: ChatClient | undefined;
	let eventSub: EventSubWsListener | undefined;
	let authProvider: StaticAuthProvider | undefined;

	const scopes = [
		'user:read:email',
		'user:read:broadcast',
		'user:edit:broadcast',
		'user:read:subscriptions',
		'user:write:chat',
		'user:read:chat',
		'user:manage:blocked_users',
		'user:read:blocked_users',
		'user:manage:whispers',
		'user:read:whispers',
		'channel:manage:broadcast',
		'channel:read:subscriptions',
		'channel:read:redemptions',
		'channel:manage:redemptions',
		'channel:read:polls',
		'channel:manage:polls',
		'channel:read:predictions',
		'channel:manage:predictions',
		'channel:read:goals',
		'channel:read:hype_train',
		'channel:read:ads',
		'channel:read:charity',
		'channel:edit:commercial',
		'channel:read:vips',
		'channel:manage:vips',
		'channel:manage:videos',
		'channel:manage:raids',
		'channel:manage:schedule',
		'channel:read:editors',
		'channel:manage:guest_star',
		'channel:read:guest_star',
		'channel:bot',
		'moderation:read',
		'moderator:read:followers',
		'moderator:read:chatters',
		'moderator:read:blocked_terms',
		'moderator:manage:blocked_terms',
		'moderator:manage:banned_users',
		'moderator:manage:chat_messages',
		'moderator:manage:announcements',
		'moderator:manage:automod',
		'moderator:read:automod_settings',
		'moderator:manage:automod_settings',
		'moderator:read:suspicious_users',
		'moderator:read:shield_mode',
		'moderator:manage:shield_mode',
		'moderator:manage:warnings',
		'moderator:read:warnings',
		'moderator:read:shoutouts',
		'moderator:manage:shoutouts',
		'clips:edit',
		'chat:read',
		'chat:edit'
	];

	function notify(): void {
		for (const listener of listeners) {
			listener();
		}
	}

	async function stopClients(): Promise<void> {
		try {
			await chat?.quit();
		} catch (error) {
			console.error(error);
		}

		try {
			await eventSub?.stop();
		} catch (error) {
			console.error(error);
		}

		resetEventSubSubscriptions();

		client = undefined;
		chat = undefined;
		eventSub = undefined;
		authProvider = undefined;
		token = undefined;
		userId = undefined;
		clearBadgeCache();
	}

	function attachEventSubConflictRecovery(listener: EventSubWsListener, api: ApiClient): void {
		listener.onSubscriptionCreateFailure((subscription, error) => {
			const message = error instanceof Error ? error.message : String(error);
			const match = /subscription already exists;\s*id=([0-9a-f-]+)/i.exec(message);

			if (!match?.[1]) {
				return;
			}

			const existingId = match[1];
			void api.eventSub
				.deleteSubscription(existingId)
				.then(() => {
					subscription.start();
				})
				.catch((deleteError) => {
					console.error(
						`[twitch] Failed to clear conflicting EventSub subscription ${existingId}`,
						deleteError
					);
				});
		});
	}

	async function clearStaleEventSubSubscriptions(api: ApiClient): Promise<void> {
		try {
			// WebSocket EventSub never resumes remote subscriptions. Leftovers from a previous
			// session (fast restart, crash, or in-flight DELETE) cause Twitch 409 Conflict and
			// block reward / follow / etc. triggers until cleared.
			await api.eventSub.deleteAllSubscriptions();
		} catch (error) {
			console.error('[twitch] Failed to clear stale EventSub subscriptions', error);
		}
	}

	async function connect(nextAccessToken: string): Promise<void> {
		await stopClients();
		resetChatListener();
		accessToken = nextAccessToken;
		isConnected = true;

		authProvider = new StaticAuthProvider(TWITCH_CLIENT_ID, nextAccessToken, scopes);
		client = new TwurpleApiClient({ authProvider });
		chat = new TwurpleChatClient({
			authProvider,
			requestMembershipEvents: true
		});
		const originalSay = chat.say.bind(chat);
		chat.say = async (channel, message) => {
			for (const chunk of chunkTwitchChatMessages(message)) {
				await originalSay(channel, chunk);
			}
		};
		await chat.connect();

		await clearStaleEventSubSubscriptions(client);

		eventSub = new TwurpleEventSubWsListener({ apiClient: client });
		attachEventSubConflictRecovery(eventSub, client);
		eventSub.start();

		try {
			const info = (await client.getTokenInfo()) as ValidatedTokenInfo;
			token = info;
			userId = info.userId ?? undefined;

			if (info.userName) {
				await chat.join(info.userName).catch(console.error);
			}
		} catch (error) {
			console.error(error);
		}

		void refreshBadgeCache(app).finally(() => {
			rebindExistingMessageHandlers(app);
		});
		app.actions.reactivateAll();
		notify();
	}

	const botAccountApi: TwitchBotAccountApi = {
		get isConnected() {
			return botAccountController?.isConnected ?? false;
		},
		get isAuthenticating() {
			return botAccountController?.isAuthenticating ?? false;
		},
		get userId() {
			return botAccountController?.userId;
		},
		get userName() {
			return botAccountController?.userName;
		},
		startOAuth: async () => {
			await botAccountController?.startOAuth();
		},
		disconnect: async () => {
			await botAccountController?.disconnect();
		},
		subscribe: (listener) => botAccountController?.subscribe(listener) ?? (() => {})
	};

	const api: TwitchPluginController = {
		get isConnected() {
			return isConnected;
		},
		get isAuthenticating() {
			return isAuthenticating;
		},
		get accessToken() {
			return accessToken;
		},
		get token() {
			return token;
		},
		get userId() {
			return userId;
		},
		get client() {
			return client;
		},
		get chat() {
			return chat;
		},
		get eventSub() {
			return eventSub;
		},
		get botAccount() {
			return botAccountApi;
		},
		async sendChatMessageAsBot(broadcasterId, message) {
			if (!botAccountController?.isConnected) {
				app.toast.create({
					title: 'Bot account not connected',
					description: 'Connect a Twitch bot account from Bot → Overview to send as bot.',
					variant: 'warning'
				});
				return;
			}

			await botAccountController.sendChatMessage(broadcasterId, message);
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

			const port = await app.oauth.start({ ports: [9001] });
			const url = new URL('https://id.twitch.tv/oauth2/authorize');
			const state = Math.random().toString(36).substring(2, 15);

			url.searchParams.set('response_type', 'token');
			url.searchParams.set('redirect_uri', `http://localhost:${port}`);
			url.searchParams.set('scope', scopes.join(' '));
			url.searchParams.set('client_id', TWITCH_CLIENT_ID);
			url.searchParams.set('state', state);

			await app.opener.openUrl(url.toString());
			void app.oauth.onUrl((value: string) => {
				const callback = parseImplicitOAuthCallback(value);

				if (callback.error) {
					isAuthenticating = false;
					app.toast.create({
						title: 'Twitch authorization failed',
						description: describeOAuthError(callback.error, callback.errorDescription, port),
						variant: 'error'
					});
					notify();
					return;
				}

				if (!callback.accessToken) {
					return;
				}

				void store.set(ACCESS_TOKEN_KEY, callback.accessToken);
				isAuthenticating = false;
				void connect(callback.accessToken);
				notify();
			});
			void app.oauth.onInvalidUrl(() => {
				isAuthenticating = false;
				notify();
			});
		},
		async disconnect() {
			await store.delete(ACCESS_TOKEN_KEY);
			await stopClients();
			isConnected = false;
			isAuthenticating = false;
			accessToken = undefined;
			app.actions.reactivateAll();
			notify();
		},
		subscribe(listener) {
			listeners.add(listener);

			return () => {
				listeners.delete(listener);
			};
		},
		subscribeChatMessages: (filter, handler) => subscribeMessages(app, filter, handler),
		async boot() {
			botAccountController = createTwitchBotAccountApi(app, store, () => userId);

			const storedAccessToken = await store.get<string>(ACCESS_TOKEN_KEY);

			if (storedAccessToken) {
				await connect(storedAccessToken);
			}

			await botAccountController.boot();
		}
	};

	return api;
}
