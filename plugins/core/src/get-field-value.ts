import {
	getFieldValue as getFieldValueCore,
	interpolateVariables,
	type HandlerFieldInstance,
	type HandlerTriggerContext
} from '@stream-kit/core';

import type { VariableStore } from './lib/variables/variable-store';

export const getFieldValue = getFieldValueCore;

export function resolveFieldText(
	variables: VariableStore,
	fields: HandlerFieldInstance[],
	key: string,
	context: HandlerTriggerContext
): string | undefined {
	const value = getFieldValue(fields, key);

	if (typeof value !== 'string') {
		return undefined;
	}

	return interpolateVariables(value, variables.resolve(context));
}
