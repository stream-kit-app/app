const VARIABLE_PATTERN = /\{([a-zA-Z_][a-zA-Z0-9_]*)\}/g;

/**
 * Replace `{variable}` placeholders in a template with values from a variables map.
 * Missing or null values become empty strings.
 *
 * @example
 * ```ts
 * interpolateVariables('Hello {user}!', { user: 'Alice' }); // "Hello Alice!"
 * ```
 */
export function interpolateVariables(
	template: string,
	variables: Record<string, string | number | null | undefined>
): string {
	return template.replace(VARIABLE_PATTERN, (_match, key: string) => {
		const value = variables[key];

		if (value === undefined || value === null) {
			return '';
		}

		return String(value);
	});
}
