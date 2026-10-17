import type { ElevenLabsVoice } from './types';
import type { PluginAppApi } from '@stream-kit/plugin';

import { SvelteSet } from 'svelte/reactivity';

import { BaseDirectory } from '@stream-kit/plugin';

import { errorMessage } from '../settings-helpers';
import { cloneElevenLabsVoice, fetchElevenLabsVoiceSample } from './api';
import { elevenlabs } from './service';
import { isOwnedVoice } from './types';
import { remapElevenLabsVoiceReferences } from './voice-references';
import { elevenlabsVoiceTuning } from './voice-tuning.svelte';

/** Under the app data directory. */
const BACKUP_DIR = 'tts/elevenlabs-voices';
const INDEX_FILE = `${BACKUP_DIR}/voices.json`;
const INDEX_VERSION = 1;
const FS = { baseDir: BaseDirectory.AppData } as const;

export type ElevenLabsVoiceBackupSample = {
	fileName: string;
	/** Relative to the app data directory. */
	path: string;
	type: string;
	size: number;
};

/** A cloned voice saved on this device, so it can be recreated on another ElevenLabs account. */
export type ElevenLabsVoiceBackup = {
	id: string;
	name: string;
	description: string;
	removeBackgroundNoise: boolean;
	/** Voice id on the ElevenLabs account that was connected last. */
	voiceId: string;
	/** Ids this voice had on other accounts; actions may still reference them. */
	previousVoiceIds: string[];
	samples: ElevenLabsVoiceBackupSample[];
	createdAt: string;
	restoredAt?: string;
};

type BackupIndex = { version: number; voices: ElevenLabsVoiceBackup[] };

export type CreateVoiceBackupInput = {
	name: string;
	description?: string;
	removeBackgroundNoise?: boolean;
	voiceId: string;
	files: File[];
};

export type RestoreSummary = {
	restored: ElevenLabsVoiceBackup[];
	failed: { backup: ElevenLabsVoiceBackup; error: string }[];
};

function safeFileName(name: string): string {
	return name.replace(/[^a-zA-Z0-9._-]+/g, '_').slice(-80) || 'sample';
}

function sameName(a: string, b: string): boolean {
	return a.trim().toLowerCase() === b.trim().toLowerCase();
}

/** Only instant clones have samples that can be uploaded again. */
export function canBackUpVoice(voice: ElevenLabsVoice): boolean {
	return voice.category === 'cloned' && (voice.samples?.length ?? 0) > 0;
}

/**
 * Local copies of cloned ElevenLabs voices (samples + metadata) under the app data
 * directory. Voices live in the ElevenLabs account, so switching to another API key
 * loses them; from a backup they are cloned again and their tuning and action
 * references follow the new voice id.
 */
export class ElevenLabsVoiceBackupStore {
	backups = $state.raw<ElevenLabsVoiceBackup[]>([]);
	/** Backups that are being restored or deleted right now. */
	busyIds = new SvelteSet<string>();
	/** Voice ids whose samples are being downloaded for a backup. */
	backingUpVoiceIds = new SvelteSet<string>();
	loaded = $state(false);
	restoringAll = $state(false);

	private app?: PluginAppApi;
	private restoreAllPromise?: Promise<RestoreSummary>;

	async boot(app: PluginAppApi): Promise<void> {
		this.app = app;

		if (this.loaded) {
			return;
		}

		try {
			if (await app.fs.exists(INDEX_FILE, FS)) {
				const parsed = JSON.parse(await app.fs.readTextFile(INDEX_FILE, FS)) as BackupIndex;

				this.backups = Array.isArray(parsed.voices)
					? parsed.voices.filter((voice) => typeof voice.id === 'string' && voice.voiceId)
					: [];
			}
		} catch (error) {
			console.warn('[tts/elevenlabs] Could not read the voice backups', error);
			this.backups = [];
		} finally {
			this.loaded = true;
		}
	}

	get(voiceId: string): ElevenLabsVoiceBackup | undefined {
		return this.backups.find((backup) => backup.voiceId === voiceId);
	}

	has(voiceId: string): boolean {
		return this.backups.some((backup) => backup.voiceId === voiceId);
	}

	/** The current id for a voice id that may belong to a previously connected account. */
	resolveVoiceId(voiceId: string): string {
		return (
			this.backups.find((backup) => backup.previousVoiceIds.includes(voiceId))?.voiceId ??
			voiceId
		);
	}

	/** Backups whose voice is missing from `voices` (the connected account). */
	missing(voices: ElevenLabsVoice[]): ElevenLabsVoiceBackup[] {
		const ids = new Set(voices.map((voice) => voice.id));

		return this.backups.filter((backup) => !ids.has(backup.voiceId));
	}

