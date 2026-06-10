import type { Plugin, PluginPageDefinition } from '@stream-kit/app/api';
import type { Component } from 'svelte';

import { Commands } from './app/lib/commands.svelte';
import CommandsPage from './app/ui/commands-page.svelte';
import { createChatRuntime } from './lib/chat-runtime';

const commandsPage = {
	customView: 'commands',
	title: 'Commands',
	description: 'Create chat commands with their own handlers.'
} satisfies PluginPageDefinition;

export function commandsPlugin(
	commands: Commands,
	commandsPageComponent: Component = CommandsPage
): Plugin {
	return () => ({
		name: 'Commands',
		description: 'Chat commands with their own handlers.',
		icon: 'ri:terminal-box-line',
		dependencies: ['twitch'],
		isConfigured: () => true,
		api: { commands },
		customViews: {
			commands: commandsPageComponent
		},
		menuItems: [
			{
				title: 'Commands',
				icon: 'ri:terminal-box-line',
				page: commandsPage
			}
		],
		onLoad: async () => {
			await commands.load();
		},
		onBoot: (context) => {
			commands.registerRuntime(createChatRuntime);
			commands.activate(context.app);
		},
		onEnable: async (context) => {
			await commands.load();
			commands.registerRuntime(createChatRuntime);
			commands.activate(context.app);
		},
		onDisable: () => {
			commands.deactivate();
		}
	});
}

export { Commands };
