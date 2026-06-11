export type HandlerTriggerContext = {
	trigger: string;
	data: unknown;
	/** Mutable action-scoped variables for the current handler chain run. */
	actionVariables?: Record<string, string>;
};
