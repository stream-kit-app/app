import { DurableObject } from 'cloudflare:workers';
import PocketBase from 'pocketbase';

type ClientRole = 'subscriber' | 'publisher';

type ClientMeta = {
	overlayId: string;
	role: ClientRole;
};

export type OverlayRoomEnv = {
	PUBLIC_POCKETBASE_URL: string;
};

const PocketBaseCtor = (PocketBase as unknown as { default?: typeof PocketBase }).default ?? PocketBase;

function resolvePocketBaseUrl(env: OverlayRoomEnv): string {
	const raw = env.PUBLIC_POCKETBASE_URL?.trim() || 'http://127.0.0.1:8090';
	return raw.replace(/\/$/, '');
}

async function assertPublished(pocketbaseUrl: string, overlayId: string) {
	const pb = new PocketBaseCtor(pocketbaseUrl);
	const safeId = String(overlayId).replace(/"/g, '');
	return pb.collection('user_overlays').getFirstListItem(`overlayId="${safeId}" && published=true`);
}

async function assertPublisher(pocketbaseUrl: string, token: string, overlayId: string) {
	if (!token?.trim()) {
		throw new Error('Missing auth token');
	}
	const pb = new PocketBaseCtor(pocketbaseUrl);
	pb.authStore.save(token, null);
	await pb.collection('users').authRefresh();
	const authId = pb.authStore.record?.id;
	if (!authId) {
		throw new Error('Invalid auth token');
	}
	const safeId = String(overlayId).replace(/"/g, '');
	const record = await pb.collection('user_overlays').getFirstListItem(`overlayId="${safeId}"`);
	if (record.user !== authId) {
		throw new Error('Not overlay owner');
	}
	if (!record.published) {
		throw new Error('Overlay is not published');
	}
	return record;
}

/**
 * One Durable Object per overlayId — publisher/subscriber WebSocket room.
 * Protocol matches the desktop overlay server: JSON `{ event, payload }`.
 */
export class OverlayRoom extends DurableObject<OverlayRoomEnv> {
	async fetch(request: Request): Promise<Response> {
		if (request.headers.get('Upgrade') !== 'websocket') {
			return new Response('Expected WebSocket', { status: 426 });
		}

		const url = new URL(request.url);
		const overlayId = url.searchParams.get('overlayId')?.trim() ?? '';
		const role: ClientRole =
			url.searchParams.get('role') === 'publisher' ? 'publisher' : 'subscriber';
		const token =
			url.searchParams.get('token')?.trim() ||
			(request.headers.get('authorization')?.startsWith('Bearer ')
				? request.headers.get('authorization')!.slice(7).trim()
				: '');

		if (!overlayId) {
			return new Response('overlayId required', { status: 400 });
		}

		const pocketbaseUrl = resolvePocketBaseUrl(this.env);

		try {
			if (role === 'publisher') {
				await assertPublisher(pocketbaseUrl, token, overlayId);
			} else {
				await assertPublished(pocketbaseUrl, overlayId);
			}
		} catch (err) {
			console.error('[overlay-ws] connection rejected', err);
			return new Response('unauthorized', { status: 401 });
		}

		const pair = new WebSocketPair();
		const [client, server] = Object.values(pair) as [WebSocket, WebSocket];

		this.ctx.acceptWebSocket(server);
		server.serializeAttachment({ overlayId, role } satisfies ClientMeta);

		return new Response(null, { status: 101, webSocket: client });
	}

	webSocketMessage(ws: WebSocket, message: string | ArrayBuffer) {
		const data = typeof message === 'string' ? message : new TextDecoder().decode(message);
		try {
			const parsed = JSON.parse(data);
			if (!parsed || typeof parsed.event !== 'string') {
				return;
			}
		} catch {
			return;
		}

		const info = ws.deserializeAttachment() as ClientMeta | null;
		if (!info) return;

		const peers = this.ctx.getWebSockets();
		for (const peer of peers) {
			if (peer === ws) continue;
			const peerMeta = peer.deserializeAttachment() as ClientMeta | null;
			if (!peerMeta || peerMeta.overlayId !== info.overlayId) continue;

			if (info.role === 'publisher' && peerMeta.role === 'subscriber') {
				peer.send(data);
			} else if (info.role === 'subscriber' && peerMeta.role === 'publisher') {
				peer.send(data);
			}
		}
	}

	webSocketClose(ws: WebSocket, code: number, reason: string, wasClean: boolean) {
		void wasClean;
		try {
			ws.close(code, reason);
		} catch {
			/* already closed */
		}
	}

	webSocketError(ws: WebSocket, error: unknown) {
		console.error('[overlay-ws] websocket error', error);
		try {
			ws.close(1011, 'WebSocket error');
		} catch {
			/* already closed */
		}
	}
}
