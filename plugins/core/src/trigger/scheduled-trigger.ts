import type { PluginAppApi } from '@stream-kit/plugin';
import type { TriggerDefinitionProps } from '@stream-kit/plugin';

import { createOnTest, createDeactivate } from '../lib/trigger-helpers';
import { disposeTriggerSubscription, setTriggerSubscription } from '../lib/subscription';
import { parseScheduledScheduleConfig } from '../lib/parse-schedule-config';
import {
	scheduledDateCondition,
	scheduledRepeatCondition,
	scheduledTimeCondition,
	scheduledWeekdayCondition,
	validateScheduledTriggerForm
} from '../lib/schedule-conditions';
import { createTestScheduleContext, type ScheduleService } from '../lib/schedule-service';

function showScheduleActivationError(app: PluginAppApi, message: string): void {
	console.warn('Scheduled trigger activation failed:', message);
	app.toast.create({
		title: 'Schedule could not start',
		description: message,
		variant: 'warning'
	});
}

export function createScheduledTrigger(
	app: PluginAppApi,
	scheduleService: ScheduleService
): TriggerDefinitionProps {
	return {
		name: 'Scheduled',
		conditions: [
			scheduledDateCondition(),
			scheduledTimeCondition(),
			scheduledRepeatCondition(),
			scheduledWeekdayCondition()
		],
		validateForm: validateScheduledTriggerForm,
		activate: (action, trigger) => {
			disposeTriggerSubscription(trigger);

			const parsed = parseScheduledScheduleConfig(trigger.conditions);

			if (!parsed.ok) {
				showScheduleActivationError(app, parsed.error);
				return;
			}

			scheduleService.register(action, trigger, parsed.config);
			setTriggerSubscription(trigger, {
				dispose: () => scheduleService.unregister(trigger)
			});
		},
		deactivate: createDeactivate(),
		onTest: createOnTest(() => createTestScheduleContext('scheduled'))
	};
}
