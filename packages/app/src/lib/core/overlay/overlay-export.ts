import type { OverlayProjectFile } from './types';

import { strToU8, zipSync, type Zippable } from 'fflate';

import { OVERLAY_ENTRY_PATH, isTemporaryOverlayPath } from './overlay-source-file';

export type OverlayExportInput = {
	/** Human readable overlay name, used for the folder and zip file name. */
	name: string;
	/** Persistent overlay source files (everything under src/). */
	files: OverlayProjectFile[];
};

/**
 * Vendored copy of `@stream-kit/overlay-sdk`. The exported project aliases the
 * `@stream-kit/overlay-sdk` import to this file so the user's source keeps working
 * without depending on a private package. An empty `overlayId` keeps the runtime
 * from opening a websocket, which is the right default for standalone previews.
 */
const VENDORED_OVERLAY_SDK = `export type OverlayHandler<T = unknown> = (payload: T) => void;

export type OverlayContextEnvelope = {
	overlayId: string;
	context: Record<string, unknown>;
};

export type OverlayBroadcastMessage = {
	overlayId: string;
	event: string;
	payload: unknown;
	timestamp: number;
};

export type CreateOverlayOptions = {
	handlers?: Record<string, OverlayHandler>;
	onConnect?: () => void;
	onDisconnect?: () => void;
};

export type OverlayRuntime = {
	context: Record<string, unknown>;
	overlayId: string;
	send: (event: string, payload: unknown) => void;
};

declare global {
	interface Window {
		__OVERLAY_CONTEXT__?: OverlayContextEnvelope;
	}
}

function readEnvelope(): OverlayContextEnvelope {
	const envelope = window.__OVERLAY_CONTEXT__;

	if (!envelope || typeof envelope !== 'object') {
		return { overlayId: '', context: {} };
	}

	return {
		overlayId: typeof envelope.overlayId === 'string' ? envelope.overlayId : '',
		context:
			envelope.context && typeof envelope.context === 'object'
				? (envelope.context as Record<string, unknown>)
				: {}
	};
}

function resolveWebSocketUrl(overlayId: string): string {
	const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
	const host = window.location.host;
	const params = new URLSearchParams({ overlayId });

	return \`\${protocol}//\${host}/ws?\${params.toString()}\`;
}

export function createOverlay(options: CreateOverlayOptions = {}): OverlayRuntime {
	const envelope = readEnvelope();
	const overlayId = envelope.overlayId;
	const handlers = options.handlers ?? {};

	let socket: WebSocket | null = null;
	let reconnectAttempt = 0;
	let reconnectTimer: ReturnType<typeof setTimeout> | null = null;
	let disposed = false;

	const connect = () => {
		if (disposed || !overlayId) {
			return;
		}

		socket = new WebSocket(resolveWebSocketUrl(overlayId));

		socket.addEventListener('open', () => {
			reconnectAttempt = 0;
			options.onConnect?.();
		});

		socket.addEventListener('message', (event) => {
			try {
				const message = JSON.parse(String(event.data)) as OverlayBroadcastMessage;
				const handler = handlers[message.event];

				if (handler) {
					handler(message.payload);
				}
			} catch {
				// Ignore malformed messages from the overlay server.
			}
		});

		socket.addEventListener('close', () => {
			options.onDisconnect?.();

			if (disposed) {
				return;
			}

			const delay = Math.min(1000 * 2 ** reconnectAttempt, 30_000);
			reconnectAttempt += 1;
			reconnectTimer = setTimeout(connect, delay);
		});
	};

	connect();

	return {
		overlayId,
		context: envelope.context,
		send: (event, payload) => {
			if (!socket || socket.readyState !== WebSocket.OPEN) {
				return;
			}

			socket.send(
				JSON.stringify({
					event,
					payload,
					timestamp: Date.now()
				})
			);
		}
	};
}
`;

const PACKAGE_JSON = (name: string): string =>
	`${JSON.stringify(
		{
			name,
			private: true,
			version: '0.0.0',
			type: 'module',
			scripts: {
				dev: 'vite',
				build: 'vite build',
				preview: 'vite preview',
				check: 'svelte-check --tsconfig ./tsconfig.json'
			},
			devDependencies: {
				'@sveltejs/vite-plugin-svelte': '^7.1.2',
				svelte: '^5.56.1',
				'svelte-check': '^4.5.0',
				typescript: '~6.0.3',
				vite: '^8.0.16'
			}
		},
		null,
		2
	)}\n`;

