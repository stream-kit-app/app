export type FormattedLogMessage = {
	preview: string;
	collapsible: boolean;
	getPretty: () => string;
};

const PREVIEW_SCALAR_MAX = 60;
const COLLAPSE_CHAR_THRESHOLD = 120;

export function formatLogMessage(message: string): FormattedLogMessage {
	try {
		const parsed: unknown = JSON.parse(message);
		const preview = summarizeJson(parsed);
		const collapsible =
			(parsed !== null && typeof parsed === 'object') ||
			message.includes('\n') ||
			message.length > COLLAPSE_CHAR_THRESHOLD;

		return {
			preview,
			collapsible,
			getPretty: () => JSON.stringify(parsed, null, 2)
		};
	} catch {
		const collapsible = message.includes('\n') || message.length > COLLAPSE_CHAR_THRESHOLD;
		const preview = collapsible ? truncatePlain(message, COLLAPSE_CHAR_THRESHOLD) : message;

		return { preview, collapsible, getPretty: () => message };
	}
}

function summarizeJson(value: unknown): string {
	if (value === null) {
		return 'null';
	}

	if (typeof value !== 'object') {
		return formatScalar(value);
	}

	if (Array.isArray(value)) {
		if (value.length === 0) {
			return '[]';
		}

		return `[...]`;
	}

	const entries = Object.entries(value as Record<string, unknown>);
	if (entries.length === 0) {
		return '{}';
	}

	const parts = entries.map(([key, nested]) => {
		let shown: string;
		if (nested !== null && typeof nested === 'object') {
			shown = Array.isArray(nested) ? '[...]' : '{...}';
		} else {
			shown = formatScalar(nested);
		}

		return `${JSON.stringify(key)}: ${shown}`;
	});

	return `{ ${parts.join(', ')} }`;
}

function formatScalar(value: unknown): string {
	if (typeof value === 'string' && value.length > PREVIEW_SCALAR_MAX) {
		return JSON.stringify(`${value.slice(0, PREVIEW_SCALAR_MAX - 3)}...`);
	}

	return JSON.stringify(value);
}

function truncatePlain(message: string, max: number): string {
	const firstLine = message.split('\n', 1)[0] ?? message;
	if (firstLine.length <= max) {
		return firstLine.endsWith('...') ? firstLine : `${firstLine}...`;
	}

	return `${firstLine.slice(0, max - 3)}...`;
}
