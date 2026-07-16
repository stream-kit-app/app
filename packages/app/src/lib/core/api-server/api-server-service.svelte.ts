import { invoke } from '@tauri-apps/api/core';
import { listen, type UnlistenFn } from '@tauri-apps/api/event';

import type { App } from '../app.svelte';
import type { ActionQueueEvent } from '../action-queue/types';
import type { CorePluginApi } from '$lib/types/core-plugin-api';
import { translate } from '$lib/i18n';

import { registerBuiltinApiMethods } from './builtin-methods';
import { clientSubscribed } from './events';
import { ApiMethodRouter } from './method-router';
import { loadApiServerSettings, saveApiServerSettings } from './settings-store';
import {
	createDefaultApiServerSettings,
	generateApiServerToken,
	type ApiClientLifecycleEvent,
	type ApiEventFrame,
	type ApiIncomingRequest,
	type ApiMethodHandler,
	type ApiRequestFrame,
	type ApiResponseFrame,
	type ApiServerSettings,
	type ApiServerStatus
} from './types';

const QUEUE_EVENTS: ActionQueueEvent[] = [
	'paused',
	'resumed',
	'idle',
	'job_enqueued',
	'job_started',
	'job_completed'
];

function emptyStatus(): ApiServerStatus {
	return {
		running: false,
		port: 0,
		bind: '',
		baseUrl: '',
		wsUrl: ''
	};
}

function errorCode(error: unknown): string {
	if (error && typeof error === 'object' && 'code' in error) {
		const code = (error as { code?: unknown }).code;
		if (typeof code === 'string' && code.trim()) {
			return code;
		}
	}

	return 'internal_error';
}

function errorMessage(error: unknown): string {
	if (error instanceof Error && error.message) {
		return error.message;
	}

	return translate('Unknown API server error.');
}

export class ApiServerService {
	settings = $state<ApiServerSettings>(createDefaultApiServerSettings());
	status = $state<ApiServerStatus>(emptyStatus());

	private app: App | null = null;
	private readonly router = new ApiMethodRouter();
	private readonly subscriptions = new Map<string, Set<string>>();
	private unlistenRequest: UnlistenFn | undefined;
	private unlistenClient: UnlistenFn | undefined;
	private domainUnsubscribers: Array<() => void> = [];
	private hasLoaded = false;
	private builtinsRegistered = false;

	async init(app: App): Promise<void> {
		this.app = app;
		await this.loadSettings();
		this.registerBuiltins();
		await this.ensureListeners();
		this.bindDomainEvents();

		if (this.settings.enabled) {
			await this.start();
		} else {
			this.status = await invoke<ApiServerStatus>('api_server_status').catch(() => emptyStatus());
		}
	}

	private getApp(): App {
		if (!this.app) {
			throw new Error('ApiServerService has not been initialized yet');
		}

		return this.app;
	}

	async loadSettings(): Promise<void> {
		this.settings = await loadApiServerSettings();
		this.hasLoaded = true;
	}

	async saveSettings(next: ApiServerSettings): Promise<void> {
		const normalized: ApiServerSettings = {
			...next,
			token: next.token.trim(),
			port: Math.max(1, Math.floor(next.port))
		};

		if (normalized.enabled && !normalized.token) {
			normalized.token = generateApiServerToken();
		}

		this.settings = normalized;
		await saveApiServerSettings(normalized);

		if (normalized.enabled) {
			await this.restart();
		} else {
			await this.stop();
		}
	}

	async setEnabled(enabled: boolean): Promise<void> {
		await this.saveSettings({ ...this.settings, enabled });
	}

	async regenerateToken(): Promise<string> {
		const token = generateApiServerToken();
		await this.saveSettings({ ...this.settings, token });
		return token;
	}

	registerMethod(name: string, handler: ApiMethodHandler, ownerPluginKey?: string): void {
		this.router.register(name, handler, ownerPluginKey);
	}

	unregisterMethodsByOwner(ownerPluginKey: string): void {
		this.router.unregisterByOwner(ownerPluginKey);
	}

	async emit(event: string, payload?: unknown, clientIds?: string[]): Promise<void> {
		const frame: ApiEventFrame = {
			type: 'event',
			event,
			payload: payload ?? {}
		};

		const data = JSON.stringify(frame);

		if (clientIds && clientIds.length > 0) {
			await invoke('api_server_send', { clientIds, data });
			return;
		}

		const targets: string[] = [];
		for (const [clientId, patterns] of this.subscriptions) {
			if (clientSubscribed(patterns, event)) {
				targets.push(clientId);
			}
		}

		if (targets.length === 0) {
			return;
		}

		await invoke('api_server_send', { clientIds: targets, data });
	}

	private registerBuiltins(): void {
		if (this.builtinsRegistered) {
			return;
		}

		registerBuiltinApiMethods(this.router, this.getApp(), {
			getSubscriptions: (clientId) => {
				let set = this.subscriptions.get(clientId);
				if (!set) {
					set = new Set();
					this.subscriptions.set(clientId, set);
				}
				return set;
			},
			emitEvent: (event, payload, clientIds) => this.emit(event, payload, clientIds)
		});

		this.builtinsRegistered = true;
	}

