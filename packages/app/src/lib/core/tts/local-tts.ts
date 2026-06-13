import { invoke } from '@tauri-apps/api/core';

export type LocalTtsVoiceInfo = {
	id: string;
	name: string;
	language: string;
	quality: string;
	installed: boolean;
};

export type LocalTtsRuntimeInfo = {
	installed: boolean;
};

/**
 * App-owned bridge to the local (Piper) TTS Tauri commands.
 *
 * Keeps all Tauri `invoke` usage in the app layer so plugins (e.g. the TTS
 * plugin) stay free of platform-specific logic.
 */
export class LocalTts {
	listVoices(): Promise<LocalTtsVoiceInfo[]> {
		return invoke<LocalTtsVoiceInfo[]>('list_local_tts_voices');
	}

	getRuntimeInfo(): Promise<LocalTtsRuntimeInfo> {
		return invoke<LocalTtsRuntimeInfo>('get_local_tts_runtime_info');
	}

	downloadRuntime(): Promise<void> {
		return invoke('download_local_tts_runtime');
	}

	downloadVoice(voiceId: string): Promise<void> {
		return invoke('download_local_tts_voice', { voiceId });
	}

	deleteVoice(voiceId: string): Promise<void> {
		return invoke('delete_local_tts_voice', { voiceId });
	}

	synthesize(voiceId: string, text: string): Promise<Uint8Array> {
		return invoke<Uint8Array>('synthesize_local_speech', { voiceId, text });
	}
}
