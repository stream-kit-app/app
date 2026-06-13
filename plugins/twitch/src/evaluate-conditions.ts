import type { ConditionGroupNode, FieldValue } from '@stream-kit/plugin';

export function evaluateConditionTree(
	group: ConditionGroupNode,
	evaluateLeaf: (key: string, value: FieldValue) => boolean
): boolean {
	if (group.children.length === 0) {
		return true;
	}

	let result = evaluateNode(group.children[0], evaluateLeaf);

	for (let index = 1; index < group.children.length; index++) {
		const child = group.children[index];
		const passed = evaluateNode(child, evaluateLeaf);
		const operator = child.operator ?? 'and';

		result = operator === 'and' ? result && passed : result || passed;
	}

	return result;
}

function evaluateNode(
	node: ConditionGroupNode['children'][number],
	evaluateLeaf: (key: string, value: FieldValue) => boolean
): boolean {
	if (node.kind === 'group') {
		return evaluateConditionTree(node, evaluateLeaf);
	}

	const passed = evaluateLeaf(normalizeLookupKey(node.key), node.value);

	return node.negate ? !passed : passed;
}

export function normalizeLookupKey(value: string): string {
	return value
		.trim()
		.replace(/([a-z0-9])([A-Z])/g, '$1-$2')
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
}
