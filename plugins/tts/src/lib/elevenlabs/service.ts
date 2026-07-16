import type { ElevenLabsVoice } from './types';
import type { PluginAppApi, PluginStore } from '@stream-kit/plugin';

import { TtsPlayer } from '../player';
import { TTS_SESSION_IDS } from '../session-ids';
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

	ensureStore(store: PluginStore): void {
		this.store ??= store;
	}

	async boot(app: PluginAppApi, store: PluginStore): Promise<void> {
		this.store = store;
		this.player.setPlayback((blob, volume) => app.audio.play(blob, volume, { sessionId: TTS_SESSION_IDS.elevenlabs }), {
			sessionId: TTS_SESSION_IDS.elevenlabs,
			stopPlayback: (sessionId) => app.audio.stop(sessionId)
		});
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

	async speak(
		text: string,
		voiceId: string,
		options: { volume?: number; modelId?: string } = {}
	): Promise<void> {
		if (!this.apiKey) {
			await this.syncFromStore();
		}

		if (!this.apiKey) {
			throw new Error('ElevenLabs is not configured');
		}

		const modelId = options.modelId?.trim() || this.modelId;
		const generation = this.player.getSpeakGeneration();
		const blob = await fetchElevenLabsSpeech(this.apiKey, voiceId, text, modelId);

		if (generation !== this.player.getSpeakGeneration()) {
			return;
		}

		await this.player.enqueue(blob, options.volume ?? this.volume);
	}

	skip(): void {
		this.player.skip();
	}

	private invalidateVoiceCache(): void {
		this.voicesCache = undefined;
		this.voicesCacheExpiry = 0;
	}
}

export const elevenlabs = new ElevenLabsService();
