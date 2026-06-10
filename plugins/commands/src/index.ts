import type { Plugin, PluginPageDefinition } from '@stream-kit/app/api';

import { createChatRuntime } from './lib/chat-runtime';

const commandsPage = {
	customView: 'commands',
	title: 'Commands',
	description: 'Create chat commands with their own handlers.'
} satisfies PluginPageDefinition;

const plugin: Plugin = (app) => {
	return {
		name: 'Commands',
		description: 'Chat commands with their own handlers.',
		icon: 'ri:terminal-box-line',
		dependencies: ['twitch'],
		isConfigured: () => true,
		menuItems: [
			{
				title: 'Commands',
				icon: 'ri:terminal-box-line',
				page: commandsPage
			}
		],
		onBoot: () => {
			app.commands.registerRuntime(createChatRuntime);
		}
	};
};

export default plugin;
