function readSegment(value: unknown, segment: string): unknown {
	if (value == null) {
		return undefined;
	}

	if (Array.isArray(value)) {
		const index = Number.parseInt(segment, 10);

		if (Number.isNaN(index)) {
			return undefined;
		}

		return value[index];
	}

	if (typeof value === 'object') {
		return (value as Record<string, unknown>)[segment];
	}

	return undefined;
}

export function getValueAtPath(data: unknown, path: string): string | undefined {
	const trimmed = path.trim();

	if (!trimmed) {
		return undefined;
	}

	let current: unknown = data;

	for (const segment of trimmed.split('.')) {
		current = readSegment(current, segment);

		if (current === undefined) {
			return undefined;
		}
	}

	if (current == null) {
		return undefined;
	}

	if (typeof current === 'string') {
		return current;
	}

	if (typeof current === 'number' || typeof current === 'boolean') {
		return String(current);
	}

	try {
		return JSON.stringify(current);
	} catch {
		return undefined;
	}
}
