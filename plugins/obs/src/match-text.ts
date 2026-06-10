export function matchText(message: string, type: string, needle: string): boolean {
	if (!needle) {
		return true;
	}

	const lowerMessage = message.toLowerCase();
	const lowerNeedle = needle.toLowerCase();

	switch (type) {
		case 'startsWith':
			return lowerMessage.startsWith(lowerNeedle);
		case 'endsWith':
			return lowerMessage.endsWith(lowerNeedle);
		case 'contains':
			return lowerMessage.includes(lowerNeedle);
		case 'equals':
			return lowerMessage === lowerNeedle;
		case 'notStartsWith':
			return !lowerMessage.startsWith(lowerNeedle);
		case 'notEndsWith':
			return !lowerMessage.endsWith(lowerNeedle);
		case 'notContains':
			return !lowerMessage.includes(lowerNeedle);
		case 'notEquals':
			return lowerMessage !== lowerNeedle;
		default:
			return false;
	}
}
