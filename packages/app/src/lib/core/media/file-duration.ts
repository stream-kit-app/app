import { convertFileSrc, invoke } from '@tauri-apps/api/core';

/**
 * Reads video/audio duration from a local file path or an absolute http(s) URL.
 * Prefers a Rust-side probe for filesystem paths (works outside the asset protocol scope).
 * Falls back to HTML5 video metadata (asset protocol for local paths, direct URL for http(s)).
 */
export async function getVideoFileDurationMs(filePath: string): Promise<number | null> {
	const trimmed = filePath.trim();

	if (!trimmed) {
		return null;
	}

	if (/^https?:\/\//i.test(trimmed)) {
		return probeDurationWithVideoElement(trimmed);
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
		// Absolute http(s) URLs (e.g. resolved PocketBase cloud files) must not go
		// through Tauri's asset protocol — that yields asset.localhost/... 404s.
		const url = /^https?:\/\//i.test(filePath) ? filePath : convertFileSrc(filePath);

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
