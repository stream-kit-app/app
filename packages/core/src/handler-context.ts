/** Context passed to handler `execute` functions and script handlers. */
export type HandlerTriggerContext = {
	/** Stable trigger definition ID that fired (for example `twitch:twitch:chat:chat-message`). */
	trigger: string;
	/** Trigger-specific payload. Shape depends on the trigger that fired. */
	data: unknown;
	/** Action-scoped variables for this run (set by Set Variable, scripts, …). */
	actionVariables?: Record<string, string>;
};

/**
 * Trigger data merged with action-scoped variables, so `{variable}` placeholders see
 * values set earlier in the action. Action variables win on key conflicts.
 *
 * @example
 * ```ts
 * const vars = contextToVariables(withActionVariables(context));
 * ```
 */
export function withActionVariables(context: HandlerTriggerContext): Record<string, unknown> {
	const data =
		context.data && typeof context.data === 'object' && !Array.isArray(context.data)
			? (context.data as Record<string, unknown>)
			: {};

	if (!context.actionVariables || Object.keys(context.actionVariables).length === 0) {
		return data;
	}

	return { ...data, ...context.actionVariables };
}
