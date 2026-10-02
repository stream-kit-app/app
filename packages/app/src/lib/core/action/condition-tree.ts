import type {
	ConditionGroupNode,
	ConditionNode,
	FieldValue,
	Operator,
	ResolvedConditionDefinition
} from './trigger/condition';
import type { HandlerFieldVariable } from './handler/field';
import type { ConditionEditor } from './condition-editor';

export function emptyConditionGroup(): ConditionGroupNode {
	return {
		kind: 'group',
		id: 'root',
		children: []
	};
}

function isCompoundConditionValue(
	definition: ResolvedConditionDefinition,
	value: FieldValue
): value is Exclude<FieldValue, string | boolean> {
	return (
		(definition.type === 'select-text' || definition.type === 'text-select-text') &&
		typeof value === 'object' &&
		value !== null
	);
}

export function initConditionValue(definition: ResolvedConditionDefinition): FieldValue {
	if (definition.defaultValue !== undefined) {
		return isCompoundConditionValue(definition, definition.defaultValue)
			? { ...definition.defaultValue }
			: definition.defaultValue;
	}

	if (definition.type === 'text-select-text') {
		return { path: '', type: 'equals', value: '' };
	}

	if (definition.type === 'select-text') {
		return { type: '', value: '' };
	}

	if (definition.type === 'checkbox') {
		return true;
	}

	if (definition.type === 'cron-expression' || definition.type === 'hotkey') {
		return '';
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

export function normalizeConditionGroupOperators(group: ConditionGroupNode): void {
	for (const [index, child] of group.children.entries()) {
		if (index === 0) {
			delete child.operator;
		} else if (!child.operator) {
			child.operator = 'and';
		}

		if (child.kind === 'group') {
			normalizeConditionGroupOperators(child);
		}
	}
}

export function removeConditionChild(group: ConditionGroupNode, index: number): void {
	group.children.splice(index, 1);
	normalizeConditionGroupOperators(group);
}

export function setConditionOperator(node: ConditionNode, operator: Operator): void {
	node.operator = operator;
}

export function isConditionGroupNode(value: unknown): value is ConditionGroupNode {
	return (
		typeof value === 'object' &&
		value !== null &&
		'kind' in value &&
		value.kind === 'group' &&
		'children' in value &&
		Array.isArray(value.children)
	);
}

/** Deep copy with fresh node ids (the root keeps `root`), for defaults shared across instances. */
export function cloneConditionGroup(group: ConditionGroupNode): ConditionGroupNode {
	const cloneNode = (node: ConditionNode): ConditionNode =>
		node.kind === 'group'
			? { ...node, id: crypto.randomUUID(), children: node.children.map(cloneNode) }
			: {
					...node,
					id: crypto.randomUUID(),
					value: typeof node.value === 'object' ? { ...node.value } : node.value
				};

	return { ...group, children: group.children.map(cloneNode) };
}

/** Wraps a single `{ path, type, value, negate }` condition as a group with one condition. */
export function textSelectTextToConditionGroup(
	value: { path: string; type: string; value: string; negate?: boolean },
	conditionKey: string
): ConditionGroupNode {
	return {
		kind: 'group',
		id: 'root',
		children: [
			{
				kind: 'condition',
				id: crypto.randomUUID(),
				key: conditionKey,
				value: { path: value.path, type: value.type, value: value.value },
				...(value.negate ? { negate: true } : {})
			}
		]
	};
}

/** Condition editor for a condition group stored outside a trigger (for example an IF field). */
export function createConditionEditor(
	definitions: ResolvedConditionDefinition[],
	options: {
		getFieldError?: (nodeId: string) => string | undefined;
		getVariables?: () => HandlerFieldVariable[];
	} = {}
): ConditionEditor {
	return {
		conditionDefinitions: definitions,
		getConditionDefinition: (key) => getConditionDefinition(definitions, key),
		getFieldError: (nodeId, errors) =>
			errors?.conditionFields[nodeId] ?? options.getFieldError?.(nodeId),
		getVariables: options.getVariables,
		addCondition: (group, conditionKey) => addConditionToGroup(group, conditionKey, definitions),
		addGroup: (group) => addGroupToRoot(group),
		removeChild: (group, index) => removeConditionChild(group, index),
		setOperator: (node, operator) => setConditionOperator(node, operator)
	};
}
