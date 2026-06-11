import type { PluginAppApi } from '@stream-kit/app/api';
import type { TriggerDefinitionProps } from '@stream-kit/core';

import type { WsMessageContext } from '../contexts';
import {
	connectionSelectCondition,
	evaluateConnectionMatch,
	evaluateJsonPathMatch,
	evaluateMessageMatch,
	jsonPathCondition,
	jsonValueMatchCondition,
	messageMatchCondition
} from '../lib/conditions';
import { getWebSocket } from '../lib/plugin-api';
import { disposeTriggerSubscription, setTriggerSubscription } from '../lib/subscription';
import { createOnTest, evaluateWith } from '../lib/trigger-helpers';
import { getConnectionIdFromConditions, findConditionValue } from '../lib/trigger-condition';
import { createTestMessageContext } from '../lib/test-contexts';
import { WS_EVENTS } from '../lib/event-hub';
import { subscribeWsEvent } from '../lib/websocket-setup';

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
			jsonPathCondition(),
			jsonValueMatchCondition()
		],
		validate: (conditions, context) => {
			const ctx = context as WsMessageContext;
			const jsonPath = findConditionValue(conditions, 'json-path');
			const jsonMatch =
				findConditionValue(conditions, 'json-value') ?? ({ type: 'equals', value: '' } as const);

			return evaluateWith(conditions, context, {
				connection: (value) => evaluateConnectionMatch(ctx.connectionId, value),
				message: (value) => evaluateMessageMatch(ctx.message, value),
				'json-path': () => evaluateJsonPathMatch(ctx.isJson, ctx.data, jsonPath ?? '', jsonMatch),
				'json-value': (value) => evaluateJsonPathMatch(ctx.isJson, ctx.data, jsonPath ?? '', value)
			});
		},
		activate: (action, trigger) => {
			const ws = getWebSocket(app);
			const connectionId = getConnectionIdFromConditions(trigger.conditions);

			if (connectionId) {
				ws.addTriggerRef(connectionId);
				void ws.ensureConnected(connectionId);
			}

			const unsubscribe = subscribeWsEvent<WsMessageContext>(WS_EVENTS.MESSAGE, (context) => {
				if (trigger.definition.validate?.(trigger.conditions, context)) {
					action.fire(trigger, context);
				}
			});

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
		onTest: createOnTest(() => createTestMessageContext())
	}) satisfies TriggerDefinitionProps;
