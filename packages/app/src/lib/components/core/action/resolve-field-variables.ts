import type { HandlerFieldVariable } from '#lib/core/action/handler/field.js';

import { mergeContextVariables } from '#lib/core/action/variable-helpers.js';

/**
 * Variables offered by a handler field: everything in scope plus the field's own extras.
 * `false` turns autocomplete off for that field.
 */
export function resolveVariablesForField(
	fieldVariables: HandlerFieldVariable[] | false | undefined,
	scopeVariables: HandlerFieldVariable[]
): HandlerFieldVariable[] {
	if (fieldVariables === false) {
		return [];
	}

	if (!fieldVariables || fieldVariables.length === 0) {
		return scopeVariables;
	}

	return mergeContextVariables(scopeVariables, fieldVariables);
}
