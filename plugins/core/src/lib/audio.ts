import type { PluginAppApi } from '@stream-kit/plugin';

import { AudioQueue } from './audio-queue';

const AUDIO_EXTENSIONS = new Set(['mp3', 'wav', 'ogg', 'flac', 'aac', 'm4a']);

const audioQueue = new AudioQueue();

function isAudioFileName(name: string): boolean {
	const extension = name.split('.').pop()?.toLowerCase() ?? '';
	return AUDIO_EXTENSIONS.has(extension);
}

export function configureAudioPlayback(app: PluginAppApi): void {
	audioQueue.setPlayback({
		playBlob: (blob, volume) => app.audio.play(blob, volume),
		playFile: (path, volume) => app.audio.playFile(path, volume)
	});
}

export async function playAudioFile(app: PluginAppApi, path: string, volume = 1): Promise<void> {
	await app.audio.playFile(path, volume);
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
		await audioQueue.enqueueFile(filePath, volume);
	}
}
