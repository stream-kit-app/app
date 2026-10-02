import type {
	ElevenLabsNumericVoiceSetting,
	ElevenLabsVoice,
	ElevenLabsVoiceSettings
} from './types';
import type { PluginAppApi, PluginStore } from '@stream-kit/plugin';

import { TtsPlayer } from '../player';
import { TTS_SESSION_IDS } from '../session-ids';
import { fetchElevenLabsPreviewClip, fetchElevenLabsSpeech, fetchElevenLabsVoices } from './api';
import {
	applyAudioTags,
	DEFAULT_ELEVENLABS_MODEL_ID,
	ELEVENLABS_VOICE_SETTING_RANGES
} from './types';
import { elevenlabsVoiceTuning } from './voice-tuning.svelte';

const VOICE_CACHE_TTL_MS = 5 * 60 * 1000;

export const ELEVENLABS_STORE_KEYS = {
	apiKey: 'elevenlabsApiKey',
	defaultVoice: 'elevenlabsDefaultVoice',
	volume: 'elevenlabsVolume',
	modelId: 'elevenlabsModelId',
	privacy: 'elevenlabsPrivacy',
	stability: 'elevenlabsStability',
	similarityBoost: 'elevenlabsSimilarity',
	style: 'elevenlabsStyle',
	speed: 'elevenlabsSpeed',
	speakerBoost: 'elevenlabsSpeakerBoost'
} as const;

export function clampVoiceSetting(setting: ElevenLabsNumericVoiceSetting, value: number): number {
	const { min, max } = ELEVENLABS_VOICE_SETTING_RANGES[setting];

	return Math.min(max, Math.max(min, value));
}

function defaultVoiceSettings(): Required<ElevenLabsVoiceSettings> {
	return {
		stability: ELEVENLABS_VOICE_SETTING_RANGES.stability.defaultValue,
		similarityBoost: ELEVENLABS_VOICE_SETTING_RANGES.similarityBoost.defaultValue,
		style: ELEVENLABS_VOICE_SETTING_RANGES.style.defaultValue,
		speed: ELEVENLABS_VOICE_SETTING_RANGES.speed.defaultValue,
		useSpeakerBoost: true
	};
}

export type ElevenLabsSpeakOptions = {
	volume?: number;
	modelId?: string;
	voiceSettings?: Partial<ElevenLabsVoiceSettings>;
};

export class ElevenLabsService {
	public isConfigured = false;
	public apiKey: string | undefined;
	public defaultVoice: string | undefined;
	public modelId = DEFAULT_ELEVENLABS_MODEL_ID;
	public volume = 1;
	public privacy = true;
	public voiceSettings = defaultVoiceSettings();
	/** `false` once ElevenLabs rejected zero retention for the current key (non-enterprise). */
	public zeroRetentionSupported: boolean | undefined;

	private app?: PluginAppApi;
	private store?: PluginStore;
	private player = new TtsPlayer();
	private voicesCache: ElevenLabsVoice[] | undefined;
	private voicesCacheExpiry = 0;
	private historyCleanupWarned = false;

	ensureStore(store: PluginStore): void {
		this.store ??= store;
	}

	async boot(app: PluginAppApi, store: PluginStore): Promise<void> {
		this.app = app;
		this.store = store;
		this.player.setPlayback(
			(blob, volume) =>
				app.audio.play(blob, volume, { sessionId: TTS_SESSION_IDS.elevenlabs }),
			{
				sessionId: TTS_SESSION_IDS.elevenlabs,
				stopPlayback: (sessionId) => app.audio.stop(sessionId)
			}
		);
		await this.syncFromStore();
	}

	async syncFromStore(): Promise<void> {
		if (!this.store) {
			return;
		}

		const previousApiKey = this.apiKey;

		this.apiKey =
			(await this.store.get<string>(ELEVENLABS_STORE_KEYS.apiKey))?.trim() || undefined;
		this.defaultVoice = await this.store.get<string>(ELEVENLABS_STORE_KEYS.defaultVoice);
		const storedModelId = (await this.store.get<string>(ELEVENLABS_STORE_KEYS.modelId))?.trim();
		this.modelId = storedModelId || DEFAULT_ELEVENLABS_MODEL_ID;
		this.volume = ((await this.store.get<number>(ELEVENLABS_STORE_KEYS.volume)) ?? 100) / 100;
		this.privacy = (await this.store.get<boolean>(ELEVENLABS_STORE_KEYS.privacy)) ?? true;
		this.voiceSettings = await this.readVoiceSettings();
		this.isConfigured = Boolean(this.apiKey);

		if (previousApiKey !== this.apiKey) {
			this.zeroRetentionSupported = undefined;
			this.historyCleanupWarned = false;
		}

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
		options: ElevenLabsSpeakOptions = {}
	): Promise<void> {
		if (!this.apiKey) {
			await this.syncFromStore();
		}

		if (!this.apiKey) {
			throw new Error('ElevenLabs is not configured');
		}

		const generation = this.player.getSpeakGeneration();
		const blob = await this.synthesize(text, voiceId, {
			// Action model, then the voice's own model, then the default model.
			modelId: options.modelId?.trim() || elevenlabsVoiceTuning.getModelId(voiceId),
			tags: elevenlabsVoiceTuning.getTags(voiceId),
			// Global defaults < per-voice tuning < per-call (handler) overrides.
			voiceSettings: {
				...this.voiceSettings,
				...elevenlabsVoiceTuning.get(voiceId),
				...options.voiceSettings
			}
		});

		if (generation !== this.player.getSpeakGeneration()) {
			return;
		}

		await this.player.enqueue(blob, options.volume ?? this.resolveVolume(voiceId));
	}

