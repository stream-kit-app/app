import type { CorePluginContext } from '../../lib/core-context';
import type { ConditionGroupNode, FieldValue, HandlerDefinitionProps } from '@stream-kit/plugin';

import { interpolateVariables } from '@stream-kit/core';

import { getFieldValue } from '../../get-field-value';
import { evaluateConditionTree } from '../../lib/evaluate-conditions';
import { matchText } from '../../lib/match-text';
import { ifConditionOperators, valuelessTextOperatorValues } from '../../lib/text-match-operators';

const COMPARE_CONDITION_KEY = 'compare';

type CompareValue = {
	path: string;
	type: string;
	value: string;
};

/** Stored shape before IF supported AND/OR groups; migrated on load, kept here for safety. */
type LegacyIfConditionValue = CompareValue & {
	negate?: boolean;
};

function isCompareValue(value: unknown): value is CompareValue {
	return (
		typeof value === 'object' &&
		value !== null &&
		'path' in value &&
		'type' in value &&
		'value' in value
	);
}

function isConditionGroup(value: unknown): value is ConditionGroupNode {
	return typeof value === 'object' && value !== null && 'kind' in value && value.kind === 'group';
}

export const createIfHandler = ({ variables }: CorePluginContext) =>
	({
		id: 'if',
		name: 'If',
		// Runs a nested handler chain whose handlers time out individually.
		timeout: null,
		fields: [
			{
				type: 'condition-group',
				name: 'Condition',
				required: true,
				migrateFromTextSelectText: COMPARE_CONDITION_KEY,
				conditions: [
					{
						key: COMPARE_CONDITION_KEY,
						type: 'text-select-text',
						name: 'Compare',
						pathPlaceholder: '{variable} or text',
						valuePlaceholder: 'Value to compare',
						items: [...ifConditionOperators],
						valuelessOperators: [...valuelessTextOperatorValues]
					}
				],
				defaultValue: {
					kind: 'group',
					id: 'root',
					children: [
						{
							kind: 'condition',
							id: COMPARE_CONDITION_KEY,
							key: COMPARE_CONDITION_KEY,
							value: { path: '', type: 'equals', value: '' }
						}
					]
				}
			}
		],
		execute: async (action, handler, context, next) => {
			const condition = getFieldValue(handler.fields, 'condition');
			const resolvedVariables = variables.resolve(context);

			const compare = (value: FieldValue | LegacyIfConditionValue): boolean => {
				if (!isCompareValue(value)) {
					return false;
				}

				const left = interpolateVariables(value.path, resolvedVariables);
				const right = interpolateVariables(value.value, resolvedVariables);

				return matchText(left, value.type, right);
			};

			let passed = false;

			if (isConditionGroup(condition)) {
				passed = evaluateConditionTree(condition, (_key, value) => compare(value));
			} else if (isCompareValue(condition)) {
				const legacy = condition as LegacyIfConditionValue;
				passed = legacy.negate ? !compare(legacy) : compare(legacy);
			}

			await action.runHandlerBranch(
				passed ? handler.thenHandlers : handler.elseHandlers,
				context
			);
			next();
		}
	}) as HandlerDefinitionProps;
