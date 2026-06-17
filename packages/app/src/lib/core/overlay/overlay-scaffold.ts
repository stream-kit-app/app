import type { OverlayProjectFile } from './types';

import { DEFAULT_OVERLAY_PORT } from './types';

/**
 * Vendored copy of `@stream-kit/overlay-sdk`. The exported project aliases the
 * `@stream-kit/overlay-sdk` import to this file so the user's source keeps working
 * without depending on a private package.
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
	},
	server: {
		proxy: {
			'/ws': {
				target: 'http://127.0.0.1:${DEFAULT_OVERLAY_PORT}',
				ws: true,
				changeOrigin: true
			}
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
		include: ['src/**/*.ts', 'src/**/*.svelte', 'src/**/*.d.ts', 'vendor/**/*.ts']
	},
	null,
	2
)}\n`;

const INDEX_HTML = (name: string, overlayId: string): string => `<!DOCTYPE html>
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
			window.__OVERLAY_CONTEXT__ = { overlayId: ${JSON.stringify(overlayId)}, context: {} };
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

## Live events in dev

\`pnpm run dev\` proxies WebSocket traffic from \`/ws\` to the Stream Kit overlay server
(default \`http://127.0.0.1:${DEFAULT_OVERLAY_PORT}\`). Start Stream Kit and keep the overlay
server running while developing. The overlay id in \`index.html\` is managed by Stream Kit.

## Project structure

- \`src/App.svelte\` is the overlay entry component.
- \`src/main.ts\` mounts the overlay into the page.
- \`vendor/overlay-sdk\` is a local copy of \`@stream-kit/overlay-sdk\`. The Vite and
  TypeScript configs alias \`@stream-kit/overlay-sdk\` to this folder so the original
  imports keep working.

## Connecting from outside Stream Kit

If you copy this project elsewhere, set \`window.__OVERLAY_CONTEXT__.overlayId\` in
\`index.html\` and configure the Vite \`/ws\` proxy target to your overlay server.
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

export function getOverlayScaffoldFiles(name: string, overlayId: string): OverlayProjectFile[] {
	const slug = overlayProjectSlug(name);

	return [
		{ path: 'package.json', content: PACKAGE_JSON(slug) },
		{ path: 'vite.config.ts', content: VITE_CONFIG },
		{ path: 'svelte.config.js', content: SVELTE_CONFIG },
		{ path: 'tsconfig.json', content: TSCONFIG },
		{ path: 'index.html', content: INDEX_HTML(name, overlayId) },
		{ path: '.gitignore', content: GITIGNORE },
		{ path: 'README.md', content: README(name) },
		{ path: 'src/main.ts', content: MAIN_TS },
		{ path: 'src/vite-env.d.ts', content: APP_D_TS },
		{ path: 'vendor/overlay-sdk/index.ts', content: VENDORED_OVERLAY_SDK }
	];
}

/** Scaffold paths refreshed on every ensure, even when the file already exists. */
export function getOverlayScaffoldRefreshPaths(): string[] {
	return ['vite.config.ts', 'index.html'];
}

/** Scaffold paths that are refreshed when the overlay display name changes. */
export function getOverlayScaffoldMetadataPaths(): string[] {
	return ['package.json', 'index.html', 'README.md'];
}

export function getOverlayScaffoldFile(
	name: string,
	overlayId: string,
	path: string
): OverlayProjectFile | undefined {
	return getOverlayScaffoldFiles(name, overlayId).find((file) => file.path === path);
}
