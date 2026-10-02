import type { ElevenLabsVoice, ElevenLabsVoiceTuning } from './types';
import type { PluginAppApi } from '@stream-kit/plugin';

import VoiceCloneFormFooter from '../../app/ui/voice-clone-form-footer.svelte';
import VoiceCloneForm from '../../app/ui/voice-clone-form.svelte';
import VoiceTuningFormFooter from '../../app/ui/voice-tuning-form-footer.svelte';
import VoiceTuningForm from '../../app/ui/voice-tuning-form.svelte';
import { errorMessage } from '../settings-helpers';
import { cloneElevenLabsVoice, deleteElevenLabsVoice } from './api';
import { prepareCloneAudio } from './audio-chunks';
import { elevenlabs } from './service';
import { ELEVENLABS_OWNED_VOICE_CATEGORIES, supportsAudioTags } from './types';
import { defaultVoiceTuning, elevenlabsVoiceTuning } from './voice-tuning.svelte';

const TUNING_MODAL_ID = 'tts-elevenlabs-voice-tuning';
const CLONE_MODAL_ID = 'tts-elevenlabs-voice-clone';
const SAMPLE_TEXT = 'Hi chat! Thanks for the follow, welcome to the stream.';

export function isOwnedVoice(voice: ElevenLabsVoice): boolean {
	return (ELEVENLABS_OWNED_VOICE_CATEGORIES as readonly string[]).includes(voice.category ?? '');
}

/** Voice library page state: voice list, previews, delete, and the tuning/clone modals. */
export class ElevenLabsVoiceLibrary {
	voices = $state<ElevenLabsVoice[]>([]);
	loading = $state(false);
	error = $state<string>();
	/** Voice whose preview is loading or playing. */
	previewingId = $state<string>();
	/** Mirrors `elevenlabs.apiKey` presence; updated on refresh. */
	hasApiKey = $state(Boolean(elevenlabs.apiKey));

	constructor(private readonly app: PluginAppApi) {}

	async refresh(force = false): Promise<void> {
		this.hasApiKey = Boolean(elevenlabs.apiKey);

		if (!elevenlabs.apiKey) {
			this.voices = [];
			return;
		}

		this.loading = true;

		try {
			this.voices = await elevenlabs.fetchVoices(force);
			this.error = undefined;
		} catch (error) {
			this.error = errorMessage(error);
		} finally {
			this.loading = false;
		}
	}

	async preview(voice: ElevenLabsVoice): Promise<void> {
		if (this.previewingId === voice.id) {
			await this.stopPreview();
			return;
		}

		this.previewingId = voice.id;

		try {
			await elevenlabs.preview(voice, SAMPLE_TEXT);
		} catch (error) {
			this.app.toast.create({
				title: this.app.i18n.translate('Preview failed'),
				description: errorMessage(error),
				variant: 'error'
			});
		} finally {
			if (this.previewingId === voice.id) {
				this.previewingId = undefined;
			}
		}
	}

	async stopPreview(): Promise<void> {
		this.previewingId = undefined;
		await elevenlabs.stopPreview();
	}

	notifyIdCopied(voice: ElevenLabsVoice): void {
		this.app.toast.create({
			title: this.app.i18n.translate('Voice ID copied'),
			description: voice.name,
			variant: 'success'
		});
	}

	notifyIdCopyFailed(): void {
		this.app.toast.create({
			title: this.app.i18n.translate('Could not copy voice ID'),
			variant: 'warning'
		});
	}

	async remove(voice: ElevenLabsVoice): Promise<void> {
		const { translate } = this.app.i18n;
		const confirmed = await this.app.confirm.ask({
			title: translate('Delete voice?'),
			description: translate(
				'"{name}" is removed from your ElevenLabs account. Actions that use this voice will stop working.',
				{ name: voice.name }
			),
			confirmLabel: translate('Delete')
		});

		if (!confirmed || !elevenlabs.apiKey) {
			return;
		}

		try {
			await deleteElevenLabsVoice(elevenlabs.apiKey, voice.id);
			await elevenlabsVoiceTuning.reset(voice.id);
			elevenlabs.invalidateVoices();
			await this.refresh(true);
			this.app.toast.create({
				title: translate('Voice deleted'),
				description: voice.name,
				variant: 'success'
			});
		} catch (error) {
			this.app.toast.create({
				title: translate('Delete failed'),
				description: errorMessage(error),
				variant: 'error'
			});
		}
	}

