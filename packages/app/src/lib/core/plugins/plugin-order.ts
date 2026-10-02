type DependencyNode = {
	key: string;
	dependencies: string[];
	optionalDependencies?: string[];
};

/**
 * Orders plugins so every plugin comes after the plugins it depends on.
 * Keeps the input order where dependencies allow it; plugins in a cycle keep their input order.
 */
export function sortByDependencies<T extends DependencyNode>(items: T[]): T[] {
	const byKey = new Map(items.map((item) => [item.key, item]));
	const sorted: T[] = [];
	const visited = new Set<string>();
	const visiting = new Set<string>();

	const visit = (item: T): void => {
		if (visited.has(item.key)) {
			return;
		}

		if (visiting.has(item.key)) {
			console.warn(`Plugin dependency cycle detected at "${item.key}"`);
			return;
		}

		visiting.add(item.key);

		for (const key of [...item.dependencies, ...(item.optionalDependencies ?? [])]) {
			const dependency = byKey.get(key);

			if (dependency) {
				visit(dependency);
			}
		}

		visiting.delete(item.key);
		visited.add(item.key);
		sorted.push(item);
	};

	for (const item of items) {
		visit(item);
	}

	return sorted;
}
