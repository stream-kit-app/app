type QueueItem = {
	blob: Blob;
	volume: number;
};

export class TtsPlayer {
	private queue: QueueItem[] = [];
	private playing = false;

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

		const url = URL.createObjectURL(item.blob);
		const audio = new Audio(url);
		audio.volume = item.volume;

		await new Promise<void>((resolve) => {
			const cleanup = () => {
				URL.revokeObjectURL(url);
				resolve();
			};

			audio.addEventListener('ended', cleanup, { once: true });
			audio.addEventListener('error', cleanup, { once: true });
			void audio.play().catch(cleanup);
		});

		await this.playNext();
	}
}
