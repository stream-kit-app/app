import { timers } from '../../../lib/instances';
import type { Timers } from './timers.svelte';

export function getTimersService(): Timers {
	return timers;
}

export function tryGetTimersService(): Timers | undefined {
	return timers;
}
