export function vanillaScaffold(_slug: string, overlayId: string) {
	return [
		{
			path: 'dist/index.html',
			content: `<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Stream Kit Overlay</title>
		<style>
			html,
			body {
				margin: 0;
				width: 100%;
				height: 100%;
				background: transparent;
				overflow: hidden;
				font-family: system-ui, sans-serif;
			}

			main {
				padding: 1rem;
			}

			code {
				font-family: ui-monospace, monospace;
			}
		</style>
	</head>
	<body>
		<main>
			<p>Overlay ready. Edit <code>dist/app.js</code> to customize.</p>
			<p>Overlay ID: <span id="overlay-id"></span></p>
			<p id="last-event">Waiting for events…</p>
		</main>
		<script src="./app.js"></script>
	</body>
</html>
`
		},
		{
			path: 'dist/app.js',
			content: `const OVERLAY_ID = '${overlayId}';

document.getElementById('overlay-id').textContent = OVERLAY_ID;

const lastEvent = document.getElementById('last-event');
const protocol = location.protocol === 'https:' ? 'wss:' : 'ws:';
let reconnectAttempt = 0;

const handlers = {
	'overlay:settings': (payload) => {
		// Apply user settings from Stream Kit. See docs/core/overlays.md
		console.log('overlay:settings', payload);
	},
	event: (payload) => {
		if (lastEvent) {
			lastEvent.textContent = JSON.stringify(payload);
		}
	}
};

function connect() {
	const ws = new WebSocket(\`\${protocol}//\${location.host}/ws?overlayId=\${OVERLAY_ID}\`);

	ws.onmessage = (event) => {
		try {
			const message = JSON.parse(event.data);
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
}

connect();
`
		}
	];
}
