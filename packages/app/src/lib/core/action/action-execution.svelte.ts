import {
	delay,
	EXECUTION_RESET_DELAY_MS,
	IDLE_EXECUTION_STATE,
	type ActionExecutionPhase,
	type ActionExecutionState
} from './action-execution';

export type { ActionExecutionPhase, ActionExecutionState };

export class ActionExecution {
	state: ActionExecutionState = $state({ ...IDLE_EXECUTION_STATE });

	begin(): void {
		this.state = {
			isRunning: true,
			phase: 'trigger',
			activeTriggerId: null,
			activeHandlerId: null,
			completedHandlerIds: []
		};
	}

	async end(): Promise<void> {
		await delay(EXECUTION_RESET_DELAY_MS);
		this.reset();
	}

	reset(): void {
		this.state = { ...IDLE_EXECUTION_STATE };
	}

	markTriggerActive(triggerId: string): void {
		this.state = {
			...this.state,
			phase: 'trigger',
			activeTriggerId: triggerId
		};
	}

	markHandlerActive(handlerId: string): void {
		this.state = {
			...this.state,
			phase: 'handler',
			activeHandlerId: handlerId
		};
	}

	markHandlerCompleted(handlerId: string): void {
		const completedHandlerIds = this.state.completedHandlerIds.includes(handlerId)
			? this.state.completedHandlerIds
			: [...this.state.completedHandlerIds, handlerId];

		this.state = {
			...this.state,
			activeHandlerId:
				this.state.activeHandlerId === handlerId ? null : this.state.activeHandlerId,
			completedHandlerIds
		};
	}
}
