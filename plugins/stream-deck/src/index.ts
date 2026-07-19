import type { Plugin, PluginPageDefinition } from '@stream-kit/plugin';

import StreamDeckPage from './app/ui/stream-deck-page.svelte';
import { createSetButtonSettingsHandler } from './handler/set-button-settings';
import { createSetImageHandler } from './handler/set-image';
import { createSetStateHandler } from './handler/set-state';
import { createSetTitleHandler } from './handler/set-title';
import { createShowAlertHandler, createShowOkHandler } from './handler/show-feedback';
import { registerStreamDeckApi } from './lib/api-bridge';
import { streamDeck } from './lib/instances';
import {
	createConnectedTrigger,
	createDialDownTrigger,
	createDialRotateTrigger,
	createDialUpTrigger,
	createDisconnectedTrigger,
	createKeyDownTrigger,
	createKeyUpTrigger,
	createTouchTapTrigger,
	createWillAppearTrigger,
	createWillDisappearTrigger
} from './trigger';

export type { StreamDeckPluginApi } from './lib/plugin-api';

const overviewPage = {
	customView: 'overview',
	title: 'Stream Deck',
	description: 'Connection status, registered buttons, and setup instructions.'
} as unknown as PluginPageDefinition;

const plugin: Plugin = (app) => {
	return {
		name: 'Stream Deck',
		description:
			'Connect Elgato Stream Deck to Stream Kit — run actions, fire triggers, and update keys.',
		icon: 'ri:keyboard-box-line',
		api: {
			streamDeck
		},
		customViews: {
			overview: StreamDeckPage
		},
		menuItems: [
			{
				title: 'Stream Deck',
				icon: 'ri:keyboard-box-line',
				children: [{ title: 'Overview', page: overviewPage }]
			}
		],
		triggers: [
			{
				name: 'Stream Deck',
				children: [
					createKeyDownTrigger(),
					createKeyUpTrigger(),
					createDialRotateTrigger(),
					createDialDownTrigger(),
					createDialUpTrigger(),
					createTouchTapTrigger(),
					createWillAppearTrigger(),
					createWillDisappearTrigger(),
					createConnectedTrigger(),
					createDisconnectedTrigger()
				]
			}
		],
		handlers: [
			{
				name: 'Stream Deck',
				children: [
					createSetTitleHandler(app),
					createSetImageHandler(app),
					createSetStateHandler(app),
					createShowOkHandler(app),
					createShowAlertHandler(app),
					createSetButtonSettingsHandler(app)
				]
			}
		],
		onLoad: async ({ app: pluginApp }) => {
			registerStreamDeckApi(pluginApp, streamDeck);
		},
		onEnable: async ({ app: pluginApp }) => {
			registerStreamDeckApi(pluginApp, streamDeck);
		},
		onDisable: async ({ app: pluginApp }) => {
			pluginApp.api.unregisterMethods();
			streamDeck.reset();
		}
	};
};

export default plugin;
