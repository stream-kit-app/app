import { overlayTsContent, viteBuildConfig, viteWsProxyConfig } from './shared';

export function svelteScaffold(slug: string, overlayId: string) {
	const packageJson = JSON.stringify(
		{
			name: slug,
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
	);

	return [
		{ path: 'package.json', content: `${packageJson}\n` },
		{
			path: 'vite.config.ts',
			content: `import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';

export default defineConfig({
	${viteBuildConfig()}
	plugins: [svelte()],
	server: {
${viteWsProxyConfig()}
	}
});
`
		},
		{
			path: 'svelte.config.js',
			content: `import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default {
	preprocess: vitePreprocess(),
	compilerOptions: {
		runes: true
	}
};
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
						types: ['svelte', 'vite/client']
					},
					include: ['src/**/*.ts', 'src/**/*.svelte']
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
		<style>
			html, body { margin: 0; width: 100%; height: 100%; background: transparent; overflow: hidden; }
		</style>
	</head>
	<body>
		<script type="module" src="/src/main.ts"></script>
	</body>
</html>
`
		},
		{
			path: 'src/main.ts',
			content: `import { mount } from 'svelte';
import App from './App.svelte';

mount(App, { target: document.body });
`
		},
		{
			path: 'src/overlay.ts',
			content: overlayTsContent(overlayId)
		},
		{
			path: 'src/App.svelte',
			content: `<script lang="ts">
	import { connectOverlay } from './overlay';

	let title = $state('Stream Kit Overlay');
	let fontSize = $state(16);
	let lastEvent = $state('Waiting for events…');

	connectOverlay({
		'overlay:settings': (payload) => {
			const config = payload as Record<string, unknown>;

			if (typeof config.title === 'string') {
				title = config.title;
			}

			if (typeof config.fontSize === 'number') {
				fontSize = config.fontSize;
			}
		},
		event: (payload) => {
			lastEvent = JSON.stringify(payload);
		},
		'test:sample': (payload) => {
			lastEvent = JSON.stringify(payload);
		}
	});
</script>

<main style:font-size="{fontSize}px">
	<h1>{title}</h1>
	<p>Overlay ready. Edit <code>src/App.svelte</code> and <code>manifest.json</code> to customize.</p>
	<p>Overlay ID: ${overlayId}</p>
	<p>{lastEvent}</p>
</main>

<style>
	:global(body) {
		margin: 0;
		font-family: system-ui, sans-serif;
		background: transparent;
	}

	main {
		padding: 1rem;
	}

	h1 {
		margin: 0 0 0.5rem;
	}

	code {
		font-family: ui-monospace, monospace;
	}
</style>
`
		},
		{
			path: 'src/vite-env.d.ts',
			content: `/// <reference types="svelte" />
/// <reference types="vite/client" />

declare module '*.svelte' {
	import type { Component } from 'svelte';
	const component: Component;
	export default component;
}
`
		}
	];
}
