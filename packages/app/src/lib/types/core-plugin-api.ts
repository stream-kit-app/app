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

export type CollectionLifetime = 'session' | 'persistent';

export type CorePluginVariablesApi = {
	resolve(context: HandlerTriggerContext): Record<string, string>;

	/** Trigger payload only (includes plugin context enrichers, excludes global/user/action vars). */
	resolveTriggerContext(data: unknown): Record<string, string>;

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

export type CollectionEntry = {
	key: string;

	value: string;
};

export type CollectionSummary = {
	collectionName: string;

	lifetime: CollectionLifetime;
};

export type CollectionCreateResult =
	| { ok: true }
	| { ok: false; reason: 'already-exists' | 'invalid-name' };

export type CollectionMutationResult =
	| { ok: true }
	| { ok: false; reason: 'collection-not-found' | 'key-not-found' | 'invalid-input' };

export type CollectionCreatedContext = {
	collectionName: string;

	lifetime: CollectionLifetime;
};

export type CollectionChangedContext = {
	collectionName: string;

	lifetime: CollectionLifetime;

	key: string;

	value: string;

	previousValue?: string;

	changeType: 'set' | 'update' | 'delete' | 'clear';
};

export type CollectionDeletedContext = {
	collectionName: string;

	lifetime: CollectionLifetime;
};

export type CollectionStoreEvent = 'created' | 'changed' | 'deleted';

export type CorePluginCollectionsApi = {
	get(collectionName: string, key: string): string | undefined;

	has(collectionName: string, key: string): boolean;

	getLifetime(collectionName: string): CollectionLifetime | undefined;

	listCollectionNames(): string[];

	listCollections(): CollectionSummary[];

	listEntries(collectionName: string): CollectionEntry[];

	collectionExists(collectionName: string): boolean;

	create(
		collectionName: string,

		lifetime: CollectionLifetime
	): Promise<CollectionCreateResult>;

	set(collectionName: string, key: string, value: string): Promise<CollectionMutationResult>;

	update(collectionName: string, key: string, value: string): Promise<CollectionMutationResult>;

	deleteKey(collectionName: string, key: string): Promise<CollectionMutationResult>;

	clear(collectionName: string): Promise<CollectionMutationResult>;

	delete(collectionName: string): Promise<CollectionMutationResult>;

	subscribe(
		event: 'created',

		listener: (context: CollectionCreatedContext) => void
	): () => void;

	subscribe(
		event: 'changed',

		listener: (context: CollectionChangedContext) => void
	): () => void;

	subscribe(
		event: 'deleted',

		listener: (context: CollectionDeletedContext) => void
	): () => void;
};

export type CorePluginApi = {
	variables: CorePluginVariablesApi;

	logs: CorePluginLogsApi;

	collections: CorePluginCollectionsApi;

	registerContextVariableEnricher: (
		enricher: (data: unknown) => Record<string, string>
	) => () => void;
};
