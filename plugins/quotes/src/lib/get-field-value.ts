import { interpolateVariables } from '@stream-kit/core';
import type { HandlerFieldInstance } from '@stream-kit/plugin';

export function getFieldValue(fields: HandlerFieldInstance[], key: string): unknown {
	const field = fields.find((entry) => entry.key === key);

	return field?.value;
}

export function resolveFieldText(
	fields: HandlerFieldInstance[],
	key: string,
	context: unknown
): string {
	const template = getFieldValue(fields, key);

	if (typeof template !== 'string') {
		return '';
	}

	return interpolateVariables(template, contextToVariables(context));
}

export function contextToVariables(context: unknown): Record<string, string> {
	if (!context || typeof context !== 'object') {
		return {};
	}

	const record = context as Record<string, unknown>;
	const variables: Record<string, string> = {};

	for (const [key, value] of Object.entries(record)) {
		if (value == null) {
			continue;
		}

		if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
			variables[key] = String(value);
		}
	}

	return variables;
}

export function interpolateTemplate(
	template: string,
	variables: Record<string, string | number | undefined>
): string {
	const normalized: Record<string, string> = {};

	for (const [key, value] of Object.entries(variables)) {
		if (value == null) {
			continue;
		}

		normalized[key] = String(value);
	}

	return interpolateVariables(template, normalized);
}
