import type { MenuItem, MenuItemChild, MenuItemLink } from './types';
import { isMenuItemLink, isMenuSectionLabel } from './types';

const SETTINGS_MENU_PATH = '/settings';
const PLUGINS_SECTION_PATH = '__section_plugins__';

export class Menu {
	items = $state.raw<MenuItem[]>([]);

	add(item: MenuItemLink): MenuItemLink {
		if (this.find(item.path)) {
			throw new Error(`MenuItem with path ${item.path} already exists`);
		}

		this.items = [...this.items, { ...item, kind: item.kind ?? 'item', fromPlugin: false }];
		this.sortItems();

		return item;
	}

	addPlugin(item: MenuItemLink): MenuItemLink {
		if (this.find(item.path)) {
			throw new Error(`MenuItem with path ${item.path} already exists`);
		}

		this.items = [...this.items, { ...item, kind: item.kind ?? 'item', fromPlugin: true }];
		this.sortItems();

		return item;
	}

	remove(path: string): void {
		this.items = this.items.filter((item) => item.path !== path);
		this.sortItems();
	}

	private sortItems(): void {
		const withoutLabels = this.items.filter((item) => !isMenuSectionLabel(item));
		const settingsItem = withoutLabels.find(
			(item) => isMenuItemLink(item) && item.path === SETTINGS_MENU_PATH
		);
		const otherItems = withoutLabels.filter(
			(item) => !(isMenuItemLink(item) && item.path === SETTINGS_MENU_PATH)
		);
		const coreItems = otherItems.filter((item) => isMenuItemLink(item) && !item.fromPlugin);
		const pluginItems = otherItems.filter((item) => isMenuItemLink(item) && item.fromPlugin);

		const ordered: MenuItem[] = [...coreItems];

		if (pluginItems.length > 0) {
			ordered.push({
				kind: 'label',
				path: PLUGINS_SECTION_PATH,
				title: 'Plugins'
			});
			ordered.push(...pluginItems);
		}

		this.items = settingsItem ? [...ordered, settingsItem] : ordered;
	}

	find(path: string): MenuItem | undefined {
		return this.items.find((item) => item.path === path);
	}

	setChildren(path: string, children: MenuItemChild[] | undefined): void {
		const item = this.find(path);

		if (!item || !isMenuItemLink(item)) {
			return;
		}

		const index = this.items.indexOf(item);
		this.items = [
			...this.items.slice(0, index),
			{ ...item, children },
			...this.items.slice(index + 1)
		];
	}
}
