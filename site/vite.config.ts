import path from 'node:path';
import { fileURLToPath } from 'node:url';

import tailwindcss from '@tailwindcss/vite';
import adapter from '@sveltejs/adapter-node';
import { sveltekit } from '@sveltejs/kit/vite';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { defineConfig, loadEnv } from 'vite';

import { overlayWsPlugin } from './overlay-ws/vite-plugin.mjs';

const workspaceRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

export default defineConfig(async ({ mode }) => {
	const env = loadEnv(mode, path.dirname(fileURLToPath(import.meta.url)), '');

	return {
		plugins: [
			tailwindcss(),
			...(await sveltekit({
				preprocess: vitePreprocess(),
				adapter: adapter(),
				experimental: {
					remoteFunctions: true,
					handleRenderingErrors: true
				},
				compilerOptions: {
					runes: ({ filename }) =>
						filename.split(/[/\\]/).includes('node_modules') ? undefined : true,
					experimental: { async: true }
				}
			})),
			overlayWsPlugin({
				pocketbaseUrl: env.PUBLIC_POCKETBASE_URL
			})
		],
		server: {
			fs: {
				allow: [workspaceRoot]
			}
		},
		ssr: {
			noExternal: ['@stream-kit/ui', 'bits-ui', 'runed', '@iconify/svelte']
		}
	};
});
