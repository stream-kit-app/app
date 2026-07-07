import type { App } from '../app.svelte';

import { createMessageReceivedTrigger } from './triggers/message-received';

const MESSAGE_RECEIVED_TRIGGER_ID = 'overlay:overlay:message-received';

export function registerOverlayTriggers(app: App): void {
	const existing = app.actions.triggers.find(MESSAGE_RECEIVED_TRIGGER_ID);

	if (existing) {
		existing.setAvailable(true);
		return;
	}

	app.actions.triggers.add(
		{
			name: 'Overlay',
			children: [createMessageReceivedTrigger(app)]
		},
		{ idScope: 'overlay' }
	);
}
