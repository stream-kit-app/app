export type PluginSource = 'builtin' | 'installed';

export type InstalledPluginManifest = {
	key: string;
	name: string;
	version: string;
	description?: string;
	icon?: string;
	entry: string;
	dependencies: string[];
	streamKitVersion?: string;
	installPath: string;
};

export type RegisterPluginOptions = {
	key?: string;
	source?: PluginSource;
	installPath?: string;
	version?: string;
};
