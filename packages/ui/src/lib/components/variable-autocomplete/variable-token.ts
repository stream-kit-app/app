import type { HandlerFieldVariable } from '../../types';

/** Same key rule as `interpolateVariables` in `@stream-kit/core`. */
const PARTIAL_KEY_PATTERN = /^[a-zA-Z_][a-zA-Z0-9_]*$/;

/** An unfinished `{partial` placeholder ending at the caret. */
export type VariableToken = {
	/** Index of the opening `{`. */
	start: number;
	/** Caret position (end of the partial key). */
	end: number;
	/** Text typed after `{`. */
	query: string;
};

/** Finds the `{partial` the caret is in, or `null` when the caret is not inside a placeholder. */
export function findVariableToken(text: string, caret: number): VariableToken | null {
	const before = text.slice(0, caret);
	const start = before.lastIndexOf('{');

	if (start === -1) {
		return null;
	}

	const query = before.slice(start + 1);

	if (query.length > 0 && !PARTIAL_KEY_PATTERN.test(query)) {
		return null;
	}

	return { start, end: caret, query };
}

/**
 * Replaces the token with `{key}`. A key or closing brace directly after the caret is swallowed so
 * completing `{us|}` or `{us|ername}` does not leave a stray `}` or key fragment behind.
 */
export function applyVariableCompletion(
	text: string,
	token: VariableToken,
	key: string
): { text: string; caret: number } {
	let after = text.slice(token.end);
	const rest = /^[a-zA-Z0-9_]*\}/.exec(after);

	if (rest) {
		after = after.slice(rest[0].length);
	}

	const inserted = `{${key}}`;

	return {
		text: `${text.slice(0, token.start)}${inserted}${after}`,
		caret: token.start + inserted.length
	};
}

/** Filters and orders variables: key prefix matches first, then other key/label matches. */
export function rankVariables(
	variables: HandlerFieldVariable[],
	query: string
): HandlerFieldVariable[] {
	if (!query) {
		return variables;
	}

	const needle = query.toLowerCase();
	const prefix: HandlerFieldVariable[] = [];
	const contains: HandlerFieldVariable[] = [];

	for (const variable of variables) {
		const key = variable.key.toLowerCase();

		if (key.startsWith(needle)) {
			prefix.push(variable);
		} else if (key.includes(needle) || variable.label.toLowerCase().includes(needle)) {
			contains.push(variable);
		}
	}

	return [...prefix, ...contains];
}
