import { overlayTsContent, viteBuildConfig, viteWsProxyConfig } from './shared';

export function solidScaffold(slug: string, overlayId: string) {
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
				'solid-js': '^1.9.9'
			},
			devDependencies: {
				'vite-plugin-solid': '^2.11.8',
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
			content: `import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';

export default defineConfig({
	${viteBuildConfig()}
	plugins: [solid()],
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
						jsx: 'preserve',
						jsxImportSource: 'solid-js',
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
		<div id="root"></div>
		<script type="module" src="/src/index.tsx"></script>
	</body>
</html>
`
		},
		{
			path: 'src/overlay.ts',
			content: overlayTsContent(overlayId)
		},
		{
			path: 'src/index.tsx',
			content: `import { render } from 'solid-js/web';

import { App } from './App';

render(() => <App />, document.getElementById('root')!);
`
		},
		{
			path: 'src/App.tsx',
			content: `import { createSignal, onMount } from 'solid-js';

import { connectOverlay } from './overlay';

export function App() {
	const [lastEvent, setLastEvent] = createSignal('Waiting for events…');

	onMount(() => {
		connectOverlay({
			event: (payload) => {
				setLastEvent(JSON.stringify(payload));
			}
		});
	});

	return (
		<main style={{ padding: '1rem', 'font-family': 'system-ui, sans-serif' }}>
			<p>Overlay ready. Edit <code>src/App.tsx</code> to customize.</p>
			<p>Overlay ID: ${overlayId}</p>
			<p>{lastEvent()}</p>
		</main>
	);
}
`
		}
	];
}
