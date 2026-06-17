import type { HandlerTriggerContext } from '@stream-kit/plugin';

export function setActionVariables(
	context: HandlerTriggerContext,
	variables: Record<string, string | number | boolean | null | undefined>
): void {
	if (!context.actionVariables) {
		context.actionVariables = {};
	}

	for (const [key, value] of Object.entries(variables)) {
		if (value === undefined || value === null) {
			continue;
		}

		context.actionVariables[key] = String(value);
	}
}
