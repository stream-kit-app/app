type QueueItem =
	| {
			kind: 'blob';
			blob: Blob;
			volume: number;
			done?: () => void;
	  }
	| {
			kind: 'file';
			path: string;
			volume: number;
			done?: () => void;
	  };

export type AudioPlayback = {
	playBlob: (blob: Blob, volume: number) => Promise<void>;
	playFile: (path: string, volume: number) => Promise<void>;
};

function clampVolume(volume: number): number {
	return Math.min(2, Math.max(0, volume));
}

export class AudioQueue {
	private queue: QueueItem[] = [];
	private playing = false;
	private playback?: AudioPlayback;

	setPlayback(playback: AudioPlayback): void {
		this.playback = playback;
	}

	enqueue(blob: Blob, volume: number): Promise<void> {
		return new Promise((resolve) => {
			this.queue.push({ kind: 'blob', blob, volume: clampVolume(volume), done: resolve });
			this.startIfIdle();
		});
	}

	enqueueFile(path: string, volume: number): Promise<void> {
		return new Promise((resolve) => {
			this.queue.push({ kind: 'file', path, volume: clampVolume(volume), done: resolve });
			this.startIfIdle();
		});
	}

	private startIfIdle(): void {
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
			const play =
				item.kind === 'file'
					? this.playback.playFile(item.path, item.volume)
					: this.playback.playBlob(item.blob, item.volume);

			await play.catch((error: unknown) => {
				console.error('Failed to play audio', error);
			});
		}

		item.done?.();
		await this.playNext();
	}
}
