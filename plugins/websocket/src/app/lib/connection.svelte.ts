import type { Modal } from '@stream-kit/plugin/action';
import type { WsConnection } from '../../lib/connections';
import {
	createConnectionId,
	isValidWsUrl,
	normalizeWsUrl,
	saveConnections
} from '../../lib/connections';
import {
	DEFAULT_MAX_CONNECT_RETRIES,
	DEFAULT_RECONNECT_DELAY_SEC,
	getConnectionReconnectSettings,
	normalizeReconnectSettings,
	validateReconnectSettings,
	type WsReconnectSettingsErrors
} from '../../lib/settings';

import ConnectionForm from '../ui/connection-form.svelte';
import ConnectionFormFooter from '../ui/connection-form-footer.svelte';
import ConnectionLogsModal from '../ui/connection-logs-modal.svelte';
import { getConnectionsService } from './get-connections';

export type ConnectionFormErrors = Partial<
	Record<'name' | 'url' | 'maxConnectRetries' | 'reconnectDelaySec', string>
>;

export type ConnectionProps = {
	id?: string;
	name?: string;
	url?: string;
	autoConnect?: boolean;
	maxConnectRetries?: number;
	reconnectDelaySec?: number;
};

export class Connection {
	id?: string;
	modalId?: string;
	name: string = $state('');
	url: string = $state('');
	autoConnect: boolean = $state(false);
	maxConnectRetries: number = $state(DEFAULT_MAX_CONNECT_RETRIES);
	reconnectDelaySec: number = $state(DEFAULT_RECONNECT_DELAY_SEC);
	formErrors: ConnectionFormErrors | null = $state(null);

	constructor(props: ConnectionProps = {}) {
		this.id = props.id;
		this.name = props.name ?? '';
		this.url = props.url ?? '';
		this.autoConnect = props.autoConnect ?? false;
		this.maxConnectRetries = props.maxConnectRetries ?? DEFAULT_MAX_CONNECT_RETRIES;
		this.reconnectDelaySec = props.reconnectDelaySec ?? DEFAULT_RECONNECT_DELAY_SEC;
	}

	static createDraft(): Connection {
		return new Connection();
	}

	static fromRecord(record: WsConnection): Connection {
		const settings = getConnectionReconnectSettings(record);

		return new Connection({
			id: record.id,
			name: record.name,
			url: record.url,
			autoConnect: record.autoConnect,
			maxConnectRetries: settings.maxConnectRetries,
			reconnectDelaySec: settings.reconnectDelaySec
		});
	}

	toRecord(): WsConnection {
		const settings = normalizeReconnectSettings({
			maxConnectRetries: this.maxConnectRetries,
			reconnectDelaySec: this.reconnectDelaySec
		});

		return {
			id: this.id ?? createConnectionId(),
			name: this.name.trim(),
			url: normalizeWsUrl(this.url.trim()) ?? this.url.trim(),
			autoConnect: this.autoConnect,
			maxConnectRetries: settings.maxConnectRetries,
			reconnectDelaySec: settings.reconnectDelaySec
		};
	}

	getDuplicateWarning(): string | undefined {
		const connections = getConnectionsService();
		return connections.getDuplicateWarning(this.url, this.id);
	}

	openLogs(): Modal | undefined {
		if (this.id == null) {
			return undefined;
		}

		const logsModalId = `connection-logs-${this.id}`;
		const app = getConnectionsService().requireApp();

		const modal =
			app.modal.get(logsModalId) ??
			app.modal.create({
				id: logsModalId,
				title: app.i18n.translate('Logs — {name}', {
					name: this.name.trim() || app.i18n.translate('Connection')
				}),
				content: ConnectionLogsModal,
				props: { connection: this }
			});

		modal.open();

		return modal;
	}

	open(): Modal {
		this.modalId =
			this.id != null ? `connection-${this.id}` : `connection-draft-${crypto.randomUUID()}`;
		const app = getConnectionsService().requireApp();

		const modal =
			app.modal.get(this.modalId) ??
			app.modal.create({
				id: this.modalId,
				title:
					this.id != null
						? app.i18n.translate('Edit {name}', {
								name: this.name.trim() || app.i18n.translate('Connection')
							})
						: app.i18n.translate('New Connection'),
				content: ConnectionForm,
				footer: ConnectionFormFooter,
				props: { connection: this }
			});

		modal.open();
		this.formErrors = null;

		return modal;
	}

	close(): void {
		if (this.modalId == null) {
			return;
		}

		getConnectionsService().requireApp().modal.get(this.modalId)?.close();
	}

	validateForm(): boolean {
		const translate = getConnectionsService().requireApp().i18n.translate;
		const errors: ConnectionFormErrors = {};
		const name = this.name.trim();
		const url = this.url.trim();
		const reconnectErrors = validateReconnectSettings(
			normalizeReconnectSettings({
				maxConnectRetries: this.maxConnectRetries,
				reconnectDelaySec: this.reconnectDelaySec
			})
		);

		if (!name) {
			errors.name = translate('Name is required.');
		}

		if (!url) {
			errors.url = translate('URL is required.');
		} else if (!isValidWsUrl(url)) {
			errors.url = translate('Enter a valid ws:// or wss:// URL.');
		}

		if (reconnectErrors?.maxConnectRetries) {
			errors.maxConnectRetries = reconnectErrors.maxConnectRetries;
		}

		if (reconnectErrors?.reconnectDelaySec) {
			errors.reconnectDelaySec = reconnectErrors.reconnectDelaySec;
		}

		if (Object.keys(errors).length === 0) {
			this.formErrors = null;
			return true;
		}

		this.formErrors = errors;
		return false;
	}

	async save(): Promise<boolean> {
		if (!this.validateForm()) {
			return false;
		}

		const app = getConnectionsService().requireApp();
		const connections = getConnectionsService();
		const wasNew = this.id == null;
		const record = this.toRecord();

		if (wasNew) {
			this.id = record.id;
			connections.items = [...connections.items, this];
		} else {
			this.name = record.name;
			this.url = record.url;
			this.autoConnect = record.autoConnect;
			this.maxConnectRetries = record.maxConnectRetries ?? DEFAULT_MAX_CONNECT_RETRIES;
			this.reconnectDelaySec = record.reconnectDelaySec ?? DEFAULT_RECONNECT_DELAY_SEC;
			connections.items = connections.items.map((item) =>
				item.id === record.id ? this : item
			);
		}

		await saveConnections(connections.requireApp(), connections.items.map((item) => item.toRecord()));
		await connections.controller.syncConnections(connections.items.map((item) => item.toRecord()));

		app.toast.create({
			title: app.i18n.translate(wasNew ? 'Connection added' : 'Connection updated'),
			description: app.i18n.translate('{name} has been saved.', { name: record.name }),
			variant: 'success'
		});

		this.close();
		return true;
	}

	async delete(): Promise<void> {
		if (this.id == null) {
			return;
		}

		await getConnectionsService().remove(this.id);
		this.close();
	}
}
