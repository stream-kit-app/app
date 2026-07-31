import type { App } from '../app.svelte';

import { translate } from '$lib/i18n';
import { env } from '$env/dynamic/public';

import { pocketBaseErrorMessage } from '../auth/auth-utils';
import { buildOverlayDistZip } from './overlay-export';
import { isOverlayBuilt } from './overlay-project';
import { overlayCloudBrowserSourceUrl } from './types';

export function resolveSiteUrl(raw: string | undefined = env.PUBLIC_SITE_URL): string | null {
	const trimmed = typeof raw === 'string' ? raw.trim().replace(/\/$/, '') : '';
	if (!trimmed || !/^https?:\/\//i.test(trimmed)) {
		return null;
	}
	return trimmed;
}

export function cloudOverlayUrl(overlayId: string): string | null {
	const site = resolveSiteUrl();
	if (!site) {
		return null;
	}
	return overlayCloudBrowserSourceUrl(site, overlayId);
}

function requireEntitledAuth(app: App): { userId: string; token: string } {
	if (!app.auth.isConfigured || !app.auth.isAuthenticated || !app.auth.user) {
		throw new Error(translate('Sign in to publish overlays to the cloud.'));
	}
	if (!app.auth.user.subscription) {
		throw new Error(translate('An active subscription is required to publish overlays.'));
	}
	const token = app.auth.client.authStore.token;
	if (!token) {
		throw new Error(translate('Sign in to publish overlays to the cloud.'));
	}
	return { userId: app.auth.user.id, token };
}

export type CloudOverlayState = {
	overlayId: string;
	published: boolean;
};

export function canPublishOverlaysToCloud(app: App): boolean {
	return (
		resolveSiteUrl() != null &&
		app.auth.isConfigured &&
		app.auth.isAuthenticated &&
		Boolean(app.auth.user?.subscription)
	);
}

export async function listCloudOverlayStates(app: App): Promise<CloudOverlayState[]> {
	if (!app.auth.isAuthenticated || !app.auth.user) {
		return [];
	}

	try {
		const pb = app.auth.client;
		const records = await pb.collection('user_overlays').getFullList({
			filter: pb.filter('user={:id}', { id: app.auth.user.id }),
			fields: 'overlayId,published',
			requestKey: null
		});
		return records
			.map((record) => {
				const overlayId =
					typeof record.overlayId === 'string' ? record.overlayId.trim() : '';
				if (!overlayId) {
					return null;
				}
				return {
					overlayId,
					published: Boolean(record.published)
				};
			})
			.filter((entry): entry is CloudOverlayState => entry != null);
	} catch (error) {
		if (pocketBaseErrorMessage(error, '')) {
			console.warn('Failed to list cloud overlays', error);
		}
		return [];
	}
}

export async function listPublishedOverlayIds(app: App): Promise<string[]> {
	const states = await listCloudOverlayStates(app);
	return states.filter((entry) => entry.published).map((entry) => entry.overlayId);
}

async function findOverlayRecordByOverlayId(app: App, overlayId: string) {
	const pb = app.auth.client;
	return pb.collection('user_overlays').getFirstListItem(
		pb.filter('overlayId={:overlayId}', { overlayId }),
		{ requestKey: null }
	);
}

export async function publishOverlayToCloud(
	app: App,
	input: {
		id: string;
		name: string;
		config: Record<string, unknown>;
		revision?: number;
	}
): Promise<void> {
	requireEntitledAuth(app);

	if (!(await isOverlayBuilt(input.id))) {
		throw new Error(translate('Build the overlay before publishing to the cloud.'));
	}

	const zipBytes = await buildOverlayDistZip(input.id);
	const bundle = new File([new Uint8Array(zipBytes)], 'dist.zip', {
		type: 'application/zip'
	});
	const clientUpdatedAt = Date.now();
	const revision = Math.max(1, input.revision ?? 1);
	const payload = {
		overlayId: input.id,
		name: input.name.trim() || input.id,
		config: input.config ?? {},
		published: true,
		revision,
		clientUpdatedAt,
		bundle
	};

	const pb = app.auth.client;

	try {
		try {
			const existing = await findOverlayRecordByOverlayId(app, input.id);
			await pb.collection('user_overlays').update(existing.id, payload);
		} catch (error) {
			const status =
				error && typeof error === 'object' && 'status' in error
					? Number((error as { status?: number }).status)
					: 0;
			if (status !== 404) {
				throw error;
			}
			await pb.collection('user_overlays').create(payload);
		}
	} catch (error) {
		throw new Error(
			pocketBaseErrorMessage(error, translate('Could not publish overlay to the cloud.'))
		);
	}
}

export async function syncOverlayCloudConfig(
	app: App,
	input: {
		id: string;
		name: string;
		config: Record<string, unknown>;
		revision?: number;
	}
): Promise<void> {
	requireEntitledAuth(app);

	const pb = app.auth.client;
	try {
		const existing = await findOverlayRecordByOverlayId(app, input.id);
		await pb.collection('user_overlays').update(existing.id, {
			name: input.name.trim() || input.id,
			config: input.config ?? {},
			published: true,
			revision: Math.max(1, input.revision ?? 1),
			clientUpdatedAt: Date.now()
		});
	} catch (error) {
		throw new Error(
			pocketBaseErrorMessage(error, translate('Could not update cloud overlay settings.'))
		);
	}
}

