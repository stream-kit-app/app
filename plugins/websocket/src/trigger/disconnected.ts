import type { PluginAppApi } from '@stream-kit/app/api';
import type { TriggerDefinitionProps } from '@stream-kit/core';

import type { WsConnectionStateContext } from '../contexts';
import {
	connectionSelectCondition,
	evaluateConnectionMatch
} from '../lib/conditions';
import { WS_EVENTS } from '../lib/event-hub';
import { getWebSocket } from '../lib/plugin-api';
import { disposeTriggerSubscription, setTriggerSubscription } from '../lib/subscription';
import { createOnTest, evaluateWith } from '../lib/trigger-helpers';
import { getConnectionIdFromConditions } from '../lib/trigger-condition';
import { createTestConnectionStateContext } from '../lib/test-contexts';
import { subscribeWsEvent } from '../lib/websocket-setup';

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
				connection: (value) => evaluateConnectionMatch(ctx.connectionId, value)
			});
		},
		activate: (action, trigger) => {
			const ws = getWebSocket(app);
			const connectionId = getConnectionIdFromConditions(trigger.conditions);

			if (connectionId) {
				ws.addTriggerRef(connectionId);
			}

			const unsubscribe = subscribeWsEvent<WsConnectionStateContext>(
				WS_EVENTS.DISCONNECTED,
				(context) => {
					if (trigger.definition.validate?.(trigger.conditions, context)) {
						action.fire(trigger, context);
					}
				}
			);

			setTriggerSubscription(trigger, {
				dispose: () => {
					unsubscribe();

					if (connectionId) {
						ws.removeTriggerRef(connectionId);
					}
				}
			});
		},
		deactivate: (_action, trigger) => {
			disposeTriggerSubscription(trigger);
		},
		onTest: createOnTest(() => createTestConnectionStateContext())
	}) satisfies TriggerDefinitionProps;
