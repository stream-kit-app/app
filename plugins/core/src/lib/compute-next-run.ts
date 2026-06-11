import {
	computeCronNextRun,
	getCronValidationError,
	isValidCronExpression
} from '@stream-kit/core';

import {
	isValidDateString,
	isValidTimeString,
	isValidWeekday,
	parseLocalDate,
	parseTimeParts,
	setTimeOnDate,
	startOfDay,
	weekdayFromDateString,
	weekdayToJsDay,
	type WeekdayValue
} from './schedule-date-time';
import type { ScheduleConfig, ScheduleRepeat } from './schedule-types';

export { computeCronNextRun, isValidCronExpression };

function computeOnceNextRun(
	date: string | undefined,
	time: string | undefined,
	after: Date
): Date | null {
	const timeParts = time ? parseTimeParts(time) : null;

	if (date && timeParts) {
		const base = parseLocalDate(date);

		if (!base) {
			return null;
		}

		const target = setTimeOnDate(base, timeParts.hours, timeParts.minutes);
		return target.getTime() > after.getTime() ? target : null;
	}

	if (date) {
		const target = startOfDay(parseLocalDate(date)!);
		return target.getTime() > after.getTime() ? target : null;
	}

	if (timeParts) {
		const target = setTimeOnDate(new Date(after), timeParts.hours, timeParts.minutes);

		if (target.getTime() > after.getTime()) {
			return target;
		}

		target.setDate(target.getDate() + 1);
		return target;
	}

	return null;
}

function isBeforeStartDate(date: string | undefined, candidate: Date): boolean {
	if (!date) {
		return false;
	}

	const start = startOfDay(parseLocalDate(date)!);
	return candidate.getTime() < start.getTime();
}

function computeDailyNextRun(
	date: string | undefined,
	time: string | undefined,
	after: Date
): Date | null {
	const timeParts = (time ? parseTimeParts(time) : null) ?? { hours: 0, minutes: 0 };
	const candidate = setTimeOnDate(new Date(after), timeParts.hours, timeParts.minutes);

	if (candidate.getTime() <= after.getTime()) {
		candidate.setDate(candidate.getDate() + 1);
	}

	if (date && isBeforeStartDate(date, candidate)) {
		const start = parseLocalDate(date)!;
		return setTimeOnDate(start, timeParts.hours, timeParts.minutes);
	}

	return candidate;
}

function resolveWeeklyWeekday(date: string | undefined, weekday: string | undefined): WeekdayValue | null {
	if (date) {
		return weekdayFromDateString(date) ?? null;
	}

	if (weekday && isValidWeekday(weekday)) {
		return weekday;
	}

	return null;
}

function computeWeeklyNextRun(
	date: string | undefined,
	time: string | undefined,
	weekday: WeekdayValue,
	after: Date
): Date | null {
	const timeParts = (time ? parseTimeParts(time) : null) ?? { hours: 0, minutes: 0 };
	const targetDay = weekdayToJsDay(weekday);
	const candidate = setTimeOnDate(new Date(after), timeParts.hours, timeParts.minutes);

	while (candidate.getDay() !== targetDay || candidate.getTime() <= after.getTime()) {
		candidate.setDate(candidate.getDate() + 1);
		candidate.setHours(timeParts.hours, timeParts.minutes, 0, 0);
	}

	if (date && isBeforeStartDate(date, candidate)) {
		const start = parseLocalDate(date)!;
		const anchored = setTimeOnDate(start, timeParts.hours, timeParts.minutes);

		while (anchored.getDay() !== targetDay || anchored.getTime() <= after.getTime()) {
			anchored.setDate(anchored.getDate() + 7);
		}

		return anchored;
	}

	return candidate;
}

function computeScheduledNextRun(
	repeat: ScheduleRepeat,
	date: string | undefined,
	time: string | undefined,
	weekday: string | undefined,
	after: Date
): Date | null {
	switch (repeat) {
		case 'once':
			return computeOnceNextRun(date, time, after);
		case 'daily':
			return computeDailyNextRun(date, time, after);
		case 'weekly': {
			const resolvedWeekday = resolveWeeklyWeekday(date, weekday);

			if (!resolvedWeekday) {
				return null;
			}

			return computeWeeklyNextRun(date, time, resolvedWeekday, after);
		}
	}
}

export function computeNextRun(config: ScheduleConfig, after: Date): Date | null {
	if (config.kind === 'cron') {
		return computeCronNextRun(config.expression, after);
	}

	return computeScheduledNextRun(config.repeat, config.date, config.time, config.weekday, after);
}

export function validateScheduleDateTime(
	date: string | undefined,
	time: string | undefined,
	repeat: ScheduleRepeat,
	weekday: string | undefined
): { field: 'date' | 'time' | 'weekday'; message: string } | undefined {
	if (!date?.trim() && !time?.trim()) {
		return { field: 'date', message: 'Enter a date, a time, or both' };
	}

	if (date?.trim() && !isValidDateString(date.trim())) {
		return { field: 'date', message: 'Date must use YYYY-MM-DD format' };
	}

	if (time?.trim() && !isValidTimeString(time.trim())) {
		return { field: 'time', message: 'Time must use HH:mm format (24-hour clock)' };
	}

	if (repeat === 'weekly' && !date?.trim()) {
		if (!weekday?.trim()) {
			return {
				field: 'weekday',
				message: 'Weekly schedules without a date require a weekday'
			};
		}

		if (!isValidWeekday(weekday.trim())) {
			return { field: 'weekday', message: 'Select a valid weekday' };
		}

		if (!time?.trim()) {
			return {
				field: 'time',
				message: 'Weekly schedules without a date require a time'
			};
		}
	}

	if (weekday?.trim() && !isValidWeekday(weekday.trim())) {
		return { field: 'weekday', message: 'Select a valid weekday' };
	}

	return undefined;
}

export { getCronValidationError };
