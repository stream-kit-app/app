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
import type { Action, ActionTrigger } from '@stream-kit/core';

import { subscribeWsEvent } from '../lib/websocket-setup';
import type { WebSocketPluginApi } from '../lib/connection-manager';

function fireConnectedIfAlreadyOpen(
	action: Action,
	trigger: ActionTrigger,
	ws: WebSocketPluginApi,
	connectionId: string | undefined
): void {
	if (!connectionId || ws.getConnectionStatus(connectionId) !== 'connected') {
		return;
	}

	const connection = ws.getConnections().find((item) => item.id === connectionId);

	if (!connection) {
		return;
	}

	const context: WsConnectionStateContext = {
		connectionId: connection.id,
		connectionName: connection.name,
		url: connection.url
	};

	if (trigger.definition.validate?.(trigger.conditions, context)) {
		action.fire(trigger, context);
	}
}

export const createConnectedTrigger = (app: PluginAppApi) =>
	({
		name: 'Connected',
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
				void ws.ensureConnected(connectionId);
			}

			const unsubscribe = subscribeWsEvent<WsConnectionStateContext>(
				WS_EVENTS.CONNECTED,
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

			fireConnectedIfAlreadyOpen(action, trigger, ws, connectionId);
		},
		deactivate: (_action, trigger) => {
			disposeTriggerSubscription(trigger);
		},
		onTest: createOnTest(() => createTestConnectionStateContext())
	}) satisfies TriggerDefinitionProps;
