import { isTauri } from '@tauri-apps/api/core';
import { getCurrentWindow } from '@tauri-apps/api/window';

/** Native window fill per color scheme; dark matches `backgroundColor` in tauri.conf.json. */
const WINDOW_BACKGROUND = {
	dark: '#121319',
	light: '#f9f9fb'
} as const;

/** Keep the native window fill in sync with the theme so resizes don't flash the other scheme. */
export async function setWindowBackground(mode: keyof typeof WINDOW_BACKGROUND): Promise<void> {
	if (!isTauri()) {
		return;
	}

	try {
		await getCurrentWindow().setBackgroundColor(WINDOW_BACKGROUND[mode]);
	} catch (error) {
		console.warn('Could not set window background color', error);
	}
}