	/** Save the samples of a voice on this device. */
	async create(input: CreateVoiceBackupInput): Promise<ElevenLabsVoiceBackup> {
		const app = this.requireApp();
		const id = crypto.randomUUID();
		const dir = `${BACKUP_DIR}/${id}`;
		const samples: ElevenLabsVoiceBackupSample[] = [];

		await app.fs.mkdir(dir, { ...FS, recursive: true });

		try {
			for (const [index, file] of input.files.entries()) {
				const path = `${dir}/${index + 1}-${safeFileName(file.name)}`;

				await app.fs.writeFile(path, new Uint8Array(await file.arrayBuffer()), {
					...FS,
					create: true
				});
				samples.push({ fileName: file.name, path, type: file.type, size: file.size });
			}
		} catch (error) {
			await app.fs.remove(dir, { ...FS, recursive: true }).catch(() => undefined);
			throw error;
		}

		const backup: ElevenLabsVoiceBackup = {
			id,
			name: input.name.trim(),
			description: input.description?.trim() ?? '',
			removeBackgroundNoise: input.removeBackgroundNoise ?? false,
			voiceId: input.voiceId,
			previousVoiceIds: [],
			samples,
			createdAt: new Date().toISOString()
		};
		const replaced = this.backups.filter((existing) => existing.voiceId === backup.voiceId);

		// A backup for the same voice (e.g. made twice) is replaced.
		await this.persist([
			...this.backups.filter((existing) => existing.voiceId !== backup.voiceId),
			backup
		]);

		for (const old of replaced) {
			await this.removeFiles(old.id);
		}

		return backup;
	}

	/** Download the samples of an existing clone from ElevenLabs and back them up. */
	async createFromVoice(voice: ElevenLabsVoice): Promise<ElevenLabsVoiceBackup> {
		const apiKey = elevenlabs.apiKey;

		if (!apiKey) {
			throw new Error('ElevenLabs is not configured');
		}

		if (!canBackUpVoice(voice)) {
			throw new Error('Only cloned voices with samples can be backed up');
		}

		this.backingUpVoiceIds.add(voice.id);

		try {
			const files: File[] = [];

			for (const sample of voice.samples ?? []) {
				const blob = await fetchElevenLabsVoiceSample(
					apiKey,
					voice.id,
					sample.id,
					sample.mimeType
				);

				files.push(new File([blob], sample.fileName, { type: sample.mimeType }));
			}

			return await this.create({
				name: voice.name,
				description: voice.description,
				removeBackgroundNoise: voice.samples?.some(
					(sample) => sample.removeBackgroundNoise
				),
				voiceId: voice.id,
				files
			});
		} finally {
			this.backingUpVoiceIds.delete(voice.id);
		}
	}

	/** Remove the samples from this device. The voice itself stays at ElevenLabs. */
	async delete(id: string): Promise<void> {
		if (!this.backups.some((existing) => existing.id === id)) {
			return;
		}

		this.busyIds.add(id);

		try {
			await this.removeFiles(id);
			await this.persist(this.backups.filter((existing) => existing.id !== id));
		} finally {
			this.busyIds.delete(id);
		}
	}

	/** Delete the backup that belongs to a voice, if there is one. */
	async deleteForVoice(voiceId: string): Promise<void> {
		const backup = this.get(voiceId);

		if (backup) {
			await this.delete(backup.id);
		}
	}

	/**
	 * Match backups whose voice is missing against the connected account by name
	 * (e.g. after switching back to an earlier account) and relink them.
	 * Returns the backups that are still missing.
	 */
	async reconcile(voices: ElevenLabsVoice[]): Promise<ElevenLabsVoiceBackup[]> {
		const missing = this.missing(voices);

		if (missing.length === 0) {
			return [];
		}

		const claimed = new Set(this.backups.map((backup) => backup.voiceId));
		const stillMissing: ElevenLabsVoiceBackup[] = [];

		for (const backup of missing) {
			const match = voices.find(
				(voice) =>
					isOwnedVoice(voice) &&
					!claimed.has(voice.id) &&
					sameName(voice.name, backup.name)
			);

			if (!match) {
				stillMissing.push(backup);
				continue;
			}

			claimed.add(match.id);
			await this.relink(backup, match.id);
		}

		return stillMissing;
	}

	/** Clone the voice again from the saved samples and relink tuning and actions. */
	async restore(backup: ElevenLabsVoiceBackup): Promise<string> {
		const apiKey = elevenlabs.apiKey;

		if (!apiKey) {
			throw new Error('ElevenLabs is not configured');
		}

		this.busyIds.add(backup.id);

		try {
			const files = await this.readSamples(backup);
			const voiceId = await cloneElevenLabsVoice(apiKey, {
				name: backup.name,
				description: backup.description,
				files,
				removeBackgroundNoise: backup.removeBackgroundNoise
			});

			await this.relink(backup, voiceId);
			elevenlabs.invalidateVoices();

			return voiceId;
		} finally {
			this.busyIds.delete(backup.id);
		}
	}

