import { interpolateVariables } from './interpolate-variables.js';
import type { HandlerTriggerContext } from './handler-context.js';

type HandlerFieldValue = string | boolean;

type HandlerFieldInstance = {
	key: string;
	value: HandlerFieldValue;
};

function normalizeLookupKey(value: string): string {
	return value
		.trim()
		.replace(/([a-z0-9])([A-Z])/g, '$1-$2')
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
}

export function getFieldValue(
	fields: HandlerFieldInstance[],
	key: string
): HandlerFieldValue | undefined {
	return fields.find((field) => normalizeLookupKey(field.key) === normalizeLookupKey(key))?.value;
}

export function resolveFieldText(
	fields: HandlerFieldInstance[],
	key: string,
	context: HandlerTriggerContext,
	toVariables: (data: unknown) => Record<string, string>
): string | undefined {
	const value = getFieldValue(fields, key);

	if (typeof value !== 'string') {
		return undefined;
	}

	return interpolateVariables(value, toVariables(context.data));
}
