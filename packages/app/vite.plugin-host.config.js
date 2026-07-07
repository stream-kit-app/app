import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';

import {
	createPluginHostViteEntries,
	getGeneratedVendorDir,
	getPluginHostUiSubpaths
} from './plugin-host-config.mjs';

const root = path.dirname(fileURLToPath(import.meta.url));
const vendorDir = getGeneratedVendorDir(root);
const outDir = path.resolve(root, 'static/plugin-host');

export default defineConfig({
	// Workers and chunks must resolve under /plugin-host/ (see plugin-host-url.ts).
	base: '/plugin-host/',
	plugins: [
		svelte({
			configFile: false,
			compilerOptions: {
				css: 'injected'
			}
		})
	],
	resolve: {
		alias: {
			$lib: path.resolve(root, 'src/lib'),
			'@stream-kit/ui-internal': path.resolve(root, '../ui/src/lib')
		}
	},
	build: {
		outDir,
		emptyOutDir: true,
		cssCodeSplit: false,
		lib: {
			entry: createPluginHostViteEntries(vendorDir, getPluginHostUiSubpaths()),
			formats: ['es']
		},
		rollupOptions: {
			output: {
				entryFileNames: '[name].js',
				chunkFileNames: 'chunks/[name]-[hash].js'
			}
		}
	},
	worker: {
		format: 'es'
	}
});
