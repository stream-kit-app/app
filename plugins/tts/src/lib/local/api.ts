import { invoke } from '@tauri-apps/api/core';

import type { LocalTtsRuntimeInfo, LocalTtsVoiceInfo } from './types';

export async function listLocalTtsVoices(): Promise<LocalTtsVoiceInfo[]> {
	return invoke<LocalTtsVoiceInfo[]>('list_local_tts_voices');
}

export async function getLocalTtsRuntimeInfo(): Promise<LocalTtsRuntimeInfo> {
	return invoke<LocalTtsRuntimeInfo>('get_local_tts_runtime_info');
}

export async function downloadLocalTtsRuntime(): Promise<void> {
	return invoke('download_local_tts_runtime');
}

export async function downloadLocalTtsVoice(voiceId: string): Promise<void> {
	return invoke('download_local_tts_voice', { voiceId });
}

export async function deleteLocalTtsVoice(voiceId: string): Promise<void> {
	return invoke('delete_local_tts_voice', { voiceId });
}

export async function synthesizeLocalSpeech(voiceId: string, text: string): Promise<Uint8Array> {
	return invoke<Uint8Array>('synthesize_local_speech', { voiceId, text });
}
