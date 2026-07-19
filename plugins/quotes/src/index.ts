import type { Plugin, PluginPageDefinition } from '@stream-kit/plugin';

import QuotesPage from './app/ui/quotes-page.svelte';
import { createAddQuoteHandler } from './handler/add-quote';
import { createDeleteQuoteHandler } from './handler/delete-quote';
import { createSendQuoteMessageHandler } from './handler/send-quote-message';
import { quotes as quotesService } from './lib/instances';
import { seedQuotesDefaults } from './lib/seed-defaults';

export type { QuotesPluginApi } from './lib/plugin-api';

const quotesPage = {
	customView: 'quotes',
	title: 'Quotes',
	description: 'Browse, add, and edit saved quotes.'
} as unknown as PluginPageDefinition;

const plugin: Plugin = (app) => {
	return {
		name: 'Quotes',
		description: 'Save and recall memorable chat quotes.',
		icon: 'ri:double-quotes-l',
		dependencies: ['core', 'bot', 'twitch'],
		isConfigured: () => quotesService.isReady,
		api: {
			quotes: quotesService
		},
		customViews: {
			quotes: QuotesPage
		},
		menuItems: [
			{
				title: 'Quotes',
				icon: 'ri:double-quotes-l',
				children: [{ title: 'Quotes', page: quotesPage }]
			}
		],
		handlers: [
			{
				name: 'Quotes',
				children: [
					createAddQuoteHandler(app, quotesService),
					createSendQuoteMessageHandler(app, quotesService),
					createDeleteQuoteHandler(app, quotesService)
				]
			}
		],
		onLoad: async ({ store, app: pluginApp }) => {
			quotesService.bind(store, pluginApp);
			await quotesService.load();
		},
		onEnable: async ({ store, app: pluginApp, pluginKey }) => {
			quotesService.bind(store, pluginApp);
			await quotesService.load();
			await seedQuotesDefaults(pluginApp, pluginKey, store);
		},
		onReady: async ({ store, app: pluginApp, pluginKey }) => {
			quotesService.bind(store, pluginApp);
			await quotesService.load();
			await seedQuotesDefaults(pluginApp, pluginKey, store);
		}
	};
};

export default plugin;
