import type { PluginAppApi } from '@stream-kit/plugin';
import type { Action, ActionTrigger } from '@stream-kit/plugin';

import { enrichChatMessageWithCommand } from '@stream-kit/core';

import { disposeTriggerSubscription, setTriggerSubscription } from './subscription';

export function createActivateWithCommandContext<TContext extends { message: string }>(
	_app: PluginAppApi,
	subscribe: (handler: (context: TContext) => void) => () => void
) {
	return (action: Action, trigger: ActionTrigger) => {
		const unsubscribe = subscribe((context) => {
			const enriched = enrichChatMessageWithCommand(context, trigger.conditions);
			action.fire(trigger, enriched);
		});

		setTriggerSubscription(trigger, { dispose: unsubscribe });
	};
}