const VITE_CONFIG = `import { fileURLToPath } from 'node:url';

import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [svelte()],
	resolve: {
		alias: {
			'@stream-kit/overlay-sdk': fileURLToPath(
				new URL('./vendor/overlay-sdk/index.ts', import.meta.url)
			)
		}
	}
});
`;

const SVELTE_CONFIG = `import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default {
	preprocess: vitePreprocess(),
	compilerOptions: {
		runes: true
	}
};
`;

const TSCONFIG = `${JSON.stringify(
	{
		compilerOptions: {
			target: 'ESNext',
			module: 'ESNext',
			moduleResolution: 'bundler',
			resolveJsonModule: true,
			allowImportingTsExtensions: true,
			verbatimModuleSyntax: true,
			isolatedModules: true,
			strict: true,
			skipLibCheck: true,
			noEmit: true,
			types: ['svelte', 'vite/client'],
			baseUrl: '.',
			paths: {
				'@stream-kit/overlay-sdk': ['./vendor/overlay-sdk/index.ts']
			}
		},
		include: ['src/**/*.ts', 'src/**/*.svelte', 'vendor/**/*.ts']
	},
	null,
	2
)}\n`;

const INDEX_HTML = (name: string): string => `<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>${escapeHtml(name)}</title>
		<style>
			html,
			body {
				margin: 0;
				width: 100%;
				height: 100%;
				background: transparent;
				overflow: hidden;
			}
		</style>
		<script>
			// Standalone preview context. Set overlayId to connect to a running overlay server.
			window.__OVERLAY_CONTEXT__ = { overlayId: '', context: {} };
		</script>
	</head>
	<body>
		<script type="module" src="/src/main.ts"></script>
	</body>
</html>
`;

const MAIN_TS = `import { mount } from 'svelte';

import App from './App.svelte';

const app = mount(App, { target: document.body });

export default app;
`;

const APP_D_TS = `/// <reference types="svelte" />
/// <reference types="vite/client" />

declare module '*.svelte' {
	import type { Component } from 'svelte';

	const component: Component;
	export default component;
}

export {};
`;

const GITIGNORE = `node_modules
dist
.DS_Store
`;

const README = (name: string): string => `# ${name}

Standalone export of a Stream Kit overlay, generated from the in-app overlay editor.

## Getting started

\`\`\`bash
npm install
npm run dev
\`\`\`

Then open the printed local URL in your browser.

## Project structure

- \`src/App.svelte\` is the overlay entry component.
- \`src/main.ts\` mounts the overlay into the page.
- \`vendor/overlay-sdk\` is a local copy of \`@stream-kit/overlay-sdk\`. The Vite and
  TypeScript configs alias \`@stream-kit/overlay-sdk\` to this folder so the original
  imports keep working.

## Connecting to a live overlay server

The overlay renders standalone with no events. To receive live events, set
\`window.__OVERLAY_CONTEXT__.overlayId\` in \`index.html\` to your overlay id and serve
the page from a host that also exposes the overlay websocket at \`/ws\`.
`;

function escapeHtml(value: string): string {
	return value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');
}

export function overlayProjectSlug(name: string): string {
	const slug = name
		.trim()
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');

	return slug || 'overlay';
}

/**
 * Build a standalone, runnable Svelte project archive (Vite + Svelte + TypeScript)
 * containing the overlay sources. Returns the raw zip bytes.
 */
export function buildOverlayProjectZip(input: OverlayExportInput): Uint8Array {
	const slug = overlayProjectSlug(input.name);
	const tree: Zippable = {
		'package.json': strToU8(PACKAGE_JSON(slug)),
		'vite.config.ts': strToU8(VITE_CONFIG),
		'svelte.config.js': strToU8(SVELTE_CONFIG),
		'tsconfig.json': strToU8(TSCONFIG),
		'index.html': strToU8(INDEX_HTML(input.name)),
		'.gitignore': strToU8(GITIGNORE),
		'README.md': strToU8(README(input.name)),
		'src/main.ts': strToU8(MAIN_TS),
		'src/vite-env.d.ts': strToU8(APP_D_TS),
		'vendor/overlay-sdk/index.ts': strToU8(VENDORED_OVERLAY_SDK)
	};

	const persistentFiles = input.files.filter((file) => !isTemporaryOverlayPath(file.path));
	const hasEntry = persistentFiles.some((file) => file.path === OVERLAY_ENTRY_PATH);

	if (!hasEntry) {
		throw new Error(`Overlay export is missing ${OVERLAY_ENTRY_PATH}`);
	}

	for (const file of persistentFiles) {
		tree[file.path] = strToU8(file.content);
	}

	return zipSync(tree, { level: 6 });
}
