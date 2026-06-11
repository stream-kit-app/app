import type {
	ConditionGroupNode,
	ConditionNode,
	Operator,
	ResolvedConditionDefinition
} from './trigger/condition';

import type { ConditionFormErrors } from './validate-form';

export type ConditionEditor = {
	conditionDefinitions: ResolvedConditionDefinition[] | undefined;
	getConditionDefinition: (key: string) => ResolvedConditionDefinition | undefined;
	getFieldError: (nodeId: string, errors?: ConditionFormErrors) => string | undefined;
	addCondition: (group: ConditionGroupNode, conditionKey: string) => void;
	addGroup: (group: ConditionGroupNode) => void;
	removeChild: (group: ConditionGroupNode, index: number) => void;
	setOperator: (node: ConditionNode, operator: Operator) => void;
};
