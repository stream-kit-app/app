import type { ElevenLabsVoice } from './types';
import type { PluginAppApi, PluginStore } from '@stream-kit/app/api';

import { TtsPlayer } from '../player';
import { fetchElevenLabsSpeech, fetchElevenLabsVoices } from './api';
import { DEFAULT_ELEVENLABS_MODEL_ID } from './types';

const VOICE_CACHE_TTL_MS = 5 * 60 * 1000;

const STORE_KEYS = {
	apiKey: 'elevenlabsApiKey',
	defaultVoice: 'elevenlabsDefaultVoice',
	volume: 'elevenlabsVolume',
	modelId: 'elevenlabsModelId'
} as const;

export class ElevenLabsService {
	public isConfigured = false;
	public apiKey: string | undefined;
	public defaultVoice: string | undefined;
	public modelId = DEFAULT_ELEVENLABS_MODEL_ID;
	public volume = 1;

	private store?: PluginStore;
	private player = new TtsPlayer();
	private voicesCache: ElevenLabsVoice[] | undefined;
	private voicesCacheExpiry = 0;

	async boot(app: PluginAppApi, store: PluginStore): Promise<void> {
		this.store = store;
		this.player.setPlayback((blob, volume) => app.audio.play(blob, volume));
		await this.syncFromStore();
	}

	async syncFromStore(): Promise<void> {
		if (!this.store) {
			return;
		}

		this.apiKey = await this.store.get<string>(STORE_KEYS.apiKey);
		this.defaultVoice = await this.store.get<string>(STORE_KEYS.defaultVoice);
		const storedModelId = (await this.store.get<string>(STORE_KEYS.modelId))?.trim();
		this.modelId = storedModelId || DEFAULT_ELEVENLABS_MODEL_ID;
		this.volume = ((await this.store.get<number>(STORE_KEYS.volume)) ?? 100) / 100;
		this.isConfigured = Boolean(this.apiKey?.trim());
		this.invalidateVoiceCache();
	}

	async testConnection(apiKey: string): Promise<number> {
		const voices = await fetchElevenLabsVoices(apiKey.trim());
		this.invalidateVoiceCache();

		return voices.length;
	}

	async fetchVoices(force = false): Promise<ElevenLabsVoice[]> {
		if (!this.apiKey) {
			return [];
		}

		const now = Date.now();

		if (!force && this.voicesCache && now < this.voicesCacheExpiry) {
			return this.voicesCache;
		}

		const voices = await fetchElevenLabsVoices(this.apiKey);
		this.voicesCache = voices;
		this.voicesCacheExpiry = now + VOICE_CACHE_TTL_MS;

		return voices;
	}

	async speak(text: string, voiceId: string, volume?: number): Promise<void> {
		if (!this.apiKey) {
			throw new Error('ElevenLabs is not configured');
		}

		const blob = await fetchElevenLabsSpeech(this.apiKey, voiceId, text, this.modelId);
		this.player.enqueue(blob, volume ?? this.volume);
	}

	private invalidateVoiceCache(): void {
		this.voicesCache = undefined;
		this.voicesCacheExpiry = 0;
	}
}

export const elevenlabs = new ElevenLabsService();
