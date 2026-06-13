import type { PluginAppApi } from '@stream-kit/plugin';

import { AudioQueue } from './audio-queue';

const AUDIO_EXTENSIONS = new Set(['mp3', 'wav', 'ogg', 'flac', 'aac', 'm4a']);

const AUDIO_MIME_TYPES: Record<string, string> = {
	mp3: 'audio/mpeg',
	wav: 'audio/wav',
	ogg: 'audio/ogg',
	flac: 'audio/flac',
	aac: 'audio/aac',
	m4a: 'audio/mp4'
};

const audioQueue = new AudioQueue();

function isAudioFileName(name: string): boolean {
	const extension = name.split('.').pop()?.toLowerCase() ?? '';
	return AUDIO_EXTENSIONS.has(extension);
}

function bytesToAudioBlob(path: string, bytes: Uint8Array): Blob {
	const extension = path.split('.').pop()?.toLowerCase() ?? '';
	const mimeType = AUDIO_MIME_TYPES[extension] ?? 'application/octet-stream';

	return new Blob([Uint8Array.from(bytes)], { type: mimeType });
}

export function configureAudioPlayback(app: PluginAppApi): void {
	audioQueue.setPlayback((blob, volume) => app.audio.play(blob, volume));
}

export async function playAudioFile(app: PluginAppApi, path: string, volume = 1): Promise<void> {
	const bytes = await app.fs.readFile(path);
	const blob = bytesToAudioBlob(path, bytes);
	await app.audio.play(blob, volume);
}

export async function playAudioFilesFromFolder(
	app: PluginAppApi,
	folderPath: string,
	volume = 1
): Promise<void> {
	const entries = await app.fs.readDir(folderPath);
	const files: string[] = [];

	for (const entry of entries) {
		if (!entry.isFile || !isAudioFileName(entry.name)) {
			continue;
		}

		files.push(await app.fs.join(folderPath, entry.name));
	}

	files.sort((left, right) => left.toLowerCase().localeCompare(right.toLowerCase()));

	for (const filePath of files) {
		const bytes = await app.fs.readFile(filePath);
		const blob = bytesToAudioBlob(filePath, bytes);
		audioQueue.enqueue(blob, volume);
	}
}
