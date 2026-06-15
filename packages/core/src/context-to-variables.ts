function extractPlainData(value: unknown): unknown {
	if (value === null || value === undefined) {
		return value;
	}

	if (typeof value !== 'object') {
		return value;
	}

	if (Array.isArray(value)) {
		return value.map(extractPlainData);
	}

	const result: Record<string, unknown> = {};

	for (const [key, entry] of Object.entries(value)) {
		if (typeof entry === 'function') {
			continue;
		}

		result[key] = extractPlainData(entry);
	}

	return result;
}

export function contextValueToVariableString(value: unknown): string | undefined {
	if (value === undefined || value === null) {
		return undefined;
	}

	if (typeof value === 'string') {
		return value;
	}

	if (typeof value === 'number' || typeof value === 'boolean') {
		return String(value);
	}

	if (typeof value === 'object') {
		try {
			return JSON.stringify(extractPlainData(value));
		} catch {
			return undefined;
		}
	}

	return undefined;
}

export function contextToVariables(context: unknown): Record<string, string> {
	const variables: Record<string, string> = {};

	if (!context || typeof context !== 'object') {
		return variables;
	}

	for (const [key, value] of Object.entries(context as Record<string, unknown>)) {
		const serialized = contextValueToVariableString(value);

		if (serialized !== undefined) {
			variables[key] = serialized;
		}
	}

	return variables;
}
