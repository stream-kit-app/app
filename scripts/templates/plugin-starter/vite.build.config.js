import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

const PLUGIN_HOST_EXTERNALS = new Set([
	'@stream-kit/plugin',
	'@stream-kit/plugin/action',
	'@stream-kit/core',
	'svelte',
	'bits-ui',
	'runed',
	'@iconify/svelte'
]);

const PLUGIN_HOST_EXTERNAL_PREFIXES = [
	'@stream-kit/core',
	'@stream-kit/ui',
	'svelte',
	'bits-ui',
	'runed',
	'@iconify/svelte'
];

function isPluginHostExternal(id) {
	if (PLUGIN_HOST_EXTERNALS.has(id)) {
		return true;
	}

	return PLUGIN_HOST_EXTERNAL_PREFIXES.some(
		(prefix) => id === prefix || id.startsWith(`${prefix}/`)
	);
}

const root = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(async () => {
	const { svelte } = await import('@sveltejs/vite-plugin-svelte');

	return {
		plugins: [
			svelte(),
			nodePolyfills({
				include: ['buffer', 'events', 'process', 'stream', 'util'],
				exclude: ['fs']
			})
		],
		build: {
			lib: {
				entry: path.resolve(root, 'src/index.ts'),
				formats: ['es'],
				fileName: 'index'
			},
			outDir: path.resolve(root, 'dist'),
			emptyOutDir: true,
			cssCodeSplit: false,
			rollupOptions: {
				external: (id) => isPluginHostExternal(id)
			},
			codeSplitting: false
		}
	};
});
