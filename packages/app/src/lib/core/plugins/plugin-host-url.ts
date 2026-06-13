export function getPluginHostUrl(fileName: string): string {
	return new URL(`/plugin-host/${fileName}`, window.location.origin).href;
}

let pluginHostSvelteModule: typeof import('svelte') | undefined;

export async function importPluginHostSvelte(): Promise<typeof import('svelte')> {
	if (!pluginHostSvelteModule) {
		pluginHostSvelteModule = await import(/* @vite-ignore */ getPluginHostUrl('svelte.js'));
	}

	return pluginHostSvelteModule;
}
