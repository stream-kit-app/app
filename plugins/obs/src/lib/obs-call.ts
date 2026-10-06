import type { PluginAppApi } from '@stream-kit/plugin';
import type { OBSWebSocket } from 'obs-websocket-js';

import { getObs } from './plugin-api';

type CallObsOptions = {
	label?: string;
	/** Skip the error toast (for background polling). */
	silent?: boolean;
};

/** obs-websocket-js never settles a pending call when the socket closes, so bound it. */
const OBS_CALL_TIMEOUT_MS = 10_000;

function callWithTimeout(
	client: OBSWebSocket,
	request: Parameters<OBSWebSocket['call']>[0],
	data: Parameters<OBSWebSocket['call']>[1] | undefined
): Promise<unknown> {
	return new Promise((resolve, reject) => {
		const cleanup = (): void => {
			clearTimeout(timer);
			client.off('ConnectionClosed', onClosed);
		};
		const onClosed = (): void => {
			cleanup();
			reject(new Error('OBS Studio disconnected.'));
		};
		const timer = setTimeout(() => {
			cleanup();
			reject(new Error(`OBS did not respond to ${request} within ${OBS_CALL_TIMEOUT_MS / 1000}s.`));
		}, OBS_CALL_TIMEOUT_MS);

		client.once('ConnectionClosed', onClosed);
		(client.call as (request: string, data?: unknown) => Promise<unknown>)(request, data).then(
			(value) => {
				cleanup();
				resolve(value);
			},
			(error: unknown) => {
				cleanup();
				reject(error);
			}
		);
	});
}

export function getObsClient(app: PluginAppApi): OBSWebSocket | undefined {
	return getObs(app).client;
}

function notifyObsCallError(
	app: PluginAppApi,
	label: string,
	error: unknown,
	disconnected = false
): void {
	if (disconnected) {
		app.toast.create({
			title: `${label} failed`,
			description: 'OBS Studio is not connected.',
			variant: 'warning'
		});
		return;
	}

	const message = error instanceof Error ? error.message : 'Unknown OBS WebSocket error.';

	app.toast.create({
		title: `${label} failed`,
		description: message,
		variant: 'error'
	});
}

async function performObsCall(
	app: PluginAppApi,
	request: Parameters<OBSWebSocket['call']>[0],
	data: Parameters<OBSWebSocket['call']>[1] | undefined,
	options: CallObsOptions
): Promise<{ ok: boolean; data?: unknown }> {
	const client = getObsClient(app);
	const label = options.label ?? request;

	if (!client) {
		if (!options.silent) {
			notifyObsCallError(app, label, undefined, true);
		}
		return { ok: false };
	}

	try {
		const responseData = await callWithTimeout(client, request, data);
		return { ok: true, data: responseData };
	} catch (error) {
		if (!options.silent) {
			notifyObsCallError(app, label, error);
		}
		return { ok: false };
	}
}

export async function callObs(
	app: PluginAppApi,
	request: Parameters<OBSWebSocket['call']>[0],
	data?: Parameters<OBSWebSocket['call']>[1],
	options: CallObsOptions = {}
): Promise<boolean> {
	// Success is determined by whether the request threw, not by whether it
	// returned data. Many OBS requests (e.g. TriggerMediaInputAction) are void
	// and resolve with no response payload.
	const { ok } = await performObsCall(app, request, data, options);

	return ok;
}

export async function callObsWithResponse<T>(
	app: PluginAppApi,
	request: Parameters<OBSWebSocket['call']>[0],
	data?: Parameters<OBSWebSocket['call']>[1],
	options: CallObsOptions = {}
): Promise<T | undefined> {
	const { ok, data: responseData } = await performObsCall(app, request, data, options);

	return ok ? (responseData as T) : undefined;
}
