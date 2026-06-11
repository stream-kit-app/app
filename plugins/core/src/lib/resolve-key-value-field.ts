import { interpolateVariables } from '@stream-kit/core';
import type { HandlerFieldInstance, HandlerTriggerContext, KeyValueEntry } from '@stream-kit/app/api';

import { getFieldValue } from '../get-field-value';
import { contextToVariables } from './context-variables';

function getKeyValueEntries(fields: HandlerFieldInstance[], key: string): KeyValueEntry[] {
	const value = getFieldValue(fields, key);

	return Array.isArray(value) ? value : [];
}

export function resolveKeyValueField(
	fields: HandlerFieldInstance[],
	key: string,
	context: HandlerTriggerContext,
	options: { resolveValues?: boolean } = {}
): Record<string, string> {
	const variables = contextToVariables(context.data);
	const entries = getKeyValueEntries(fields, key);
	const resolved: Record<string, string> = {};

	for (const entry of entries) {
		const entryKey = entry.key.trim();

		if (!entryKey) {
			continue;
		}

		resolved[entryKey] = options.resolveValues
			? interpolateVariables(entry.value, variables)
			: entry.value;
	}

	return resolved;
}
