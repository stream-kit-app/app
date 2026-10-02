import { contextToVariables as contextToVariablesCore } from '@stream-kit/core';
import type { CorePluginApi, PluginAppApi } from '@stream-kit/plugin';
import type { HandlerFieldVariable } from '@stream-kit/ui/types';

import type { App } from '../app.svelte';
import { getApp } from '../registry';
import type { ActionHandler } from './action-handler.svelte';
import type { Action } from './action.svelte';
import type { ActionTrigger } from './action-trigger.svelte';
import {
	ACTION_VARIABLE_GROUP,
	computeVariableScopes,
	formatVariableLabel,
	getHandlerOutputs
} from './variable-scope';

export const TRIGGER_VARIABLE_GROUP = 'Trigger';
export const GLOBAL_VARIABLE_GROUP = 'Global';

type ProcessEventContext = {
	executable?: string;
	fullPath?: string;
	name?: string;
	parentProcessId?: number;
	path?: string;
	processId?: number;
};

export function contextToVariables(context: unknown): Record<string, string> {
	const variables = contextToVariablesCore(context);
	const processContext = context as Partial<ProcessEventContext>;

	if (typeof processContext.executable === 'string' && !variables.executable) {
		variables.executable = processContext.executable;
	}

	if (typeof processContext.fullPath === 'string' && !variables.fullPath) {
		variables.fullPath = processContext.fullPath;
	}

	if (typeof processContext.name === 'string' && !variables.name) {
		variables.name = processContext.name;
	}

	if (typeof processContext.parentProcessId === 'number' && !variables.parentProcessId) {
		variables.parentProcessId = String(processContext.parentProcessId);
	}

	if (typeof processContext.path === 'string' && !variables.path) {
		variables.path = processContext.path;
	}

	if (typeof processContext.processId === 'number' && !variables.processId) {
		variables.processId = String(processContext.processId);
	}

	return variables;
}

/** Runtime aliases hidden from variable pickers when the canonical key is present. */
const VARIABLE_UI_ALIASES: Record<string, string> = {
	user: 'username'
};

function toVariableList(variables: Record<string, string>, group?: string): HandlerFieldVariable[] {
	return Object.keys(variables)
		.filter((key) => {
			const canonical = VARIABLE_UI_ALIASES[key];

			return !canonical || !(canonical in variables);
		})
		.sort((left, right) => left.localeCompare(right))
		.map((key) => ({
			key,
			label: formatVariableLabel(key),
			group
		}));
}

/** Variables a trigger provides: its declared `variables`, else keys from its `onTest` sample context. */
export function getTriggerVariables(action: Action, trigger: ActionTrigger): HandlerFieldVariable[] {
	const declared = trigger.definition.variables;

	if (declared) {
		const list = typeof declared === 'function' ? declared(trigger) : declared;

		return list.map((variable) => ({
			key: variable.key,
			label: variable.label ?? formatVariableLabel(variable.key),
			description: variable.description,
			group: TRIGGER_VARIABLE_GROUP
		}));
	}

	if (!trigger.definition.onTest) {
		return [];
	}

	const data = trigger.definition.onTest(action, trigger);
	const core = getApp().plugins.tryGet<CorePluginApi>('core');
	const variables = core?.variables.resolveTriggerContext(data) ?? contextToVariables(data);

	return toVariableList(variables, TRIGGER_VARIABLE_GROUP);
}

/** Global variable keys. Reactive inside `$derived`: the core store notifies when keys change. */
export function getGlobalVariables(app: App | PluginAppApi): HandlerFieldVariable[] {
	const core = app.plugins.tryGet<CorePluginApi>('core');

	if (!core) {
		return [];
	}

	return core.variables.listKeys('global').map((key) => ({
		key,
		label: formatVariableLabel(key),
		group: GLOBAL_VARIABLE_GROUP
	}));
}

/** Action-scoped variables set by handlers before `handlerIndex` in the chain. */
export function getPrecedingActionVariables(
	handlers: ActionHandler[],
	handlerIndex: number
): HandlerFieldVariable[] {
	const seen = new Set<string>();
	const variables: HandlerFieldVariable[] = [];

	for (const handler of handlers.slice(0, handlerIndex)) {
		for (const output of getHandlerOutputs(handler)) {
			if (seen.has(output.key)) {
				continue;
			}

			seen.add(output.key);
			variables.push({
				key: output.key,
				label: output.label ?? formatVariableLabel(output.key),
				description: output.description,
				group: ACTION_VARIABLE_GROUP
			});
		}
	}

	return variables;
}

/** Action-scoped variables from handlers that run before `targetId` in the tree. */
export function getPrecedingActionVariablesForHandler(
	rootHandlers: ActionHandler[],
	targetId: string
): HandlerFieldVariable[] {
	return computeVariableScopes(rootHandlers, []).get(targetId) ?? [];
}

export function mergeContextVariables(
	...lists: HandlerFieldVariable[][]
): HandlerFieldVariable[] {
	const seen = new Set<string>();
	const merged: HandlerFieldVariable[] = [];

	for (const list of lists) {
		for (const variable of list) {
			if (seen.has(variable.key)) {
				continue;
			}

			seen.add(variable.key);
			merged.push(variable);
		}
	}

	return merged.sort((left, right) => left.key.localeCompare(right.key));
}
