import type { ThemeMode } from '../settings/settings-store';

import { getSavedTheme, saveTheme } from '../settings/settings-store';
import { setWindowBackground } from '../window';

/** Mirrors the saved mode so app.html can apply it before first paint (Tauri store is async). */
export const THEME_STORAGE_KEY = 'stream-kit.theme';
export const DEFAULT_THEME: ThemeMode = 'dark';

export class Theme {
	mode = $state<ThemeMode>(readCachedTheme() ?? DEFAULT_THEME);

	isLight = $derived(this.mode === 'light');

	async load(): Promise<void> {
		try {
			this.mode = (await getSavedTheme()) ?? DEFAULT_THEME;
		} catch (error) {
			console.warn('Could not load theme preference', error);
		}

		this.#apply();
	}

	async set(mode: ThemeMode): Promise<void> {
		this.mode = mode;
		this.#apply();

		try {
			await saveTheme(mode);
		} catch (error) {
			console.warn('Could not save theme preference', error);
		}
	}

	toggle(): Promise<void> {
		return this.set(this.isLight ? 'dark' : 'light');
	}

	#apply(): void {
		const root = document.documentElement;

		root.dataset.theme = this.mode;
		document.querySelector('meta[name="color-scheme"]')?.setAttribute('content', this.mode);
		writeCachedTheme(this.mode);
		void setWindowBackground(this.mode);
	}
}

function readCachedTheme(): ThemeMode | undefined {
	try {
		const value = localStorage.getItem(THEME_STORAGE_KEY);
		return value === 'light' || value === 'dark' ? value : undefined;
	} catch {
		return undefined;
	}
}

function writeCachedTheme(mode: ThemeMode): void {
	try {
		localStorage.setItem(THEME_STORAGE_KEY, mode);
	} catch {
		// Pre-paint cache only; the Tauri store remains the source of truth.
	}
}
