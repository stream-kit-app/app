import type { PluginAppApi } from '@stream-kit/plugin';
import { getGlobalVariables, mergeContextVariables } from '@stream-kit/plugin/action';
import type { HandlerFieldVariable } from '@stream-kit/ui/types';

const TIMER_CONTEXT_FIELDS = ['timerId', 'name', 'platforms', 'firedAt'] as const;

function formatVariableLabel(key: string): string {
	return key
		.replace(/([a-z])([A-Z])/g, '$1 $2')
		.replace(/[_-]/g, ' ')
		.replace(/\b\w/g, (char) => char.toUpperCase());
}

export function getTimerContextVariables(): HandlerFieldVariable[] {
	return TIMER_CONTEXT_FIELDS.map((key) => ({
		key,
		label: formatVariableLabel(key),
		group: 'Timer'
	}));
}

/** Global and timer context variables; the handler editor adds handler outputs per handler. */
export function getTimerBaseVariables(app: PluginAppApi): HandlerFieldVariable[] {
	return mergeContextVariables(getGlobalVariables(app), getTimerContextVariables());
}
