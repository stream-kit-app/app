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
		include: ['monaco-editor']
	},
	ssr: {
		noExternal: [
			'@stream-kit/app',
			'@stream-kit/ui',
			'@stream-kit/plugin-commands',
			'@stream-kit/plugin-obs',
			'@stream-kit/plugin-twitch',
			'@stream-kit/plugin-youtube',
			'@stream-kit/plugin-tts',
			'@stream-kit/plugin-handlers',
			'@stream-kit/plugin-websocket',
		]
	}
}));
