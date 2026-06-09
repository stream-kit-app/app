import type {
	ConditionGroupNode,
	ConditionNode,
	FieldValue,
	Operator,
	ResolvedConditionDefinition
} from './trigger/condition';

export function emptyConditionGroup(): ConditionGroupNode {
	return {
		kind: 'group',
		id: 'root',
		children: []
	};
}

export function initConditionValue(definition: ResolvedConditionDefinition): FieldValue {
	if (definition.defaultValue !== undefined) {
		return definition.type === 'select-text' && typeof definition.defaultValue === 'object'
			? { ...definition.defaultValue }
			: definition.defaultValue;
	}

	if (definition.type === 'select-text') {
		return { type: '', value: '' };
	}

	if (definition.type === 'checkbox') {
		return true;
	}

	return '';
}

export function getConditionDefinition(
	definitions: ResolvedConditionDefinition[] | undefined,
	key: string
): ResolvedConditionDefinition | undefined {
	return definitions?.find((condition) => condition.key === key);
}

export function addConditionToGroup(
	group: ConditionGroupNode,
	conditionKey: string,
	definitions: ResolvedConditionDefinition[] | undefined
): void {
	const definition = getConditionDefinition(definitions, conditionKey);

	if (!definition) {
		return;
	}

	group.children.push({
		kind: 'condition',
		id: crypto.randomUUID(),
		key: conditionKey,
		value: initConditionValue(definition),
		...(group.children.length > 0 ? { operator: 'and' as Operator } : {})
	});
}

export function addGroupToRoot(group: ConditionGroupNode): void {
	if (group.id !== 'root') {
		return;
	}

	group.children.push({
		kind: 'group',
		id: crypto.randomUUID(),
		children: [],
		...(group.children.length > 0 ? { operator: 'and' as Operator } : {})
	});
}

export function removeConditionChild(group: ConditionGroupNode, index: number): void {
	group.children.splice(index, 1);
}

export function setConditionOperator(node: ConditionNode, operator: Operator): void {
	node.operator = operator;
}
