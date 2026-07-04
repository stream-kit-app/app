/** @param {string} value @param {string} [fallback] */
export function slugify(value, fallback = 'item') {
	const slug = (value ?? fallback)
		.trim()
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
	return slug || fallback;
}

/**
 * @param {string | undefined} explicitId
 * @param {string} name
 * @param {string | undefined} scope
 * @param {string} [fallback]
 */
export function resolveDefinitionId(explicitId, name, scope, fallback = 'item') {
	if (explicitId) {
		const segment = slugify(explicitId, fallback);
		return scope ? `${scope}:${segment}` : segment;
	}
	const segment = slugify(name, fallback);
	return scope ? `${scope}:${segment}` : segment;
}

/**
 * @param {unknown[]} nodes
 * @param {string} idScope
 * @param {string} [parentScope]
 * @returns {{ id: string, name: string, path: string[], kind: 'trigger' | 'handler', factory?: string, factoryArg?: string }[]}
 */
export function flattenDefinitionTree(nodes, idScope, parentScope, kind = 'trigger') {
	/** @type {{ id: string, name: string, path: string[], kind: 'trigger' | 'handler', factory?: string, factoryArg?: string }[]} */
	const leaves = [];

	for (const node of nodes) {
		if (node.type === 'group') {
			const scope = resolveDefinitionId(undefined, node.name, parentScope);
			leaves.push(...flattenDefinitionTree(node.children, idScope, scope, kind));
		} else if (node.type === 'factory') {
			leaves.push({
				parentScope,
				path: node.path ?? [],
				kind,
				factory: node.factory,
				factoryArg: node.factoryArg
			});
		}
	}

	return leaves;
}
