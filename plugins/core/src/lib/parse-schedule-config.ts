import type { ConditionGroupNode } from '@stream-kit/plugin';

import {
	computeNextRun,
	getCronValidationError,
	validateScheduleDateTime
} from './compute-next-run';
import { findConditionLeaf, findConditionSelectValue, findConditionTextValue } from './trigger-condition';
import type { ParsedScheduleConfig, ScheduleRepeat } from './schedule-types';

const REPEAT_VALUES: ScheduleRepeat[] = ['once', 'daily', 'weekly'];

function parseRepeat(value: string): ScheduleRepeat {
	if (REPEAT_VALUES.includes(value as ScheduleRepeat)) {
		return value as ScheduleRepeat;
	}

	return 'once';
}

export function parseCronScheduleConfig(conditions: ConditionGroupNode): ParsedScheduleConfig {
	const expression = findConditionTextValue(conditions, 'expression');

	if (!expression) {
		return { ok: false, error: 'Cron expression is required' };
	}

	const validationError = getCronValidationError(expression);

	if (validationError) {
		return { ok: false, error: validationError };
	}

	return {
		ok: true,
		config: {
			kind: 'cron',
			expression
		}
	};
}

export function parseScheduledScheduleConfig(conditions: ConditionGroupNode): ParsedScheduleConfig {
	const date = findConditionTextValue(conditions, 'date');
	const time = findConditionTextValue(conditions, 'time');
	const repeat = parseRepeat(findConditionSelectValue(conditions, 'repeat'));
	const weekday = findConditionSelectValue(conditions, 'weekday');

	const validationError = validateScheduleDateTime(date, time, repeat, weekday);

	if (validationError) {
		return { ok: false, error: validationError.message };
	}

	const nextRun = computeNextRun(
		{
			kind: 'scheduled',
			date: date || undefined,
			time: time || undefined,
			repeat,
			weekday: weekday || undefined
		},
		new Date()
	);

	if (nextRun === null && repeat === 'once') {
		return { ok: false, error: 'Scheduled time is already in the past' };
	}

	if (nextRun === null) {
		return { ok: false, error: 'Unable to compute next scheduled run' };
	}

	return {
		ok: true,
		config: {
			kind: 'scheduled',
			date: date || undefined,
			time: time || undefined,
			repeat,
			weekday: weekday || undefined
		}
	};
}

export function setConditionFieldError(
	errors: { conditionFields: Record<string, string> },
	conditions: ConditionGroupNode,
	key: string,
	message: string
): void {
	const leaf = findConditionLeaf(conditions, key);

	if (leaf) {
		errors.conditionFields[leaf.id] = message;
	}
}