	private async ensureListeners(): Promise<void> {
		if (!this.unlistenRequest) {
			this.unlistenRequest = await listen<ApiIncomingRequest>('api-server-request', (event) => {
				void this.handleIncoming(event.payload);
			});
		}

		if (!this.unlistenClient) {
			this.unlistenClient = await listen<ApiClientLifecycleEvent>(
				'api-server-client',
				(event) => {
					void this.handleClientLifecycle(event.payload);
				}
			);
		}
	}

	private bindDomainEvents(): void {
		for (const unsub of this.domainUnsubscribers) {
			unsub();
		}
		this.domainUnsubscribers = [];

		const app = this.getApp();

		for (const queueEvent of QUEUE_EVENTS) {
			this.domainUnsubscribers.push(
				app.actionQueues.on(queueEvent, (context) => {
					void this.emit(`queues.${queueEvent}`, context);
				})
			);
		}

		const core = app.plugins.tryGet<CorePluginApi>('core');
		if (!core) {
			return;
		}

		this.domainUnsubscribers.push(
			core.collections.subscribe('created', (context) => {
				void this.emit('collections.created', context);
			}),
			core.collections.subscribe('changed', (context) => {
				void this.emit('collections.changed', context);
			}),
			core.collections.subscribe('deleted', (context) => {
				void this.emit('collections.deleted', context);
			})
		);
	}

	private async handleClientLifecycle(payload: ApiClientLifecycleEvent): Promise<void> {
		if (payload.event === 'connected') {
			this.subscriptions.set(payload.clientId, new Set());
			await this.emit(
				'server.clientConnected',
				{ clientId: payload.clientId, timestamp: payload.timestamp },
				undefined
			);
			return;
		}

		if (payload.event === 'disconnected') {
			this.subscriptions.delete(payload.clientId);
			await this.emit(
				'server.clientDisconnected',
				{ clientId: payload.clientId, timestamp: payload.timestamp },
				undefined
			);
		}
	}

	private async handleIncoming(incoming: ApiIncomingRequest): Promise<void> {
		let frame: ApiRequestFrame;

		try {
			frame = JSON.parse(incoming.raw) as ApiRequestFrame;
		} catch {
			await this.sendResponse(incoming.clientId, {
				id: '',
				type: 'response',
				ok: false,
				error: { code: 'invalid_request', message: 'Request must be valid JSON.' }
			});
			return;
		}

		if (frame?.type !== 'request' || typeof frame.id !== 'string' || typeof frame.method !== 'string') {
			await this.sendResponse(incoming.clientId, {
				id: typeof frame?.id === 'string' ? frame.id : '',
				type: 'response',
				ok: false,
				error: {
					code: 'invalid_request',
					message: 'Expected { id, type: "request", method, params? }.'
				}
			});
			return;
		}

		try {
			const result = await this.router.invoke(frame.method, frame.params, {
				clientId: incoming.clientId
			});

			await this.sendResponse(incoming.clientId, {
				id: frame.id,
				type: 'response',
				ok: true,
				result
			});
		} catch (error) {
			await this.sendResponse(incoming.clientId, {
				id: frame.id,
				type: 'response',
				ok: false,
				error: {
					code: errorCode(error),
					message: errorMessage(error)
				}
			});
		}
	}

	private async sendResponse(clientId: string, frame: ApiResponseFrame): Promise<void> {
		if (!this.status.running) {
			return;
		}

		await invoke('api_server_send', {
			clientIds: [clientId],
			data: JSON.stringify(frame)
		}).catch((error) => {
			console.error('Failed to send API response', error);
		});
	}

	async start(): Promise<ApiServerStatus> {
		if (!this.hasLoaded) {
			await this.loadSettings();
		}

		if (!this.settings.token.trim()) {
			this.settings = {
				...this.settings,
				token: generateApiServerToken()
			};
			await saveApiServerSettings(this.settings);
		}

		this.status = await invoke<ApiServerStatus>('api_server_start', {
			options: {
				port: this.settings.port,
				bind: this.settings.bind,
				token: this.settings.token
			}
		});

		return this.status;
	}

	async stop(): Promise<void> {
		await invoke('api_server_stop');
		this.status = emptyStatus();
		this.subscriptions.clear();
	}

	async restart(): Promise<void> {
		// Stop without clearing UI status first — avoids stopped/running flicker on token regen.
		await invoke('api_server_stop').catch(() => undefined);
		this.subscriptions.clear();

		if (this.settings.enabled) {
			await this.start();
			return;
		}

		this.status = emptyStatus();
	}

	get wsUrlWithToken(): string {
		if (!this.status.wsUrl || !this.settings.token) {
			return this.status.wsUrl;
		}

		const separator = this.status.wsUrl.includes('?') ? '&' : '?';
		return `${this.status.wsUrl}${separator}token=${encodeURIComponent(this.settings.token)}`;
	}
}
