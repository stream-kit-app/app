import type { CorePluginApi, PluginAppApi } from '@stream-kit/app/api';
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

		return core?.variables.resolve(context) ?? contextToVariables(context.data);
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
