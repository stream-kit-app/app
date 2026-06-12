import type { HandlerFieldFormErrors } from '$lib/core/action/action-handler.svelte';

import { translate } from '$lib/i18n';

import type { TimerPlatform } from './stored-timer';

export type TimerFormErrors = {
	name?: string;
	handlers?: string;
	platforms?: string;
	interval?: string;
	handlerErrors: Record<string, HandlerFieldFormErrors>;
};

export function validateTimerForm(input: {
	name: string;
	handlersCount: number;
	platforms: TimerPlatform[];
	intervalMinSec: number;
}): TimerFormErrors | null {
	const errors: TimerFormErrors = {
		handlerErrors: {}
	};

	if (!input.name.trim()) {
		errors.name = translate('Name is required');
	}

	if (input.handlersCount === 0) {
		errors.handlers = translate('Add at least one handler');
	}

	if (input.platforms.length === 0) {
		errors.platforms = translate('Select at least one platform');
	}

	if (input.intervalMinSec < 30) {
		errors.interval = translate('Minimum interval must be at least 30 seconds');
	}

	const hasErrors =
		!!errors.name ||
		!!errors.handlers ||
		!!errors.platforms ||
		!!errors.interval ||
		Object.keys(errors.handlerErrors).length > 0;

	return hasErrors ? errors : null;
}
