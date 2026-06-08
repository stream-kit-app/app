import type { YouTubeApiClient } from './api-client';
import type { YouTubeChannelInfo, YouTubeLiveStreamInfo } from './types';
import type { PluginAppApi, PluginStore } from '@stream-kit/app/api';

import { YOUTUBE_CLIENT_ID, YOUTUBE_CLIENT_SECRET } from '../config';
import {
	YouTubeApiClient as ApiClient,
	exchangeAuthorizationCode,
	refreshAccessToken
} from './api-client';
import { startBroadcastMonitor } from './broadcast-setup';
import { startChatMonitor } from './chat-setup';
import { generateCodeChallenge, generateCodeVerifier } from './pkce';

type YouTubeStateListener = () => void;

const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const TOKEN_EXPIRES_AT_KEY = 'token_expires_at';

const SCOPES = [
	'https://www.googleapis.com/auth/youtube.force-ssl',
	'https://www.googleapis.com/auth/userinfo.profile'
];

export type YouTubePluginApi = {
	readonly isConnected: boolean;
	readonly isAuthenticating: boolean;
	readonly accessToken: string | undefined;
	readonly channelId: string | undefined;
	readonly channelTitle: string | undefined;
	readonly liveChatId: string | undefined;
	readonly liveStream: YouTubeLiveStreamInfo | undefined;
	readonly client: YouTubeApiClient | undefined;
	startOAuth(): Promise<void>;
	disconnect(): Promise<void>;
	subscribe(listener: YouTubeStateListener): () => void;
};

export type YouTubePluginController = YouTubePluginApi & {
	boot(): Promise<void>;
};

