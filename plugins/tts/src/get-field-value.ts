import type { HandlerFieldInstance, HandlerTriggerContext } from '@stream-kit/core';
import type { CorePluginApi, PluginAppApi } from '@stream-kit/plugin';

import {
	getFieldValue as getFieldValueCore,
	interpolateVariables,
	resolveOneOfFieldText as resolveOneOfFieldTextCore
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

export function resolveVoiceFieldText(
	fields: HandlerFieldInstance[],
	context: HandlerTriggerContext
): string | undefined {
	const raw = getFieldValue(fields, 'voice');

	if (typeof raw === 'string') {
		return interpolateVariables(raw, resolveVariables(context));
	}

	return resolveOneOfFieldText(fields, 'voice', context);
}

/** Parses an optional numeric text field; `undefined` when empty or not a number. */
export function resolveNumberField(
	fields: HandlerFieldInstance[],
	key: string,
	context: HandlerTriggerContext
): number | undefined {
	const text = resolveFieldText(fields, key, context)?.trim().replace(',', '.');

	if (!text) {
		return undefined;
	}

	const value = Number(text);

	return Number.isFinite(value) ? value : undefined;
}

export function resolveOneOfFieldText(
	fields: HandlerFieldInstance[],
	key: string,
	context: HandlerTriggerContext
): string | undefined {
	return resolveOneOfFieldTextCore(fields, key, context, resolveVariables);
}
