import { Cron } from 'croner';

export type CronPreset = {
	value: string;
	label: string;
	description?: string;
};

export const DEFAULT_CRON_PRESETS: CronPreset[] = [
	{ value: '*/15 * * * *', label: 'Every 15 minutes' },
	{ value: '0 * * * *', label: 'Every hour' },
	{ value: '0 9 * * *', label: 'Daily at 09:00' },
	{ value: '0 9 * * 1-5', label: 'Weekdays at 09:00' },
	{ value: '0 0 * * 0', label: 'Weekly on Sunday' },
	{ value: '0 0 1 * *', label: 'Monthly on the 1st' }
];

export const CRON_FIELD_KEYS = ['minute', 'hour', 'day', 'month', 'weekday'] as const;

export type CronFieldKey = (typeof CRON_FIELD_KEYS)[number];

export const CRON_FIELD_COUNT = 5;

export function getLocalTimezone(): string {
	return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

export function normalizeCronExpression(value: string): string {
	return value.trim().replace(/\s+/g, ' ');
}

export function getCronFieldCount(value: string): number {
	const normalized = normalizeCronExpression(value);

	if (!normalized) {
		return 0;
	}

	return normalized.split(' ').length;
}

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
