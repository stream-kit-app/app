import { interpolateVariables, type HandlerFieldInstance, type HandlerFieldValue } from '@stream-kit/core';

import { contextToVariables } from './lib/variables';

export function getFieldValue(
	fields: HandlerFieldInstance[],
	key: string
): HandlerFieldValue | undefined {
	return fields.find((field) => normalizeLookupKey(field.key) === normalizeLookupKey(key))?.value;
}

export function resolveFieldText(
	fields: HandlerFieldInstance[],
	key: string,
	context: unknown
): string | undefined {
	const value = getFieldValue(fields, key);

	if (typeof value !== 'string') {
		return undefined;
	}

	return interpolateVariables(value, contextToVariables(context));
}

function normalizeLookupKey(value: string): string {
	return value
		.trim()
		.replace(/([a-z0-9])([A-Z])/g, '$1-$2')
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
}
