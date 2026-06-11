const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const TIME_PATTERN = /^([01]?\d|2[0-3]):([0-5]\d)$/;

export const WEEKDAY_VALUES = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] as const;

export type WeekdayValue = (typeof WEEKDAY_VALUES)[number];

const WEEKDAY_TO_JS: Record<WeekdayValue, number> = {
	sun: 0,
	mon: 1,
	tue: 2,
	wed: 3,
	thu: 4,
	fri: 5,
	sat: 6
};

export function isValidDateString(value: string): boolean {
	if (!DATE_PATTERN.test(value)) {
		return false;
	}

	const [year, month, day] = value.split('-').map(Number);
	const date = new Date(year, month - 1, day);

	return (
		date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day
	);
}

export function isValidTimeString(value: string): boolean {
	return TIME_PATTERN.test(value);
}

export function parseTimeParts(value: string): { hours: number; minutes: number } | null {
	const match = value.match(TIME_PATTERN);

	if (!match) {
		return null;
	}

	return {
		hours: Number(match[1]),
		minutes: Number(match[2])
	};
}

export function isValidWeekday(value: string): value is WeekdayValue {
	return WEEKDAY_VALUES.includes(value as WeekdayValue);
}

export function weekdayFromDateString(date: string): WeekdayValue | undefined {
	if (!isValidDateString(date)) {
		return undefined;
	}

	const [year, month, day] = date.split('-').map(Number);
	const jsDay = new Date(year, month - 1, day).getDay();
	const reverse: Record<number, WeekdayValue> = {
		0: 'sun',
		1: 'mon',
		2: 'tue',
		3: 'wed',
		4: 'thu',
		5: 'fri',
		6: 'sat'
	};

	return reverse[jsDay];
}

export function weekdayToJsDay(value: WeekdayValue): number {
	return WEEKDAY_TO_JS[value];
}

export function setTimeOnDate(date: Date, hours: number, minutes: number): Date {
	const next = new Date(date);
	next.setHours(hours, minutes, 0, 0);
	return next;
}

export function startOfDay(date: Date): Date {
	return setTimeOnDate(date, 0, 0);
}

export function parseLocalDate(date: string): Date | null {
	if (!isValidDateString(date)) {
		return null;
	}

	const [year, month, day] = date.split('-').map(Number);
	return new Date(year, month - 1, day);
}
