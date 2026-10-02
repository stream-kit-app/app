import type { ElevenLabsVoiceTuning } from './types';
import type { PluginAppApi, PluginAppRecordCollectionApi } from '@stream-kit/plugin';

import { SvelteMap } from 'svelte/reactivity';

import { MAX_TTS_VOLUME } from '../player';
import { clampVoiceSetting } from './service';
import { ELEVENLABS_VOICE_SETTING_RANGES } from './types';

const COLLECTION = 'elevenlabs-voice-tuning';

type VoiceTuningRecord = ElevenLabsVoiceTuning & {
	voiceId: string;
	/** Audio tags placed before every message for this voice (v3+ models). */
	tags?: string;
	/** Model for this voice; empty uses the global default model. */
	modelId?: string;
	/** Volume 0–200 for this voice; `null` uses the ElevenLabs volume from the settings. */
	volume?: number | null;
};

/** Extra per-voice options stored next to the tuning. */
export type ElevenLabsVoiceExtras = { tags: string; modelId: string; volume: number | null };

function normalizeVolume(value: unknown): number | null {
	return typeof value === 'number' && Number.isFinite(value)
		? Math.min(MAX_TTS_VOLUME * 100, Math.max(0, Math.round(value)))
		: null;
}

type VoiceTuningEntry = ElevenLabsVoiceExtras & {
	recordId: string;
	tuning: ElevenLabsVoiceTuning;
};

export function defaultVoiceTuning(): ElevenLabsVoiceTuning {
	return {
		stability: ELEVENLABS_VOICE_SETTING_RANGES.stability.defaultValue,
		similarityBoost: ELEVENLABS_VOICE_SETTING_RANGES.similarityBoost.defaultValue,
		style: ELEVENLABS_VOICE_SETTING_RANGES.style.defaultValue,
		speed: ELEVENLABS_VOICE_SETTING_RANGES.speed.defaultValue,
		useSpeakerBoost: true
	};
}

function normalizeTuning(value: Partial<ElevenLabsVoiceTuning>): ElevenLabsVoiceTuning {
	const defaults = defaultVoiceTuning();
	const read = (setting: 'stability' | 'similarityBoost' | 'style' | 'speed') => {
		const raw = value[setting];

		return typeof raw === 'number' && Number.isFinite(raw)
			? clampVoiceSetting(setting, raw)
			: defaults[setting];
	};

	return {
		stability: read('stability'),
		similarityBoost: read('similarityBoost'),
		style: read('style'),
		speed: read('speed'),
		useSpeakerBoost:
			typeof value.useSpeakerBoost === 'boolean'
				? value.useSpeakerBoost
				: defaults.useSpeakerBoost
	};
}

/**
 * Per-voice tuning stored in plugin records (synced with the Stream Kit account).
 * Applied on top of the global ElevenLabs defaults, below per-handler overrides.
 */
export class ElevenLabsVoiceTuningStore {
	/** voiceId → { recordId, tuning } */
	private entries = new SvelteMap<string, VoiceTuningEntry>();
	private records?: PluginAppRecordCollectionApi;
	private unsubscribe?: () => void;

	async boot(app: PluginAppApi): Promise<void> {
		if (this.records) {
			return;
		}

		this.records = app.records.open(COLLECTION);
		this.unsubscribe = this.records.onChange(() => {
			void this.reload();
		});
		await this.reload();
	}

	dispose(): void {
		this.unsubscribe?.();
		this.unsubscribe = undefined;
		this.records = undefined;
	}

	get(voiceId: string): ElevenLabsVoiceTuning | undefined {
		return this.entries.get(voiceId)?.tuning;
	}

	/** Audio tags for the voice, or an empty string. */
	getTags(voiceId: string): string {
		return this.entries.get(voiceId)?.tags ?? '';
	}

	/** Model override for the voice, or an empty string for the default model. */
	getModelId(voiceId: string): string {
		return this.entries.get(voiceId)?.modelId ?? '';
	}

	/** Volume override for the voice (0–100), or `null` for the default volume. */
	getVolume(voiceId: string): number | null {
		return this.entries.get(voiceId)?.volume ?? null;
	}

	has(voiceId: string): boolean {
		return this.entries.has(voiceId);
	}

	async save(
		voiceId: string,
		tuning: ElevenLabsVoiceTuning,
		extras: Partial<ElevenLabsVoiceExtras> = {}
	): Promise<void> {
		const records = this.requireRecords();
		const normalized = normalizeTuning(tuning);
		const tags = extras.tags?.trim() ?? '';
		const modelId = extras.modelId?.trim() ?? '';
		const volume = normalizeVolume(extras.volume);
		const record: VoiceTuningRecord = { voiceId, ...normalized, tags, modelId, volume };
		const existing = this.entries.get(voiceId);

		if (existing) {
			await records.update<VoiceTuningRecord>(existing.recordId, record);
			this.entries.set(voiceId, {
				recordId: existing.recordId,
				tuning: normalized,
				tags,
				modelId,
				volume
			});
			return;
		}

		const created = await records.create<VoiceTuningRecord>(record);
		this.entries.set(voiceId, {
			recordId: created.id,
			tuning: normalized,
			tags,
			modelId,
			volume
		});
	}

	async reset(voiceId: string): Promise<void> {
		const existing = this.entries.get(voiceId);

		if (!existing) {
			return;
		}

		await this.requireRecords().delete(existing.recordId);
		this.entries.delete(voiceId);
	}

	private async reload(): Promise<void> {
		if (!this.records) {
			return;
		}

		const rows = await this.records.list<VoiceTuningRecord>();
		this.entries.clear();

		for (const row of rows) {
			if (typeof row.voiceId === 'string' && row.voiceId) {
				this.entries.set(row.voiceId, {
					recordId: row.id,
					tuning: normalizeTuning(row),
					tags: typeof row.tags === 'string' ? row.tags.trim() : '',
					modelId: typeof row.modelId === 'string' ? row.modelId.trim() : '',
					volume: normalizeVolume(row.volume)
				});
			}
		}
	}

	private requireRecords(): PluginAppRecordCollectionApi {
		if (!this.records) {
			throw new Error('ElevenLabs voice tuning is not ready yet');
		}

		return this.records;
	}
}

export const elevenlabsVoiceTuning = new ElevenLabsVoiceTuningStore();
