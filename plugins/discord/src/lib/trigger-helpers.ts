import type {
	Action,
	ActionTrigger,
	ConditionGroupNode,
	FieldValue,
	PluginAppApi,
	TriggerTestFn
} from '@stream-kit/plugin';

import { evaluateConditionTree } from '../evaluate-conditions';
import { resolveConditionValue } from '../resolve-condition-value';
import { disposeTriggerSubscription, setTriggerSubscription } from './subscription';

export function createActivate<TContext>(
	_app: PluginAppApi,
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
			return false;
		}

		return evaluate(resolveConditionValue(value, context));
	});
}
