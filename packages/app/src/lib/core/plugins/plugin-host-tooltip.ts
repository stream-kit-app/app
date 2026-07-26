import { getPluginHostUrl, importPluginHostSvelte } from './plugin-host-url';

type MountedTooltip = Record<string, unknown>;

let tooltipMountPromise: Promise<void> | null = null;
let tooltipInstance: MountedTooltip | undefined;

/**
 * Plugin custom views / modals / widgets mount with the plugin-host Svelte
 * runtime. Their `{@attach tooltip(tooltipSnippet(...))}` payloads must be
 * rendered by a Tooltip.Root in that same runtime — the app layout provider
 * cannot `{@render}` foreign snippets (null.nodes crash).
 */
export async function ensurePluginHostTooltipProvider(): Promise<void> {
	if (typeof document === 'undefined') {
		return;
	}

	if (tooltipInstance) {
		return;
	}

	if (tooltipMountPromise) {
		await tooltipMountPromise;
		return;
	}

	tooltipMountPromise = (async () => {
		const [{ mount }, tooltipModule] = await Promise.all([
			importPluginHostSvelte(),
			import(/* @vite-ignore */ getPluginHostUrl('@stream-kit/ui/tooltip.js')) as Promise<{
				TooltipProvider: import('svelte').Component;
			}>
		]);

		if (tooltipInstance) {
			return;
		}

		let target = document.getElementById('stream-kit-plugin-host-tooltip');

		if (!target) {
			target = document.createElement('div');
			target.id = 'stream-kit-plugin-host-tooltip';
			document.body.append(target);
		}

		tooltipInstance = mount(tooltipModule.TooltipProvider, {
			target
		}) as MountedTooltip;
	})();

	try {
		await tooltipMountPromise;
	} finally {
		tooltipMountPromise = null;
	}
}
