import type { ConditionGroupNode, ConditionLeafNode } from '@stream-kit/app/api';

function normalizeLookupKey(value: string): string {
	return value
		.trim()
		.replace(/([a-z0-9])([A-Z])/g, '$1-$2')
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
}

function collectLeafNodes(group: ConditionGroupNode): ConditionLeafNode[] {
	const leaves: ConditionLeafNode[] = [];

	for (const child of group.children) {
		if (child.kind === 'group') {
			leaves.push(...collectLeafNodes(child));
			continue;
		}

		leaves.push(child);
	}

	return leaves;
}

export function findConditionValue(
	conditions: ConditionGroupNode,
	key: string
): ConditionLeafNode['value'] | undefined {
	const normalizedKey = normalizeLookupKey(key);

	return collectLeafNodes(conditions).find(
		(leaf) => normalizeLookupKey(leaf.key) === normalizedKey
	)?.value;
}
