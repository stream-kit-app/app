type QueueItem = {
	blob: Blob;
	volume: number;
	resolve: () => void;
};

export type TtsPlayback = (blob: Blob, volume: number) => Promise<void>;

export type TtsPlaybackOptions = {
	sessionId?: string;
	stopPlayback?: (sessionId: string) => Promise<void>;
};

export class TtsPlayer {
	private queue: QueueItem[] = [];
	private playing = false;
	private activeSession = false;
	private skipNext = false;
	private playback?: TtsPlayback;
	private sessionId?: string;
	private stopPlayback?: (sessionId: string) => Promise<void>;
	private speakGeneration = 0;

	setPlayback(playback: TtsPlayback, options?: TtsPlaybackOptions): void {
		this.playback = playback;
		this.sessionId = options?.sessionId;
		this.stopPlayback = options?.stopPlayback;
	}

	/** Bump generation so in-flight speak() calls discard their result after synth. */
	beginSkipGeneration(): number {
		this.speakGeneration += 1;
		return this.speakGeneration;
	}

	getSpeakGeneration(): number {
		return this.speakGeneration;
	}

	enqueue(blob: Blob, volume: number): Promise<void> {
		return new Promise((resolve) => {
			this.queue.push({
				blob,
				volume: Math.min(1, Math.max(0, volume)),
				resolve
			});

			if (!this.playing) {
				void this.playNext();
			}
		});
	}

	skip(): void {
		this.beginSkipGeneration();

		if (!this.playing) {
			return;
		}

		if (this.activeSession && this.sessionId && this.stopPlayback) {
			void this.stopPlayback(this.sessionId).catch((error: unknown) => {
				console.error('Failed to skip TTS playback', error);
			});
			return;
		}

		// Between clips: drop the next queued item once.
		this.skipNext = true;
	}

	private async playNext(): Promise<void> {
		const item = this.queue.shift();

		if (!item) {
			this.playing = false;
			this.activeSession = false;
			return;
		}

		this.playing = true;

		if (this.skipNext) {
			this.skipNext = false;
			item.resolve();
			await this.playNext();
			return;
		}

		if (!this.playback) {
			console.error('TTS playback is not configured.');
			item.resolve();
			await this.playNext();
			return;
		}

		this.activeSession = true;

		await this.playback(item.blob, item.volume).catch((error: unknown) => {
			console.error('Failed to play TTS audio', error);
		});

		this.activeSession = false;
		item.resolve();
		await this.playNext();
	}
}
