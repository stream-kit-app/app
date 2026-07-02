import { contextToVariables as contextToVariablesCore } from '@stream-kit/core';
import type { CorePluginApi, PluginAppApi } from '@stream-kit/plugin';
import type { HandlerFieldVariable } from '@stream-kit/ui/types';

import type { App } from '../app.svelte';
import { getApp } from '../registry';
import type { ActionHandler } from './action-handler.svelte';
import type { Action } from './action.svelte';
import type { ActionTrigger } from './action-trigger.svelte';
import { getHandlerFieldValue } from './handler-field';

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

function formatVariableLabel(key: string): string {
	return key
		.replace(/([a-z])([A-Z])/g, '$1 $2')
		.replace(/[_-]/g, ' ')
		.replace(/\b\w/g, (char) => char.toUpperCase());
}

/** Runtime aliases hidden from variable pickers when the canonical key is present. */
const VARIABLE_UI_ALIASES: Record<string, string> = {
	user: 'username'
};

function toVariableList(variables: Record<string, string>): HandlerFieldVariable[] {
	return Object.keys(variables)
		.filter((key) => {
			const canonical = VARIABLE_UI_ALIASES[key];

			return !canonical || !(canonical in variables);
		})
		.sort((left, right) => left.localeCompare(right))
		.map((key) => ({
			key,
			label: formatVariableLabel(key)
		}));
}

export function getTriggerVariables(action: Action, trigger: ActionTrigger): HandlerFieldVariable[] {
	if (!trigger.definition.onTest) {
		return [];
	}

	const data = trigger.definition.onTest(action, trigger);
	const core = getApp().plugins.tryGet<CorePluginApi>('core');
	const variables = core?.variables.resolveTriggerContext(data) ?? contextToVariables(data);

	return toVariableList(variables);
}

export function getGlobalVariables(app: App | PluginAppApi): HandlerFieldVariable[] {
	const core = app.plugins.tryGet<CorePluginApi>('core');

	if (!core) {
		return [];
	}

	return core.variables.listKeys('global').map((key) => ({
		key,
		label: formatVariableLabel(key)
	}));
}

/** Action-scoped variables set by handlers before `handlerIndex` in the chain. */
export function getPrecedingActionVariables(
	handlers: ActionHandler[],
	handlerIndex: number
): HandlerFieldVariable[] {
	return collectActionVariablesFromHandlers(handlers.slice(0, handlerIndex));
}

/** Action-scoped variables from handlers that run before `targetId` in the tree. */
export function getPrecedingActionVariablesForHandler(
	rootHandlers: ActionHandler[],
	targetId: string
): HandlerFieldVariable[] {
	return collectActionVariablesFromHandlers(findPrecedingHandlers(rootHandlers, targetId) ?? []);
}

function findPrecedingHandlers(
	handlers: ActionHandler[],
	targetId: string,
	prefix: ActionHandler[] = []
): ActionHandler[] | null {
	for (let index = 0; index < handlers.length; index += 1) {
		const handler = handlers[index]!;

		if (handler.id === targetId) {
			return [...prefix, ...handlers.slice(0, index)];
		}

		const parentPrefix = [...prefix, ...handlers.slice(0, index)];
		const inThen = findPrecedingHandlers(handler.thenHandlers, targetId, parentPrefix);

		if (inThen !== null) {
			return inThen;
		}

		const inElse = findPrecedingHandlers(handler.elseHandlers, targetId, parentPrefix);

		if (inElse !== null) {
			return inElse;
		}
	}

	return null;
}

function collectActionVariablesFromHandlers(handlers: ActionHandler[]): HandlerFieldVariable[] {
	const variables: HandlerFieldVariable[] = [];
	const seen = new Set<string>();

	for (const handler of handlers) {
		const targetName = getHandlerFieldValue(handler.fields, 'target-name');

		if (typeof targetName === 'string') {
			const key = targetName.trim();

			if (key && !seen.has(key)) {
				seen.add(key);
				variables.push({ key, label: formatVariableLabel(key) });
			}
		}

		const scope = getHandlerFieldValue(handler.fields, 'scope');
		const variableName = getHandlerFieldValue(handler.fields, 'variable-name');

		if (scope === 'action' && typeof variableName === 'string') {
			const key = variableName.trim();

			if (key && !seen.has(key)) {
				seen.add(key);
				variables.push({ key, label: formatVariableLabel(key) });
			}
		}
	}

	return variables;
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