	/**
	 * Restore every backup that is missing from the connected account, one at a time.
	 * Concurrent calls share the same run.
	 */
	restoreMissing(voices: ElevenLabsVoice[]): Promise<RestoreSummary> {
		if (!this.restoreAllPromise) {
			this.restoringAll = true;
			this.restoreAllPromise = this.runRestoreMissing(voices).finally(() => {
				this.restoreAllPromise = undefined;
				this.restoringAll = false;
			});
		}

		return this.restoreAllPromise;
	}

	private async runRestoreMissing(voices: ElevenLabsVoice[]): Promise<RestoreSummary> {
		const summary: RestoreSummary = { restored: [], failed: [] };

		for (const backup of await this.reconcile(voices)) {
			try {
				await this.restore(backup);
				summary.restored.push(backup);
			} catch (error) {
				console.error(
					'[tts/elevenlabs] Could not restore voice backup',
					backup.name,
					error
				);
				summary.failed.push({ backup, error: errorMessage(error) });
			}
		}

		return summary;
	}

	private async readSamples(backup: ElevenLabsVoiceBackup): Promise<File[]> {
		const app = this.requireApp();
		const files: File[] = [];

		for (const sample of backup.samples) {
			if (!(await app.fs.exists(sample.path, FS))) {
				throw new Error(`Sample "${sample.fileName}" is missing on this device`);
			}

			const bytes = await app.fs.readFile(sample.path, FS);

			files.push(new File([bytes as BlobPart], sample.fileName, { type: sample.type }));
		}

		if (files.length === 0) {
			throw new Error('This backup has no samples');
		}

		return files;
	}

	/** Move the backup, its tuning and every action reference to a new voice id. */
	private async relink(backup: ElevenLabsVoiceBackup, voiceId: string): Promise<void> {
		const app = this.requireApp();
		const previous = backup.voiceId;

		if (previous === voiceId) {
			return;
		}

		await elevenlabsVoiceTuning.move(previous, voiceId);

		try {
			await remapElevenLabsVoiceReferences(app, previous, voiceId);
		} catch (error) {
			console.error('[tts/elevenlabs] Could not update voice references', error);
		}

		await this.persist(
			this.backups.map((existing) =>
				existing.id === backup.id
					? {
							...existing,
							voiceId,
							previousVoiceIds: [
								...existing.previousVoiceIds.filter((id) => id !== voiceId),
								previous
							],
							restoredAt: new Date().toISOString()
						}
					: existing
			)
		);
	}

	private async removeFiles(id: string): Promise<void> {
		const app = this.requireApp();

		try {
			await app.fs.remove(`${BACKUP_DIR}/${id}`, { ...FS, recursive: true });
		} catch (error) {
			console.warn('[tts/elevenlabs] Could not remove voice backup files', error);
		}
	}

	private async persist(backups: ElevenLabsVoiceBackup[]): Promise<void> {
		const app = this.requireApp();
		const index: BackupIndex = { version: INDEX_VERSION, voices: backups };

		await app.fs.mkdir(BACKUP_DIR, { ...FS, recursive: true });
		await app.fs.writeTextFile(INDEX_FILE, JSON.stringify(index, null, '\t'), {
			...FS,
			create: true
		});
		this.backups = backups;
	}

	private requireApp(): PluginAppApi {
		if (!this.app) {
			throw new Error('ElevenLabs voice backups are not ready yet');
		}

		return this.app;
	}
}

export const elevenlabsVoiceBackups = new ElevenLabsVoiceBackupStore();

/**
 * Restore the backed-up voices that are missing from the connected account and tell
 * the user how it went. Used after an API key change and by "Restore all".
 */
export async function restoreMissingVoiceBackups(
	app: PluginAppApi,
	voices: ElevenLabsVoice[]
): Promise<RestoreSummary> {
	const { translate } = app.i18n;
	const summary = await elevenlabsVoiceBackups.restoreMissing(voices);

	if (summary.restored.length > 0) {
		app.toast.create({
			title: translate('Voices restored'),
			description:
				summary.restored.length === 1
					? translate('{name} was added to your ElevenLabs account again.', {
							name: summary.restored[0]!.name
						})
					: translate('{count} voices were added to your ElevenLabs account again.', {
							count: summary.restored.length
						}),
			variant: 'success'
		});
	}

	if (summary.failed.length > 0) {
		app.toast.create({
			title: translate('Some voices were not restored'),
			description: summary.failed
				.map((failure) => `${failure.backup.name}: ${failure.error}`)
				.join('\n'),
			variant: 'error'
		});
	}

	return summary;
}
