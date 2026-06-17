import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

const workspaceRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

const host = process.env.TAURI_DEV_HOST;

// https://vite.dev/config/
export default defineConfig(async () => ({
	plugins: [tailwindcss(), sveltekit()],
	define: {
		'import.meta.env.VITE_STREAM_KIT_WORKSPACE_ROOT': JSON.stringify(workspaceRoot)
	},
	// Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
	//
	// 1. prevent Vite from obscuring rust errors
	clearScreen: false,

	// 2. tauri expects a fixed port, fail if that port is not available
	server: {
		port: 1420,
		strictPort: true,
		host: host || false,
		hmr: host ? { protocol: 'ws', host, port: 1421 } : undefined,
		fs: {
			allow: [workspaceRoot]
		},
		watch: {
			// 3. tell Vite to ignore watching `src-tauri`
			ignored: ['**/src-tauri/**']
		}
	},
	optimizeDeps: {
		include: [
			'@dnd-kit-svelte/svelte',
			'@dnd-kit-svelte/svelte/sortable',
			'@dnd-kit/helpers',
			'@lezer/highlight',
			'@codemirror/lint',
			'codemirror-lang-svelte',
			'@codemirror/language',
			'prettier/standalone',
			'prettier/plugins/babel',
			'prettier/plugins/estree',
			'prettier/plugins/typescript',
			'prettier/plugins/html',
			'prettier/plugins/postcss',
			'prettier-plugin-svelte/browser',
			'highlight.js/lib/core',
			'highlight.js/lib/languages/javascript',
			'highlight.js/lib/languages/typescript',
			'highlight.js/lib/languages/json'
		],
		exclude: ['svelte-language-server-web']
	},
	worker: {
		format: 'es'
	},
	ssr: {
		noExternal: ['@stream-kit/app', '@stream-kit/ui']
	}
}));
