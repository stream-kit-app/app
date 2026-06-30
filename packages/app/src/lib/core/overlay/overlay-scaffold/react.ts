import { viteBuildConfig, viteWsProxyConfig } from './shared';

export function reactScaffold(slug: string, overlayId: string) {
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
				react: '^19.2.0',
				'react-dom': '^19.2.0'
			},
			devDependencies: {
				'@types/react': '^19.2.2',
				'@types/react-dom': '^19.2.2',
				'@vitejs/plugin-react': '^5.1.0',
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
			content: `import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
	${viteBuildConfig()}
	plugins: [react()],
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
		<script type="module" src="/src/main.tsx"></script>
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
			path: 'src/main.tsx',
			content: `import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './App';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<App />
	</StrictMode>
);
`
		},
		{
			path: 'src/App.tsx',
			content: `import { useEffect, useState } from 'react';

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
		<main style={{ padding: '1rem', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>
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
