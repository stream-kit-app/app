import type { PluginAppApi } from '@stream-kit/plugin';
import type { HandlerDefinitionProps, SelectItem } from '@stream-kit/plugin';

import { getFieldValue, resolveFieldText } from '../get-field-value';
import { getWebSocket } from '../lib/plugin-api';
import { WS_TEXT_VARIABLES } from '../lib/variables';

function connectionSelectField(app: PluginAppApi) {
	return {
		type: 'select' as const,
		name: 'Connection',
		placeholder: 'Select a connection',
		loadingPlaceholder: 'Loading connections…',
		required: true,
		items: async () => {
			const connections = getWebSocket(app).getConnections();

			return connections.map(
				(connection): SelectItem => ({
					value: connection.id,
					label: connection.name
				})
			);
		}
	};
}

export const createSendMessageHandler = (app: PluginAppApi) =>
	({
		name: 'Send Message',
		fields: [
			connectionSelectField(app),
			{
				type: 'text',
				name: 'Message',
				required: true,
				placeholder: 'Hello {username}',
				variables: [...WS_TEXT_VARIABLES]
			}
		],
		execute: async (_action, handler, context, next) => {
			const connectionId = getFieldValue(handler.fields, 'connection');
			const message = resolveFieldText(handler.fields, 'message', context);

			if (typeof connectionId !== 'string' || !connectionId.trim()) {
				app.toast.create({
					title: 'Send Message failed',
					description: 'Select a WebSocket connection.',
					variant: 'error'
				});
				return;
			}

			if (typeof message !== 'string' || !message.trim()) {
				app.toast.create({
					title: 'Send Message failed',
					description: 'Enter a message to send.',
					variant: 'error'
				});
				return;
			}

			try {
				await getWebSocket(app).send(connectionId.trim(), message.trim());
				next();
			} catch (error) {
				const description =
					error instanceof Error ? error.message : 'Failed to send WebSocket message.';

				app.toast.create({
					title: 'Send Message failed',
					description,
					variant: 'error'
				});
			}
		}
	}) satisfies HandlerDefinitionProps;
