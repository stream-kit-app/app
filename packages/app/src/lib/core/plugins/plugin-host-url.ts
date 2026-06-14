export function getPluginHostUrl(fileName: string): string {
	return new URL(`/plugin-host/${fileName}`, window.location.origin).href;
}

let pluginHostSvelteModule: typeof import('svelte') | undefined;

export async function importPluginHostSvelte(): Promise<typeof import('svelte')> {
	const module =
		pluginHostSvelteModule ?? (await import(/* @vite-ignore */ getPluginHostUrl('svelte.js')));
	pluginHostSvelteModule = module;
	return module;
}