	openTuning(voice: ElevenLabsVoice): void {
		const editor = new VoiceTuningEditor(this.app, voice);

		this.app.modal
			.create({
				id: TUNING_MODAL_ID,
				title: this.app.i18n.translate('Voice tuning'),
				description: voice.name,
				size: 'md',
				content: VoiceTuningForm,
				footer: VoiceTuningFormFooter,
				props: { editor }
			})
			.open();
	}

	openClone(): void {
		const editor = new VoiceCloneEditor(this.app, async () => {
			elevenlabs.invalidateVoices();
			await this.refresh(true);
		});

		this.app.modal
			.create({
				id: CLONE_MODAL_ID,
				title: this.app.i18n.translate('Add voice'),
				description: this.app.i18n.translate('Clone a voice from audio samples.'),
				size: 'md',
				content: VoiceCloneForm,
				footer: VoiceCloneFormFooter,
				props: { editor }
			})
			.open();
	}
}

/** Modal model for tuning one voice. Saving stores it in Stream Kit, not at ElevenLabs. */
export class VoiceTuningEditor {
	values = $state<ElevenLabsVoiceTuning>(defaultVoiceTuning());
	/** Audio tags placed before every message, e.g. `[heavy german accent]`. */
	tags = $state('');
	/** Model for this voice; empty uses the default model from the TTS settings. */
	modelId = $state('');
	/** Give this voice its own volume instead of the ElevenLabs volume. */
	customVolume = $state(false);
	/** 0–100, used when {@link customVolume} is on. */
	volume = $state(100);
	readonly hasCustomTuning: boolean;

	/** Whether the model this voice will use understands audio tags. */
	get modelSupportsTags(): boolean {
		return supportsAudioTags(this.modelId || elevenlabs.modelId);
	}
	isSaving = $state(false);
	isTesting = $state(false);

	constructor(
		readonly app: PluginAppApi,
		readonly voice: ElevenLabsVoice
	) {
		const stored = elevenlabsVoiceTuning.get(voice.id);
		this.hasCustomTuning = Boolean(stored);
		// Without custom tuning, start from the global defaults the voice uses today.
		this.values = { ...defaultVoiceTuning(), ...elevenlabs.voiceSettings, ...stored };
		this.tags = elevenlabsVoiceTuning.getTags(voice.id);
		this.modelId = elevenlabsVoiceTuning.getModelId(voice.id);
		const storedVolume = elevenlabsVoiceTuning.getVolume(voice.id);
		this.customVolume = storedVolume !== null;
		this.volume = storedVolume ?? Math.round(elevenlabs.volume * 100);
	}

	async test(): Promise<void> {
		this.isTesting = true;

		try {
			await elevenlabs.preview(this.voice, SAMPLE_TEXT, {
				voiceSettings: $state.snapshot(this.values),
				tags: this.tags,
				modelId: this.modelId,
				volume: this.customVolume ? this.volume : null
			});
		} catch (error) {
			this.app.toast.create({
				title: this.app.i18n.translate('Test failed'),
				description: errorMessage(error),
				variant: 'error'
			});
		} finally {
			this.isTesting = false;
		}
	}

	async save(): Promise<void> {
		this.isSaving = true;

		try {
			await elevenlabsVoiceTuning.save(this.voice.id, $state.snapshot(this.values), {
				tags: this.tags,
				modelId: this.modelId,
				volume: this.customVolume ? this.volume : null
			});
			this.app.toast.create({
				title: this.app.i18n.translate('Voice tuning saved'),
				description: this.voice.name,
				variant: 'success'
			});
			this.close();
		} catch (error) {
			this.app.toast.create({
				title: this.app.i18n.translate('Settings not saved'),
				description: errorMessage(error),
				variant: 'error'
			});
		} finally {
			this.isSaving = false;
		}
	}

