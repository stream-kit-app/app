export function contextToVariables(data: unknown): Record<string, string> {
	const variables: Record<string, string> = {};

	if (!data || typeof data !== 'object') {
		return variables;
	}

	for (const [key, value] of Object.entries(data as Record<string, unknown>)) {
		if (typeof value === 'string') {
			variables[key] = value;
			continue;
		}

		if (typeof value === 'number' || typeof value === 'boolean') {
			variables[key] = String(value);
		}
	}

	return variables;
}
