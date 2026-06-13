import type { TriggerDefinition } from './trigger/trigger-definition.svelte';
import type {
	ConditionGroupNode,
	ConditionNode,
	Operator,
	ResolvedConditionDefinition
} from './trigger/condition';

import type { ConditionEditor } from './condition-editor';
import type { ConditionFormErrors } from './validate-form';
import {
	addConditionToGroup,
	addGroupToRoot,
	emptyConditionGroup,
	getConditionDefinition,
	removeConditionChild,
	setConditionOperator
} from './condition-tree';

export type StoredActionTrigger = {
	id: string;
	triggerTypeId: string;
	conditions: ConditionGroupNode;
};

export class ActionTrigger implements ConditionEditor {
	id: string;
	definition: TriggerDefinition;

	conditions: ConditionGroupNode = $state(emptyConditionGroup());

	constructor(
		definition: TriggerDefinition,
		props?: { id?: string; conditions?: ConditionGroupNode }
	) {
		this.id = props?.id ?? crypto.randomUUID();
		this.definition = definition;

		if (props?.conditions) {
			this.conditions = props.conditions;
		}
	}

	get conditionDefinitions(): ResolvedConditionDefinition[] | undefined {
		return this.definition.conditions;
	}

	get pluginName(): string | undefined {
		return this.definition.pluginName;
	}

	getConditionDefinition(key: string): ResolvedConditionDefinition | undefined {
		return getConditionDefinition(this.definition.conditions, key);
	}

	getFieldError(nodeId: string, errors?: ConditionFormErrors): string | undefined {
		return errors?.conditionFields[nodeId];
	}

	addCondition(group: ConditionGroupNode, conditionKey: string): void {
		addConditionToGroup(group, conditionKey, this.definition.conditions);
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

	evaluate(context: unknown): boolean {
		if (this.conditions.children.length === 0) {
			return true;
		}

		if (!this.definition.validate) {
			return true;
		}

		return this.definition.validate($state.snapshot(this.conditions), context, this);
	}

	toStored(): StoredActionTrigger {
		return {
			id: this.id,
			triggerTypeId: this.definition.id,
			conditions: $state.snapshot(this.conditions)
		};
	}

	static clone(source: ActionTrigger): ActionTrigger {
		return new ActionTrigger(source.definition, {
			conditions: structuredClone($state.snapshot(source.conditions))
		});
	}
}
