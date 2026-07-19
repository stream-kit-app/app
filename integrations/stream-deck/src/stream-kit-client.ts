import streamDeck from '@elgato/streamdeck';
import WebSocket from 'ws';

import type {
	FeedbackEventName,
	FeedbackPayload,
	GlobalConnectionSettings,
	ReportEventInput,
	StreamKitActionSummary
} from './types';

type PendingRequest = {
	resolve: (value: unknown) => void;
	reject: (error: Error) => void;
	timer: ReturnType<typeof setTimeout>;
};

type ClientEventHandler = (event: string, payload: unknown) => void;

const DEFAULT_HOST = '127.0.0.1';
const DEFAULT_PORT = 7892;
const REQUEST_TIMEOUT_MS = 10_000;

function normalizeSettings(settings: GlobalConnectionSettings): Required<
	Pick<GlobalConnectionSettings, 'host' | 'port' | 'token' | 'autoReconnect'>
> {
	return {
		host: (settings.host || DEFAULT_HOST).trim() || DEFAULT_HOST,
		port: Number(settings.port) || DEFAULT_PORT,
		token: (settings.token || '').trim(),
		autoReconnect: settings.autoReconnect !== false
	};
}

function settingsEqual(a: GlobalConnectionSettings, b: GlobalConnectionSettings): boolean {
	const left = normalizeSettings(a);
	const right = normalizeSettings(b);
	return (
		left.host === right.host &&
		left.port === right.port &&
		left.token === right.token &&
		left.autoReconnect === right.autoReconnect
	);
}

export class StreamKitClient {
	#socket: WebSocket | null = null;
	#nextId = 1;
	#pending = new Map<string, PendingRequest>();
	#handlers = new Set<ClientEventHandler>();
	#reconnectTimer: ReturnType<typeof setTimeout> | null = null;
	#shouldRun = false;
	#settings: GlobalConnectionSettings = {};
	#connected = false;
	#connectPromise: Promise<void> | null = null;

	get connected(): boolean {
		return this.#connected;
	}

	onEvent(handler: ClientEventHandler): () => void {
		this.#handlers.add(handler);
		return () => {
			this.#handlers.delete(handler);
		};
	}

	async start(): Promise<void> {
		this.#shouldRun = true;
		this.#settings = await streamDeck.settings.getGlobalSettings<GlobalConnectionSettings>();
		await this.#connect();
	}

	async stop(): Promise<void> {
		this.#shouldRun = false;
		this.#clearReconnect();
		await this.#reportSession('disconnected').catch(() => undefined);
		this.#closeSocket();
	}

