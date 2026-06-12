export function isTextEmpty(value: string): boolean {
	return !value.trim();
}

export function matchText(message: string, type: string, needle: string): boolean {
	if (type === 'isEmpty') {
		return isTextEmpty(message);
	}

	if (type === 'isNotEmpty') {
		return !isTextEmpty(message);
	}

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
		default:
			return false;
	}
}
