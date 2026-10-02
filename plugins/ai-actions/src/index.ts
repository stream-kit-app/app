import type { Plugin, PluginPageDefinition } from '@stream-kit/plugin';

import AiActionsPage from './app/ui/ai-actions-page.svelte';

const aiActionsPage = {
	customView: 'ai-actions',
	title: 'AI Actions',
	description: 'Describe an action in plain language and let AI build it.'
} as unknown as PluginPageDefinition;

const plugin: Plugin = (app) => {
	return {
		name: 'AI Actions',
		description: 'Describe an action in plain language and let AI build it.',
		icon: 'ri:sparkling-2-line',
		isConfigured: () => app.auth.user?.subscription != null,
		customViews: {
			'ai-actions': AiActionsPage
		},
		menuItems: [
			{
				title: 'AI Actions',
				icon: 'ri:sparkling-2-line',
				children: [{ title: 'Create with AI', page: aiActionsPage }]
			}
		]
	};
};

export default plugin;
