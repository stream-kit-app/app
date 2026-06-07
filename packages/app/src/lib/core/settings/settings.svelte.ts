import type { SettingsSectionProps } from './types';

export class Settings {
	// App-level settings live here. Plugin settings are managed by app.plugins.
	_items: SettingsSectionProps[] = $state.raw([]);

	async load(): Promise<void> {}

	async save(_key: string): Promise<boolean> {
		return false;
	}
}
