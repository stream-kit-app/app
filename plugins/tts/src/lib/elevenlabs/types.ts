import type { ElevenLabs } from '@elevenlabs/elevenlabs-js';

export type ElevenLabsVoice = {
	id: string;
	name: string;
	language?: string;
	/** `premade`, `cloned`, `generated`, `professional`, … */
	category?: string;
	description?: string;
	/** Hosted sample clip; usually missing for instant clones. */
	previewUrl?: string;
	labels?: Record<string, string>;
};

/** Voice categories the account owns and may delete. */
export const ELEVENLABS_OWNED_VOICE_CATEGORIES = ['cloned', 'generated', 'professional'] as const;

/** Stream Kit's own tuning for one voice (overrides the global defaults). */
export type ElevenLabsVoiceTuning = Required<
	Pick<
		ElevenLabsVoiceSettings,
		'stability' | 'similarityBoost' | 'style' | 'speed' | 'useSpeakerBoost'
	>
>;

export type ElevenLabsModel = {
	id: string;
	name: string;
};

export type ElevenLabsVoiceSettings = ElevenLabs.VoiceSettings;

/** Account and subscription details for the dashboard widget. */
export type ElevenLabsAccount = {
	userId: string;
	firstName?: string;
	apiKeyPreview?: string;
	tier: string;
	status: string;
	characterCount: number;
	characterLimit: number;
	/** Unix seconds when the character count resets. */
	nextResetUnix?: number;
	voiceSlotsUsed: number;
	voiceLimit: number;
};

/**
 * How a generated clip was kept out of the ElevenLabs history:
 * - `zero`: zero-retention mode (enterprise), nothing was stored
 * - `deleted`: stored, then removed from history right after generation
 * - `kept`: privacy is off, ElevenLabs keeps the history item
 */
export type ElevenLabsRetention = 'zero' | 'deleted' | 'kept';

export const DEFAULT_ELEVENLABS_MODEL_ID = 'eleven_multilingual_v2';

/** Audio tags (`[whispers]`, `[heavy german accent]`) need Eleven v3 or newer. */
export function supportsAudioTags(modelId: string): boolean {
	const version = /^eleven_v(\d+)/.exec(modelId.trim())?.[1];

	return version !== undefined && Number(version) >= 3;
}

/** Prefix `text` with the voice's audio tags when the model understands them. */
export function applyAudioTags(text: string, tags: string | undefined, modelId: string): string {
	const prefix = tags?.trim();

	return prefix && supportsAudioTags(modelId) ? `${prefix} ${text}` : text;
}

export const ELEVENLABS_VOICE_SETTING_RANGES = {
	stability: { min: 0, max: 1, defaultValue: 0.5 },
	similarityBoost: { min: 0, max: 1, defaultValue: 0.75 },
	style: { min: 0, max: 1, defaultValue: 0 },
	speed: { min: 0.7, max: 1.2, defaultValue: 1 }
} as const;

export type ElevenLabsNumericVoiceSetting = keyof typeof ELEVENLABS_VOICE_SETTING_RANGES;
