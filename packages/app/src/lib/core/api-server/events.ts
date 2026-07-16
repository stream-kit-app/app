/** Match exact event names or trailing globs (`actions.*`, `plugin:rankings.*`). */
export function eventMatches(pattern: string, event: string): boolean {
	const normalizedPattern = pattern.trim();
	const normalizedEvent = event.trim();

	if (!normalizedPattern || !normalizedEvent) {
		return false;
	}

	if (normalizedPattern === '*') {
		return true;
	}

	if (normalizedPattern === normalizedEvent) {
		return true;
	}

	if (normalizedPattern.endsWith('.*')) {
		const prefix = normalizedPattern.slice(0, -1);
		return normalizedEvent.startsWith(prefix);
	}

	if (normalizedPattern.endsWith('*')) {
		const prefix = normalizedPattern.slice(0, -1);
		return normalizedEvent.startsWith(prefix);
	}

	return false;
}

export function clientSubscribed(
	subscriptions: ReadonlySet<string> | undefined,
	event: string
): boolean {
	if (!subscriptions || subscriptions.size === 0) {
		return false;
	}

	for (const pattern of subscriptions) {
		if (eventMatches(pattern, event)) {
			return true;
		}
	}

	return false;
}
