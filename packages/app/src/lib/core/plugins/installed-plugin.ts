export type PluginSource = 'installed';

export type InstalledPluginManifest = {
	key: string;
	name: string;
	version: string;
	description?: string;
	icon?: string;
	entry: string;
	dependencies: string[];
	optionalDependencies: string[];
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
	/** Required plugins from `manifest.json`; this plugin only starts when they are enabled. */
	dependencies?: string[];
	/** Plugins from `manifest.json` that only affect load order. */
	optionalDependencies?: string[];
};
