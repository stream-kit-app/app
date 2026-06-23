import { convertFileSrc, invoke } from '@tauri-apps/api/core';

/**
 * Reads video/audio duration from local file metadata.
 * Prefers a Rust-side probe (works for paths outside the asset protocol scope).
 * Falls back to HTML5 video metadata via Tauri's asset protocol.
 */
export async function getVideoFileDurationMs(filePath: string): Promise<number | null> {
	const trimmed = filePath.trim();

	if (!trimmed) {
		return null;
	}

	const fromRust = await probeDurationWithRust(trimmed);

	if (fromRust != null) {
		return fromRust;
	}

	return probeDurationWithVideoElement(trimmed);
}

async function probeDurationWithRust(filePath: string): Promise<number | null> {
	try {
		const durationMs = await invoke<number | null>('get_media_file_duration_ms', {
			path: filePath
		});

		if (durationMs != null && durationMs > 0) {
			return durationMs;
		}
	} catch (error) {
		console.warn('Rust media duration probe failed', error);
	}

	return null;
}

async function probeDurationWithVideoElement(filePath: string): Promise<number | null> {
	try {
		const url = convertFileSrc(filePath);

		return await new Promise((resolve) => {
			const video = document.createElement('video');
			video.preload = 'metadata';

			const cleanup = (): void => {
				video.removeAttribute('src');
				video.load();
			};

			video.onloadedmetadata = () => {
				const seconds = video.duration;
				cleanup();

				if (!Number.isFinite(seconds) || seconds <= 0) {
					resolve(null);
					return;
				}

				resolve(Math.ceil(seconds * 1000));
			};

			video.onerror = () => {
				cleanup();
				resolve(null);
			};

			video.src = url;
		});
	} catch {
		return null;
	}
}
