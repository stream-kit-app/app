import type { ElevenLabsAccount } from './types';
import type { PluginAppApi } from '@stream-kit/plugin';

import { errorMessage } from '../settings-helpers';
import { fetchElevenLabsAccount } from './api';
import { elevenlabs, ELEVENLABS_STORE_KEYS } from './service';

const PLUGIN_KEY = 'tts';

/** Reactive ElevenLabs account/subscription state for the dashboard widget. */
export class ElevenLabsAccountState {
	account = $state<ElevenLabsAccount>();
	loading = $state(false);
	error = $state<string>();
	lastFetched = $state<number>();
	/** Mirrors `elevenlabs.apiKey` presence; updated on refresh. */
	hasApiKey = $state(false);

	private requestId = 0;

	async refresh(): Promise<void> {
		const apiKey = elevenlabs.apiKey;
		const requestId = ++this.requestId;

		this.hasApiKey = Boolean(apiKey);

		if (!apiKey) {
			this.account = undefined;
			this.error = undefined;
			this.loading = false;
			return;
		}

		this.loading = true;

		try {
			const account = await fetchElevenLabsAccount(apiKey);

			if (requestId !== this.requestId) {
				return;
			}

			this.account = account;
			this.error = undefined;
			this.lastFetched = Date.now();
		} catch (error) {
			if (requestId !== this.requestId) {
				return;
			}

			this.account = undefined;
			this.error = errorMessage(error);
		} finally {
			if (requestId === this.requestId) {
				this.loading = false;
			}
		}
	}

	/** Validate the key against ElevenLabs first, then save it as the plugin setting. */
	async updateApiKey(app: PluginAppApi, apiKey: string): Promise<void> {
		const trimmed = apiKey.trim();

		if (!trimmed) {
			throw new Error(app.i18n.translate('Enter an API key.'));
		}

		const account = await fetchElevenLabsAccount(trimmed);

		await app.plugins.setSettingValue(PLUGIN_KEY, ELEVENLABS_STORE_KEYS.apiKey, trimmed);

		this.requestId++;
		this.hasApiKey = true;
		this.account = account;
		this.error = undefined;
		this.loading = false;
		this.lastFetched = Date.now();
	}
}

export const elevenlabsAccount = new ElevenLabsAccountState();
