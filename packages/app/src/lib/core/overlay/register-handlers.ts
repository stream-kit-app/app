import type { App } from '../app.svelte';

import { createSendToOverlayHandler } from './handlers/send-to-overlay';

export function registerOverlayHandlers(app: App): void {
	app.actions.actions.add(
		{
			name: 'Overlay',
			children: [createSendToOverlayHandler(app)]
		},
		{ idScope: 'overlay' }
	);
}
