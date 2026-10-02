import type { PluginAppApi } from '@stream-kit/plugin';

import { errorMessage } from './settings-helpers';

/** Same error twice within this window shows one toast (busy chats would flood otherwise). */
const DEDUPE_WINDOW_MS = 30_000;

export function createSpeakErrorReporter(app: PluginAppApi, provider: string) {
	const lastShown = new Map<string, number>();

	const show = (id: string, title: string, description: string) => {
		const now = Date.now();

		if (now - (lastShown.get(id) ?? 0) < DEDUPE_WINDOW_MS) {
			return;
		}

		lastShown.set(id, now);
		app.toast.create({ title, description, variant: 'error' });
	};

	return {
		missingVoice: () =>
			show(
				'missing-voice',
				app.i18n.translate('No {provider} voice selected', { provider }),
				app.i18n.translate(
					'Pick a voice in the handler or set a default voice in the TTS settings.'
				)
			),
		failed: (error: unknown) => {
			console.error(`[tts/${provider.toLowerCase()}] Speak failed`, error);
			show(
				`failed:${errorMessage(error)}`,
				app.i18n.translate('{provider} TTS failed', { provider }),
				errorMessage(error)
			);
		}
	};
}
