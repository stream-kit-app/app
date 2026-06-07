import { LazyStore } from '@tauri-apps/plugin-store';

export class Store extends LazyStore {
	constructor() {
		super('app.json');
	}

	twitch = {
		getAccessToken: () => this.get<string>('twitch.access_token'),
		setAccessToken: (access_token: string) => this.set('twitch.access_token', access_token),
		removeAccessToken: () => this.delete('twitch.access_token'),
		onAccessTokenChange: (callback: (value: string | undefined) => void) =>
			this.onKeyChange('twitch.access_token', callback)
	};
}

export const store = new Store();
