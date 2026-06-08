import type { UnlistenFn } from '@tauri-apps/api/event';

import { cancel, onInvalidUrl, onUrl, start } from '@fabianlars/tauri-plugin-oauth';

export type OAuthStartOptions = Parameters<typeof start>[0];

export class OAuth {
	async start(options: OAuthStartOptions): Promise<number> {
		for await (const port of options?.ports ?? []) {
			try {
				await cancel(port);
			} catch (_) {}
		}

		return start(options);
	}

	onUrl(callback: (url: string) => void): Promise<UnlistenFn> {
		return onUrl(callback);
	}

	onInvalidUrl(callback: (url: string) => void): Promise<UnlistenFn> {
		return onInvalidUrl(callback);
	}
}
