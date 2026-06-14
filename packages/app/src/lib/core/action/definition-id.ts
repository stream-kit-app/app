import type { HandlerDefinitions } from './handler/handler-definition.svelte';
import type { HandlerDefinition } from './handler/handler-definition.svelte';
import type { TriggerDefinitions } from './trigger/trigger-definition.svelte';
import type { TriggerDefinition } from './trigger/trigger-definition.svelte';

/** Strip legacy index suffixes such as `twitch-4` → `twitch`. */
export function normalizeLegacyDefinitionId(id: string): string {
	return id
		.split(':')
		.map((segment) => segment.replace(/-\d+$/, '') || segment)
		.join(':');
}

export function resolveTriggerDefinition(
	registry: TriggerDefinitions,
	storedId: string
): TriggerDefinition | undefined {
	const exact = registry.find(storedId);

	if (exact) {
		return exact;
	}

	const normalized = normalizeLegacyDefinitionId(storedId);

	if (normalized !== storedId) {
		return registry.find(normalized);
	}

	return undefined;
}

export function resolveHandlerDefinition(
	registry: HandlerDefinitions,
	storedId: string
): HandlerDefinition | undefined {
	const exact = registry.find(storedId);

	if (exact) {
		return exact;
	}

	const normalized = normalizeLegacyDefinitionId(storedId);

	if (normalized !== storedId) {
		return registry.find(normalized);
	}

	return undefined;
}
