export function parseCommand(message: string): string | null {
	if (!message.startsWith('!')) {
		return null;
	}

	const parts = message.slice(1).trim().split(/\s+/);

	return parts[0]?.toLowerCase() ?? null;
}
