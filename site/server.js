import { createServer } from 'node:http';

import { handler } from './build/handler.js';
import { createOverlayWsHub, resolvePocketBaseUrl } from './overlay-ws/hub.mjs';

const port = Number(process.env.PORT || 3000);
const host = process.env.HOST || '0.0.0.0';

const hub = createOverlayWsHub({
	pocketbaseUrl: resolvePocketBaseUrl(process.env)
});

const server = createServer((req, res) => {
	handler(req, res);
});

hub.attach(server);

server.listen(port, host, () => {
	console.log(`Listening on http://${host}:${port}`);
	console.log(`Overlay WebSocket hub at ws://${host === '0.0.0.0' ? 'localhost' : host}:${port}/ws`);
});
