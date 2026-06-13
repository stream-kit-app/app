import type { ConditionDefinition, ConditionGroupNode } from '@stream-kit/plugin';
import { DEFAULT_CRON_PRESETS, getCronValidationError } from '@stream-kit/core';

import { computeNextRun, validateScheduleDateTime } from './compute-next-run';
import { WEEKDAY_VALUES } from './schedule-date-time';
import {
	findConditionSelectValue,
	findConditionTextValue
} from './trigger-condition';
import { setConditionFieldError } from './parse-schedule-config';

export type TriggerFormErrors = {
	conditionFields: Record<string, string>;
	missingConditions: string[];
};

export const repeatOptions = [
	{ value: 'once', label: 'Once' },
	{ value: 'daily', label: 'Daily' },
	{ value: 'weekly', label: 'Weekly' }
] as const;

export const weekdayOptions = WEEKDAY_VALUES.map((value) => ({
	value,
	label: value.charAt(0).toUpperCase() + value.slice(1)
}));

export function cronExpressionCondition(): ConditionDefinition {
	return {
		type: 'cron-expression',
		name: 'Expression',
		required: true,
		presets: [...DEFAULT_CRON_PRESETS]
	};
}

export function scheduledDateCondition(): ConditionDefinition {
	return {
		type: 'text',
		name: 'Date',
		placeholder: 'YYYY-MM-DD'
	};
}

export function scheduledTimeCondition(): ConditionDefinition {
	return {
		type: 'text',
		name: 'Time',
		placeholder: 'HH:mm'
	};
}

export function scheduledRepeatCondition(): ConditionDefinition {
	return {
		type: 'select',
		name: 'Repeat',
		defaultValue: 'once',
		required: true,
		items: [...repeatOptions]
	};
}

export function scheduledWeekdayCondition(): ConditionDefinition {
	return {
		type: 'select',
		name: 'Weekday',
		placeholder: 'Select weekday',
		items: [...weekdayOptions]
	};
}

function emptyTriggerFormErrors(): TriggerFormErrors {
	return {
		conditionFields: {},
		missingConditions: []
	};
}

export function validateCronTriggerForm(conditions: ConditionGroupNode): TriggerFormErrors | undefined {
	const errors = emptyTriggerFormErrors();
	const expression = findConditionTextValue(conditions, 'expression');
	const validationError = getCronValidationError(expression);

	if (validationError) {
		setConditionFieldError(errors, conditions, 'expression', validationError);
	}

	return Object.keys(errors.conditionFields).length > 0 ? errors : undefined;
}

export function validateScheduledTriggerForm(
	conditions: ConditionGroupNode
): TriggerFormErrors | undefined {
	const errors = emptyTriggerFormErrors();
	const date = findConditionTextValue(conditions, 'date');
	const time = findConditionTextValue(conditions, 'time');
	const repeat = findConditionSelectValue(conditions, 'repeat') || 'once';
	const weekday = findConditionSelectValue(conditions, 'weekday');
	const validationError = validateScheduleDateTime(
		date,
		time,
		repeat as 'once' | 'daily' | 'weekly',
		weekday
	);

	if (validationError) {
		setConditionFieldError(errors, conditions, validationError.field, validationError.message);
		return errors;
	}

	if (repeat === 'once') {
		const nextRun = computeNextRun(
			{
				kind: 'scheduled',
				date: date || undefined,
				time: time || undefined,
				repeat: 'once',
				weekday: weekday || undefined
			},
			new Date()
		);

		if (nextRun === null) {
			const field = date && time ? 'time' : date ? 'date' : 'time';
			setConditionFieldError(errors, conditions, field, 'Scheduled time is already in the past');
			return errors;
		}
	}

	return undefined;
}
