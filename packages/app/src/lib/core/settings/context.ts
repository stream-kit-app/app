import type { SettingsFieldValue } from './field';

export type SettingsContext<TSettings = unknown, TApp = unknown> = {
	app: TApp;
	settings: TSettings;
	getValue: (key: string) => SettingsFieldValue | undefined;
};

export type SettingsVisibilityContext = SettingsContext;
