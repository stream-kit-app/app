import type {
	YouTubeChannelInfo,
	YouTubeChannelListResponse,
	YouTubeLiveBroadcastListResponse,
	YouTubeLiveChatMessage,
	YouTubeLiveChatMessageListResponse,
	YouTubeLiveStreamInfo,
	YouTubeTokenResponse
} from './types';
import { YOUTUBE_CLIENT_ID, YOUTUBE_CLIENT_SECRET } from '../config';

const API_BASE = 'https://www.googleapis.com/youtube/v3';

/** A request that failed (network, quota, server error), as opposed to "no data". */
export class YouTubeRequestError extends Error {
	constructor(
		message: string,
		readonly status?: number
	) {
		super(message);
		this.name = 'YouTubeRequestError';
	}
}

export class YouTubeApiClient {
	constructor(
		private readonly getAccessToken: () => string | undefined,
		private readonly onUnauthorized: () => void
	) {}

	/**
	 * `strict` requests throw `YouTubeRequestError` on failure so pollers can tell an
	 * outage apart from an empty result; other callers get `undefined`.
	 */
	private async request<T>(
		path: string,
		init?: RequestInit,
		options: { strict?: boolean } = {}
	): Promise<T | undefined> {
		const fail = (message: string, status?: number): undefined => {
			if (options.strict) {
				throw new YouTubeRequestError(message, status);
			}
			return undefined;
		};

		const accessToken = this.getAccessToken();

		if (!accessToken) {
			return fail('Not signed in to YouTube');
		}

		let response: Response;
		try {
			response = await fetch(`${API_BASE}${path}`, {
				...init,
				headers: {
					Authorization: `Bearer ${accessToken}`,
					'Content-Type': 'application/json',
					...init?.headers
				}
			});
		} catch (error) {
			console.warn('YouTube API request failed', error);
			return fail(error instanceof Error ? error.message : String(error));
		}

		if (response.status === 401) {
			this.onUnauthorized();
			return fail('YouTube session expired', 401);
		}

		if (!response.ok) {
			const body = await response.text().catch(() => '');
			console.error(`YouTube API error (${response.status}): ${body}`);
			return fail(`YouTube API error (${response.status})`, response.status);
		}

		if (response.status === 204) {
			return undefined;
		}

		try {
			return (await response.json()) as T;
		} catch (error) {
			return fail(error instanceof Error ? error.message : String(error));
		}
	}

	async getChannel(): Promise<YouTubeChannelInfo | undefined> {
		const data = await this.request<YouTubeChannelListResponse>(
			'/channels?part=snippet&mine=true'
		);
		const channel = data?.items?.[0];

		if (!channel) {
			return undefined;
		}

		return {
			channelId: channel.id,
			channelTitle: channel.snippet.title,
			customUrl: channel.snippet.customUrl
		};
	}

	/** The live broadcast, `undefined` when none is live; throws when YouTube can't be reached. */
	async getActiveLiveStream(): Promise<YouTubeLiveStreamInfo | undefined> {
		const data = await this.request<YouTubeLiveBroadcastListResponse>(
			'/liveBroadcasts?part=snippet,status&mine=true&broadcastType=all&maxResults=50',
			undefined,
			{ strict: true }
		);
		const broadcast = data?.items?.find(
			(item) => item.status.lifeCycleStatus === 'live' && item.snippet.liveChatId
		);
		const liveChatId = broadcast?.snippet.liveChatId;

		if (!broadcast || !liveChatId) {
			return undefined;
		}

		return {
			broadcastId: broadcast.id,
			liveChatId,
			title: broadcast.snippet.title,
			actualStartTime: broadcast.snippet.actualStartTime
		};
	}

	async listLiveChatMessages(
		liveChatId: string,
		pageToken?: string
	): Promise<YouTubeLiveChatMessageListResponse | undefined> {
		const params = new URLSearchParams({
			part: 'snippet,authorDetails',
			liveChatId
		});

		if (pageToken) {
			params.set('pageToken', pageToken);
		}

		return this.request<YouTubeLiveChatMessageListResponse>(`/liveChat/messages?${params}`, undefined, {
			strict: true
		});
	}

