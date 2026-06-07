import type {
	ConditionDefinition,
	ConditionGroupNode,
	ConditionNode,
	Operator
} from './trigger/condition';

import type { TriggerFormErrors } from './validate-form';

export type ConditionEditor = {
	conditionDefinitions: ConditionDefinition[] | undefined;
	getConditionDefinition: (key: string) => ConditionDefinition | undefined;
	getFieldError: (nodeId: string, errors?: TriggerFormErrors) => string | undefined;
	addCondition: (group: ConditionGroupNode, conditionKey: string) => void;
	addGroup: (group: ConditionGroupNode) => void;
	removeChild: (group: ConditionGroupNode, index: number) => void;
	setOperator: (node: ConditionNode, operator: Operator) => void;
};
