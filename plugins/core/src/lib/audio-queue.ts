type QueueItem = {
	blob: Blob;
	volume: number;
};

export type AudioPlayback = (blob: Blob, volume: number) => Promise<void>;

export class AudioQueue {
	private queue: QueueItem[] = [];
	private playing = false;
	private playback?: AudioPlayback;

	setPlayback(playback: AudioPlayback): void {
		this.playback = playback;
	}

	enqueue(blob: Blob, volume: number): void {
		this.queue.push({ blob, volume: Math.min(1, Math.max(0, volume)) });

		if (!this.playing) {
			void this.playNext();
		}
	}

	private async playNext(): Promise<void> {
		const item = this.queue.shift();

		if (!item) {
			this.playing = false;
			return;
		}

		this.playing = true;

		if (!this.playback) {
			console.error('Audio playback is not configured.');
		} else {
			await this.playback(item.blob, item.volume).catch((error: unknown) => {
				console.error('Failed to play audio', error);
			});
		}

		await this.playNext();
	}
}