	async refreshSettings(): Promise<void> {
		const next = await streamDeck.settings.getGlobalSettings<GlobalConnectionSettings>();
		if (settingsEqual(this.#settings, next)) {
			return;
		}

		this.#settings = next;
		if (this.#shouldRun) {
			this.#clearReconnect();
			this.#closeSocket();
			await this.#connect();
		}
	}

	async request<T = unknown>(method: string, params: Record<string, unknown> = {}): Promise<T> {
		await this.#ensureConnected();
		return this.#sendRequest<T>(method, params);
	}

	async reportEvent(input: ReportEventInput): Promise<void> {
		await this.request('plugin:stream-deck:reportEvent', input as unknown as Record<string, unknown>);
	}

	async registerButton(input: {
		context: string;
		device?: string;
		actionUUID?: string;
		alias?: string;
		coordinates?: { column?: number; row?: number };
		settings?: Record<string, unknown>;
	}): Promise<void> {
		await this.request('plugin:stream-deck:registerButton', input);
	}

	async unregisterButton(context: string): Promise<void> {
		await this.request('plugin:stream-deck:unregisterButton', { context });
	}

	async listActions(): Promise<StreamKitActionSummary[]> {
		const snapshot = await this.request<Array<{ id: number; name: string }>>('actions.getSnapshot');
		return snapshot.map((action) => ({ id: action.id, name: action.name }));
	}

	async runAction(actionId: string | number, data: Record<string, unknown> = {}): Promise<void> {
		const id = Number(actionId);

		if (!Number.isFinite(id)) {
			throw new Error('Action id must be a number');
		}

		const result = await this.request<{ ok?: boolean }>('actions.runById', {
			id,
			trigger: 'stream-deck',
			data
		});

		if (result && typeof result === 'object' && result.ok === false) {
			throw new Error(`Action ${id} was not found or could not be run`);
		}
	}

	async #sendRequest<T = unknown>(
		method: string,
		params: Record<string, unknown> = {}
	): Promise<T> {
		const socket = this.#socket;

		if (!socket || socket.readyState !== WebSocket.OPEN) {
			throw new Error('Not connected to Stream Kit API Server');
		}

		const id = String(this.#nextId++);

		return new Promise<T>((resolve, reject) => {
			const timer = setTimeout(() => {
				this.#pending.delete(id);
				reject(new Error(`Stream Kit request timed out: ${method}`));
			}, REQUEST_TIMEOUT_MS);

			this.#pending.set(id, {
				resolve: (value) => resolve(value as T),
				reject,
				timer
			});

			socket.send(
				JSON.stringify({
					id,
					type: 'request',
					method,
					params
				})
			);
		});
	}

	async #connect(): Promise<void> {
		if (!this.#shouldRun) {
			return;
		}

		if (this.#connectPromise) {
			await this.#connectPromise;
			return;
		}

		if (this.#socket?.readyState === WebSocket.OPEN && this.#connected) {
			return;
		}

		this.#connectPromise = this.#openSocket().finally(() => {
			this.#connectPromise = null;
		});

		await this.#connectPromise;
	}

	async #openSocket(): Promise<void> {
		this.#clearReconnect();

		const { host, port, token } = normalizeSettings(this.#settings);

		if (!token) {
			streamDeck.logger.warn('Stream Kit API token is not configured');
			this.#scheduleReconnect();
			return;
		}

		this.#closeSocket();

		const url = `ws://${host}:${port}/ws?token=${encodeURIComponent(token)}`;
		streamDeck.logger.info(`Connecting to Stream Kit API at ws://${host}:${port}/ws`);

		await new Promise<void>((resolve) => {
			const socket = new WebSocket(url);
			this.#socket = socket;
			let settled = false;

			const finish = () => {
				if (!settled) {
					settled = true;
					resolve();
				}
			};

			const fail = (message: string) => {
				if (this.#socket !== socket) {
					finish();
					return;
				}

				streamDeck.logger.warn(message);
				this.#connected = false;
				this.#rejectAll(new Error(message));
				this.#closeSocket();
				this.#scheduleReconnect();
				finish();
			};

			socket.on('open', () => {
				if (this.#socket !== socket) {
					finish();
					return;
				}

				void this.#onOpen(socket)
					.then(() => finish())
					.catch((error) => {
						fail(error instanceof Error ? error.message : String(error));
					});
			});

			socket.on('message', (data) => {
				if (this.#socket === socket) {
					this.#onMessage(String(data));
				}
			});

			socket.on('close', () => {
				if (this.#socket !== socket) {
					finish();
					return;
				}

				const wasConnected = this.#connected;
				this.#connected = false;
				this.#socket = null;
				this.#rejectAll(new Error('Stream Kit connection closed'));
				if (wasConnected) {
					void this.#emitLocal('disconnected', {});
				}
				this.#scheduleReconnect();
				finish();
			});

			socket.on('error', (error) => {
				if (this.#socket !== socket) {
					finish();
					return;
				}

				fail(`Stream Kit WebSocket error: ${error.message}`);
			});
		});
	}

	async #onOpen(socket: WebSocket): Promise<void> {
		if (this.#socket !== socket) {
			return;
		}

		await this.#sendRequest('server.hello');
		await this.#sendRequest('server.subscribe', {
			events: ['plugin:stream-deck.*']
		});

		if (this.#socket !== socket) {
			return;
		}

		this.#connected = true;
		streamDeck.logger.info('Connected to Stream Kit API');

		try {
			await this.#sendRequest('plugin:stream-deck:reportEvent', { type: 'connected' });
		} catch (error) {
			streamDeck.logger.warn(
				`Stream Deck plugin methods unavailable (${String(error)}). Enable the Stream Deck plugin in Stream Kit.`
			);
		}
	}

	async #reportSession(type: 'connected' | 'disconnected'): Promise<void> {
		if (!this.#socket || this.#socket.readyState !== WebSocket.OPEN) {
			return;
		}

		await this.#sendRequest('plugin:stream-deck:reportEvent', { type });
	}

	#onMessage(raw: string): void {
		let frame: {
			type?: string;
			id?: string;
			ok?: boolean;
			result?: unknown;
			error?: { message?: string };
			event?: string;
			payload?: unknown;
		};

		try {
			frame = JSON.parse(raw) as typeof frame;
		} catch {
			return;
		}

		if (frame.type === 'response' && frame.id) {
			const pending = this.#pending.get(frame.id);
			if (!pending) {
				return;
			}

			this.#pending.delete(frame.id);
			clearTimeout(pending.timer);

			if (frame.ok) {
				pending.resolve(frame.result);
			} else {
				pending.reject(new Error(frame.error?.message || 'Stream Kit request failed'));
			}

			return;
		}

		if (frame.type === 'event' && frame.event) {
			const shortName = frame.event.replace(/^plugin:stream-deck:/, '') as FeedbackEventName | string;
			for (const handler of this.#handlers) {
				handler(shortName, frame.payload);
			}
		}
	}

	async #ensureConnected(): Promise<void> {
		if (this.#socket?.readyState === WebSocket.OPEN && this.#connected) {
			return;
		}

		await this.#connect();

		if (!this.#socket || this.#socket.readyState !== WebSocket.OPEN || !this.#connected) {
			throw new Error('Not connected to Stream Kit API Server');
		}
	}

	#scheduleReconnect(): void {
		if (!this.#shouldRun) {
			return;
		}

		const autoReconnect = normalizeSettings(this.#settings).autoReconnect;
		if (!autoReconnect) {
			return;
		}

		this.#clearReconnect();
		this.#reconnectTimer = setTimeout(() => {
			void this.#connect();
		}, 2000);
	}

	#clearReconnect(): void {
		if (this.#reconnectTimer) {
			clearTimeout(this.#reconnectTimer);
			this.#reconnectTimer = null;
		}
	}

	#closeSocket(): void {
		this.#connected = false;
		if (!this.#socket) {
			return;
		}

		const socket = this.#socket;
		this.#socket = null;

		// Keep an error listener while closing — `ws` emits an uncaught error when
		// closing a socket that is still CONNECTING, which kills the plugin process.
		socket.removeAllListeners('open');
		socket.removeAllListeners('message');
		socket.removeAllListeners('close');
		socket.on('error', () => undefined);

		try {
			if (socket.readyState === WebSocket.CONNECTING) {
				socket.terminate();
			} else if (socket.readyState === WebSocket.OPEN) {
				socket.close();
			}
		} catch {
			// ignore
		}
	}

	#rejectAll(error: Error): void {
		for (const pending of this.#pending.values()) {
			clearTimeout(pending.timer);
			pending.reject(error);
		}
		this.#pending.clear();
	}

	async #emitLocal(event: string, payload: unknown): Promise<void> {
		for (const handler of this.#handlers) {
			handler(event, payload);
		}
	}
}

export const streamKitClient = new StreamKitClient();

export function isFeedbackEvent(name: string): name is FeedbackEventName {
	return (
		name === 'setTitle' ||
		name === 'setImage' ||
		name === 'setState' ||
		name === 'showOk' ||
		name === 'showAlert' ||
		name === 'setSettings'
	);
}

export function asFeedbackPayload(payload: unknown): FeedbackPayload {
	if (!payload || typeof payload !== 'object') {
		return {};
	}

	return payload as FeedbackPayload;
}
