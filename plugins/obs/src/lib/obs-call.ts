import type { PluginAppApi } from '@stream-kit/plugin';
import type { OBSWebSocket } from 'obs-websocket-js';

import { getObs } from './plugin-api';

type CallObsOptions = {
	label?: string;
};

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

export async function callObs(
	app: PluginAppApi,
	request: Parameters<OBSWebSocket['call']>[0],
	data?: Parameters<OBSWebSocket['call']>[1],
	options: CallObsOptions = {}
): Promise<boolean> {
	const response = await callObsWithResponse(app, request, data, options);

	return response !== undefined;
}

export async function callObsWithResponse<T>(
	app: PluginAppApi,
	request: Parameters<OBSWebSocket['call']>[0],
	data?: Parameters<OBSWebSocket['call']>[1],
	options: CallObsOptions = {}
): Promise<T | undefined> {
	const client = getObsClient(app);
	const label = options.label ?? request;

	if (!client) {
		notifyObsCallError(app, label, undefined, true);
		return undefined;
	}

	try {
		return (await client.call(request, data)) as T;
	} catch (error) {
		notifyObsCallError(app, label, error);
		return undefined;
	}
}
