import type { PluginAppApi } from '@stream-kit/plugin';

import type { StreamDeckService } from './stream-deck-service';
import type { FeedbackEventName, FeedbackPayload } from './types';

/** Full API method names — always prefixed so registration works even if the plugin app API is unscoped. */
const METHODS = {
	reportEvent: 'plugin:stream-deck:reportEvent',
	registerButton: 'plugin:stream-deck:registerButton',
	unregisterButton: 'plugin:stream-deck:unregisterButton',
	getStatus: 'plugin:stream-deck:getStatus',
	listButtons: 'plugin:stream-deck:listButtons'
} as const;

export function registerStreamDeckApi(app: PluginAppApi, service: StreamDeckService): void {
	app.api.registerMethod(METHODS.reportEvent, (params) => service.reportEvent(params));
	app.api.registerMethod(METHODS.registerButton, (params) => service.registerButton(params));
	app.api.registerMethod(METHODS.unregisterButton, (params) => service.unregisterButton(params));
	app.api.registerMethod(METHODS.getStatus, () => service.getStatus());
	app.api.registerMethod(METHODS.listButtons, () => service.listButtons());
}

export async function emitFeedback(
	app: PluginAppApi,
	event: FeedbackEventName,
	payload: FeedbackPayload
): Promise<void> {
	if (!payload.context && !payload.alias) {
		app.toast.create({
			title: app.i18n.translate('Stream Deck target missing'),
			description: app.i18n.translate(
				'Set a button alias or press a Stream Deck key first.'
			),
			variant: 'warning'
		});
		return;
	}

	await app.api.emit(event, payload);
}
