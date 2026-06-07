import type { StreamElementsVoice } from './types';
import type { App } from '@stream-kit/app/api';
import type { LazyStore } from '@tauri-apps/plugin-store';

import { SETTINGS_KEY } from '../..';
import { fetchStreamElementsSpeech, fetchStreamElementsVoices } from './api';
import { TtsPlayer } from '../player';

const VOICE_CACHE_TTL_MS = 5 * 60 * 1000;

export class StreamElementsService {
	public isConfigured = false;
	public apiKey: string | undefined;
	public defaultVoice: string | undefined;
	public volume = 1;

	private store?: LazyStore;
	private player = new TtsPlayer();
	private voicesCache: StreamElementsVoice[] | undefined;
	private voicesCacheExpiry = 0;

	async boot(app: App): Promise<void> {
		this.store = app.settings.getStore(SETTINGS_KEY);
		await this.syncFromStore();

		this.store.onKeyChange<string>('apiKey', (value) => {
			this.apiKey = value;
			this.isConfigured = Boolean(value?.trim());
			this.invalidateVoiceCache();
		});
	}

	async syncFromStore(): Promise<void> {
		if (!this.store) {
			return;
		}

		this.apiKey = await this.store.get<string>('apiKey');
		this.defaultVoice = await this.store.get<string>('defaultVoice');
		this.volume = ((await this.store.get<number>('volume')) ?? 100) / 100;
		this.isConfigured = Boolean(this.apiKey?.trim());
		this.invalidateVoiceCache();
	}

	async setApiKey(apiKey: string): Promise<void> {
		if (!this.store) {
			return;
		}

		const trimmed = apiKey.trim();

		if (trimmed) {
			await this.store.set('apiKey', trimmed);
		} else {
			await this.store.delete('apiKey');
		}

		this.apiKey = trimmed || undefined;
		this.isConfigured = Boolean(trimmed);
		this.invalidateVoiceCache();
	}

	async setDefaultVoice(voiceId: string | undefined): Promise<void> {
		if (!this.store) {
			return;
		}

		if (voiceId?.trim()) {
			await this.store.set('defaultVoice', voiceId.trim());
			this.defaultVoice = voiceId.trim();
		} else {
			await this.store.delete('defaultVoice');
			this.defaultVoice = undefined;
		}
	}

	async setVolume(volume: number): Promise<void> {
		if (!this.store) {
			return;
		}

		const clamped = Math.min(1, Math.max(0, volume));
		await this.store.set('volume', Math.round(clamped * 100));
		this.volume = clamped;
	}

	async testConnection(apiKey: string): Promise<number> {
		const voices = await fetchStreamElementsVoices(apiKey.trim());
		this.invalidateVoiceCache();

		return voices.length;
	}

	async fetchVoices(force = false): Promise<StreamElementsVoice[]> {
		if (!this.apiKey) {
			return [];
		}

		const now = Date.now();

		if (!force && this.voicesCache && now < this.voicesCacheExpiry) {
			return this.voicesCache;
		}

		const voices = await fetchStreamElementsVoices(this.apiKey);
		this.voicesCache = voices;
		this.voicesCacheExpiry = now + VOICE_CACHE_TTL_MS;

		return voices;
	}

	async speak(text: string, voiceId: string, volume?: number): Promise<void> {
		if (!this.apiKey) {
			throw new Error('StreamElements is not configured');
		}

		const blob = await fetchStreamElementsSpeech(this.apiKey, voiceId, text);
		this.player.enqueue(blob, volume ?? this.volume);
	}

	private invalidateVoiceCache(): void {
		this.voicesCache = undefined;
		this.voicesCacheExpiry = 0;
	}
}

export const streamelements = new StreamElementsService();
