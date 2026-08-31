import type { PluginAppApi } from '@stream-kit/plugin';
import type { Action, ActionTrigger } from '@stream-kit/plugin';

import type { WsConnectionStateContext } from '../contexts';

import { createPooledContextForConnection } from './pooled-context';
import { getWebSocket } from './plugin-api';
import { disposeTriggerSubscription, setTriggerSubscription } from './subscription';
import { subscribeWsEvent } from './websocket-setup';

type ActivateConnectionTriggerOptions = {
	connectionId?: string;
	/** Fire once on activate when the socket is already open (Connected trigger only). */
	syncIfConnected?: boolean;
	/** Start connecting when a specific connection is configured (Connected trigger only). */
	ensureConnected?: boolean;
};

export function activateConnectionStateTrigger<TContext = WsConnectionStateContext>(
	app: PluginAppApi,
	action: Action,
	trigger: ActionTrigger,
	eventKey: string,
	options: ActivateConnectionTriggerOptions = {}
): void {
	const ws = getWebSocket(app);
	const { connectionId, syncIfConnected = false, ensureConnected = false } = options;

	if (connectionId) {
		ws.addTriggerRef(connectionId);
	}

	const fireIfMatching = (context: TContext): void => {
		const matches = trigger.definition.validate?.(trigger.conditions, context) ?? false;
		if (matches) {
			action.fire(trigger, context);
		}
	};

	const unsubscribe = subscribeWsEvent<TContext>(eventKey, fireIfMatching);

	setTriggerSubscription(trigger, {
		dispose: () => {
			unsubscribe();

			if (connectionId) {
				ws.removeTriggerRef(connectionId);
			}
		}
	});

	if (!connectionId) {
		return;
	}

	if (syncIfConnected && ws.getConnectionStatus(connectionId) === 'connected') {
		const connection = ws.getConnections().find((item) => item.id === connectionId);

		if (connection) {
			const context = createPooledContextForConnection(ws.getConnections(), connection);

			if (context) {
				fireIfMatching(context as TContext);
			}
		}

		return;
	}

	if (ensureConnected) {
		void ws.ensureConnected(connectionId).catch(() => {
			// Expected when the remote socket is down; connection status covers UX.
		});
	}
}

export function deactivateConnectionStateTrigger(_action: Action, trigger: ActionTrigger): void {
	disposeTriggerSubscription(trigger);
}
