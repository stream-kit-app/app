import type { PluginAppApi } from '@stream-kit/app/api';
import type { TriggerDefinitionProps } from '@stream-kit/core';

import { createOnTest, createDeactivate } from '../lib/trigger-helpers';
import { disposeTriggerSubscription, setTriggerSubscription } from '../lib/subscription';
import { parseCronScheduleConfig } from '../lib/parse-schedule-config';
import {
	cronExpressionCondition,
	validateCronTriggerForm
} from '../lib/schedule-conditions';
import { createTestScheduleContext, type ScheduleService } from '../lib/schedule-service';

function showScheduleActivationError(app: PluginAppApi, message: string): void {
	console.warn('Cron trigger activation failed:', message);
	app.toast.create({
		title: 'Schedule could not start',
		description: message,
		variant: 'warning'
	});
}

export function createCronTrigger(
	app: PluginAppApi,
	scheduleService: ScheduleService
): TriggerDefinitionProps {
	return {
		name: 'Cron',
		conditions: [cronExpressionCondition()],
		validateForm: validateCronTriggerForm,
		activate: (action, trigger) => {
			disposeTriggerSubscription(trigger);

			const parsed = parseCronScheduleConfig(trigger.conditions);

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
		onTest: createOnTest(() => createTestScheduleContext('cron'))
	};
}
