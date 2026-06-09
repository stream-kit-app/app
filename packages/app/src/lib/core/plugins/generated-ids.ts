const DEFAULT_ID = 'item';

export function createGeneratedId(value: string | undefined, fallback = DEFAULT_ID): string {
	const normalized = (value ?? fallback)
		.trim()
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');

	return normalized || fallback;
}

export function createUniqueId(value: string, used: Set<string>): string {
	const base = createGeneratedId(value);
	let id = base;
	let suffix = 2;

	while (used.has(id)) {
		id = `${base}-${suffix}`;
		suffix += 1;
	}

	used.add(id);
	return id;
}

export function createScopedId(pluginKey: string, parts: string[]): string {
	return `${pluginKey}:${parts.map((part) => createGeneratedId(part)).join('.')}`;
}
