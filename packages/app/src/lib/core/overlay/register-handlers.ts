import type { App } from '../app.svelte';

import { createSendToOverlayHandler } from './handlers/send-to-overlay';

const SEND_TO_OVERLAY_HANDLER_ID = 'overlay:overlay:send-to-overlay';

export function registerOverlayHandlers(app: App): void {
	const existing = app.actions.actions.find(SEND_TO_OVERLAY_HANDLER_ID);

	if (existing) {
		existing.setAvailable(true);
		return;
	}

	app.actions.actions.add(
		{
			name: 'Overlay',
			children: [createSendToOverlayHandler(app)]
		},
		{ idScope: 'overlay' }
	);
}
