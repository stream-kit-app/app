// Tauri doesn't have a Node.js server to do proper SSR
// so we use adapter-static with a fallback to index.html to put the site in SPA mode
// See: https://svelte.dev/docs/kit/single-page-apps

import { app } from '$lib/core';

// See: https://v2.tauri.app/start/frontend/sveltekit/ for more info
export const ssr = false;

export const load = async () => {
	app.menu.add({
		path: '/',
		title: 'Dashboard',
		icon: 'material-symbols:dashboard'
	});
	app.menu.add({
		path: '/bot',
		title: 'Bot',
		icon: 'at-icons:bot',
		children: [
			{
				path: '/bot/commands',
				title: 'Commands'
			},
			{
				path: '/bot/messages',
				title: 'Messages'
			}
		]
	});
	app.menu.add({
		path: '/actions',
		title: 'Actions',
		icon: 'carbon:trigger'
	});
	app.menu.add({
		path: '/twitch',
		title: 'Twitch',
		icon: 'ri:twitch-line'
	});
	app.menu.add({
		path: '/integrations',
		title: 'Integrations',
		icon: 'ri:plug-line'
	});
	app.menu.add({
		path: '/settings',
		title: 'Settings',
		icon: 'ri:settings-5-line'
	});

	await app.settings.load();
	app.settings.syncMenu();
	await app.actions.load();
};
