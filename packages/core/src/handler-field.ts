import { interpolateVariables } from './interpolate-variables.js';
import type { HandlerTriggerContext } from './handler-context.js';

export type KeyValueEntry = {
	key: string;
	value: string;
};

export type TextSelectTextFieldValue = {
	path: string;
	type: string;
	value: string;
	negate?: boolean;
};

export type HandlerFieldScalarValue =
	| string
	| number
	| boolean
	| KeyValueEntry[]
	| TextSelectTextFieldValue;

export type OneOfFieldValue = {
	variant: string;
	values: Record<string, HandlerFieldScalarValue>;
};

export type HandlerFieldValue = HandlerFieldScalarValue | OneOfFieldValue;

export type HandlerFieldInstance = {
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

export function isOneOfFieldValue(value: HandlerFieldValue | undefined): value is OneOfFieldValue {
	return Boolean(value && typeof value === 'object' && 'variant' in value && 'values' in value);
}

export function getFieldValue(
	fields: HandlerFieldInstance[],
	key: string
): HandlerFieldValue | undefined {
	return fields.find((field) => normalizeLookupKey(field.key) === normalizeLookupKey(key))?.value;
}

export function getOneOfFieldValue(
	fields: HandlerFieldInstance[],
	key: string
): { variant: string; value: HandlerFieldScalarValue | undefined } | undefined {
	const value = getFieldValue(fields, key);

	if (!isOneOfFieldValue(value)) {
		return undefined;
	}

	return {
		variant: value.variant,
		value: value.values[value.variant]
	};
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

export function resolveOneOfFieldText(
	fields: HandlerFieldInstance[],
	key: string,
	context: HandlerTriggerContext,
	toVariables: (context: HandlerTriggerContext) => Record<string, string>
): string | undefined {
	const oneOf = getOneOfFieldValue(fields, key);

	if (!oneOf) {
		return undefined;
	}

	const activeValue = oneOf.value;

	if (typeof activeValue !== 'string') {
		return undefined;
	}

	return interpolateVariables(activeValue, toVariables(context));
}
