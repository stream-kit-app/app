import type { ActionQueueEvent, ActionQueueEventContext, PluginAppApi } from '@stream-kit/plugin';
import type { TriggerDefinitionProps } from '@stream-kit/plugin';

import { evaluateQueueFilterMatch, queueFilterCondition } from '../lib/queue-conditions';
import { createActivate, createDeactivate, createOnTest, evaluateWith } from '../lib/trigger-helpers';
import { createTestQueueEventContext } from '../lib/test-contexts';

const QUEUE_EVENT_NAMES: Record<ActionQueueEvent, string> = {
	paused: 'Queue Paused',
	resumed: 'Queue Resumed',
	idle: 'Queue Became Idle',
	job_enqueued: 'Queue Job Enqueued',
	job_started: 'Queue Job Started',
	job_completed: 'Queue Job Completed'
};

export function createQueueStatusTrigger(
	app: PluginAppApi,
	event: ActionQueueEvent
): TriggerDefinitionProps {
	return {
		name: QUEUE_EVENT_NAMES[event],
		conditions: [queueFilterCondition(app)],
		validate: (conditions, context) => {
			const ctx = context as ActionQueueEventContext;

			return evaluateWith(conditions, context, {
				queue: (value) => evaluateQueueFilterMatch(ctx, value)
			});
		},
		activate: createActivate<ActionQueueEventContext>(
			(listener) => app.actionQueues.on(event, listener),
			(conditions, context) => {
				const ctx = context as ActionQueueEventContext;

				return evaluateWith(conditions, context, {
					queue: (value) => evaluateQueueFilterMatch(ctx, value)
				});
			}
		),
		deactivate: createDeactivate(),
		onTest: createOnTest(() => createTestQueueEventContext(event))
	};
}
