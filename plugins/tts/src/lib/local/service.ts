import type { LocalTtsVoiceInfo } from './types';
import type { PluginAppApi, PluginStore } from '@stream-kit/app/api';

import { TtsPlayer } from '../player';
import {
	deleteLocalTtsVoice,
	downloadLocalTtsRuntime,
	downloadLocalTtsVoice,
	getLocalTtsRuntimeInfo,
	listLocalTtsVoices,
	synthesizeLocalSpeech
} from './api';

const STORE_KEY_SUFFIXES = {
	defaultVoice: 'local-tts-default-voice',
	volume: 'local-tts-volume'
} as const;

function normalizeStoreKey(value: string): string {
	return value
		.trim()
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
}

function voicesFingerprint(voices: LocalTtsVoiceInfo[]): string {
	return voices.map((voice) => `${voice.id}:${voice.installed}`).join('|');
}

function findStoreEntryValue(entries: Record<string, unknown>, suffix: string): unknown {
	const needle = normalizeStoreKey(suffix);

	for (const [key, value] of Object.entries(entries)) {
		if (normalizeStoreKey(key).endsWith(needle)) {
			return value;
		}
	}

	return undefined;
}

export class LocalTtsService {
	public isConfigured = false;
	public runtimeInstalled = false;
	public defaultVoice: string | undefined;
	public volume = 1;
	public voices: LocalTtsVoiceInfo[] = [];

	private store?: PluginStore;
	private player = new TtsPlayer();
	private refreshPromise: Promise<void> | null = null;
	private listeners = new Set<() => void>();

	subscribe(listener: () => void): () => void {
		this.listeners.add(listener);

		return () => {
			this.listeners.delete(listener);
		};
	}

	private notify(): void {
		for (const listener of this.listeners) {
			listener();
		}
	}

	async boot(app: PluginAppApi, store: PluginStore): Promise<void> {
		this.store = store;
		this.player.setPlayback((blob, volume) => app.audio.play(blob, volume));
		await this.syncFromStore();
		await this.refreshVoices();
	}

	async syncFromStore(): Promise<void> {
		if (!this.store) {
			return;
		}

		const entries = await this.store.entries();
		const defaultVoice = findStoreEntryValue(entries, STORE_KEY_SUFFIXES.defaultVoice);
		const volume = findStoreEntryValue(entries, STORE_KEY_SUFFIXES.volume);

		this.defaultVoice =
			typeof defaultVoice === 'string' && defaultVoice.trim()
				? defaultVoice.trim()
				: undefined;
		this.volume = typeof volume === 'number' && !Number.isNaN(volume) ? volume / 100 : 1;

		const wasConfigured = this.isConfigured;
		this.updateConfigured();

		if (wasConfigured !== this.isConfigured) {
			this.notify();
		}
	}

	private updateConfigured(): void {
		const defaultVoice = this.defaultVoice?.trim();

		this.isConfigured = Boolean(
			defaultVoice &&
			this.voices.some((voice) => voice.id === defaultVoice && voice.installed)
		);
	}

	async refreshVoices(): Promise<void> {
		if (this.refreshPromise) {
			return this.refreshPromise;
		}

		this.refreshPromise = (async () => {
			try {
				const [voices, runtime] = await Promise.all([
					listLocalTtsVoices(),
					getLocalTtsRuntimeInfo()
				]);

				const voicesChanged = voicesFingerprint(this.voices) !== voicesFingerprint(voices);
				const runtimeChanged = this.runtimeInstalled !== runtime.installed;

				this.voices = voices;
				this.runtimeInstalled = runtime.installed;

				const wasConfigured = this.isConfigured;
				this.updateConfigured();

				if (voicesChanged || runtimeChanged || wasConfigured !== this.isConfigured) {
					this.notify();
				}
			} catch (error) {
				console.error('Failed to refresh local TTS voices', error);
			} finally {
				this.refreshPromise = null;
			}
		})();

		return this.refreshPromise;
	}

	isVoiceInstalled(voiceId: string): boolean {
		return this.voices.some((voice) => voice.id === voiceId && voice.installed);
	}

	getInstalledVoices(): LocalTtsVoiceInfo[] {
		return this.voices.filter((voice) => voice.installed);
	}

	async ensureRuntime(): Promise<void> {
		if (this.runtimeInstalled) {
			return;
		}

		await downloadLocalTtsRuntime();
		this.runtimeInstalled = true;
		this.notify();
	}

	async downloadVoice(voiceId: string): Promise<void> {
		await this.ensureRuntime();
		await downloadLocalTtsVoice(voiceId);
		await this.refreshVoices();
	}

	async removeVoice(voiceId: string): Promise<void> {
		await deleteLocalTtsVoice(voiceId);

		if (this.defaultVoice === voiceId) {
			this.defaultVoice = undefined;
		}

		await this.refreshVoices();
	}

	async speak(text: string, voiceId: string, volume?: number): Promise<void> {
		await this.ensureRuntime();

		const bytes = await synthesizeLocalSpeech(voiceId, text);
		const blob = new Blob([Uint8Array.from(bytes)], { type: 'audio/wav' });
		this.player.enqueue(blob, volume ?? this.volume);
	}

	async testVoice(voiceId: string, sampleText: string): Promise<void> {
		await this.speak(sampleText, voiceId);
	}
}

export const local = new LocalTtsService();