export function createYouTubePluginApi(
	app: PluginAppApi,
	store: PluginStore
): YouTubePluginController {
	const listeners = new Set<YouTubeStateListener>();
	let isConnected = false;
	let isAuthenticating = false;
	let accessToken: string | undefined;
	let refreshToken: string | undefined;
	let tokenExpiresAt = 0;
	let channel: YouTubeChannelInfo | undefined;
	let liveStream: YouTubeLiveStreamInfo | undefined;
	let client: YouTubeApiClient | undefined;
	let stopChatMonitor: (() => void) | undefined;
	let stopBroadcastMonitor: (() => void) | undefined;
	let refreshTimer: ReturnType<typeof setTimeout> | undefined;
	let pendingCodeVerifier: string | undefined;
	let oauthUrlUnlisten: Awaited<ReturnType<PluginAppApi['oauth']['onUrl']>> | undefined;
	let oauthInvalidUrlUnlisten:
		| Awaited<ReturnType<PluginAppApi['oauth']['onInvalidUrl']>>
		| undefined;

	function notify(): void {
		for (const listener of listeners) {
			listener();
		}
	}

	function createClient(): YouTubeApiClient {
		return new ApiClient(
			() => accessToken,
			() => {
				void refreshStoredToken().then((refreshed) => {
					if (!refreshed) {
						void disconnect();
					}
				});
			}
		);
	}

	async function persistTokens(
		nextAccessToken: string,
		nextRefreshToken?: string
	): Promise<void> {
		accessToken = nextAccessToken;
		await store.set(ACCESS_TOKEN_KEY, nextAccessToken);

		if (nextRefreshToken) {
			refreshToken = nextRefreshToken;
			await store.set(REFRESH_TOKEN_KEY, nextRefreshToken);
		}
	}

	function scheduleTokenRefresh(expiresIn: number): void {
		if (refreshTimer) {
			clearTimeout(refreshTimer);
		}

		const refreshInMs = Math.max((expiresIn - 60) * 1000, 30_000);
		tokenExpiresAt = Date.now() + expiresIn * 1000;
		void store.set(TOKEN_EXPIRES_AT_KEY, tokenExpiresAt);

		refreshTimer = setTimeout(() => {
			void refreshStoredToken().then((refreshed) => {
				if (!refreshed) {
					void disconnect();
				}
			});
		}, refreshInMs);
	}

	async function refreshStoredToken(): Promise<boolean> {
		const storedRefreshToken =
			refreshToken ?? (await store.get<string>(REFRESH_TOKEN_KEY)) ?? undefined;

		if (!storedRefreshToken) {
			return false;
		}

		const tokens = await refreshAccessToken(storedRefreshToken);

		if (!tokens) {
			return false;
		}

		await persistTokens(tokens.access_token, tokens.refresh_token);
		scheduleTokenRefresh(tokens.expires_in);
		notify();
		return true;
	}

	function stopMonitors(): void {
		stopChatMonitor?.();
		stopBroadcastMonitor?.();
		stopChatMonitor = undefined;
		stopBroadcastMonitor = undefined;
	}

	function clearRefreshTimer(): void {
		if (refreshTimer) {
			clearTimeout(refreshTimer);
			refreshTimer = undefined;
		}
	}

	function clearOAuthListeners(): void {
		oauthUrlUnlisten?.();
		oauthInvalidUrlUnlisten?.();
		oauthUrlUnlisten = undefined;
		oauthInvalidUrlUnlisten = undefined;
	}

	async function syncLiveStream(nextLiveStream: YouTubeLiveStreamInfo | undefined): Promise<void> {
		const previousLiveChatId = liveStream?.liveChatId;
		liveStream = nextLiveStream;
		notify();

		if (nextLiveStream?.liveChatId) {
			if (!client || !channel) {
				return;
			}

			const isNewLiveChat = nextLiveStream.liveChatId !== previousLiveChatId;

			if (!stopChatMonitor || isNewLiveChat) {
				stopChatMonitor?.();
				stopChatMonitor = startChatMonitor(app, client, channel, nextLiveStream);

				if (isNewLiveChat) {
					app.actions.reactivateAll();
				}
			}
			return;
		}

		if (!nextLiveStream) {
			stopChatMonitor?.();
			stopChatMonitor = undefined;
		}
	}

	async function startMonitors(): Promise<void> {
		if (!client || !channel) {
			return;
		}

		stopMonitors();

		stopBroadcastMonitor = startBroadcastMonitor(app, client, channel, (nextLiveStream) => {
			void syncLiveStream(nextLiveStream);
		});

		const activeStream = await client.getActiveLiveStream();
		await syncLiveStream(activeStream);
	}

	async function connect(nextAccessToken: string, nextRefreshToken?: string): Promise<void> {
		stopMonitors();
		clearRefreshTimer();

		accessToken = nextAccessToken;

		if (nextRefreshToken) {
			refreshToken = nextRefreshToken;
		}

		client = createClient();
		isConnected = true;

		channel = await client.getChannel();

		if (!channel) {
			console.error('YouTube: failed to load channel info');
		}

		await startMonitors();
		app.actions.reactivateAll();
		notify();
	}

	async function disconnect(): Promise<void> {
		stopMonitors();
		clearRefreshTimer();
		clearOAuthListeners();

		await store.delete(ACCESS_TOKEN_KEY);
		await store.delete(REFRESH_TOKEN_KEY);
		await store.delete(TOKEN_EXPIRES_AT_KEY);

		isConnected = false;
		isAuthenticating = false;
		accessToken = undefined;
		refreshToken = undefined;
		tokenExpiresAt = 0;
		channel = undefined;
		liveStream = undefined;
		client = undefined;
		pendingCodeVerifier = undefined;
		notify();
	}

	const api: YouTubePluginController = {
		get isConnected() {
			return isConnected;
		},
		get isAuthenticating() {
			return isAuthenticating;
		},
		get accessToken() {
			return accessToken;
		},
		get channelId() {
			return channel?.channelId;
		},
		get channelTitle() {
			return channel?.channelTitle;
		},
		get liveChatId() {
			return liveStream?.liveChatId;
		},
		get liveStream() {
			return liveStream;
		},
		get client() {
			return client;
		},
		async startOAuth() {
			if (!YOUTUBE_CLIENT_ID || !YOUTUBE_CLIENT_SECRET) {
				app.toast.create({
					title: 'YouTube not configured',
					description:
						'Set YOUTUBE_CLIENT_ID and YOUTUBE_CLIENT_SECRET in plugins/youtube/src/config.ts.',
					variant: 'warning'
				});
				return;
			}

			clearOAuthListeners();
			isAuthenticating = true;
			notify();

			const port = await app.oauth.start({ ports: [9002] });
			const redirectUri = `http://127.0.0.1:${port}`;
			const codeVerifier = generateCodeVerifier();
			const codeChallenge = await generateCodeChallenge(codeVerifier);
			pendingCodeVerifier = codeVerifier;

			const url = new URL('https://accounts.google.com/o/oauth2/v2/auth');
			url.searchParams.set('client_id', YOUTUBE_CLIENT_ID);
			url.searchParams.set('redirect_uri', redirectUri);
			url.searchParams.set('response_type', 'code');
			url.searchParams.set('access_type', 'offline');
			url.searchParams.set('prompt', 'consent');
			url.searchParams.set('code_challenge', codeChallenge);
			url.searchParams.set('code_challenge_method', 'S256');
			url.searchParams.set('scope', SCOPES.join(' '));

			await app.opener.openUrl(url.toString());

			oauthUrlUnlisten = await app.oauth.onUrl((value: string) => {
				const callbackUrl = new URL(value);
				const code = callbackUrl.searchParams.get('code');
				const verifier = pendingCodeVerifier;

				if (!code || !verifier) {
					return;
				}

				void (async () => {
					const result = await exchangeAuthorizationCode(code, redirectUri, verifier);

					pendingCodeVerifier = undefined;
					isAuthenticating = false;
					clearOAuthListeners();

					if (!result.ok) {
						app.toast.create({
							id: 'youtube-oauth-failed',
							title: 'YouTube sign-in failed',
							description:
								result.description ??
								'Could not exchange the authorization code for tokens.',
							variant: 'error'
						});
						notify();
						return;
					}

					const { tokens } = result;

					await persistTokens(tokens.access_token, tokens.refresh_token);
					scheduleTokenRefresh(tokens.expires_in);
					await connect(tokens.access_token, tokens.refresh_token);
				})();
			});

			oauthInvalidUrlUnlisten = await app.oauth.onInvalidUrl(() => {
				isAuthenticating = false;
				pendingCodeVerifier = undefined;
				clearOAuthListeners();
				notify();
			});
		},
		disconnect,
		subscribe(listener) {
			listeners.add(listener);

			return () => {
				listeners.delete(listener);
			};
		},
		async boot() {
			const storedAccessToken = await store.get<string>(ACCESS_TOKEN_KEY);
			const storedRefreshToken = await store.get<string>(REFRESH_TOKEN_KEY);
			tokenExpiresAt = (await store.get<number>(TOKEN_EXPIRES_AT_KEY)) ?? 0;

			if (!storedAccessToken) {
				return;
			}

			refreshToken = storedRefreshToken ?? undefined;

			if (tokenExpiresAt > 0 && Date.now() >= tokenExpiresAt - 60_000) {
				const refreshed = await refreshStoredToken();

				if (!refreshed) {
					await disconnect();
					return;
				}
			}

			if (accessToken || storedAccessToken) {
				await connect(accessToken ?? storedAccessToken, storedRefreshToken ?? undefined);

				if (tokenExpiresAt > Date.now()) {
					scheduleTokenRefresh(Math.floor((tokenExpiresAt - Date.now()) / 1000));
				}
			}
		}
	};

	return api;
}
