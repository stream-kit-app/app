import { invoke } from '@tauri-apps/api/core';

export class Audio {
	async play(blob: Blob, volume = 1): Promise<void> {
		const data = Array.from(new Uint8Array(await blob.arrayBuffer()));
		await invoke('play_audio', { data, volume: Math.min(1, Math.max(0, volume)) });
	}
}
