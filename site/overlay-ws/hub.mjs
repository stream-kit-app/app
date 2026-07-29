import PocketBase from 'pocketbase';
import { WebSocketServer } from 'ws';

const PocketBaseCtor = PocketBase.default ?? PocketBase;

/**
 * In-memory overlay WebSocket rooms (single Node instance).
 * Protocol matches the desktop overlay server: JSON `{ event, payload }`.
 */

/** @typedef {{ overlayId: string, role: 'subscriber' | 'publisher' }} ClientMeta */

/**
 * @param {object} options
 * @param {string} options.pocketbaseUrl
 * @param {(msg: string, err?: unknown) => void} [options.log]
 */
export function createOverlayWsHub(options) {
	const pocketbaseUrl = options.pocketbaseUrl.replace(/\/$/, '');
	const log = options.log ?? ((msg, err) => console.error(`[overlay-ws] ${msg}`, err ?? ''));

	/** @type {Map<string, Set<import('ws').WebSocket>>} */
	const subscribers = new Map();
	/** @type {Map<string, Set<import('ws').WebSocket>>} */
	const publishers = new Map();
	/** @type {WeakMap<import('ws').WebSocket, ClientMeta>} */
	const meta = new WeakMap();

	/**
	 * @param {Map<string, Set<import('ws').WebSocket>>} map
	 * @param {string} overlayId
	 * @param {import('ws').WebSocket} ws
	 */
	function addClient(map, overlayId, ws) {
		let set = map.get(overlayId);
		if (!set) {
			set = new Set();
			map.set(overlayId, set);
		}
		set.add(ws);
	}

	/**
	 * @param {Map<string, Set<import('ws').WebSocket>>} map
	 * @param {string} overlayId
	 * @param {import('ws').WebSocket} ws
	 */
	function removeClient(map, overlayId, ws) {
		const set = map.get(overlayId);
		if (!set) return;
		set.delete(ws);
		if (set.size === 0) map.delete(overlayId);
	}

	/**
	 * @param {Set<import('ws').WebSocket> | undefined} set
	 * @param {string} data
	 * @param {import('ws').WebSocket} [except]
	 */
	function broadcast(set, data, except) {
		if (!set) return;
		for (const client of set) {
			if (client === except) continue;
			if (client.readyState === 1) {
				client.send(data);
			}
		}
	}

	/**
	 * @param {string} overlayId
	 */
	async function assertPublished(overlayId) {
		const pb = new PocketBaseCtor(pocketbaseUrl);
		const safeId = String(overlayId).replace(/"/g, '');
		const record = await pb
			.collection('user_overlays')
			.getFirstListItem(`overlayId="${safeId}" && published=true`);
		return record;
	}

	/**
	 * @param {string} token
	 * @param {string} overlayId
	 */
	async function assertPublisher(token, overlayId) {
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
		const record = await pb
			.collection('user_overlays')
			.getFirstListItem(`overlayId="${safeId}"`);
		if (record.user !== authId) {
			throw new Error('Not overlay owner');
		}
		if (!record.published) {
			throw new Error('Overlay is not published');
		}
		return record;
	}

	/**
	 * @param {import('http').IncomingMessage} req
	 * @param {import('ws').WebSocket} ws
	 */
	async function handleConnection(ws, req) {
		try {
			const host = req.headers.host ?? 'localhost';
			const url = new URL(req.url ?? '/ws', `http://${host}`);
			const overlayId = url.searchParams.get('overlayId')?.trim() ?? '';
			const role = url.searchParams.get('role') === 'publisher' ? 'publisher' : 'subscriber';
			const token =
				url.searchParams.get('token')?.trim() ||
				(req.headers.authorization?.startsWith('Bearer ')
					? req.headers.authorization.slice(7).trim()
					: '');

			if (!overlayId) {
				ws.close(1008, 'overlayId required');
				return;
			}

			if (role === 'publisher') {
				await assertPublisher(token, overlayId);
				addClient(publishers, overlayId, ws);
			} else {
				await assertPublished(overlayId);
				addClient(subscribers, overlayId, ws);
			}

			meta.set(ws, { overlayId, role });

			ws.on('message', (raw) => {
				const data = String(raw);
				try {
					const parsed = JSON.parse(data);
					if (!parsed || typeof parsed.event !== 'string') {
						return;
					}
				} catch {
					return;
				}

				const info = meta.get(ws);
				if (!info) return;

				if (info.role === 'publisher') {
					broadcast(subscribers.get(info.overlayId), data);
				} else {
					broadcast(publishers.get(info.overlayId), data);
				}
			});

			ws.on('close', () => {
				const info = meta.get(ws);
				if (!info) return;
				if (info.role === 'publisher') {
					removeClient(publishers, info.overlayId, ws);
				} else {
					removeClient(subscribers, info.overlayId, ws);
				}
			});
		} catch (err) {
			log('connection rejected', err);
			ws.close(1008, 'unauthorized');
		}
	}

	/**
	 * Attach WebSocket upgrade handling to an HTTP server.
	 * @param {import('http').Server} server
	 */
	function attach(server) {
		const wss = new WebSocketServer({ noServer: true });

		server.on('upgrade', (req, socket, head) => {
			const pathname = (req.url ?? '').split('?')[0];
			if (pathname !== '/ws') {
				return;
			}

			wss.handleUpgrade(req, socket, head, (ws) => {
				void handleConnection(ws, req);
			});
		});

		return wss;
	}

	return { attach };
}

/**
 * Resolve PocketBase URL from common env vars.
 * Local PocketBase is plain HTTP — `https://localhost:8090` causes ERR_SSL_PACKET_LENGTH_TOO_LONG.
 * @param {Record<string, string | undefined>} [env]
 */
export function resolvePocketBaseUrl(env = process.env) {
	const raw =
		env.PUBLIC_POCKETBASE_URL?.trim() ||
		env.POCKETBASE_URL?.trim() ||
		'http://127.0.0.1:8090';
	return raw.replace(/\/$/, '');
}
