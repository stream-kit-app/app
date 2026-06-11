import type { PluginAppApi } from '@stream-kit/app/api';
import type { TriggerDefinitionProps } from '@stream-kit/core';

import type { ProcessEventContext } from '../contexts';
import { evaluateProcessNameMatch, processNameCondition } from '../lib/process-conditions';
import { createOnTest, evaluateWith } from '../lib/trigger-helpers';
import { createTestProcessEventContext } from '../lib/test-contexts';
import { disposeTriggerSubscription, setTriggerSubscription } from '../lib/subscription';

type ProcessTriggerEvent = 'started' | 'stopped';

export function createProcessTrigger(
	app: PluginAppApi,
	event: ProcessTriggerEvent
): TriggerDefinitionProps {
	const name = event === 'started' ? 'Process Started' : 'Process Stopped';
	const subscribe = event === 'started' ? app.process.onStarted : app.process.onStopped;

	return {
		name,
		conditions: [processNameCondition()],
		validate: (conditions, context) => {
			const ctx = context as ProcessEventContext;

			return evaluateWith(conditions, context, {
				name: (value) => evaluateProcessNameMatch(ctx, value)
			});
		},
		activate: (action, trigger) => {
			disposeTriggerSubscription(trigger);
			void app.process.sync(true);

			const unsubscribe = subscribe((context) => {
				if (trigger.definition.validate?.(trigger.conditions, context)) {
					action.fire(trigger, context);
				}
			});

			setTriggerSubscription(trigger, { dispose: unsubscribe });
		},
		deactivate: (_action, trigger) => {
			disposeTriggerSubscription(trigger);
		},
		onTest: createOnTest(() => createTestProcessEventContext())
	};
}
