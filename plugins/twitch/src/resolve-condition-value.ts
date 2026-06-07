import { interpolateVariables, type FieldValue } from '@stream-kit/core';

import { contextToVariables } from './lib/variables';

export function resolveConditionValue(value: FieldValue, context: unknown): FieldValue {
	if (typeof value === 'string') {
		return interpolateVariables(value, contextToVariables(context));
	}

	if (
		value &&
		typeof value === 'object' &&
		'type' in value &&
		'value' in value &&
		typeof value.value === 'string'
	) {
		return {
			type: value.type,
			value: interpolateVariables(value.value, contextToVariables(context))
		};
	}

	return value;
}
