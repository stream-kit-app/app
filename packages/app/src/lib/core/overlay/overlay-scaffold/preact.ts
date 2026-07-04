import { overlayTsContent, viteBuildConfig, viteWsProxyConfig } from './shared';

export function preactScaffold(slug: string, overlayId: string) {
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
				preact: '^10.27.2'
			},
			devDependencies: {
				'@preact/preset-vite': '^2.10.2',
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
			content: `import preact from '@preact/preset-vite';
import { defineConfig } from 'vite';

export default defineConfig({
	${viteBuildConfig()}
	plugins: [preact()],
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
						jsx: 'react-jsx',
						jsxImportSource: 'preact',
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
		<script type="module" src="/src/main.tsx"></script>
	</body>
</html>
`
		},
		{
			path: 'src/overlay.ts',
			content: overlayTsContent(overlayId)
		},
		{
			path: 'src/main.tsx',
			content: `import { render } from 'preact';

import { App } from './App';

render(<App />, document.getElementById('app')!);
`
		},
		{
			path: 'src/App.tsx',
			content: `import { useEffect, useState } from 'preact/hooks';

import { connectOverlay } from './overlay';

export function App() {
	const [lastEvent, setLastEvent] = useState('Waiting for events…');

	useEffect(() => {
		connectOverlay({
			event: (payload) => {
				setLastEvent(JSON.stringify(payload));
			}
		});
	}, []);

	return (
		<main style={{ padding: '1rem', fontFamily: 'system-ui, sans-serif' }}>
			<p>Overlay ready. Edit <code>src/App.tsx</code> to customize.</p>
			<p>Overlay ID: ${overlayId}</p>
			<p>{lastEvent}</p>
		</main>
	);
}
`
		}
	];
}
