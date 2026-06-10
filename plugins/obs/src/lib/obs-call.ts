import type { PluginAppApi } from '@stream-kit/app/api';
import type { OBSWebSocket } from 'obs-websocket-js';

import { getObs } from './plugin-api';

type CallObsOptions = {
	label?: string;
};

export function getObsClient(app: PluginAppApi): OBSWebSocket | undefined {
	return getObs(app).client;
}

export async function callObs(
	app: PluginAppApi,
	request: Parameters<OBSWebSocket['call']>[0],
	data?: Parameters<OBSWebSocket['call']>[1],
	options: CallObsOptions = {}
): Promise<boolean> {
	const client = getObsClient(app);
	const label = options.label ?? request;

	if (!client) {
		app.toast.create({
			title: `${label} failed`,
			description: 'OBS Studio is not connected.',
			variant: 'warning'
		});
		return false;
	}

	try {
		await client.call(request, data);
		return true;
	} catch (error) {
		const message =
			error instanceof Error ? error.message : 'Unknown OBS WebSocket error.';

		app.toast.create({
			title: `${label} failed`,
			description: message,
			variant: 'error'
		});
		return false;
	}
}
