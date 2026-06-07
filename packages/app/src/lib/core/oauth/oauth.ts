import type { UnlistenFn } from '@tauri-apps/api/event';

import { onInvalidUrl, onUrl, start } from '@fabianlars/tauri-plugin-oauth';

export type OAuthStartOptions = Parameters<typeof start>[0];

export class OAuth {
	start(options: OAuthStartOptions): Promise<number> {
		return start(options);
	}

	onUrl(callback: (url: string) => void): Promise<UnlistenFn> {
		return onUrl(callback);
	}

	onInvalidUrl(callback: (url: string) => void): Promise<UnlistenFn> {
		return onInvalidUrl(callback);
	}
}
