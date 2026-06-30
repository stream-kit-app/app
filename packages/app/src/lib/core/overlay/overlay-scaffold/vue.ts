import { viteBuildConfig, viteWsProxyConfig } from './shared';

export function vueScaffold(slug: string, overlayId: string) {
	const packageJson = JSON.stringify(
		{
			name: slug,
			private: true,
			version: '0.0.0',
			type: 'module',
			scripts: {
				dev: 'vite',
				build: 'vite build',
				preview: 'vite preview'
			},
			dependencies: {
				vue: '^3.5.22'
			},
			devDependencies: {
				'@vitejs/plugin-vue': '^6.0.1',
				typescript: '~6.0.3',
				vite: '^8.0.16',
				'vue-tsc': '^3.1.0'
			}
		},
		null,
		2
	);

	return [
		{ path: 'package.json', content: `${packageJson}\n` },
		{
			path: 'vite.config.ts',
			content: `import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

export default defineConfig({
	${viteBuildConfig()}
	plugins: [vue()],
	server: {
${viteWsProxyConfig()}
	}
});
`
		},
		{
			path: 'tsconfig.json',
			content: `${JSON.stringify(
				{
					compilerOptions: {
						target: 'ESNext',
						module: 'ESNext',
						moduleResolution: 'bundler',
						strict: true,
						skipLibCheck: true,
						noEmit: true,
						types: ['vite/client']
					},
					include: ['src']
				},
				null,
				2
			)}\n`
		},
		{
			path: 'index.html',
			content: `<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Stream Kit Overlay</title>
		<style>html, body { margin: 0; width: 100%; height: 100%; background: transparent; overflow: hidden; }</style>
	</head>
	<body>
		<div id="app"></div>
		<script type="module" src="/src/main.ts"></script>
	</body>
</html>
`
		},
		{
			path: 'src/overlay.ts',
			content: `const overlayId = import.meta.env.VITE_OVERLAY_ID ?? '${overlayId}';

type OverlayHandler = (payload: unknown) => void;

export function connectOverlay(handlers: Record<string, OverlayHandler> = {}): void {
	const protocol = location.protocol === 'https:' ? 'wss:' : 'ws:';
	let reconnectAttempt = 0;

	const connect = () => {
		const ws = new WebSocket(\`\${protocol}//\${location.host}/ws?overlayId=\${overlayId}\`);

		ws.onmessage = (event) => {
			try {
				const message = JSON.parse(String(event.data)) as {
					event: string;
					payload: unknown;
				};
				handlers[message.event]?.(message.payload);
			} catch {
				// Ignore malformed messages.
			}
		};

		ws.onclose = () => {
			const delay = Math.min(1000 * 2 ** reconnectAttempt, 30_000);
			reconnectAttempt += 1;
			setTimeout(connect, delay);
		};

		ws.onopen = () => {
			reconnectAttempt = 0;
		};
	};

	connect();
}
`
		},
		{
			path: 'src/main.ts',
			content: `import { createApp } from 'vue';

import App from './App.vue';

createApp(App).mount('#app');
`
		},
		{
			path: 'src/App.vue',
			content: `<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { connectOverlay } from './overlay';

const lastEvent = ref('Waiting for events…');

onMounted(() => {
	connectOverlay({
		event: (payload) => {
			lastEvent.value = JSON.stringify(payload);
		}
	});
});
</script>

<template>
	<main>
		<p>Overlay ready. Edit <code>src/App.vue</code> to customize.</p>
		<p>Overlay ID: ${overlayId}</p>
		<p>{{ lastEvent }}</p>
	</main>
</template>

<style scoped>
main {
	padding: 1rem;
	color: #fff;
	font-family: system-ui, sans-serif;
}

code {
	font-family: ui-monospace, monospace;
}
</style>
`
		},
		{
			path: 'src/vite-env.d.ts',
			content: `/// <reference types="vite/client" />

declare module '*.vue' {
	import type { DefineComponent } from 'vue';
	const component: DefineComponent;
	export default component;
}
`
		}
	];
}
