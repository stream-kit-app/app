import type { HandlerFieldInstance, HandlerTriggerContext, KeyValueEntry } from '@stream-kit/plugin';
import { interpolateVariables } from '@stream-kit/core';

import { getFieldValue, resolveContextVariables } from '../get-field-value';

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
	const resolvedVariables = resolveContextVariables(context);
	const entries = getKeyValueEntries(fields, key);
	const resolved: Record<string, string> = {};

	for (const entry of entries) {
		const entryKey = entry.key.trim();

		if (!entryKey) {
			continue;
		}

		resolved[entryKey] = options.resolveValues
			? interpolateVariables(entry.value, resolvedVariables)
			: entry.value;
	}

	return resolved;
}
