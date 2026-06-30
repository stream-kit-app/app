import type { ActionHandler, PluginAppApi } from '@stream-kit/plugin';
import {
	getGlobalVariables,
	getPrecedingActionVariablesForHandler,
	mergeContextVariables
} from '@stream-kit/plugin/action';
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
		label: formatVariableLabel(key)
	}));
}

export function contextVariablesForTimerHandler(
	app: PluginAppApi,
	handlers: ActionHandler[],
	handler: ActionHandler
): HandlerFieldVariable[] {
	return mergeContextVariables(
		getGlobalVariables(app),
		getTimerContextVariables(),
		getPrecedingActionVariablesForHandler(handlers, handler.id)
	);
}
