import type { CorePluginApi } from '@stream-kit/plugin-handlers';
import type { HandlerFieldVariable } from '@stream-kit/ui/types';

import type { App } from '../app.svelte';
import type { Action } from './action.svelte';
import type { ActionTrigger } from './action-trigger.svelte';

type ProcessEventContext = {
	executable?: string;
	fullPath?: string;
	name?: string;
	parentProcessId?: number;
	path?: string;
	processId?: number;
};

export function contextToVariables(context: unknown): Record<string, string> {
	const variables: Record<string, string> = {};

	if (context && typeof context === 'object') {
		for (const [key, value] of Object.entries(context as Record<string, unknown>)) {
			if (typeof value === 'string') {
				variables[key] = value;
				continue;
			}

			if (typeof value === 'number' || typeof value === 'boolean') {
				variables[key] = String(value);
			}
		}
	}

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

function toVariableList(variables: Record<string, string>): HandlerFieldVariable[] {
	return Object.keys(variables)
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

	return toVariableList(contextToVariables(data));
}

export function getGlobalVariables(app: App): HandlerFieldVariable[] {
	const core = app.plugins.tryGet<CorePluginApi>('core');

	if (!core) {
		return [];
	}

	return core.variables.listKeys('global').map((key) => ({
		key,
		label: formatVariableLabel(key)
	}));
}
