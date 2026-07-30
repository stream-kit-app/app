import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, loadEnv } from 'vite';

const workspaceRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const appRoot = path.dirname(fileURLToPath(import.meta.url));

const host = process.env.TAURI_DEV_HOST;

const PRODUCTION_PUBLIC_ENV = {
	PUBLIC_POCKETBASE_URL: 'https://api.stream-kit.app',
	PUBLIC_SITE_URL: 'https://stream-kit.app'
};

/**
 * Release / `tauri build` must bake production hosts — never localhost from `.env`.
 * @param {string} mode
 * @param {'build' | 'serve'} command
 */
function assertProductionPublicEnv(mode, command) {
	if (command !== 'build' || mode !== 'production') {
		return;
	}

	const env = loadEnv(mode, appRoot, '');
	for (const [key, expected] of Object.entries(PRODUCTION_PUBLIC_ENV)) {
		const value = (env[key] ?? '').trim().replace(/\/$/, '');
		const expectedNormalized = expected.replace(/\/$/, '');
		if (value !== expectedNormalized) {
			throw new Error(
				`[vite] ${key} must be "${expected}" for production builds (got "${env[key] ?? ''}"). ` +
					`Check packages/app/.env.production — local .env localhost values must not ship in Tauri releases.`
			);
		}
	}
}

// https://vite.dev/config/
export default defineConfig(async ({ mode, command }) => {
	assertProductionPublicEnv(mode, command);

	return {
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
				'monaco-editor',
				'monaco-editor/esm/vs/editor/editor.worker',
				'monaco-editor/esm/vs/language/typescript/ts.worker',
				'monaco-editor/esm/vs/language/json/json.worker',
				'monaco-editor/esm/vs/language/css/css.worker',
				'monaco-editor/esm/vs/language/html/html.worker',
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
			noExternal: ['@stream-kit/app', '@stream-kit/ui', '@stream-kit/script-api']
		}
	};
});
