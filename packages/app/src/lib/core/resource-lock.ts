const resourceChains = new Map<string, Promise<unknown>>();

function normalizeResourceKey(key: string): string {
	return key.trim().toLowerCase();
}

/**
 * Runs `fn` after all prior runs for the same key have finished.
 * Used to serialize shared resources (for example one OBS media source).
 */
export function withResourceLock<T>(key: string, fn: () => Promise<T>): Promise<T> {
	const normalized = normalizeResourceKey(key);
	const previous = resourceChains.get(normalized) ?? Promise.resolve();
	const current = previous.then(fn, fn);

	resourceChains.set(normalized, current);

	return current.finally(() => {
		if (resourceChains.get(normalized) === current) {
			resourceChains.delete(normalized);
		}
	});
}
