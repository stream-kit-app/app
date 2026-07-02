import { Cron } from 'croner';

/** Preset cron schedule shown in the UI cron field picker. */
export type CronPreset = {
	/** Cron expression value. */
	value: string;
	/** Short label shown in the picker. */
	label: string;
	/** Optional longer description. */
	description?: string;
};

/** Built-in cron presets for common schedules. */
export const DEFAULT_CRON_PRESETS: CronPreset[] = [
	{ value: '*/15 * * * *', label: 'Every 15 minutes' },
	{ value: '0 * * * *', label: 'Every hour' },
	{ value: '0 9 * * *', label: 'Daily at 09:00' },
	{ value: '0 9 * * 1-5', label: 'Weekdays at 09:00' },
	{ value: '0 0 * * 0', label: 'Weekly on Sunday' },
	{ value: '0 0 1 * *', label: 'Monthly on the 1st' }
];

/** Ordered cron field keys: minute, hour, day, month, weekday. */
export const CRON_FIELD_KEYS = ['minute', 'hour', 'day', 'month', 'weekday'] as const;

/** Cron field key union type. */
export type CronFieldKey = (typeof CRON_FIELD_KEYS)[number];

/** Number of fields in a standard 5-part cron expression. */
export const CRON_FIELD_COUNT = 5;

/** Returns the local IANA timezone used for cron validation and next-run calculation. */
export function getLocalTimezone(): string {
	return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

/** Trim and collapse whitespace in a cron expression. */
export function normalizeCronExpression(value: string): string {
	return value.trim().replace(/\s+/g, ' ');
}

/** Count space-separated fields in a cron expression. */
export function getCronFieldCount(value: string): number {
	const normalized = normalizeCronExpression(value);

	if (!normalized) {
		return 0;
	}

	return normalized.split(' ').length;
}

/**
 * Split a cron expression into exactly five field parts, padding missing fields with empty strings.
 */
export function splitCronParts(value: string): string[] {
	const normalized = normalizeCronExpression(value);

	if (!normalized) {
		return ['', '', '', '', ''];
	}

	const parts = normalized.split(' ');

	while (parts.length < CRON_FIELD_COUNT) {
		parts.push('');
	}

	return parts.slice(0, CRON_FIELD_COUNT);
}

/**
 * Validate a 5-field cron expression in the local timezone.
 *
 * @example
 * ```ts
 * isValidCronExpression('0 9 * * 1-5'); // true
 * ```
 */
export function isValidCronExpression(value: string): boolean {
	const normalized = normalizeCronExpression(value);

	if (!normalized) {
		return false;
	}

	if (getCronFieldCount(normalized) !== CRON_FIELD_COUNT) {
		return false;
	}

	try {
		new Cron(normalized, {
			timezone: getLocalTimezone(),
			paused: true
		});
		return true;
	} catch {
		return false;
	}
}

/** Returns a user-facing validation error message, or undefined when valid. */
export function getCronValidationError(value: string): string | undefined {
	const normalized = normalizeCronExpression(value);

	if (!normalized) {
		return undefined;
	}

	if (getCronFieldCount(normalized) !== CRON_FIELD_COUNT) {
		return 'Cron expression must have exactly 5 fields';
	}

	if (!isValidCronExpression(normalized)) {
		return 'Invalid cron expression';
	}

	return undefined;
}

/**
 * Compute the next run time for a cron expression after a given date.
 *
 * @returns Next run date, or null when the expression is invalid or has no next run.
 */
export function computeCronNextRun(expression: string, after: Date): Date | null {
	const normalized = normalizeCronExpression(expression);

	if (!isValidCronExpression(normalized)) {
		return null;
	}

	try {
		const cron = new Cron(normalized, {
			timezone: getLocalTimezone(),
			paused: true
		});

		return cron.nextRun(after) ?? null;
	} catch {
		return null;
	}
}

/** Returns a localized label for the next cron run, or undefined when invalid. */
export function getCronNextRunLabel(value: string): string | undefined {
	const normalized = normalizeCronExpression(value);

	if (!isValidCronExpression(normalized)) {
		return undefined;
	}

	try {
		const cron = new Cron(normalized, {
			timezone: getLocalTimezone(),
			paused: true
		});
		const next = cron.nextRun();

		if (!next) {
			return undefined;
		}

		return next.toLocaleString(undefined, {
			dateStyle: 'medium',
			timeStyle: 'short'
		});
	} catch {
		return undefined;
	}
}
