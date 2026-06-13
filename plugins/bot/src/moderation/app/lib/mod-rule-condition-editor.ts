import type { ConditionEditor, ResolvedConditionDefinition } from '@stream-kit/plugin/action';
import type {
	ConditionGroupNode,
	ConditionNode,
	Operator
} from '@stream-kit/plugin';
import {
	addConditionToGroup,
	addGroupToRoot,
	getConditionDefinition,
	removeConditionChild,
	setConditionOperator
} from '@stream-kit/plugin/action';

import { moderationConditionDefinitions } from '../../../lib/moderation-conditions';
import type { ModRuleFormErrors } from './validate-form';

export class ModRuleConditionEditor implements ConditionEditor {
	get conditionDefinitions(): ResolvedConditionDefinition[] | undefined {
		return moderationConditionDefinitions;
	}

	getConditionDefinition(key: string): ResolvedConditionDefinition | undefined {
		return getConditionDefinition(moderationConditionDefinitions, key);
	}

	getFieldError(nodeId: string, errors?: ModRuleFormErrors): string | undefined {
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
