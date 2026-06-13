import path from 'node:path';

import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

import { isPluginHostExternal } from '../packages/app/plugin-host-config.mjs';

export function createPluginViteBuildConfig(options = {}) {
	return defineConfig(async () => {
		const { root = process.cwd() } = options;
		const workspaceRoot = path.resolve(root, '../..');
		const appRoot = path.resolve(workspaceRoot, 'packages/app/src');

		const { svelte } = await import('@sveltejs/vite-plugin-svelte');

		return {
			plugins: [
				svelte(),
				nodePolyfills({
					include: ['buffer', 'events', 'process', 'stream', 'util'],
					exclude: ['fs']
				})
			],
			resolve: {
				alias: {
					'@stream-kit/plugin/action-ui': path.resolve(
						appRoot,
						'lib/components/core/action'
					),
					'@stream-kit/plugin/utils': path.resolve(appRoot, 'lib/utils.ts')
				}
			},
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
}
