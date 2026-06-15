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

export function configureFieldValueResolver(app: PluginAppApi): void {
	resolveVariables = (context) => {
		const core = app.plugins.tryGet<CorePluginApi>('core');
		const twitchVariables = contextToVariables(context.data);

		if (!core) {
			return twitchVariables;
		}

		return {
			...core.variables.resolve(context),
			...twitchVariables
		};
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
