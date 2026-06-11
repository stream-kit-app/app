const USERNAME_KEYS = ['username', 'userName', 'user', 'login'] as const;

export function extractUsername(data: unknown): string | undefined {
	if (!data || typeof data !== 'object') {
		return undefined;
	}

	const record = data as Record<string, unknown>;

	for (const key of USERNAME_KEYS) {
		const value = record[key];

		if (typeof value === 'string' && value.trim()) {
			return value.trim();
		}
	}

	return undefined;
}
