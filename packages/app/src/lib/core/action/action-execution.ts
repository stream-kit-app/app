export type ActionExecutionPhase = 'idle' | 'trigger' | 'handler';

export type ActionExecutionState = {
	isRunning: boolean;
	phase: ActionExecutionPhase;
	activeTriggerId: string | null;
	activeHandlerId: string | null;
	completedHandlerIds: string[];
};

export const IDLE_EXECUTION_STATE: ActionExecutionState = {
	isRunning: false,
	phase: 'idle',
	activeTriggerId: null,
	activeHandlerId: null,
	completedHandlerIds: []
};

export const EXECUTION_RESET_DELAY_MS = 1000;

export function delay(ms: number): Promise<void> {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}
