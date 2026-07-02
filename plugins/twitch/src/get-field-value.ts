import type { CorePluginApi, PluginAppApi } from '@stream-kit/plugin';
import {
	getFieldValue as getFieldValueCore,
	interpolateVariables,
	type HandlerFieldInstance,
	type HandlerTriggerContext
} from '@stream-kit/core';

import { contextToVariables } from './lib/variables';

export const getFieldValue = getFieldValueCore;

let resolveVariables: (context: HandlerTriggerContext) => Record<string, string> = (context) =>
	contextToVariables(context.data);

let unregisterContextEnricher: (() => void) | undefined;

export function configureFieldValueResolver(app: PluginAppApi): void {
	const core = app.plugins.tryGet<CorePluginApi>('core');

	unregisterContextEnricher?.();
	unregisterContextEnricher = core?.registerContextVariableEnricher((data) =>
		contextToVariables(data)
	);

	resolveVariables = (context) => {
		if (!core) {
			return contextToVariables(context.data);
		}

		return core.variables.resolve(context);
	};
}

export function resolveFieldText(
	fields: HandlerFieldInstance[],
	key: string,
	context: HandlerTriggerContext
): string | undefined {
	const value = getFieldValue(fields, key);

	if (typeof value !== 'string') {
		return undefined;
	}

	return interpolateVariables(value, resolveVariables(context));
}
