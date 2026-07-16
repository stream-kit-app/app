import path from 'node:path';

import { nodePolyfills } from 'vite-plugin-node-polyfills';

import { isPluginHostExternal } from '../packages/app/plugin-host-config.mjs';

export async function createPluginViteBuildConfig(options = {}) {
	const { root = process.cwd(), svelte } = options;

	if (!svelte) {
		throw new Error('createPluginViteBuildConfig requires the svelte plugin factory');
	}

	const workspaceRoot = path.resolve(root, '../..');
	const appRoot = path.resolve(workspaceRoot, 'packages/app/src');

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
				'$lib': path.resolve(appRoot, 'lib'),
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
}
