export function parseCommand(message: string, prefix = '!'): string | null {
	const normalizedPrefix = prefix.trim();

	if (!normalizedPrefix || !message.startsWith(normalizedPrefix)) {
		return null;
	}

	const parts = message.slice(normalizedPrefix.length).trim().split(/\s+/);
	return parts[0]?.toLowerCase() ?? null;
}
