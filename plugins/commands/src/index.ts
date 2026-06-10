import type { Plugin } from '@stream-kit/app/api';

import { createChatRuntime } from './lib/chat-runtime';

const plugin: Plugin = (app) => ({
	name: 'Commands',
	description: 'Chat commands with their own handlers.',
	dependencies: ['twitch'],
	onBoot: () => {
		app.commands.registerRuntime(createChatRuntime);
	}
});

export default plugin;
