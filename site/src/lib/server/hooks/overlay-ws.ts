import type { Handle } from '@sveltejs/kit';

/**
 * Route `/ws` WebSocket upgrades to the OverlayRoom Durable Object (one DO per overlayId).
 * In `vite dev`, the Vite overlay-ws plugin handles upgrades on the Node HTTP server instead.
 */
export const overlayWs: Handle = async ({ event, resolve }) => {
	if (event.url.pathname !== '/ws') {
		return resolve(event);
	}

	if (event.request.headers.get('Upgrade')?.toLowerCase() !== 'websocket') {
		return new Response('Expected WebSocket', { status: 426 });
	}

	const rooms = event.platform?.env?.OVERLAY_ROOMS;
	if (!rooms) {
		return new Response('Overlay WebSocket hub unavailable', { status: 503 });
	}

	const overlayId = event.url.searchParams.get('overlayId')?.trim() ?? '';
	if (!overlayId) {
		return new Response('overlayId required', { status: 400 });
	}

	const id = rooms.idFromName(overlayId);
	const stub = rooms.get(id);
	return stub.fetch(event.request);
};
