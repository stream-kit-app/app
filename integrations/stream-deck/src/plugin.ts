import streamDeck from '@elgato/streamdeck';

import { DialControl } from './actions/dial-control';
import { RunAction } from './actions/run-action';
import { ToggleAction } from './actions/toggle-action';
import { bindFeedbackHandlers } from './feedback';
import { streamKitClient } from './stream-kit-client';

streamDeck.logger.setLevel('info');

bindFeedbackHandlers();

streamDeck.actions.registerAction(new RunAction());
streamDeck.actions.registerAction(new ToggleAction());
streamDeck.actions.registerAction(new DialControl());

streamDeck.settings.onDidReceiveGlobalSettings(() => {
	void streamKitClient.refreshSettings().catch((error) => {
		streamDeck.logger.warn(`Failed to refresh Stream Kit settings: ${String(error)}`);
	});
});

void streamDeck
	.connect()
	.then(async () => {
		await streamKitClient.start();
	})
	.catch((error) => {
		streamDeck.logger.error(`Failed to start Stream Kit Stream Deck plugin: ${String(error)}`);
	});