	async reset(): Promise<void> {
		await elevenlabsVoiceTuning.reset(this.voice.id);
		this.app.toast.create({
			title: this.app.i18n.translate('Voice tuning reset'),
			description: this.app.i18n.translate('{name} uses the default tuning again.', {
				name: this.voice.name
			}),
			variant: 'success'
		});
		this.close();
	}

	close(): void {
		void elevenlabs.stopPreview();
		this.app.modal.get(TUNING_MODAL_ID)?.close();
	}
}

/** Modal model for an instant voice clone. */
/** ElevenLabs accepts at most this many samples per instant clone. */
const MAX_CLONE_FILES = 25;

/** One added recording; large ones are converted and split before upload. */
export type CloneSample = {
	key: string;
	name: string;
	size: number;
	status: 'processing' | 'ready' | 'error';
	files: File[];
	durationSeconds?: number;
	chunked: boolean;
	trimmed: boolean;
	error?: string;
};

/** Modal model for an instant voice clone. */
export class VoiceCloneEditor {
	name = $state('');
	description = $state('');
	samples = $state<CloneSample[]>([]);
	removeBackgroundNoise = $state(false);
	consent = $state(false);
	error = $state<string>();
	isSaving = $state(false);

	constructor(
		readonly app: PluginAppApi,
		private readonly onCreated: () => Promise<void>
	) {}

	/** All files that will be uploaded (chunks included). */
	get files(): File[] {
		return this.samples.flatMap((sample) => (sample.status === 'ready' ? sample.files : []));
	}

	get isProcessing(): boolean {
		return this.samples.some((sample) => sample.status === 'processing');
	}

	get tooManyFiles(): boolean {
		return this.files.length > MAX_CLONE_FILES;
	}

	get canSubmit(): boolean {
		return (
			Boolean(this.name.trim()) &&
			this.files.length > 0 &&
			!this.isProcessing &&
			!this.tooManyFiles &&
			this.consent &&
			!this.isSaving
		);
	}

	addFiles(list: FileList | null): void {
		if (!list) {
			return;
		}

		for (const file of Array.from(list)) {
			const key = `${file.name}-${file.size}-${file.lastModified}`;

			if (this.samples.some((sample) => sample.key === key)) {
				continue;
			}

			this.samples = [
				...this.samples,
				{
					key,
					name: file.name,
					size: file.size,
					status: 'processing',
					files: [],
					chunked: false,
					trimmed: false
				}
			];
			void this.process(key, file);
		}
	}

	removeSample(key: string): void {
		this.samples = this.samples.filter((sample) => sample.key !== key);
	}

	private async process(key: string, file: File): Promise<void> {
		let update: Partial<CloneSample>;

		try {
			const prepared = await prepareCloneAudio(file);
			update = { status: 'ready', ...prepared };
		} catch (error) {
			update = {
				status: 'error',
				error: this.app.i18n.translate('This file could not be read as audio.'),
				files: []
			};
			console.warn('[tts/elevenlabs] Could not prepare clone sample', error);
		}

		// The sample may have been removed while processing.
		this.samples = this.samples.map((sample) =>
			sample.key === key ? { ...sample, ...update } : sample
		);
	}

	async submit(): Promise<void> {
		const { translate } = this.app.i18n;

		if (!this.canSubmit || !elevenlabs.apiKey) {
			return;
		}

		this.isSaving = true;
		this.error = undefined;

		try {
			await cloneElevenLabsVoice(elevenlabs.apiKey, {
				name: this.name.trim(),
				description: this.description.trim(),
				files: this.files,
				removeBackgroundNoise: this.removeBackgroundNoise
			});
			await this.onCreated();
			this.app.toast.create({
				title: translate('Voice added'),
				description: this.name.trim(),
				variant: 'success'
			});
			this.close();
		} catch (error) {
			this.error = errorMessage(error);
		} finally {
			this.isSaving = false;
		}
	}

	close(): void {
		this.app.modal.get(CLONE_MODAL_ID)?.close();
	}
}
