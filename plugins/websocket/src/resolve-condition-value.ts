import { interpolateVariables } from '@stream-kit/core';
import { type FieldValue } from '@stream-kit/plugin';

import { contextToVariables } from './lib/variables';

export function resolveConditionValue(value: FieldValue, context: unknown): FieldValue {
	const variables = contextToVariables(context);

	if (typeof value === 'string') {
		return interpolateVariables(value, variables);
	}

	if (
		value &&
		typeof value === 'object' &&
		'path' in value &&
		'type' in value &&
		'value' in value &&
		typeof value.path === 'string' &&
		typeof value.value === 'string'
	) {
		return {
			path: interpolateVariables(value.path, variables),
			type: value.type,
			value: interpolateVariables(value.value, variables)
		};
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
