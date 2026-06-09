import type { MenuItem } from '../menu/types';
import type {
	ResolvedPluginMenuItemChildDefinition,
	ResolvedPluginMenuItemDefinition
} from './registration';
import type { RegisteredPlugin } from './registered-plugin.svelte';
import type { PluginPageDefinition } from './types';

export type PluginMenuPageEntry = {
	plugin: RegisteredPlugin;
	key: string;
	path: string;
	title: string;
	page: PluginPageDefinition;
};

export class PluginMenuPages {
	entries = $state.raw<PluginMenuPageEntry[]>([]);

	register(plugin: RegisteredPlugin, definitions: ResolvedPluginMenuItemDefinition[]): MenuItem[] {
		const menuItems: MenuItem[] = [];
		const entries: PluginMenuPageEntry[] = [];

		for (const definition of definitions) {
			const itemKey = definition.key;
			const hasChildren = (definition.children?.length ?? 0) > 0;
			const path = this.createPath(plugin.key, itemKey);
			const children = definition.children?.map((child) => {
				const childKey = child.key;
				const childPath = this.createPath(plugin.key, itemKey, childKey);
				entries.push(this.createEntry(plugin, child, childPath, `${itemKey}/${childKey}`));

				return {
					path: childPath,
					title: child.title
				};
			});

			if (!hasChildren && definition.page) {
				entries.push(this.createEntry(plugin, definition, path, itemKey));
			}

			menuItems.push({
				path,
				title: definition.title,
				icon: definition.icon,
				isGroupOnly: hasChildren,
				children
			});
		}

		this.entries = [
			...this.entries.filter((entry) => entry.plugin.key !== plugin.key),
			...entries
		];

		return menuItems;
	}

	unregister(pluginKey: string): void {
		this.entries = this.entries.filter((entry) => entry.plugin.key !== pluginKey);
	}

	resolve(pluginKey: string, itemKey: string, childKey?: string): PluginMenuPageEntry | undefined {
		const key = childKey ? `${itemKey}/${childKey}` : itemKey;
		return this.entries.find((entry) => entry.plugin.key === pluginKey && entry.key === key);
	}

	createPath(pluginKey: string, itemKey: string, childKey?: string): string {
		const encodedPluginKey = encodeURIComponent(pluginKey);
		const encodedItemKey = encodeURIComponent(itemKey);

		if (childKey) {
			return `/plugins/${encodedPluginKey}/${encodedItemKey}/${encodeURIComponent(childKey)}`;
		}

		return `/plugins/${encodedPluginKey}/${encodedItemKey}`;
	}

	private createEntry(
		plugin: RegisteredPlugin,
		definition: ResolvedPluginMenuItemDefinition | ResolvedPluginMenuItemChildDefinition,
		path: string,
		key: string
	): PluginMenuPageEntry {
		if (!definition.page) {
			throw new Error(`Plugin menu page "${key}" must define a page`);
		}

		return {
			plugin,
			key,
			path,
			title: definition.title,
			page: definition.page
		};
	}
}
