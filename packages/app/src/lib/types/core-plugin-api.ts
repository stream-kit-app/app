import type { HandlerTriggerContext } from '$lib/core/action/handler-context';

export type ActionLogLevel = 'info' | 'warn' | 'error' | 'debug';

export type ActionLogEntry = {
	id: string;
	timestamp: number;
	level: ActionLogLevel;
	message: string;
	actionId?: number;
	actionName?: string;
	trigger?: string;
};

export type ActionLogAppendInput = {
	level?: ActionLogLevel;
	message: string;
	actionId?: number;
	actionName?: string;
	trigger?: string;
};

export type VariableScope = 'global' | 'user' | 'action';

export type MapLifetime = 'session' | 'persistent';

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

export type MapEntry = {
	key: string;
	value: string;
};

export type CorePluginMapsApi = {
	get(mapName: string, key: string): string | undefined;
	has(mapName: string, key: string): boolean;
	getLifetime(mapName: string): MapLifetime | undefined;
	listMapNames(): string[];
	listEntries(mapName: string): MapEntry[];
};

export type CorePluginApi = {
	variables: CorePluginVariablesApi;
	logs: CorePluginLogsApi;
	maps: CorePluginMapsApi;
	registerContextVariableEnricher: (
		enricher: (data: unknown) => Record<string, string>
	) => () => void;
};
