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
	updateManifestUrl?: string;
	downloadUrl?: string;
	sha256?: string;
	installPath: string;
	devSourceEntry?: string;
};

export type RegisterPluginOptions = {
	key?: string;
	source?: PluginSource;
	installPath?: string;
	version?: string;
};
