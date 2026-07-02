import type { HandlerTriggerContext } from '@stream-kit/plugin';

import { contextToVariables as contextToVariablesExtended } from '../context-variables';
import { applyContextVariableEnrichers } from './context-enrichers';
import { extractUsername } from './extract-username';
import type { VariableStore } from './variable-store';

export function resolveTriggerContextVariables(data: unknown): Record<string, string> {
	const base = contextToVariablesExtended(data);

	return applyContextVariableEnrichers(data, base);
}

export function resolveVariables(
	store: VariableStore,
	context: HandlerTriggerContext
): Record<string, string> {
	const triggerVariables = resolveTriggerContextVariables(context.data);
	const globalVariables = store.getGlobalSnapshot();
	const username = extractUsername(context.data);
	const userVariables = username ? store.getUserSnapshot(username) : {};
	const actionVariables = context.actionVariables ?? {};

	return {
		...globalVariables,
		...userVariables,
		...triggerVariables,
		...actionVariables
	};
}
