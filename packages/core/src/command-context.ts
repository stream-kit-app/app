import {
	hasCommandArgPlaceholders,
	matchCommandPattern,
	parseCommand
} from './parse-command.js';

/** Condition tree shape used by action trigger conditions (command matching). */
export type ConditionTree = {
	children?: Array<{
		/** Node kind: `condition` or `group`. */
		kind: string;
		/** Condition key (for example `command`). */
		key?: string;
		/** Condition value payload. */
		value?: unknown;
		/** Nested condition children for group nodes. */
		children?: ConditionTree['children'];
	}>;
};

/**
 * Find the command pattern from a trigger condition tree.
 *
 * @returns The configured command pattern string, or null when none is found.
 */
export function findCommandConditionPattern(conditions: ConditionTree): string | null {
	for (const child of conditions.children ?? []) {
		if (child.kind === 'condition' && child.key === 'command') {
			const value = child.value as { value?: string } | undefined;
			const pattern = value?.value?.trim();

			if (pattern) {
				return pattern;
			}
		}

		if (child.kind === 'group' && child.children) {
			const found = findCommandConditionPattern({ children: child.children });

			if (found) {
				return found;
			}
		}
	}

	return null;
}

/**
 * Enrich a chat message context with `command` and `args` when it matches trigger conditions.
 *
 * When the condition tree defines a pattern with `<placeholders>`, named args are extracted.
 * Otherwise only the command name is set.
 *
 * @example
 * ```ts
 * const enriched = enrichChatMessageWithCommand(
 *   { message: '!hello Alice' },
 *   actionConditions
 * );
 * // enriched.command === 'hello', enriched.args === { name: 'Alice' } (when pattern matches)
 * ```
 */
export function enrichChatMessageWithCommand<T extends { message: string }>(
	context: T,
	conditions: ConditionTree,
	prefix = '!'
): T & { command?: string; args?: Record<string, string> } {
	const pattern = findCommandConditionPattern(conditions);

	if (pattern && hasCommandArgPlaceholders(pattern)) {
		const match = matchCommandPattern(pattern, context.message, prefix);

		if (match) {
			return {
				...context,
				command: match.command,
				args: match.args,
				...match.args
			};
		}
	}

	const command = parseCommand(context.message, prefix);

	if (!command) {
		return context;
	}

	return {
		...context,
		command,
		args: {}
	};
}
