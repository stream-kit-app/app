import type { PluginAppApi } from '@stream-kit/app/api';
import type { TriggerDefinitionProps } from '@stream-kit/core';

import type { WsConnectionStateContext } from '../contexts';
import {
	connectionSelectCondition,
	evaluateConnectionMatch
} from '../lib/conditions';
import {
	activateConnectionStateTrigger,
	deactivateConnectionStateTrigger
} from '../lib/connection-trigger';
import { WS_EVENTS } from '../lib/event-hub';
import { getWebSocket } from '../lib/plugin-api';
import { createOnTest, evaluateWith } from '../lib/trigger-helpers';
import { getConnectionIdFromConditions } from '../lib/trigger-condition';
import { createTestConnectionStateContext } from '../lib/test-contexts';

export const createDisconnectedTrigger = (app: PluginAppApi) =>
	({
		name: 'Disconnected',
		conditions: [
			connectionSelectCondition(async () => {
				const connections = getWebSocket(app).getConnections();

				return connections.map((connection) => ({
					value: connection.id,
					label: connection.name
				}));
			})
		],
		validate: (conditions, context) => {
			const ctx = context as WsConnectionStateContext;

			return evaluateWith(conditions, context, {
				connection: (value) =>
					evaluateConnectionMatch(ctx.connectionId, value, ctx.affectedConnectionIds)
			});
		},
		activate: (action, trigger) => {
			activateConnectionStateTrigger(app, action, trigger, WS_EVENTS.DISCONNECTED, {
				connectionId: getConnectionIdFromConditions(trigger.conditions)
			});
		},
		deactivate: deactivateConnectionStateTrigger,
		onTest: createOnTest(() => createTestConnectionStateContext())
	}) satisfies TriggerDefinitionProps;
