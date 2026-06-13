import type { ConditionGroupNode, ConditionLeafNode } from '@stream-kit/plugin';
import { isFieldValueEmpty } from '@stream-kit/plugin/action';

import { moderationConditionDefinitions } from '../../../lib/moderation-conditions';
import { modRuleConditionEditor } from './mod-rule-condition-editor';

export type ModRuleFormErrors = {
	name?: string;
	conditions?: string;
	conditionFields: Record<string, string>;
};

function collectLeaves(group: ConditionGroupNode): ConditionLeafNode[] {
	return group.children.flatMap((child) =>
		child.kind === 'condition' ? [child] : collectLeaves(child)
	);
}

function hasFilledLeaf(conditions: ConditionGroupNode): boolean {
	return collectLeaves(conditions).some((leaf) => {
		const definition = modRuleConditionEditor.getConditionDefinition(leaf.key);

		if (!definition) {
			return false;
		}

		return !isFieldValueEmpty(definition, leaf.value);
	});
}

export function validateModRuleForm(
	input: {
		name: string;
		conditions: ConditionGroupNode;
	},
	translate: (key: string, params?: Record<string, string | number | null | undefined>) => string
): ModRuleFormErrors | null {
	const errors: ModRuleFormErrors = {
		conditionFields: {}
	};

	if (!input.name.trim()) {
		errors.name = translate('Name is required');
	}

	if (!hasFilledLeaf(input.conditions)) {
		errors.conditions = translate('Add at least one condition with a value');
	}

	for (const definition of moderationConditionDefinitions.filter((item) => item.required)) {
		const leaves = collectLeaves(input.conditions).filter((leaf) => leaf.key === definition.key);

		for (const leaf of leaves) {
			if (isFieldValueEmpty(definition, leaf.value)) {
				errors.conditionFields[leaf.id] = translate('{field} is required', {
					field: definition.name
				});
			}
		}
	}

	const hasErrors =
		!!errors.name ||
		!!errors.conditions ||
		Object.keys(errors.conditionFields).length > 0;

	return hasErrors ? errors : null;
}