	/**
	 * Play a voice outside the TTS queue (voice library). Uses the hosted preview clip
	 * when there is one and no tuning is given; otherwise synthesizes `text`.
	 */
	async preview(
		voice: { id: string; previewUrl?: string },
		text: string,
		tuning?: {
			voiceSettings: ElevenLabsVoiceSettings;
			tags?: string;
			modelId?: string;
			/** 0–100; `null` uses the default ElevenLabs volume. */
			volume?: number | null;
		}
	): Promise<void> {
		const app = this.requireApp();
		const blob =
			voice.previewUrl && !tuning
				? await fetchElevenLabsPreviewClip(voice.previewUrl)
				: await this.synthesize(text, voice.id, {
						voiceSettings: tuning?.voiceSettings ?? {
							...this.voiceSettings,
							...elevenlabsVoiceTuning.get(voice.id)
						},
						tags: tuning ? tuning.tags : elevenlabsVoiceTuning.getTags(voice.id),
						modelId: tuning
							? tuning.modelId
							: elevenlabsVoiceTuning.getModelId(voice.id)
					});

		await app.audio.stop(TTS_SESSION_IDS.elevenlabsPreview);
		const volume =
			tuning && tuning.volume !== undefined
				? tuning.volume === null
					? this.volume
					: tuning.volume / 100
				: this.resolveVolume(voice.id);

		await app.audio.play(blob, volume, { sessionId: TTS_SESSION_IDS.elevenlabsPreview });
	}

	/** Playback volume (0–1): the voice's own volume, else the ElevenLabs volume. */
	resolveVolume(voiceId: string): number {
		const volume = elevenlabsVoiceTuning.getVolume(voiceId);

		return volume === null ? this.volume : volume / 100;
	}

	async stopPreview(): Promise<void> {
		await this.app?.audio.stop(TTS_SESSION_IDS.elevenlabsPreview);
	}

	private async synthesize(
		text: string,
		voiceId: string,
		options: { modelId?: string; voiceSettings: ElevenLabsVoiceSettings; tags?: string }
	): Promise<Blob> {
		if (!this.apiKey) {
			await this.syncFromStore();
		}

		if (!this.apiKey) {
			throw new Error('ElevenLabs is not configured');
		}

		const modelId = options.modelId?.trim() || this.modelId;
		const result = await fetchElevenLabsSpeech(
			this.apiKey,
			voiceId,
			applyAudioTags(text, options.tags, modelId),
			{
				modelId,
				voiceSettings: options.voiceSettings,
				privacy: this.privacy,
				zeroRetentionSupported: this.zeroRetentionSupported
			}
		);

		if (result.retention === 'zero') {
			this.zeroRetentionSupported = true;
		} else if (result.retention === 'deleted') {
			this.zeroRetentionSupported = false;
		}

		void result.historyCleanup?.then((deleted) => {
			if (!deleted) {
				this.warnHistoryCleanupFailed();
			}
		});

		return result.blob;
	}

	private requireApp(): PluginAppApi {
		if (!this.app) {
			throw new Error('ElevenLabs is not ready yet');
		}

		return this.app;
	}

	invalidateVoices(): void {
		this.invalidateVoiceCache();
	}

	skip(): void {
		this.player.skip();
	}

	private async readVoiceSettings(): Promise<Required<ElevenLabsVoiceSettings>> {
		const defaults = defaultVoiceSettings();
		const readNumber = async (setting: ElevenLabsNumericVoiceSetting): Promise<number> => {
			const value = await this.store?.get<number>(ELEVENLABS_STORE_KEYS[setting]);

			return typeof value === 'number' && Number.isFinite(value)
				? clampVoiceSetting(setting, value)
				: defaults[setting];
		};

		return {
			stability: await readNumber('stability'),
			similarityBoost: await readNumber('similarityBoost'),
			style: await readNumber('style'),
			speed: await readNumber('speed'),
			useSpeakerBoost:
				(await this.store?.get<boolean>(ELEVENLABS_STORE_KEYS.speakerBoost)) ??
				defaults.useSpeakerBoost
		};
	}

	/** Once per key: a stored message could not be removed from the ElevenLabs history. */
	private warnHistoryCleanupFailed(): void {
		if (this.historyCleanupWarned || !this.app) {
			return;
		}

		this.historyCleanupWarned = true;
		this.app.toast.create({
			title: this.app.i18n.translate('ElevenLabs history not cleared'),
			description: this.app.i18n.translate(
				'A TTS message could not be removed from your ElevenLabs history. Check it in the ElevenLabs dashboard.'
			),
			variant: 'warning'
		});
	}

	private invalidateVoiceCache(): void {
		this.voicesCache = undefined;
		this.voicesCacheExpiry = 0;
	}
}

export const elevenlabs = new ElevenLabsService();