	async insertLiveChatMessage(liveChatId: string, messageText: string): Promise<boolean> {
		const result = await this.request<{ id?: string }>('/liveChat/messages?part=snippet', {
			method: 'POST',
			body: JSON.stringify({
				snippet: {
					liveChatId,
					type: 'textMessageEvent',
					textMessageDetails: {
						messageText
					}
				}
			})
		});

		return result != null;
	}

	async deleteLiveChatMessage(messageId: string): Promise<boolean> {
		const accessToken = this.getAccessToken();

		if (!accessToken) {
			return false;
		}

		const response = await fetch(
			`${API_BASE}/liveChat/messages?id=${encodeURIComponent(messageId)}`,
			{
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${accessToken}`
				}
			}
		);

		if (response.status === 401) {
			this.onUnauthorized();
			return false;
		}

		return response.ok;
	}

	async banLiveChatUser(
		liveChatId: string,
		bannedUserChannelId: string,
		banDurationSeconds?: number
	): Promise<boolean> {
		const snippet: Record<string, unknown> = {
			liveChatId,
			bannedUserDetails: {
				channelId: bannedUserChannelId
			}
		};

		if (banDurationSeconds != null && banDurationSeconds > 0) {
			snippet.type = 'temporary';
			snippet.banDurationSeconds = String(banDurationSeconds);
		} else {
			snippet.type = 'permanent';
		}

		const result = await this.request<{ id?: string }>('/liveChat/bans?part=snippet', {
			method: 'POST',
			body: JSON.stringify({ snippet })
		});

		return result != null;
	}
}

export type YouTubeTokenExchangeResult =
	| { ok: true; tokens: YouTubeTokenResponse }
	| { ok: false; error: string; description?: string };

export async function exchangeAuthorizationCode(
	code: string,
	redirectUri: string,
	codeVerifier: string
): Promise<YouTubeTokenExchangeResult> {
	if (!YOUTUBE_CLIENT_ID || !YOUTUBE_CLIENT_SECRET) {
		return {
			ok: false,
			error: 'not_configured',
			description:
				'Set YOUTUBE_CLIENT_ID and YOUTUBE_CLIENT_SECRET in plugins/youtube/src/config.ts.'
		};
	}

	const response = await fetch('https://oauth2.googleapis.com/token', {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body: new URLSearchParams({
			client_id: YOUTUBE_CLIENT_ID,
			client_secret: YOUTUBE_CLIENT_SECRET,
			code,
			redirect_uri: redirectUri,
			grant_type: 'authorization_code',
			code_verifier: codeVerifier
		})
	});

	if (!response.ok) {
		const body = await response.text().catch(() => '');

		try {
			const parsed = JSON.parse(body) as { error?: string; error_description?: string };
			console.error('YouTube token exchange failed:', body);

			return {
				ok: false,
				error: parsed.error ?? 'token_exchange_failed',
				description: parsed.error_description
			};
		} catch {
			console.error('YouTube token exchange failed:', body);

			return {
				ok: false,
				error: 'token_exchange_failed',
				description: body || undefined
			};
		}
	}

	return { ok: true, tokens: (await response.json()) as YouTubeTokenResponse };
}

export type TokenRefreshResult =
	| { ok: true; tokens: YouTubeTokenResponse }
	/** `revoked`: Google rejected the refresh token, the user must reconnect. */
	| { ok: false; revoked: boolean };

export async function refreshAccessToken(refreshToken: string): Promise<TokenRefreshResult> {
	if (!YOUTUBE_CLIENT_ID || !YOUTUBE_CLIENT_SECRET) {
		return { ok: false, revoked: false };
	}

	try {
		const response = await fetch('https://oauth2.googleapis.com/token', {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: new URLSearchParams({
				client_id: YOUTUBE_CLIENT_ID,
				client_secret: YOUTUBE_CLIENT_SECRET,
				grant_type: 'refresh_token',
				refresh_token: refreshToken
			})
		});

		if (!response.ok) {
			const body = await response.text().catch(() => '');
			console.error('YouTube token refresh failed:', body);
			return { ok: false, revoked: body.includes('invalid_grant') };
		}

		return { ok: true, tokens: (await response.json()) as YouTubeTokenResponse };
	} catch (error) {
		console.warn('YouTube token refresh request failed', error);
		return { ok: false, revoked: false };
	}
}

export type { YouTubeLiveChatMessage };
