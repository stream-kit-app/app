import { interpolateVariables } from './interpolate-variables.js';
import type { HandlerTriggerContext } from './handler-context.js';

/** Key-value pair used by key-value handler fields. */
export type KeyValueEntry = {
	/** Entry key. */
	key: string;
	/** Entry value. */
	value: string;
};

/** Value shape for text/select/text-select handler fields. */
export type TextSelectTextFieldValue = {
	/** Selected path or identifier. */
	path: string;
	/** Field or node type. */
	type: string;
	/** Resolved text value. */
	value: string;
	/** When true, inverts the match semantics for this value. */
	negate?: boolean;
};

/** Scalar handler field values (text, number, boolean, structured selects). */
export type HandlerFieldScalarValue =
	| string
	| number
	| boolean
	| KeyValueEntry[]
	| TextSelectTextFieldValue;

/** Active variant and values for a one-of handler field. */
export type OneOfFieldValue = {
	/** Selected variant key. */
	variant: string;
	/** Values keyed by variant name. */
	values: Record<string, HandlerFieldScalarValue>;
};

/** Runtime value of a handler field instance. */
export type HandlerFieldValue = HandlerFieldScalarValue | OneOfFieldValue;

/** Handler field state at execution time. */
export type HandlerFieldInstance = {
	/** Field key as registered in the handler definition. */
	key: string;
	/** Current field value. */
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

/**
 * Type guard for one-of handler field values.
 */
export function isOneOfFieldValue(value: HandlerFieldValue | undefined): value is OneOfFieldValue {
	return Boolean(value && typeof value === 'object' && 'variant' in value && 'values' in value);
}

/**
 * Read a handler field value by key. Keys are matched case-insensitively.
 *
 * @example
 * ```ts
 * const message = getFieldValue(handler.fields, 'message');
 * ```
 */
export function getFieldValue(
	fields: HandlerFieldInstance[],
	key: string
): HandlerFieldValue | undefined {
	return fields.find((field) => normalizeLookupKey(field.key) === normalizeLookupKey(key))?.value;
}

/**
 * Read the active variant and scalar value from a one-of handler field.
 *
 * @example
 * ```ts
 * const media = getOneOfFieldValue(handler.fields, 'media-file');
 * if (media?.variant === 'path') console.log(media.value);
 * ```
 */
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

/**
 * Resolve a text handler field and interpolate `{variable}` placeholders from trigger context.
 *
 * @example
 * ```ts
 * const text = resolveFieldText(handler.fields, 'message', context, contextToVariables);
 * ```
 */
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

/**
 * Resolve the active one-of text field and interpolate variables from the full trigger context.
 *
 * @example
 * ```ts
 * const path = resolveOneOfFieldText(handler.fields, 'media-file', context, (ctx) =>
 *   contextToVariables(ctx.data)
 * );
 * ```
 */
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
