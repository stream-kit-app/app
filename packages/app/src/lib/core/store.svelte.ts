import { LazyStore } from '@tauri-apps/plugin-store';

export class Store extends LazyStore {
	constructor() {
		super('app.json');
	}
}

export const store = new Store();
