import { invoke } from '@tauri-apps/api/core';

export class Audio {
	async play(blob: Blob, volume = 1): Promise<void> {
		const data = new Uint8Array(await blob.arrayBuffer());

		await invoke('play_audio', {
			data,
			volume: Math.min(2, Math.max(0, volume))
		});
	}

	async playFile(path: string, volume = 1): Promise<void> {
		await invoke('play_audio_file', {
			path,
			volume: Math.min(2, Math.max(0, volume))
		});
	}
}
