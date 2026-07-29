import { createOverlayWsHub, resolvePocketBaseUrl } from '../overlay-ws/hub.mjs';

/**
 * Vite plugin: attach overlay WS hub to the dev HTTP server.
 * @param {{ pocketbaseUrl?: string }} [options]
 */
export function overlayWsPlugin(options = {}) {
	return {
		name: 'stream-kit-overlay-ws',
		configureServer(server) {
			const httpServer = server.httpServer;
			if (!httpServer) {
				return;
			}

			const hub = createOverlayWsHub({
				pocketbaseUrl: options.pocketbaseUrl || resolvePocketBaseUrl(process.env)
			});
			hub.attach(httpServer);
		}
	};
}
