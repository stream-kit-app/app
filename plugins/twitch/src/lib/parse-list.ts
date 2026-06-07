import type { HandlerFieldValue } from '@stream-kit/core';

export function parseListField(value: HandlerFieldValue | undefined): string[] {
	if (typeof value !== 'string') {
		return [];
	}

	return value
		.split(/[\n,]/)
		.map((item) => item.trim())
		.filter(Boolean);
}

export function parsePositiveInt(value: HandlerFieldValue | undefined): number | undefined {
	if (typeof value !== 'string' || !value.trim()) {
		return undefined;
	}

	const parsed = Number.parseInt(value, 10);

	if (Number.isNaN(parsed) || parsed <= 0) {
		return undefined;
	}

	return parsed;
}
