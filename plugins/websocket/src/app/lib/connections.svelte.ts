import type { PluginAppApi, PluginStore } from '@stream-kit/plugin';

import {
	findDuplicateUrl,
	loadConnections,
	saveConnections
} from '../../lib/connections';
import type { ConnectionStatus, WebSocketPluginController } from '../../lib/connection-manager';
import type { WsConnectionLogEntry } from '../../lib/connection-logs';

import { Connection } from './connection.svelte';

export class Connections {
	items: Connection[] = $state([]);
	readonly store: PluginStore;
	readonly controller: WebSocketPluginController;
	private unsubscribeController: (() => void) | undefined;
	private unsubscribeLogs: (() => void) | undefined;
	revision = $state(0);
	logsRevision = $state(0);

	constructor(
		store: PluginStore,
		controller: WebSocketPluginController,
		private readonly app: PluginAppApi
	) {
		this.store = store;
		this.controller = controller;

		this.unsubscribeController = this.controller.subscribe(() => {
			this.revision += 1;
		});

		this.unsubscribeLogs = this.controller.subscribeLogs(() => {
			this.logsRevision += 1;
		});
	}

	requireApp(): PluginAppApi {
		return this.app;
	}

	async load(): Promise<void> {
		const records = await loadConnections(this.store);
		this.items = records.map((record) => Connection.fromRecord(record));
		await this.controller.syncConnections(records);
	}

	close(): void {
		this.unsubscribeController?.();
		this.unsubscribeController = undefined;
		this.unsubscribeLogs?.();
		this.unsubscribeLogs = undefined;
	}

	getStatus(id: string): ConnectionStatus {
		return this.controller.getConnectionStatus(id);
	}

	getError(id: string): string | undefined {
		return this.controller.getConnectionError(id);
	}

	getAttempts(id: string): number {
		return this.controller.getConnectionAttempts(id);
	}

	getMaxRetries(id: string): number {
		return this.controller.getMaxConnectRetries(id);
	}

	getLogs(id: string): WsConnectionLogEntry[] {
		return this.controller.getLogs(id);
	}

	clearLogs(id: string): void {
		this.controller.clearLogs(id);
	}

	getDuplicateWarning(url: string, excludeId?: string): string | undefined {
		const records = this.items.map((item) => item.toRecord());
		const duplicate = findDuplicateUrl(records, url, excludeId);

		if (!duplicate) {
			return undefined;
		}

		return `This URL is already used by "${duplicate.name}". Both connections will share the same socket.`;
	}

	async remove(id: string): Promise<void> {
		const connection = this.items.find((item) => item.id === id);

		if (!connection) {
			return;
		}

		try {
			await this.controller.disconnect(id);
		} catch {
			// Ignore disconnect errors while removing.
		}

		this.items = this.items.filter((item) => item.id !== id);
		this.controller.clearLogs(id);
		const records = this.items.map((item) => item.toRecord());
		await saveConnections(this.store, records);
		await this.controller.syncConnections(records);

		this.app.toast.create({
			title: 'Connection removed',
			description: `${connection.name} was removed.`,
			variant: 'success'
		});
	}

	async connect(id: string): Promise<void> {
		try {
			await this.controller.connect(id);
			this.app.toast.create({
				title: 'Connected',
				description: 'WebSocket connection established.',
				variant: 'success'
			});
		} catch (error) {
			const description = error instanceof Error ? error.message : 'Failed to connect.';

			this.app.toast.create({
				title: 'Connection failed',
				description,
				variant: 'error'
			});
		}
	}

	async disconnect(id: string): Promise<void> {
		await this.controller.disconnect(id);
		this.app.toast.create({
			title: 'Disconnected',
			description: 'WebSocket connection closed.',
			variant: 'default'
		});
	}

	async test(id: string): Promise<void> {
		await this.connect(id);
	}
}
