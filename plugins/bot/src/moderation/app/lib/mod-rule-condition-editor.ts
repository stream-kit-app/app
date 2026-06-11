import type { ConditionEditor } from '$lib/core/action/condition-editor';
import type {
	ConditionGroupNode,
	ConditionNode,
	Operator,
	ResolvedConditionDefinition
} from '$lib/core/action/trigger/condition';
import type { ConditionFormErrors } from '$lib/core/action/validate-form';

import {
	addConditionToGroup,
	addGroupToRoot,
	getConditionDefinition,
	removeConditionChild,
	setConditionOperator
} from '$lib/core/action/condition-tree';

import { moderationConditionDefinitions } from '../../../lib/moderation-conditions';

export class ModRuleConditionEditor implements ConditionEditor {
	get conditionDefinitions(): ResolvedConditionDefinition[] | undefined {
		return moderationConditionDefinitions;
	}

	getConditionDefinition(key: string): ResolvedConditionDefinition | undefined {
		return getConditionDefinition(moderationConditionDefinitions, key);
	}

	getFieldError(nodeId: string, errors?: ConditionFormErrors): string | undefined {
		return errors?.conditionFields[nodeId];
	}

	addCondition(group: ConditionGroupNode, conditionKey: string): void {
		addConditionToGroup(group, conditionKey, moderationConditionDefinitions);
	}

	addGroup(group: ConditionGroupNode): void {
		addGroupToRoot(group);
	}

	removeChild(group: ConditionGroupNode, index: number): void {
		removeConditionChild(group, index);
	}

	setOperator(node: ConditionNode, operator: Operator): void {
		setConditionOperator(node, operator);
	}
}

export const modRuleConditionEditor = new ModRuleConditionEditor();
