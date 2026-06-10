// Tauri doesn't have a Node.js server to do proper SSR
// so we use adapter-static with a fallback to index.html to put the site in SPA mode
// See: https://svelte.dev/docs/kit/single-page-apps

import { createI18n } from '@svelte-i18n/core';

import { app } from '$lib/core';
import { getSavedLocale } from '$lib/core/locale/store';

// See: https://v2.tauri.app/start/frontend/sveltekit/ for more info
export const ssr = false;

export const load = async () => {
	const savedLocale = (await getSavedLocale()) ?? 'en';

	const i18n = await createI18n({
		locales: ['en', 'nl'],
		locale: savedLocale,
		fallbackLocale: 'en',
		dictionaries: {
			en: async () => (await import('$lib/locales/en.json')).default,
			nl: async () => (await import('$lib/locales/nl.json')).default
		}
	});

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
		path: '/plugins',
		title: 'Plugins',
		icon: 'ri:plug-line'
	});
	app.menu.add({
		path: '/settings',
		title: 'Settings',
		icon: 'ri:settings-5-line'
	});

	return { i18n };
};
