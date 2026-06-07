import type { TokenInfo } from '@twurple/auth';

import { onInvalidUrl, onUrl, start } from '@fabianlars/tauri-plugin-oauth';
import { openUrl } from '@tauri-apps/plugin-opener';
import { ApiClient } from '@twurple/api';
import { StaticAuthProvider } from '@twurple/auth';
import { ChatClient } from '@twurple/chat';
import { EventSubWsListener } from '@twurple/eventsub-ws';
import { PUBLIC_TWITCH_CLIENT_ID } from '$env/static/public';
import { watch } from 'runed';

import { Bootable } from '../bootable.svelte';
import { store } from '../store.svelte';

export type ValidatedTokenInfo = TokenInfo & { userId: string };

export class Twitch extends Bootable {
	public isConnected: boolean = $state(false);
	public isAuthenticating: boolean = $state(false);

	public accessToken: string | undefined = $state.raw(undefined);
	public token: ValidatedTokenInfo | undefined = $state.raw(undefined);
	public userId: string | undefined = $state.raw(undefined);
	public scopes = [
		// User
		'user:read:email',
		'user:read:broadcast',
		'user:edit:broadcast',
		'user:read:subscriptions',
		// 'user:read:follows', <-- Verwijderd door Twitch
		'user:write:chat',
		'user:read:chat',
		'user:manage:blocked_users',
		'user:read:blocked_users',
		'user:manage:whispers',
		'user:read:whispers',

		// Channel
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
		'channel:read:vips',
		'channel:manage:vips',
		'channel:manage:videos',
		'channel:manage:raids',
		'channel:manage:schedule',
		'channel:read:editors',
		'channel:manage:guest_star',
		'channel:read:guest_star',
		'channel:bot',

		// Moderation
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

		// Clips
		'clips:edit',

		// chat
		'chat:read',
		'chat:edit'
	];

	public client: ApiClient | undefined = $state.raw(undefined);
	public chat: ChatClient | undefined = $state.raw(undefined);
	public eventSub: EventSubWsListener | undefined = $state.raw(undefined);
	public authProvider: StaticAuthProvider | undefined = $state.raw(undefined);

	async boot(): Promise<this> {
		this.accessToken = await store.twitch.getAccessToken();
		this.isConnected = this.accessToken !== undefined;

		if (this.isConnected) {
			this.isAuthenticating = false;
		}

		store.twitch.onAccessTokenChange((value) => {
			this.isConnected = value !== undefined;
			this.accessToken = value;
		});

		$effect.root(() => {
			watch(
				() => this.accessToken,
				(accessToken) => {
					if (accessToken) {
						this.authProvider = new StaticAuthProvider(
							PUBLIC_TWITCH_CLIENT_ID,
							accessToken,
							this.scopes
						);
						this.client = new ApiClient({
							authProvider: this.authProvider
						});
						this.chat = new ChatClient({
							authProvider: this.authProvider
						});
						this.chat.connect();

						const eventSub = new EventSubWsListener({ apiClient: this.client });
						void eventSub.start();
						this.eventSub = eventSub;

						this.client
							.getTokenInfo()
							.then((info) => {
								this.token = info as ValidatedTokenInfo;
								this.userId = info.userId ?? undefined;
							})
							.catch(console.error);
					} else {
						void this.chat?.quit();
						void this.eventSub?.stop();
						this.client = undefined;
						this.chat = undefined;
						this.eventSub = undefined;
						this.authProvider = undefined;
						this.token = undefined;
					}
				}
			);

			watch(
				() => this.token?.userName,
				(userName, prev) => {
					if (!userName) {
						return;
					}

					if (prev) {
						this.chat?.part(prev);
					}

					this.chat?.join(userName).catch(console.error);
				}
			);

			return () => {
				this.client = undefined;
			};
		});

		return this;
	}

	async startOAuth() {
		this.isAuthenticating = true;
		const port = await start({ ports: [9001] });
		const url = new URL('https://id.twitch.tv/oauth2/authorize');
		const state = Math.random().toString(36).substring(2, 15);

		url.searchParams.set('response_type', 'token');
		url.searchParams.set('redirect_uri', `http://localhost:${port}`);
		url.searchParams.set('scope', this.scopes.join(' '));
		url.searchParams.set('client_id', PUBLIC_TWITCH_CLIENT_ID);
		url.searchParams.set('state', state);

		openUrl(url.toString());
		onUrl((u) => {
			const url = new URL(u);
			const hash = url.hash.substring(1); // remove the '#'
			const params = new URLSearchParams(hash);

			const { access_token } = Object.fromEntries(params.entries());

			if (!access_token) {
				return;
			}

			store.twitch.setAccessToken(access_token);
			this.isAuthenticating = false;
		});
		onInvalidUrl(() => {
			this.isAuthenticating = false;
		});
	}

	async disconnect() {
		await store.twitch.removeAccessToken();

		this.isConnected = false;
		this.isAuthenticating = false;
		this.accessToken = undefined;
		this.token = undefined;
		this.userId = undefined;
		this.client = undefined;
		this.chat = undefined;
		this.eventSub = undefined;
	}
}
