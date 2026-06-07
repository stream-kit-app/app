import type { MenuItem, MenuItemChild } from './types';

export class Menu {
	items = $state.raw<MenuItem[]>([]);

	add(item: MenuItem): MenuItem {
		if (this.find(item.path)) {
			throw new Error(`MenuItem with path ${item.path} already exists`);
		}

		this.items = [...this.items, item];

		return item;
	}

	remove(path: string): void {
		this.items = this.items.filter((item) => item.path !== path);
	}

	find(path: string): MenuItem | undefined {
		return this.items.find((item) => item.path === path);
	}

	setChildren(path: string, children: MenuItemChild[] | undefined): void {
		const item = this.find(path);

		if (!item) {
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
