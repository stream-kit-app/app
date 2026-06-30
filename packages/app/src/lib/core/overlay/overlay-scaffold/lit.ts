import { viteBuildConfig, viteWsProxyConfig } from './shared';

export function litScaffold(slug: string, overlayId: string) {
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
				lit: '^3.3.1'
			},
			devDependencies: {
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

export default defineConfig({
	${viteBuildConfig()}
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
						experimentalDecorators: true,
						useDefineForClassFields: false,
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
		<stream-kit-overlay></stream-kit-overlay>
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
			content: `import './overlay-app';
`
		},
		{
			path: 'src/overlay-app.ts',
			content: `import { css, html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import { connectOverlay } from './overlay';

@customElement('stream-kit-overlay')
export class StreamKitOverlay extends LitElement {
	@state()
	private lastEvent = 'Waiting for events…';

	connectedCallback(): void {
		super.connectedCallback();

		connectOverlay({
			event: (payload) => {
				this.lastEvent = JSON.stringify(payload);
			}
		});
	}

	render() {
		return html\`
			<main>
				<p>Overlay ready. Edit <code>src/overlay-app.ts</code> to customize.</p>
				<p>Overlay ID: ${overlayId}</p>
				<p>\${this.lastEvent}</p>
			</main>
		\`;
	}

	static styles = css\`
		:host {
			display: block;
			color: #fff;
			font-family: system-ui, sans-serif;
		}

		main {
			padding: 1rem;
		}

		code {
			font-family: ui-monospace, monospace;
		}
	\`;
}

declare global {
	interface HTMLElementTagNameMap {
		'stream-kit-overlay': StreamKitOverlay;
	}
}
`
		}
	];
}
