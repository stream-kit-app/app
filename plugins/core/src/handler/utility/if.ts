import type { HandlerDefinitionProps } from '@stream-kit/plugin';
import { interpolateVariables } from '@stream-kit/core';

import { getFieldValue } from '../../get-field-value';
import type { CorePluginContext } from '../../lib/core-context';
import { matchText } from '../../lib/match-text';
import {
	ifConditionOperators,
	valuelessTextOperatorValues
} from '../../lib/text-match-operators';

type IfConditionValue = {
	path: string;
	type: string;
	value: string;
	negate?: boolean;
};

function isIfConditionValue(value: unknown): value is IfConditionValue {
	return (
		typeof value === 'object' &&
		value !== null &&
		'path' in value &&
		'type' in value &&
		'value' in value
	);
}

export const createIfHandler = ({ variables }: CorePluginContext) =>
	({
		id: 'if',
		name: 'If',
		fields: [
			{
				type: 'text-select-text',
				name: 'Condition',
				pathPlaceholder: '{variable} or text',
				valuePlaceholder: 'Value to compare',
				useContextVariables: true,
				allowNegate: true,
				required: true,
				defaultValue: { path: '', type: 'equals', value: '', negate: false },
				items: [...ifConditionOperators],
				valuelessOperators: [...valuelessTextOperatorValues]
			}
		],
		execute: async (action, handler, context, next) => {
			const condition = getFieldValue(handler.fields, 'condition');
			let branchHandlers = handler.elseHandlers;

			if (isIfConditionValue(condition)) {
				const resolvedVariables = variables.resolve(context);
				const left = interpolateVariables(condition.path, resolvedVariables);
				const right = interpolateVariables(condition.value, resolvedVariables);
				let passed = matchText(left, condition.type, right);

				if (condition.negate) {
					passed = !passed;
				}

				branchHandlers = passed ? handler.thenHandlers : handler.elseHandlers;
			}

			await action.runHandlerBranch(branchHandlers, context);
			next();
		}
	}) as HandlerDefinitionProps;
