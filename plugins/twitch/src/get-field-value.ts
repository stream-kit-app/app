import { interpolateVariables, type HandlerFieldInstance, type HandlerFieldValue } from '@stream-kit/core';

import { contextToVariables } from './lib/variables';

export function getFieldValue(
	fields: HandlerFieldInstance[],
	key: string
): HandlerFieldValue | undefined {
	return fields.find((field) => field.key === key)?.value;
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
