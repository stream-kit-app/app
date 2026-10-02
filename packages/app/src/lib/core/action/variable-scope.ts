import type { ActionHandler } from './action-handler.svelte';
import type { VariableDefinition } from './handler/field';
import type { HandlerFieldVariable } from '@stream-kit/ui/types';

import { getHandlerFieldValue } from './handler-field';

/** Picker group for variables set by handlers in the action chain. */
export const ACTION_VARIABLE_GROUP = 'Action';

type ScopeEntry = HandlerFieldVariable;
type Scope = Map<string, ScopeEntry>;

export function formatVariableLabel(key: string): string {
	return key
		.replace(/([a-z])([A-Z])/g, '$1 $2')
		.replace(/[_-]/g, ' ')
		.replace(/\b\w/g, (char) => char.toUpperCase());
}

/** Variables a handler instance sets, from its definition `outputs` or legacy field conventions. */
export function getHandlerOutputs(handler: ActionHandler): VariableDefinition[] {
	const outputs = handler.definition.outputs;

	if (outputs) {
		const list =
			typeof outputs === 'function'
				? outputs({ getFieldValue: (key) => getHandlerFieldValue(handler.fields, key) })
				: outputs;

		return list
			.map((output) => ({ ...output, key: output.key.trim() }))
			.filter((output) => output.key.length > 0);
	}

	return getLegacyHandlerOutputs(handler);
}

/** Fallback for handlers that predate `outputs`: `target-name`, or `variable-name` with action scope. */
function getLegacyHandlerOutputs(handler: ActionHandler): VariableDefinition[] {
	const outputs: VariableDefinition[] = [];
	const targetName = getHandlerFieldValue(handler.fields, 'target-name');

	if (typeof targetName === 'string' && targetName.trim()) {
		outputs.push({ key: targetName.trim() });
	}

	const scope = getHandlerFieldValue(handler.fields, 'scope');
	const variableName = getHandlerFieldValue(handler.fields, 'variable-name');

	if (scope === 'action' && typeof variableName === 'string' && variableName.trim()) {
		outputs.push({ key: variableName.trim() });
	}

	return outputs;
}

function toScopeEntry(output: VariableDefinition): ScopeEntry {
	return {
		key: output.key,
		label: output.label ?? formatVariableLabel(output.key),
		description: output.description,
		group: ACTION_VARIABLE_GROUP
	};
}

/** Keys set in only one branch become `maybe` after the IF; keys set in both stay certain. */
function mergeBranchScopes(thenScope: Scope, elseScope: Scope): Scope {
	const merged: Scope = new Map();

	for (const [key, entry] of thenScope) {
		const other = elseScope.get(key);
		merged.set(key, { ...entry, maybe: !other || entry.maybe || other.maybe || undefined });
	}

	for (const [key, entry] of elseScope) {
		if (!merged.has(key)) {
			merged.set(key, { ...entry, maybe: true });
		}
	}

	return merged;
}

function scopeToList(scope: Scope): HandlerFieldVariable[] {
	return [...scope.values()].sort((left, right) => left.key.localeCompare(right.key));
}

function walkChain(
	handlers: ActionHandler[],
	scope: Scope,
	scopes: Map<string, HandlerFieldVariable[]>
): Scope {
	let current = scope;

	for (const handler of handlers) {
		scopes.set(handler.id, scopeToList(current));

		if (handler.thenHandlers.length > 0 || handler.elseHandlers.length > 0) {
			const thenScope = walkChain(handler.thenHandlers, new Map(current), scopes);
			const elseScope = walkChain(handler.elseHandlers, new Map(current), scopes);
			current = mergeBranchScopes(thenScope, elseScope);
		}

		const outputs = getHandlerOutputs(handler);

		if (outputs.length > 0) {
			current = new Map(current);

			for (const output of outputs) {
				current.set(output.key, toScopeEntry(output));
			}
		}
	}

	return current;
}

/**
 * Variables available before each handler runs, keyed by handler id.
 *
 * `base` holds trigger, context and global variables. Handler outputs are added in execution order;
 * a variable set in only one IF branch is marked `maybe` for handlers after that IF.
 */
export function computeVariableScopes(
	roots: ActionHandler[],
	base: HandlerFieldVariable[]
): Map<string, HandlerFieldVariable[]> {
	const scopes = new Map<string, HandlerFieldVariable[]>();
	const initial: Scope = new Map(base.map((variable) => [variable.key, variable]));

	walkChain(roots, initial, scopes);

	return scopes;
}
