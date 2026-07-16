import { invoke } from '@tauri-apps/api/core';

export type AudioPlayOptions = {
	sessionId?: string;
};

export class Audio {
	async play(blob: Blob, volume = 1, options?: AudioPlayOptions): Promise<void> {
		const data = new Uint8Array(await blob.arrayBuffer());

		await invoke('play_audio', {
			data,
			volume: Math.min(2, Math.max(0, volume)),
			sessionId: options?.sessionId
		});
	}

	async playFile(path: string, volume = 1, options?: AudioPlayOptions): Promise<void> {
		await invoke('play_audio_file', {
			path,
			volume: Math.min(2, Math.max(0, volume)),
			sessionId: options?.sessionId
		});
	}

	async stop(sessionId: string): Promise<void> {
		await invoke('stop_audio', { sessionId });
	}
}
