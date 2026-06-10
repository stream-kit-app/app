import { interpolateVariables, type FieldValue } from '@stream-kit/core';

import { contextToVariables } from './lib/variables';

export function resolveConditionValue(value: FieldValue, context: unknown): FieldValue {
	const variables = contextToVariables(context);

	if (typeof value === 'string') {
		return interpolateVariables(value, variables);
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
			value: interpolateVariables(value.value, variables)
		};
	}

	return value;
}
