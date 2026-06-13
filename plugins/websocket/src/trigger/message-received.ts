import type { PluginAppApi } from '@stream-kit/plugin';
import type { TriggerDefinitionProps } from '@stream-kit/plugin';

import type { WsMessageContext } from '../contexts';
import {
	connectionSelectCondition,
	evaluateConnectionMatch,
	evaluateJsonFieldMatch,
	evaluateMessageMatch,
	jsonFieldCondition,
	messageMatchCondition
} from '../lib/conditions';
import {
	activateConnectionStateTrigger,
	deactivateConnectionStateTrigger
} from '../lib/connection-trigger';
import { WS_EVENTS } from '../lib/event-hub';
import { getWebSocket } from '../lib/plugin-api';
import { createOnTest, evaluateWith } from '../lib/trigger-helpers';
import { getConnectionIdFromConditions } from '../lib/trigger-condition';
import { createTestMessageContext } from '../lib/test-contexts';

export const createMessageReceivedTrigger = (app: PluginAppApi) =>
	({
		name: 'Message Received',
		conditions: [
			connectionSelectCondition(async () => {
				const connections = getWebSocket(app).getConnections();

				return connections.map((connection) => ({
					value: connection.id,
					label: connection.name
				}));
			}),
			messageMatchCondition(),
			jsonFieldCondition()
		],
		validate: (conditions, context) => {
			const ctx = context as WsMessageContext;

			return evaluateWith(conditions, context, {
				connection: (value) =>
					evaluateConnectionMatch(ctx.connectionId, value, ctx.affectedConnectionIds),
				message: (value) => evaluateMessageMatch(ctx.message, value),
				'json-field': (value) => evaluateJsonFieldMatch(ctx.isJson, ctx.data, value)
			});
		},
		activate: (action, trigger) => {
			activateConnectionStateTrigger<WsMessageContext>(app, action, trigger, WS_EVENTS.MESSAGE, {
				connectionId: getConnectionIdFromConditions(trigger.conditions),
				ensureConnected: true
			});
		},
		deactivate: deactivateConnectionStateTrigger,
		onTest: createOnTest(() => createTestMessageContext())
	}) satisfies TriggerDefinitionProps;
