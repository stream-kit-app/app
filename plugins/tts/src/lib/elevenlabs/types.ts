export type ElevenLabsVoice = {
	id: string;
	name: string;
	language?: string;
};

export type ElevenLabsModel = {
	id: string;
	name: string;
};

export const DEFAULT_ELEVENLABS_MODEL_ID = 'eleven_multilingual_v2';