export async function unpublishOverlayFromCloud(app: App, overlayId: string): Promise<void> {
	requireEntitledAuth(app);

	const pb = app.auth.client;
	try {
		const existing = await findOverlayRecordByOverlayId(app, overlayId);
		await pb.collection('user_overlays').update(existing.id, {
			published: false,
			clientUpdatedAt: Date.now()
		});
	} catch (error) {
		const status =
			error && typeof error === 'object' && 'status' in error
				? Number((error as { status?: number }).status)
				: 0;
		if (status === 404) {
			return;
		}
		throw new Error(
			pocketBaseErrorMessage(error, translate('Could not unpublish overlay.'))
		);
	}
}

export type OverlayCloudPublisherHandlers = {
	onConnectionChange: (overlayId: string, connected: boolean) => void;
	onInboundMessage: (overlayId: string, event: string, payload: unknown) => void;
};

/**
 * Maintains authenticated publisher WebSockets to the site hub for published overlays.
 */
export class OverlayCloudPublisher {
	#handlers: OverlayCloudPublisherHandlers;
	#getAuthToken: () => string | null;
	#sockets = new Map<string, WebSocket>();
	#reconnectTimers = new Map<string, ReturnType<typeof setTimeout>>();
	#reconnectAttempts = new Map<string, number>();
	#wanted = new Set<string>();
	#destroyed = false;

	constructor(
		handlers: OverlayCloudPublisherHandlers,
		getAuthToken: () => string | null
	) {
		this.#handlers = handlers;
		this.#getAuthToken = getAuthToken;
	}

	sync(publishedIds: string[]): void {
		if (this.#destroyed) {
			return;
		}

		const next = new Set(publishedIds);
		this.#wanted = next;

		for (const id of [...this.#sockets.keys()]) {
			if (!next.has(id)) {
				this.#close(id);
			}
		}

		const site = resolveSiteUrl();
		const token = this.#getAuthToken();
		if (!site || !token) {
			for (const id of this.#sockets.keys()) {
				this.#close(id);
			}
			return;
		}

		for (const id of next) {
			if (!this.#sockets.has(id)) {
				this.#connect(id, site, token);
			}
		}
	}

	send(overlayId: string, event: string, payload: unknown = {}): void {
		const socket = this.#sockets.get(overlayId);
		if (!socket || socket.readyState !== WebSocket.OPEN) {
			return;
		}
		if (!event.trim()) {
			return;
		}
		socket.send(JSON.stringify({ event: event.trim(), payload }));
	}

	destroy(): void {
		this.#destroyed = true;
		this.#wanted.clear();
		for (const id of [...this.#sockets.keys()]) {
			this.#close(id);
		}
		for (const timer of this.#reconnectTimers.values()) {
			clearTimeout(timer);
		}
		this.#reconnectTimers.clear();
	}

	#connect(overlayId: string, siteUrl: string, token: string): void {
		this.#clearReconnect(overlayId);

		const protocol = siteUrl.startsWith('https:') ? 'wss:' : 'ws:';
		const host = siteUrl.replace(/^https?:\/\//i, '');
		const url = `${protocol}//${host}/ws?overlayId=${encodeURIComponent(overlayId)}&role=publisher&token=${encodeURIComponent(token)}`;

		let socket: WebSocket;
		try {
			socket = new WebSocket(url);
		} catch (error) {
			console.warn('[overlay-cloud] failed to open publisher socket', error);
			this.#scheduleReconnect(overlayId);
			return;
		}

		this.#sockets.set(overlayId, socket);

		socket.onopen = () => {
			this.#reconnectAttempts.set(overlayId, 0);
			this.#handlers.onConnectionChange(overlayId, true);
		};

		socket.onmessage = (event) => {
			try {
				const message = JSON.parse(String(event.data)) as {
					event?: string;
					payload?: unknown;
				};
				if (typeof message.event !== 'string' || !message.event.trim()) {
					return;
				}
				this.#handlers.onInboundMessage(overlayId, message.event.trim(), message.payload ?? {});
			} catch {
				// Ignore malformed messages.
			}
		};

		socket.onclose = () => {
			this.#handlers.onConnectionChange(overlayId, false);
			if (this.#sockets.get(overlayId) === socket) {
				this.#sockets.delete(overlayId);
			}
			if (this.#wanted.has(overlayId) && !this.#destroyed) {
				this.#scheduleReconnect(overlayId);
			}
		};

		socket.onerror = () => {
			socket.close();
		};
	}

	#close(overlayId: string): void {
		this.#clearReconnect(overlayId);
		const socket = this.#sockets.get(overlayId);
		this.#sockets.delete(overlayId);
		if (socket) {
			socket.onopen = null;
			socket.onmessage = null;
			socket.onclose = null;
			socket.onerror = null;
			socket.close();
		}
		this.#handlers.onConnectionChange(overlayId, false);
	}

	#scheduleReconnect(overlayId: string): void {
		if (this.#destroyed || !this.#wanted.has(overlayId)) {
			return;
		}
		this.#clearReconnect(overlayId);
		const attempt = (this.#reconnectAttempts.get(overlayId) ?? 0) + 1;
		this.#reconnectAttempts.set(overlayId, attempt);
		const delay = Math.min(1000 * 2 ** Math.min(attempt, 5), 30_000);
		const timer = setTimeout(() => {
			this.#reconnectTimers.delete(overlayId);
			const site = resolveSiteUrl();
			const token = this.#getAuthToken();
			if (!site || !token || !this.#wanted.has(overlayId) || this.#destroyed) {
				return;
			}
			this.#connect(overlayId, site, token);
		}, delay);
		this.#reconnectTimers.set(overlayId, timer);
	}

	#clearReconnect(overlayId: string): void {
		const timer = this.#reconnectTimers.get(overlayId);
		if (timer) {
			clearTimeout(timer);
			this.#reconnectTimers.delete(overlayId);
		}
	}
}
