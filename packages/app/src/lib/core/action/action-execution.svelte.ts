import {
	delay,
	EXECUTION_RESET_DELAY_MS,
	IDLE_EXECUTION_STATE,
	type ActionExecutionPhase,
	type ActionExecutionState
} from './action-execution';

export type { ActionExecutionPhase, ActionExecutionState };

// Overlapping trigger runs share one execution; reference-count them so the UI
// is only reset after the last concurrent run finishes. Kept in a WeakMap rather
// than as class fields so ActionExecution's public shape stays structurally
// compatible with the type exported from `@stream-kit/core`.
type RunBookkeeping = { activeRuns: number; resetToken: number };

const runBookkeeping = new WeakMap<ActionExecution, RunBookkeeping>();

function getRunBookkeeping(execution: ActionExecution): RunBookkeeping {
	let bookkeeping = runBookkeeping.get(execution);

	if (!bookkeeping) {
		bookkeeping = { activeRuns: 0, resetToken: 0 };
		runBookkeeping.set(execution, bookkeeping);
	}

	return bookkeeping;
}

export class ActionExecution {
	state: ActionExecutionState = $state({ ...IDLE_EXECUTION_STATE });

	begin(): void {
		const bookkeeping = getRunBookkeeping(this);
		bookkeeping.activeRuns += 1;

		if (bookkeeping.activeRuns === 1) {
			bookkeeping.resetToken += 1;
			this.state = {
				isRunning: true,
				phase: 'trigger',
				activeTriggerId: null,
				activeHandlerId: null,
				completedHandlerIds: []
			};
		}
	}

	async end(): Promise<void> {
		const bookkeeping = getRunBookkeeping(this);
		bookkeeping.activeRuns = Math.max(0, bookkeeping.activeRuns - 1);

		if (bookkeeping.activeRuns > 0) {
			return;
		}

		const token = ++bookkeeping.resetToken;
		await delay(EXECUTION_RESET_DELAY_MS);

		// Only reset if no new run started (or ended) during the delay.
		if (token === bookkeeping.resetToken && bookkeeping.activeRuns === 0) {
			this.reset();
		}
	}

	reset(): void {
		const bookkeeping = getRunBookkeeping(this);
		bookkeeping.activeRuns = 0;
		bookkeeping.resetToken += 1;
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
