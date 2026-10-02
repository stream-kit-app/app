import { extractCommandArgNames } from '@stream-kit/core';
import type { PluginAppApi } from '@stream-kit/plugin';
import { getGlobalVariables, mergeContextVariables } from '@stream-kit/plugin/action';
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

const COMMAND_VARIABLE_GROUP = 'Command';

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
			variables.push({ key: name, label: formatVariableLabel(name), group: COMMAND_VARIABLE_GROUP });
		}
	}

	return variables;
}

export function getCommandContextVariables(commandNames: string[]): HandlerFieldVariable[] {
	return [
		...COMMAND_CONTEXT_FIELDS.map((key) => ({
			key,
			label: formatVariableLabel(key),
			group: COMMAND_VARIABLE_GROUP
		})),
		...getCommandArgVariables(commandNames)
	];
}

/** Global and command context variables; the handler editor adds handler outputs per handler. */
export function getCommandBaseVariables(
	app: PluginAppApi,
	commandNames: string[]
): HandlerFieldVariable[] {
	return mergeContextVariables(getGlobalVariables(app), getCommandContextVariables(commandNames));
}
