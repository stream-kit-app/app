import type { HandlerTriggerContext } from '@stream-kit/app/api';

import type { ActionLogAppendInput, ActionLogEntry } from './logs/types';
import type { VariableScope } from './variables/types';

export type CorePluginVariablesApi = {
	resolve(context: HandlerTriggerContext): Record<string, string>;
	get(scope: VariableScope, key: string, context: HandlerTriggerContext): string | undefined;
	set(
		scope: VariableScope,
		key: string,
		value: string,
		context: HandlerTriggerContext
	): Promise<{ ok: true } | { ok: false; reason: 'missing-user' }>;
	listKeys(scope: VariableScope, context?: HandlerTriggerContext): string[];
};

export type CorePluginLogsApi = {
	append(input: ActionLogAppendInput): Promise<ActionLogEntry>;
	getEntries(): ActionLogEntry[];
	clear(): Promise<void>;
	subscribe(listener: () => void): () => void;
	readonly revision: number;
};

export type CorePluginApi = {
	variables: CorePluginVariablesApi;
	logs: CorePluginLogsApi;
};

export type { ActionLogAppendInput, ActionLogEntry, ActionLogLevel } from './logs/types';
export type { VariableScope } from './variables/types';
