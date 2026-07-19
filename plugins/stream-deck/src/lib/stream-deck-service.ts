import { emitStreamDeckEvent, subscribeStreamDeckEvent } from './event-hub';
import { ButtonRegistry } from './button-registry';
import {
	STREAM_DECK_EVENT_TYPES,
	type FeedbackPayload,
	type RegisteredButton,
	type StreamDeckEventContext,
	type StreamDeckEventType,
	type StreamDeckStatus
} from './types';

function asRecord(value: unknown): Record<string, unknown> | undefined {
	if (!value || typeof value !== 'object' || Array.isArray(value)) {
		return undefined;
	}

	return value as Record<string, unknown>;
}

function asOptionalString(value: unknown): string | undefined {
	return typeof value === 'string' && value.trim() ? value.trim() : undefined;
}

function asCoordinates(value: unknown): StreamDeckEventContext['coordinates'] | undefined {
	const record = asRecord(value);

	if (!record) {
		return undefined;
	}

	const column = typeof record.column === 'number' ? record.column : undefined;
	const row = typeof record.row === 'number' ? record.row : undefined;

	if (column === undefined && row === undefined) {
		return undefined;
	}

	return { column, row };
}

function isEventType(value: unknown): value is StreamDeckEventType {
	return typeof value === 'string' && (STREAM_DECK_EVENT_TYPES as readonly string[]).includes(value);
}

export class StreamDeckService {
	readonly buttons = new ButtonRegistry();

	#pluginConnected = false;
	#lastEventAt: string | null = null;
	#lastEventType: StreamDeckEventType | null = null;
	#lastContext: string | null = null;
	#lastAlias: string | null = null;
	#statusListeners = new Set<() => void>();

	subscribe(eventType: StreamDeckEventType, handler: (context: StreamDeckEventContext) => void) {
		return subscribeStreamDeckEvent(eventType, handler);
	}

	onStatusChange(listener: () => void): () => void {
		this.#statusListeners.add(listener);
		return () => {
			this.#statusListeners.delete(listener);
		};
	}

	getStatus(): StreamDeckStatus {
		return {
			pluginConnected: this.#pluginConnected,
			buttonCount: this.buttons.size,
			lastEventAt: this.#lastEventAt,
			lastEventType: this.#lastEventType,
			lastContext: this.#lastContext,
			lastAlias: this.#lastAlias
		};
	}

	listButtons(): RegisteredButton[] {
		return this.buttons.list();
	}

	getLastTarget(): { context?: string; alias?: string } {
		return {
			context: this.#lastContext ?? undefined,
			alias: this.#lastAlias ?? undefined
		};
	}

	resolveTarget(aliasField?: string): { context?: string; alias?: string } {
		const alias = aliasField?.trim();

		if (alias) {
			const byAlias = this.buttons.getByAlias(alias);

			return {
				alias,
				context: byAlias?.context
			};
		}

		return this.getLastTarget();
	}

	reportEvent(params: unknown): StreamDeckEventContext {
		const record = asRecord(params) ?? {};
		const type = record.type;

		if (!isEventType(type)) {
			throw Object.assign(new Error('params.type must be a valid Stream Deck event type'), {
				code: 'invalid_params'
			});
		}

		const context: StreamDeckEventContext = {
			type,
			context: asOptionalString(record.context),
			device: asOptionalString(record.device),
			action: asOptionalString(record.action),
			alias: asOptionalString(record.alias),
			coordinates: asCoordinates(record.coordinates),
			settings: asRecord(record.settings),
			isInMultiAction:
				typeof record.isInMultiAction === 'boolean' ? record.isInMultiAction : undefined,
			ticks: typeof record.ticks === 'number' ? record.ticks : undefined,
			pressed: typeof record.pressed === 'boolean' ? record.pressed : undefined,
			payload: asRecord(record.payload),
			lastEventAt: new Date().toISOString()
		};

		if (type === 'connected') {
			this.#pluginConnected = true;
		} else if (type === 'disconnected') {
			this.#pluginConnected = false;
		}

		this.#lastEventAt = context.lastEventAt ?? null;
		this.#lastEventType = type;

		if (context.context) {
			this.#lastContext = context.context;
		}

		if (context.alias) {
			this.#lastAlias = context.alias;
		} else if (context.context) {
			const registered = this.buttons.getByContext(context.context);
			if (registered?.alias) {
				this.#lastAlias = registered.alias;
				context.alias = registered.alias;
			}
		}

		if (context.context && (type === 'willAppear' || type === 'keyDown' || type === 'keyUp')) {
			this.buttons.register({
				context: context.context,
				device: context.device,
				actionUUID: context.action,
				alias: context.alias,
				coordinates: context.coordinates,
				settings: context.settings
			});
		}

		if (context.context && type === 'willDisappear') {
			this.buttons.unregister(context.context);
		}

		emitStreamDeckEvent(context);
		this.#notifyStatus();
		return context;
	}

	registerButton(params: unknown): RegisteredButton {
		const record = asRecord(params) ?? {};
		const context = asOptionalString(record.context);

		if (!context) {
			throw Object.assign(new Error('params.context is required'), { code: 'invalid_params' });
		}

		const button = this.buttons.register({
			context,
			device: asOptionalString(record.device),
			actionUUID: asOptionalString(record.actionUUID) ?? asOptionalString(record.action),
			alias: asOptionalString(record.alias),
			coordinates: asCoordinates(record.coordinates),
			settings: asRecord(record.settings)
		});

		this.#notifyStatus();
		return button;
	}

	unregisterButton(params: unknown): { ok: boolean } {
		const record = asRecord(params) ?? {};
		const context = asOptionalString(record.context);

		if (!context) {
			throw Object.assign(new Error('params.context is required'), { code: 'invalid_params' });
		}

		const ok = this.buttons.unregister(context);
		this.#notifyStatus();
		return { ok };
	}

	buildFeedbackPayload(
		aliasField: string | undefined,
		extra: Omit<FeedbackPayload, 'context' | 'alias'>
	): FeedbackPayload {
		const target = this.resolveTarget(aliasField);

		return {
			...extra,
			context: target.context,
			alias: target.alias
		};
	}

	reset(): void {
		this.buttons.clear();
		this.#pluginConnected = false;
		this.#lastEventAt = null;
		this.#lastEventType = null;
		this.#lastContext = null;
		this.#lastAlias = null;
		this.#notifyStatus();
	}

	#notifyStatus(): void {
		for (const listener of this.#statusListeners) {
			listener();
		}
	}
}
