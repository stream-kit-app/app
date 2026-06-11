import type { WsConnection } from './connections';

export const DEFAULT_MAX_CONNECT_RETRIES = 5;
export const DEFAULT_RECONNECT_DELAY_SEC = 5;

export const MIN_MAX_CONNECT_RETRIES = 1;
export const MAX_MAX_CONNECT_RETRIES = 100;
export const MIN_RECONNECT_DELAY_SEC = 1;
export const MAX_RECONNECT_DELAY_SEC = 300;

export type WsReconnectSettings = {
	maxConnectRetries: number;
	reconnectDelaySec: number;
};

export type WsReconnectSettingsErrors = Partial<Record<keyof WsReconnectSettings, string>>;

export const DEFAULT_WS_RECONNECT_SETTINGS: WsReconnectSettings = {
	maxConnectRetries: DEFAULT_MAX_CONNECT_RETRIES,
	reconnectDelaySec: DEFAULT_RECONNECT_DELAY_SEC
};

function clampInt(value: unknown, min: number, max: number, fallback: number): number {
	const parsed = Number.parseInt(String(value ?? ''), 10);

	if (Number.isNaN(parsed)) {
		return fallback;
	}

	return Math.min(max, Math.max(min, parsed));
}

export function normalizeReconnectSettings(
	raw: Partial<WsReconnectSettings> | undefined
): WsReconnectSettings {
	return {
		maxConnectRetries: clampInt(
			raw?.maxConnectRetries,
			MIN_MAX_CONNECT_RETRIES,
			MAX_MAX_CONNECT_RETRIES,
			DEFAULT_MAX_CONNECT_RETRIES
		),
		reconnectDelaySec: clampInt(
			raw?.reconnectDelaySec,
			MIN_RECONNECT_DELAY_SEC,
			MAX_RECONNECT_DELAY_SEC,
			DEFAULT_RECONNECT_DELAY_SEC
		)
	};
}

export function getConnectionReconnectSettings(
	connection: Pick<WsConnection, 'maxConnectRetries' | 'reconnectDelaySec'>
): WsReconnectSettings {
	return normalizeReconnectSettings({
		maxConnectRetries: connection.maxConnectRetries,
		reconnectDelaySec: connection.reconnectDelaySec
	});
}

export function validateReconnectSettings(
	settings: WsReconnectSettings
): WsReconnectSettingsErrors | undefined {
	const errors: WsReconnectSettingsErrors = {};

	if (
		!Number.isInteger(settings.maxConnectRetries) ||
		settings.maxConnectRetries < MIN_MAX_CONNECT_RETRIES ||
		settings.maxConnectRetries > MAX_MAX_CONNECT_RETRIES
	) {
		errors.maxConnectRetries = `Enter a value between ${MIN_MAX_CONNECT_RETRIES} and ${MAX_MAX_CONNECT_RETRIES}.`;
	}

	if (
		!Number.isInteger(settings.reconnectDelaySec) ||
		settings.reconnectDelaySec < MIN_RECONNECT_DELAY_SEC ||
		settings.reconnectDelaySec > MAX_RECONNECT_DELAY_SEC
	) {
		errors.reconnectDelaySec = `Enter a value between ${MIN_RECONNECT_DELAY_SEC} and ${MAX_RECONNECT_DELAY_SEC}.`;
	}

	return Object.keys(errors).length > 0 ? errors : undefined;
}
