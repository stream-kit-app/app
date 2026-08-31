/// <reference path="./trigger-data.d.ts" />
/// <reference path="./plugin-app-api.d.ts" />

/** First-party plugin public APIs for `app.plugins.get` / `tryGet` in Run script. */

/** Stubs for external clients / services not available in the script editor. */
type ApiClient = unknown;
type ChatClient = unknown;
type EventSubWsListener = unknown;
type OBSWebSocket = unknown;
type QuotesService = unknown;
type RankingsService = unknown;
type SelectItem = { value: string; label: string; disabled?: boolean };
type StreamDeckService = unknown;
type TokenInfo = unknown;
type YouTubeApiClient = unknown;

type CorePluginApi = {
	variables: CorePluginVariablesApi;

	logs: CorePluginLogsApi;

	collections: CorePluginCollectionsApi;

	registerContextVariableEnricher: (
		enricher: (data: unknown) => Record<string, string>
	) => () => void;
};

type CorePluginVariablesApi = {
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

type CorePluginLogsApi = {
	append(input: ActionLogAppendInput): Promise<ActionLogEntry>;

	getEntries(): ActionLogEntry[];

	clear(): Promise<void>;

	subscribe(listener: () => void): () => void;

	readonly revision: number;
};

type CorePluginCollectionsApi = {
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

type VariableScope = 'global' | 'user' | 'action';

type ActionLogAppendInput = {
	level?: ActionLogLevel;

	message: string;

	actionId?: number;

	actionName?: string;

	trigger?: string;
};

type ActionLogEntry = {
	id: string;

	timestamp: number;

	level: ActionLogLevel;

	message: string;

	actionId?: number;

	actionName?: string;

	trigger?: string;
};

type CollectionLifetime = 'session' | 'persistent';

type CollectionSummary = {
	collectionName: string;

	lifetime: CollectionLifetime;
};

type CollectionEntry = {
	key: string;

	value: string;
};

type CollectionCreateResult = | { ok: true }
	| { ok: false; reason: 'already-exists' | 'invalid-name' };

type CollectionMutationResult = | { ok: true }
	| { ok: false; reason: 'collection-not-found' | 'key-not-found' | 'invalid-input' };

type CollectionCreatedContext = {
	collectionName: string;

	lifetime: CollectionLifetime;
};

type CollectionChangedContext = {
	collectionName: string;

	lifetime: CollectionLifetime;

	key: string;

	value: string;

	previousValue?: string;

	changeType: 'set' | 'update' | 'delete' | 'clear';
};

type CollectionDeletedContext = {
	collectionName: string;

	lifetime: CollectionLifetime;
};

type ActionLogLevel = 'info' | 'warn' | 'error' | 'debug';

type DiscordPluginApi = {
	readonly isConnected: boolean;
	readonly isConnecting: boolean;
	readonly isInviting: boolean;
	readonly connectionError: string | undefined;
	readonly botUser: DiscordUser | undefined;
	readonly guildCount: number;
	connect(): Promise<void>;
	disconnect(): Promise<void>;
	startInviteOAuth(): Promise<void>;
	subscribe(listener: DiscordStateListener): () => void;
	sendMessage(channelId: string, content: string): Promise<boolean>;
	addRole(guildId: string, userId: string, roleId: string): Promise<boolean>;
	removeRole(guildId: string, userId: string, roleId: string): Promise<boolean>;
	getGuildItems(): SelectItem[];
	getChannelItems(guildId?: string): SelectItem[];
	getRoleItems(guildId?: string): SelectItem[];
};

type DiscordUser = {
	id: string;
	username: string;
	global_name?: string | null;
	discriminator?: string;
	bot?: boolean;
};

type DiscordStateListener = () => void;

type ObsPluginApi = {
	readonly isConnected: boolean;
	readonly isConnecting: boolean;
	readonly isWaitingForConnection: boolean;
	readonly connectionError: string | undefined;
	readonly obsVersion: string | undefined;
	readonly client: OBSWebSocket | undefined;
	connect(): Promise<void>;
	disconnect(): Promise<void>;
	testConnection(): Promise<boolean>;
	subscribe(listener: ObsStateListener): () => void;
};

type ObsStateListener = () => void;

type QuotesPluginApi = {
	readonly quotes: QuotesService;
};

type RankingsPluginApi = {
	readonly rankings: RankingsService;
};

type StreamDeckPluginApi = {
	streamDeck: StreamDeckService;
};

type TwitchPluginApi = {
	readonly isConnected: boolean;
	readonly isAuthenticating: boolean;
	readonly accessToken: string | undefined;
	readonly token: ValidatedTokenInfo | undefined;
	readonly userId: string | undefined;
	readonly client: ApiClient | undefined;
	readonly chat: ChatClient | undefined;
	readonly eventSub: EventSubWsListener | undefined;
	readonly botAccount: TwitchBotAccountApi;
	startOAuth(): Promise<void>;
	disconnect(): Promise<void>;
	sendChatMessageAsBot(broadcasterId: string, message: string): Promise<void>;
	subscribe(listener: TwitchStateListener): () => void;
	subscribeChatMessages: (
		filter: (context: ChatMessageContext) => boolean,
		handler: (context: ChatMessageContext) => void
	) => () => void;
};

type ValidatedTokenInfo = TokenInfo & { userId: string };

type TwitchBotAccountApi = {

	readonly isConnected: boolean;

	readonly isAuthenticating: boolean;

	readonly userId: string | undefined;

	readonly userName: string | undefined;

	startOAuth(): Promise<void>;

	disconnect(): Promise<void>;

	subscribe(listener: BotAccountStateListener): () => void;

};

type TwitchStateListener = () => void;

type BotAccountStateListener = () => void;

type WebSocketPluginApi = {
	getConnections(): WsConnection[];
	getConnectionStatus(id: string): ConnectionStatus;
	getConnectionError(id: string): string | undefined;
	getConnectionAttempts(id: string): number;
	getReconnectSettings(id: string): WsReconnectSettings;
	getMaxConnectRetries(id: string): number;
	connect(id: string): Promise<void>;
	disconnect(id: string): Promise<void>;
	send(id: string, message: string): Promise<void>;
	ensureConnected(id: string): Promise<void>;
	addTriggerRef(id: string): void;
	removeTriggerRef(id: string): void;
	subscribe(listener: StateListener): () => void;
	getLogs(id: string): WsConnectionLogEntry[];
	clearLogs(id: string): void;
	subscribeLogs(listener: StateListener): () => void;
	connectAutoConnect(): Promise<void>;
};

type WsConnection = {
	id: string;
	name: string;
	url: string;
	autoConnect: boolean;
	maxConnectRetries?: number;
	reconnectDelaySec?: number;
};

type ConnectionStatus = 'connected' | 'connecting' | 'disconnected' | 'error';

type WsReconnectSettings = {
	maxConnectRetries: number;
	reconnectDelaySec: number;
};

type StateListener = () => void;

type WsConnectionLogEntry = {
	id: string;
	connectionId: string;
	direction: WsLogDirection;
	message: string;
	timestamp: number;
};

type WsLogDirection = 'in' | 'out' | 'system';

type YouTubePluginApi = {
	readonly isConnected: boolean;
	readonly isAuthenticating: boolean;
	readonly accessToken: string | undefined;
	readonly channelId: string | undefined;
	readonly channelTitle: string | undefined;
	readonly liveChatId: string | undefined;
	readonly liveStream: YouTubeLiveStreamInfo | undefined;
	readonly isLive: boolean;
	readonly client: YouTubeApiClient | undefined;
	startOAuth(): Promise<void>;
	disconnect(): Promise<void>;
	subscribe(listener: YouTubeStateListener): () => void;
	subscribeChatMessages(
		filter: (context: ChatMessageContext) => boolean,
		handler: (context: ChatMessageContext) => void
	): () => void;
	sendMessage(text: string): Promise<boolean>;
	deleteMessage(messageId: string): Promise<boolean>;
	banUser(userId: string, durationSec?: number): Promise<boolean>;
};

type YouTubeStateListener = () => void;
