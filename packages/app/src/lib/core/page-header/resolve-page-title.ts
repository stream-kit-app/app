import type { MenuItem, MenuItemLink } from '../menu/types';
import { isMenuItemLink } from '../menu/types';
import type { PluginMenuPageEntry } from '../plugins/plugin-menu-pages.svelte';

import { translate } from '$lib/i18n';

export type ResolvedPageTitle = {
	title: string;
	segments: string[];
};

function translateTitle(title: string): string {
	return translate(title as Parameters<typeof translate>[0]);
}

function menuLinks(items: MenuItem[]): MenuItemLink[] {
	return items.filter(isMenuItemLink);
}

function findMenuChild(
	items: MenuItem[],
	pathname: string
): { parent: MenuItemLink; childTitle: string } | undefined {
	for (const item of menuLinks(items)) {
		const child = item.children?.find((entry) => entry.path === pathname);

		if (child?.title) {
			return { parent: item, childTitle: child.title };
		}
	}

	return undefined;
}

function findMenuItem(items: MenuItem[], pathname: string): MenuItemLink | undefined {
	return menuLinks(items).find((item) => item.path === pathname);
}

function findPluginPageEntry(
	entries: PluginMenuPageEntry[],
	pathname: string
): PluginMenuPageEntry | undefined {
	return entries.find((entry) => entry.path === pathname);
}

function findPluginParentTitle(items: MenuItem[], pathname: string): string | undefined {
	for (const item of menuLinks(items)) {
		const child = item.children?.find((entry) => entry.path === pathname);

		if (child && item.title) {
			return item.title;
		}
	}

	return undefined;
}

function pathnameFallback(pathname: string): ResolvedPageTitle {
	const segment = pathname.split('/').filter(Boolean).at(-1);

	return {
		title: segment ? segment.replace(/-/g, ' ') : translate('Stream Kit'),
		segments: []
	};
}

export function resolvePageTitle(
	pathname: string,
	menuItems: MenuItem[],
	pluginEntries: PluginMenuPageEntry[]
): ResolvedPageTitle {
	if (pathname === '/overlays/new') {
		return {
			title: translate('New overlay'),
			segments: [translate('Overlays')]
		};
	}

	const pluginEntry = findPluginPageEntry(pluginEntries, pathname);

	if (pluginEntry) {
		const parentTitle = findPluginParentTitle(menuItems, pathname);

		return {
			title: pluginEntry.title,
			segments: parentTitle ? [translateTitle(parentTitle)] : []
		};
	}

	const menuChild = findMenuChild(menuItems, pathname);

	if (menuChild) {
		return {
			title: translateTitle(menuChild.childTitle),
			segments: menuChild.parent.title ? [translateTitle(menuChild.parent.title)] : []
		};
	}

	const menuItem = findMenuItem(menuItems, pathname);

	if (menuItem?.title) {
		return {
			title: translateTitle(menuItem.title),
			segments: []
		};
	}

	const prefixItem = [...menuLinks(menuItems)]
		.filter((item) => item.path !== '/' && pathname.startsWith(`${item.path}/`))
		.sort((a, b) => b.path.length - a.path.length)[0];

	if (prefixItem?.title) {
		return {
			title: translateTitle(prefixItem.title),
			segments: []
		};
	}

	if (pathname === '/') {
		return {
			title: translate('Dashboard'),
			segments: []
		};
	}

	return pathnameFallback(pathname);
}
