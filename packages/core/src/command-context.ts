import {
	hasCommandArgPlaceholders,
	matchCommandPattern,
	parseCommand
} from './parse-command.js';

export type ConditionTree = {
	children?: Array<{
		kind: string;
		key?: string;
		value?: unknown;
		children?: ConditionTree['children'];
	}>;
};

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
