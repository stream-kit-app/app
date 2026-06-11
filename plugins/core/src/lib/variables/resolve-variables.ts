import type { HandlerTriggerContext } from '@stream-kit/app/api';

import { contextToVariables } from './context-to-variables';
import { extractUsername } from './extract-username';
import type { VariableStore } from './variable-store';

export function resolveVariables(
	store: VariableStore,
	context: HandlerTriggerContext
): Record<string, string> {
	const triggerVariables = contextToVariables(context.data);
	const globalVariables = store.getGlobalSnapshot();
	const username = extractUsername(context.data);
	const userVariables = username ? store.getUserSnapshot(username) : {};
	const actionVariables = context.actionVariables ?? {};

	return {
		...triggerVariables,
		...globalVariables,
		...userVariables,
		...actionVariables
	};
}
