import type { Plugin } from '@stream-kit/app/api';

import { createGreetHandler } from './handler/greet';

const plugin: Plugin = (app) => {
	const twitch = app.plugins.get('twitch');

	return {
		key: 'hello-world',
		name: 'Hello World',
		description: 'Example Stream Kit plugin with a greeting action.',
		icon: 'ri:hand-heart-line',
		handlers: [createGreetHandler()],
		isConfigured: () => true,
		onBoot: () => {
			app.toast.create({
				title: 'Hello World',
				description: 'The example plugin is active.',
				variant: 'success'
			});
		}
	};
};

export default plugin;
