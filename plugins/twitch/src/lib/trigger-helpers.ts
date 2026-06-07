import type { App } from '@stream-kit/app/api';
import type { Action } from '@stream-kit/app/api';
import type { ActionTrigger } from '@stream-kit/app/api';
import type { ConditionGroupNode } from '@stream-kit/core';

import { evaluateConditionTree } from '../evaluate-conditions';
import { resolveConditionValue } from '../resolve-condition-value';
import { subscribe } from './event-hub';
import { disposeTriggerSubscription, setTriggerSubscription } from './subscription';

export function isTwitchReady(app: App): boolean {
	return app.twitch.isConnected && app.twitch.chat != null;
}

export function isEventSubReady(app: App): boolean {
	return app.twitch.isConnected && app.twitch.eventSub != null && app.twitch.userId != null;
}

export function createActivate<TContext>(
	app: App,
	eventKey: string,
	setup: (emit: (context: TContext) => void) => () => void,
	validate: (conditions: ConditionGroupNode, context: TContext) => boolean
) {
	return (action: Action, trigger: ActionTrigger) => {
		if (!isTwitchReady(app) && !isEventSubReady(app)) {
			return;
		}

		const unsubscribe = subscribe<TContext>(eventKey, setup, (context) => {
			if (validate(trigger.conditions, context)) {
				action.fire(trigger, context);
			}
		});

		setTriggerSubscription(trigger, { dispose: unsubscribe });
	};
}

export function createDeactivate() {
	return (_action: Action, trigger: ActionTrigger) => {
		disposeTriggerSubscription(trigger);
	};
}

export function evaluateWith(
	conditions: ConditionGroupNode,
	context: unknown,
	evaluators: Record<string, (value: import('@stream-kit/core').FieldValue) => boolean>
): boolean {
	return evaluateConditionTree(conditions, (key, value) => {
		const evaluate = evaluators[key];

		if (!evaluate) {
			return false;
		}

		return evaluate(resolveConditionValue(value, context));
	});
}
