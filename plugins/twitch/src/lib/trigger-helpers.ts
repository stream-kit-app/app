import type { PluginAppApi } from '@stream-kit/app/api';
import type { Action, ActionTrigger, ConditionGroupNode, TriggerTestFn } from '@stream-kit/core';

import { getTwitch } from './plugin-api';

import { evaluateConditionTree } from '../evaluate-conditions';
import { resolveConditionValue } from '../resolve-condition-value';
import { subscribe } from './event-hub';
import { disposeTriggerSubscription, setTriggerSubscription } from './subscription';

export function isTwitchReady(app: PluginAppApi): boolean {
	return getTwitch(app).isConnected && getTwitch(app).chat != null;
}

export function isEventSubReady(app: PluginAppApi): boolean {
	return getTwitch(app).isConnected && getTwitch(app).eventSub != null && getTwitch(app).userId != null;
}

export function createActivate<TContext>(
	app: PluginAppApi,
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

export function createOnTest<TContext>(factory: () => TContext): TriggerTestFn {
	return (_action, _trigger) => factory();
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