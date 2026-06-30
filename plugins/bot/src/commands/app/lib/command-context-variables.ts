import { extractCommandArgNames } from '@stream-kit/core';
import type { ActionHandler, PluginAppApi } from '@stream-kit/plugin';
import {
	getGlobalVariables,
	getPrecedingActionVariablesForHandler,
	mergeContextVariables
} from '@stream-kit/plugin/action';
import type { HandlerFieldVariable } from '@stream-kit/ui/types';

const COMMAND_CONTEXT_FIELDS = [
	'user',
	'userId',
	'message',
	'role',
	'command',
	'source',
	'channel',
	'channelId',
	'broadcasterId',
	'liveChatId',
	'messageId'
] as const;

function formatVariableLabel(key: string): string {
	return key
		.replace(/([a-z])([A-Z])/g, '$1 $2')
		.replace(/[_-]/g, ' ')
		.replace(/\b\w/g, (char) => char.toUpperCase());
}

function getCommandArgVariables(commandNames: string[]): HandlerFieldVariable[] {
	const seen = new Set<string>();
	const variables: HandlerFieldVariable[] = [];

	for (const pattern of commandNames) {
		for (const name of extractCommandArgNames(pattern)) {
			if (seen.has(name)) {
				continue;
			}

			seen.add(name);
			variables.push({ key: name, label: formatVariableLabel(name) });
		}
	}

	return variables;
}

export function getCommandContextVariables(commandNames: string[]): HandlerFieldVariable[] {
	return [
		...COMMAND_CONTEXT_FIELDS.map((key) => ({
			key,
			label: formatVariableLabel(key)
		})),
		...getCommandArgVariables(commandNames)
	];
}

export function contextVariablesForCommandHandler(
	app: PluginAppApi,
	handlers: ActionHandler[],
	handler: ActionHandler,
	commandNames: string[]
): HandlerFieldVariable[] {
	return mergeContextVariables(
		getGlobalVariables(app),
		getCommandContextVariables(commandNames),
		getPrecedingActionVariablesForHandler(handlers, handler.id)
	);
}
