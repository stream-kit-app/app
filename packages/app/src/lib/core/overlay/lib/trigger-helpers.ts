import type { Action } from '../../action/action.svelte';
import type { ActionTrigger } from '../../action/action-trigger.svelte';
import type { ConditionGroupNode, FieldValue } from '../../action/trigger/condition';
import type { TriggerTestFn } from '../../action/trigger/types';

import { evaluateConditionTree } from './evaluate-conditions';

type Subscription = {
	dispose: () => void;
};

const triggerSubscriptions = new WeakMap<object, Subscription>();

export function setTriggerSubscription(trigger: object, subscription: Subscription): void {
	disposeTriggerSubscription(trigger);
	triggerSubscriptions.set(trigger, subscription);
}

export function disposeTriggerSubscription(trigger: object): void {
	const subscription = triggerSubscriptions.get(trigger);

	if (subscription) {
		subscription.dispose();
		triggerSubscriptions.delete(trigger);
	}
}

export function createActivate<TContext>(
	subscribe: (handler: (context: TContext) => void) => () => void,
	validate: (conditions: ConditionGroupNode, context: TContext) => boolean
) {
	return (action: Action, trigger: ActionTrigger) => {
		const unsubscribe = subscribe((context) => {
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
	evaluators: Record<string, (value: FieldValue) => boolean>
): boolean {
	return evaluateConditionTree(conditions, (key, value) => {
		const evaluate = evaluators[key];

		if (!evaluate) {
			return true;
		}

		return evaluate(value);
	});
}
