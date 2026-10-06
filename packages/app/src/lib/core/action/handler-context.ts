export type HandlerTriggerContext = {
	trigger: string;
	data: unknown;
	/** Mutable action-scoped variables for the current handler chain run. */
	actionVariables?: Record<string, string>;
	/**
	 * Aborted when this handler exceeds its timeout or the run is cancelled. Long-running
	 * handlers should stop waiting (and clean up) when it fires; `next()` is ignored after.
	 */
	signal?: AbortSignal;
};
