import type { HandlerDefinition } from '../action/handler/handler-definition.svelte';
import type { HandlerTriggerContext } from '../action/handler-context';
import type { ConfirmOptions } from '../confirm/confirm.svelte';
import type { PluginSettingsContext } from './context';
import type {
	CopyFileOptions,
	CreateOptions,
	DebouncedWatchOptions,
	ExistsOptions,
	FileSystemSaveOptions,
	FileSystemSelectOptions,
	MkdirOptions,
	OpenOptions,
	ReadDirOptions,
	ReadFileOptions,
	RemoveOptions,
	RenameOptions,
	StatOptions,
	TruncateOptions,
	WatchEvent,
	WatchOptions,
	WriteFileOptions
} from '../filesystem/types';
import type { MenuItemLink } from '../menu/types';
import type { Modal } from '../modal/modal.svelte';
import type { ModalProps } from '../modal/modal.svelte';
import type { OAuthStartOptions } from '../oauth/oauth';
import type {
	AuthLoginInput,
	AuthPublicUser,
	AuthRegisterInput
} from '../auth/types';
import type { ToastCreateProps } from '../toast/toast.svelte';
import type { ToastItem } from '../toast/toast-item.svelte';
import type { CommandRecord, NewCommandRecord } from '$lib/types/command-types';
import type { ActionRecord, NewActionRecord } from '../action/stored-action';
import type { PluginMigration } from '$db/plugin-migrations';
import type { DirEntry, FileInfo, UnwatchFn } from '../filesystem/types';
import type { FileHandle } from '../filesystem/file-handle';
import type { UnlistenFn } from '@tauri-apps/api/event';
import type { SettingsFieldValue } from '../settings';
import type { AppLifecycleContext, AppLifecycleEvent } from '../lifecycle/types';
import type { ProcessEventContext } from '../process/types';
import type { RunProgramOptions, RunProgramResult } from '../process/run-program';
import type { LocalTtsRuntimeInfo, LocalTtsVoiceInfo } from '../tts';
import type { TranslationKey } from '$lib/i18n';
import type {
	ActionQueueDefinition,
	ActionQueueEvent,
	ActionQueueEventContext,
	ActionQueueStats
} from '../action-queue/types';
import type { HotkeyEventContext } from '../hotkeys';
import type {
	ToolbarConfig,
	ToolbarAction,
	ToolbarMetaItem,
	ToolbarSelectAll
} from '../toolbar';

/** Opaque Drizzle client returned by {@link PluginAppDbApi.getClient}. */
export type PluginDbClient = unknown;

/**
 * Factory registered by the Commands plugin to activate chat command handling.
 * Called when the commands plugin boots or is enabled.
 */
export type CommandRuntimeFactory = (app: PluginAppApi) => () => void;

/**
 * Global keyboard shortcuts registered through the Tauri global-shortcut plugin.
 */
export interface PluginAppHotkeysApi {
	/** Register a global shortcut listener. Returns an unsubscribe function. */
	register(shortcut: string, handler: (context: HotkeyEventContext) => void): () => void;

	/** Whether the shortcut is registered by this application. */
	isRegistered(shortcut: string): Promise<boolean>;

	/** Invoke listeners registered for this shortcut (same as a physical key press). */
	trigger(shortcut: string): boolean;
}

/**
 * Action queue runtime and control APIs.
 */
export interface PluginAppActionQueuesApi {
	readonly definitions: ActionQueueDefinition[];

	pause(queueId: number): void;

	resume(queueId: number): void;

	stats(queueId: number): ActionQueueStats;

	on(
		event: ActionQueueEvent,
		handler: (context: ActionQueueEventContext) => void
	): () => void;
}

/**
 * Toast notifications shown to the user.
 */
export interface PluginAppToastApi {
	/**
	 * Show a transient toast notification.
	 *
	 * @example
	 * ```ts
	 * app.toast.create({
	 *   title: 'Connected',
	 *   description: 'WebSocket connection established.',
	 *   variant: 'success',
	 *   duration: 5000
	 * });
	 * ```
	 */
	create(props: ToastCreateProps): ToastItem;

	/**
	 * Dismiss a toast by id. Toasts auto-dismiss after their duration unless `duration` is `0`.
	 *
	 * @example
	 * ```ts
	 * const toast = app.toast.create({ title: 'Saving…', duration: 0 });
	 * await save();
	 * app.toast.dismiss(toast.id);
	 * ```
	 */
	dismiss(id: string): void;
}

/**
 * Confirmation dialogs that block until the user responds.
 */
export interface PluginAppConfirmApi {
	/**
	 * Ask the user to confirm or cancel an action.
	 *
	 * @returns `true` when confirmed, `false` when cancelled.
	 *
	 * @example
	 * ```ts
	 * const confirmed = await app.confirm.ask({
	 *   title: 'Delete connection?',
	 *   description: 'This cannot be undone.'
	 * });
	 * if (confirmed) await deleteConnection();
	 * ```
	 */
	ask(options: ConfirmOptions): Promise<boolean>;
}

/**
 * Modal dialogs with custom Svelte content.
 */
export interface PluginAppModalApi {
	/**
	 * Create a modal. Call `open()` on the returned instance to show it.
	 *
	 * Built-in npm plugins can pass Svelte components as `content`.
	 * Zip-installed plugins should use declarative page blocks instead of modals with Svelte content.
	 *
	 * @example
	 * ```ts
	 * const modal = app.modal.create({
	 *   id: 'edit-item',
	 *   title: 'Edit item',
	 *   content: EditItemModal,
	 *   props: { itemId: 'abc' },
	 *   size: 'md' // 'xs' | 'sm' | 'md' | 'lg' | 'full'
	 * });
	 * modal.open();
	 * ```
	 */
	create(props: ModalProps): Modal;

	/** Return an existing modal by id, if one was created earlier. */
	get(id: string): Modal | undefined;
}

/**
 * Access other plugins' public APIs.
 */
export interface PluginAppPluginsApi {
	/**
	 * Get another plugin's public API by key. Throws if the plugin is missing or has no `api`.
	 *
	 * @example
	 * ```ts
	 * const twitch = app.plugins.get<TwitchPluginApi>('twitch');
	 * twitch.sendMessage('Hello chat!');
	 * ```
	 */
	get<TApi>(key: string): TApi;

	/**
	 * Get another plugin's public API, or `undefined` when unavailable.
	 *
	 * @example
	 * ```ts
	 * const obs = app.plugins.tryGet<ObsPluginApi>('obs');
	 * if (obs) await obs.connect();
	 * ```
	 */
	tryGet<TApi>(key: string): TApi | undefined;

	/**
	 * Read a plugin setting from the in-memory settings form (no save required).
	 *
	 * @example
	 * ```ts
	 * const enabled = app.plugins.getSettingValue('core', 'process-watcher') === true;
	 * ```
	 */
	getSettingValue(pluginKey: string, settingKey: string): SettingsFieldValue | undefined;

	/**
	 * Build lifecycle settings context for a plugin (store, getValue, app API).
	 */
	getSettingsContext(pluginKey: string): PluginSettingsContext | undefined;
}

/**
 * Sidebar menu entries registered at runtime.
 */
export interface PluginAppMenuApi {
	/**
	 * Add a sidebar menu item owned by a plugin.
	 *
	 * @example
	 * ```ts
	 * app.menu.add({
	 *   path: '/plugins/my-plugin/dashboard',
	 *   title: 'Dashboard',
	 *   icon: 'ri:dashboard-line'
	 * });
	 * ```
	 */
	add(item: MenuItemLink): MenuItemLink;

	/**
	 * Remove a menu item by path.
	 *
	 * @example
	 * ```ts
	 * app.menu.remove('/plugins/my-plugin/dashboard');
	 * ```
	 */
	remove(path: string): void;
}

/**
 * Filesystem access through the app abstraction. Paths are relative to a {@link BaseDirectory} unless absolute.
 */
export interface PluginAppFsApi {
	/**
	 * Open a native file or folder picker.
	 *
	 * @example
	 * ```ts
	 * const path = await app.fs.select({ type: 'file', filters: [{ name: 'JSON', extensions: ['json'] }] });
	 * ```
	 */
	select(options: FileSystemSelectOptions): Promise<string | null>;

	/**
	 * Open a native save dialog and return the chosen path, or `null` if cancelled.
	 *
	 * @example
	 * ```ts
	 * const path = await app.fs.save({
	 *   defaultPath: 'commands.json',
	 *   filters: [{ name: 'JSON', extensions: ['json'] }]
	 * });
	 * ```
	 */
	save(options?: FileSystemSaveOptions): Promise<string | null>;

	/** Join path segments using the platform separator. */
	join(...paths: string[]): Promise<string>;
	/**
	 * Create a file and return a handle for reading or writing.
	 *
	 * @example
	 * ```ts
	 * const handle = await app.fs.create('data.bin', { baseDir: BaseDirectory.AppData });
	 * await handle.write(new Uint8Array([1, 2, 3]));
	 * await handle.close();
	 * ```
	 */
	create(path: string | URL, options?: CreateOptions): Promise<FileHandle>;

	/**
	 * Open a file handle for reading, writing, or both.
	 *
	 * @example
	 * ```ts
	 * const handle = await app.fs.open('log.txt', {
	 *   baseDir: BaseDirectory.AppData,
	 *   read: true,
	 *   append: true
	 * });
	 * ```
	 */
	open(path: string | URL, options?: OpenOptions): Promise<FileHandle>;

	/**
	 * Copy a file from one path to another.
	 *
	 * @example
	 * ```ts
	 * await app.fs.copyFile('backup.json', 'backup-old.json', {
	 *   fromPathBaseDir: BaseDirectory.AppData,
	 *   toPathBaseDir: BaseDirectory.AppData
	 * });
	 * ```
	 */
	copyFile(fromPath: string | URL, toPath: string | URL, options?: CopyFileOptions): Promise<void>;

	/**
	 * Create a directory.
	 *
	 * @example
	 * ```ts
	 * await app.fs.mkdir('cache', { baseDir: BaseDirectory.AppData, recursive: true });
	 * ```
	 */
	mkdir(path: string | URL, options?: MkdirOptions): Promise<void>;

	/**
	 * Read directory entries.
	 *
	 * @example
	 * ```ts
	 * const entries = await app.fs.readDir('.', { baseDir: BaseDirectory.AppData });
	 * ```
	 */
	readDir(path: string | URL, options?: ReadDirOptions): Promise<DirEntry[]>;

	/** Read a file as bytes. */
	readFile(path: string | URL, options?: ReadFileOptions): Promise<Uint8Array>;

	/**
	 * Read a file as UTF-8 text.
	 *
	 * @example
	 * ```ts
	 * const json = await app.fs.readTextFile('settings.json', { baseDir: BaseDirectory.AppData });
	 * ```
	 */
	readTextFile(path: string | URL, options?: ReadFileOptions): Promise<string>;

	/** Read a file line-by-line. */
	readTextFileLines(
		path: string | URL,
		options?: ReadFileOptions
	): Promise<AsyncIterableIterator<string>>;

	/**
	 * Delete a file or directory.
	 *
	 * @example
	 * ```ts
	 * await app.fs.remove('cache/temp.json', { baseDir: BaseDirectory.AppData });
	 * ```
	 */
	remove(path: string | URL, options?: RemoveOptions): Promise<void>;

	/** Rename or move a file. */
	rename(oldPath: string | URL, newPath: string | URL, options?: RenameOptions): Promise<void>;

	/** Get file metadata. */
	stat(path: string | URL, options?: StatOptions): Promise<FileInfo>;

	/** Get symlink metadata without following links. */
	lstat(path: string | URL, options?: StatOptions): Promise<FileInfo>;

	/** Truncate a file to a length. */
	truncate(path: string | URL, len?: number, options?: TruncateOptions): Promise<void>;

	/** Write bytes to a file. */
	writeFile(
		path: string | URL,
		data: Uint8Array | ReadableStream<Uint8Array>,
		options?: WriteFileOptions
	): Promise<void>;

	/**
	 * Write UTF-8 text to a file.
	 *
	 * @example
	 * ```ts
	 * await app.fs.writeTextFile('settings.json', JSON.stringify(data), {
	 *   baseDir: BaseDirectory.AppData,
	 *   create: true
	 * });
	 * ```
	 */
	writeTextFile(path: string | URL, data: string, options?: WriteFileOptions): Promise<void>;

	/**
	 * Check whether a path exists.
	 *
	 * @example
	 * ```ts
	 * if (await app.fs.exists('settings.json', { baseDir: BaseDirectory.AppData })) { ... }
	 * ```
	 */
	exists(path: string | URL, options?: ExistsOptions): Promise<boolean>;

	/** Watch paths with debounced callbacks. */
	watch(
		paths: string | string[] | URL | URL[],
		callback: (event: WatchEvent) => void,
		options?: DebouncedWatchOptions
	): Promise<UnwatchFn>;

	/** Watch paths with immediate callbacks. */
	watchImmediate(
		paths: string | string[] | URL | URL[],
		callback: (event: WatchEvent) => void,
		options?: WatchOptions
	): Promise<UnwatchFn>;

	/** Return file size in bytes. */
	size(path: string | URL): Promise<number>;
}

/**
 * Application lifecycle events (start/exit).
 */
export interface PluginAppLifecycleApi {
	/** Whether the app has finished booting and emitted the started event. */
	readonly started: boolean;

	/** Subscribe to app-started events. Returns an unsubscribe function. */
	onStarted(handler: (context: AppLifecycleContext) => void): () => void;

	/**
	 * Subscribe to app-exit events. Returns an unsubscribe function.
	 *
	 * The handler may return a promise; the window stays open until all exit
	 * handlers settle, allowing async cleanup (flush stores, disconnect, etc.).
	 */
	onExit(handler: (context: AppLifecycleContext) => void | Promise<void>): () => void;

	/** Build a lifecycle context for the given event. */
	getContext(event: AppLifecycleEvent): AppLifecycleContext;
}

/**
 * OS process lifecycle events (start/stop).
 */
export interface PluginAppProcessApi {
	/** Whether the Rust process watcher is currently polling. */
	readonly running: boolean;

	/**
	 * Start or stop the OS process watcher.
	 *
	 * @example
	 * ```ts
	 * await app.process.sync(getValue('process-watcher') === true);
	 * ```
	 */
	sync(enabled: boolean): Promise<void>;

	/** Subscribe to process-started events. Returns an unsubscribe function. */
	onStarted(handler: (context: ProcessEventContext) => void): () => void;

	/** Subscribe to process-stopped events. Returns an unsubscribe function. */
	onStopped(handler: (context: ProcessEventContext) => void): () => void;

	/**
	 * Run an external program, script, or shell command.
	 *
	 * @example
	 * ```ts
	 * const result = await app.process.run({
	 *   command: 'C:\\Tools\\node.exe',
	 *   workingDirectory: 'C:\\Scripts',
	 *   arguments: 'hello.js {user}',
	 *   waitSeconds: 5
	 * });
	 * ```
	 */
	run(options: RunProgramOptions): Promise<RunProgramResult>;
}

/**
 * Local media file helpers (duration probing, etc.).
 */
export interface PluginAppMediaApi {
	/** Returns the duration of a local video/audio file in milliseconds, or null when unknown. */
	getFileDurationMs(filePath: string): Promise<number | null>;
}

/**
 * Lightweight network reachability checks that avoid noisy browser WebSocket errors.
 */
export interface PluginAppNetworkApi {
	/** Returns whether a TCP port accepts connections on the given host. */
	isTcpPortReachable(host: string, port: number, timeoutMs?: number): Promise<boolean>;
}

/**
 * Audio playback helpers.
 */
export interface PluginAppAudioPlayOptions {
	/** Optional session id used to stop this playback via {@link PluginAppAudioApi.stop}. */
	sessionId?: string;
}

/**
 * Audio playback helpers.
 */
export interface PluginAppAudioApi {
	/**
	 * Play audio from a blob. Volume is clamped between `0` and `2` (`1` = 100%).
	 *
	 * @example
	 * ```ts
	 * const blob = await fetch('/sounds/alert.mp3').then((r) => r.blob());
	 * await app.audio.play(blob, 0.8);
	 * ```
	 */
	play(blob: Blob, volume?: number, options?: PluginAppAudioPlayOptions): Promise<void>;
	/**
	 * Play audio from a file path. The file is read and decoded in the app layer.
	 * Prefer this over `play` for local files to avoid loading large files into memory.
	 */
	playFile(path: string, volume?: number, options?: PluginAppAudioPlayOptions): Promise<void>;
	/** Stop the active playback for the given session id. No-op when nothing is playing. */
	stop(sessionId: string): Promise<void>;
}

/**
 * Authenticated cloud user media (`user_files` in PocketBase).
 */
export interface PluginAppUserFileRecord {
	id: string;
	/** Host-independent /api/files path — use resolveUrl for an absolute URL. */
	url: string;
	size: number;
	mimeType: string;
	originalName: string;
	createdAt: string | null;
}

export interface PluginAppUserFilesQuota {
	usedBytes: number;
	maxStorageBytes: number;
	maxFileBytes: number;
	planKey: string;
	planName: string;
}

export interface PluginAppUserFilesListOptions {
	mimePrefix?: string;
	extensions?: string[];
}

export interface PluginAppUserFilesUploadOptions {
	originalName: string;
}

export interface PluginAppUserFilesApi {
	/** True for relative PocketBase /api/files paths or absolute file URLs. */
	isCloudUrl(value: string | null | undefined): boolean;
	/**
	 * Resolve a stored cloud file ref to an absolute URL on the current PocketBase host.
	 * Appends a cached `?token=` when available (protected `user_files`).
	 */
	resolveUrl(value: string): string;
	/** Absolute protected-file URL with a fresh (or cached) file token. */
	resolveAuthenticatedUrl(value: string): Promise<string>;
	/** List the signed-in user's cloud files (optional mime/extension filters). */
	list(options?: PluginAppUserFilesListOptions): Promise<PluginAppUserFileRecord[]>;
	/** Upload a file/blob; requires auth + entitled subscription within plan limits. */
	upload(
		file: File | Blob,
		options: PluginAppUserFilesUploadOptions
	): Promise<PluginAppUserFileRecord>;
	/** Delete one of the signed-in user's cloud files. */
	remove(id: string): Promise<void>;
	/** Current plan quota usage, or `null` when signed out / no active plan. */
	getQuota(): Promise<PluginAppUserFilesQuota | null>;
	/** Download a private cloud file via a token URL (no Authorization header). */
	fetchBlob(url: string): Promise<Blob>;
	/** Open the app cloud file picker modal; resolves `null` when cancelled. */
	pick(options?: PluginAppUserFilesListOptions): Promise<PluginAppUserFileRecord | null>;
}

/**
 * App-owned bridge to the local (Piper) TTS runtime. Keeps Tauri command
 * invocation in the app layer so plugins stay platform-agnostic.
 */
export interface PluginAppLocalTtsApi {
	/** List all known local voices (installed and downloadable). */
	listVoices(): Promise<LocalTtsVoiceInfo[]>;

	/** Whether the local TTS runtime is installed. */
	getRuntimeInfo(): Promise<LocalTtsRuntimeInfo>;

	/** Download and install the local TTS runtime. */
	downloadRuntime(): Promise<void>;

	/** Download and install a specific voice. */
	downloadVoice(voiceId: string): Promise<void>;

	/** Delete a downloaded voice. */
	deleteVoice(voiceId: string): Promise<void>;

	/** Synthesize speech as WAV bytes for the given voice and text. */
	synthesize(voiceId: string, text: string): Promise<Uint8Array>;
}

/**
 * Translations for plugin UI and runtime messages.
 */
export interface PluginAppI18nApi {
	/** Reactive translation function for Svelte components. */
	t: (key: TranslationKey, params?: Record<string, string | number | null | undefined>) => string;

	/** Non-reactive translation helper for TypeScript modules. */
	translate(
		key: TranslationKey,
		params?: Record<string, string | number | null | undefined>
	): string;
}

/**
 * Plugin database migration registration.
 */
export interface PluginAppDbApi {
	/**
	 * Register SQLite migrations to run on app startup for this plugin key.
	 *
	 * @example
	 * ```ts
	 * app.db.registerMigrations('my-plugin', [
	 *   async (sqlite) => {
	 *     await sqlite.execute('CREATE TABLE IF NOT EXISTS my_plugin_items (id INTEGER PRIMARY KEY)');
	 *   }
	 * ]);
	 * ```
	 */
	registerMigrations(pluginKey: string, migrations: PluginMigration[]): void;

	/**
	 * Return the shared Drizzle database client.
	 * Only use this when the plugin registers its own SQLite tables via {@link registerMigrations}.
	 */
	getClient(): PluginDbClient;
}

/**
 * User-configured action runtime.
 */
export interface PluginAppActionsApi {
	/**
	 * Deactivate and reactivate all enabled actions. Useful after plugin settings change trigger/handler availability.
	 *
	 * @example
	 * ```ts
	 * onSave: async ({ app }) => {
	 *   app.actions.reactivateAll();
	 * }
	 * ```
	 */
	reactivateAll(): void;

	/** Whether any enabled action uses a Process Started or Process Stopped trigger. */
	hasEnabledProcessTrigger(): boolean;

	/**
	 * Run a stored action by database id with trigger context.
	 *
	 * @returns `true` when the action ran successfully.
	 *
	 * @example
	 * ```ts
	 * app.actions.runById(42, { trigger: 'manual', data: {} });
	 * ```
	 */
	runById(id: number, context: HandlerTriggerContext): boolean;

	/** Find a registered action handler definition by id. */
	findHandler(id: string): HandlerDefinition | undefined;

	/** Return all registered action handler definitions. */
	getHandlers(): HandlerDefinition[];

	/**
	 * Create a user-configured action record.
	 *
	 * @example
	 * ```ts
	 * await app.actions.create({
	 *   name: 'Points on follow',
	 *   group: pluginKey,
	 *   enabled: false,
	 *   triggers: [...],
	 *   handlers: [...]
	 * });
	 * ```
	 */
	create(input: NewActionRecord, options?: { ownerPluginKey?: string }): Promise<ActionRecord>;

	/**
	 * Update an existing action by database id.
	 */
	update(
		id: number,
		input: Omit<NewActionRecord, 'id'>,
		options?: { ownerPluginKey?: string }
	): Promise<ActionRecord>;

	/** Delete an action by database id. */
	delete(id: number): Promise<void>;

	/** Delete all actions owned by a plugin. */
	deleteByOwner(ownerPluginKey: string): Promise<number>;

	/** Return all configured actions as records. */
	getSnapshot(): ActionRecord[];
}

/**
 * Inbound WebSocket API server — plugins register methods and emit events for remote clients.
 */
export interface PluginAppApiServerApi {
	/**
	 * Register a request method. When called from a plugin scope, the name is prefixed with
	 * `plugin:<pluginKey>:`.
	 *
	 * @example
	 * ```ts
	 * app.api.registerMethod('getLeaderboard', async () => rankings.getLeaderboard());
	 * // → plugin:rankings:getLeaderboard
	 * ```
	 */
	registerMethod(
		name: string,
		handler: (params: unknown) => unknown | Promise<unknown>
	): void;

	/**
	 * Emit an event to subscribed WebSocket clients. Prefixed with `plugin:<pluginKey>:` in plugin scope.
	 */
	emit(event: string, payload?: unknown): Promise<void>;

	/** Remove all methods registered by the current plugin. */
	unregisterMethods(): void;
}

/**
 * Chat commands plugin integration. Requires the Commands plugin to be enabled.
 */
export interface PluginAppCommandsApi {
	/**
	 * Register a runtime factory with the Commands plugin.
	 *
	 * @example
	 * ```ts
	 * app.commands.registerRuntime((app) => () => {
	 *   // setup listeners; return teardown function
	 *   return () => { /* cleanup *\/ };
	 * });
	 * ```
	 */
	registerRuntime(factory: CommandRuntimeFactory): void;

	/**
	 * Return a snapshot of all configured chat commands.
	 *
	 * @example
	 * ```ts
	 * const commands = app.commands.getSnapshot();
	 * ```
	 */
	getSnapshot(): CommandRecord[];

	/**
	 * Run a chat command by id.
	 *
	 * @returns `true` when the command ran successfully.
	 */
	runById(id: string, context: HandlerTriggerContext): boolean;

	/**
	 * Find a command record by its trigger string (e.g. `!hello`).
	 *
	 * @example
	 * ```ts
	 * const command = app.commands.findByTrigger('!hello');
	 * ```
	 */
	findByTrigger(trigger: string): CommandRecord | undefined;

	/**
	 * Create a chat command record.
	 *
	 * @example
	 * ```ts
	 * await app.commands.create({
	 *   name: 'Ping',
	 *   commandNames: ['ping'],
	 *   handlers: [{ id: crypto.randomUUID(), handlerTypeId: 'core:core:chat:send-message', fields: [] }]
	 * });
	 * ```
	 */
	create(
		input: NewCommandRecord,
		options?: { ownerPluginKey?: string }
	): Promise<CommandRecord>;

	/**
	 * Update an existing chat command by id.
	 */
	update(
		id: string,
		input: Omit<NewCommandRecord, 'id'>,
		options?: { ownerPluginKey?: string }
	): Promise<CommandRecord>;

	/** Delete a chat command by id. Returns `false` when the command does not exist. */
	delete(id: string): Promise<boolean>;

	/** Delete all commands owned by a plugin. Returns the number of deleted commands. */
	deleteByOwner(ownerPluginKey: string): Promise<number>;
}

/**
 * Stream Kit account authentication (PocketBase).
 */
export interface PluginAppAuthApi {
	/** Public profile of the signed-in user, or `null` when logged out. */
	readonly user: AuthPublicUser | null;

	/** Whether a Stream Kit account session is active. */
	readonly isAuthenticated: boolean;

	/**
	 * Sign in with email and password.
	 *
	 * @example
	 * ```ts
	 * await app.auth.login({ email: 'you@example.com', password: 'secret' });
	 * ```
	 */
	login(input: AuthLoginInput): Promise<void>;

	/**
	 * Create a Stream Kit account and sign in.
	 *
	 * @example
	 * ```ts
	 * await app.auth.register({
	 *   email: 'you@example.com',
	 *   password: 'secret',
	 *   passwordConfirm: 'secret',
	 *   name: 'You'
	 * });
	 * ```
	 */
	register(input: AuthRegisterInput): Promise<void>;

	/** Clear the current session. */
	logout(): Promise<void>;

	/**
	 * Subscribe to auth changes. Invoked immediately with the current user.
	 * Returns an unsubscribe function.
	 */
	onChange(handler: (user: AuthPublicUser | null) => void): () => void;
}

/**
 * OAuth redirect flow helpers via the Tauri OAuth plugin.
 */
export interface PluginAppOAuthApi {
	/**
	 * Start a local OAuth redirect server and return the bound port.
	 *
	 * @example
	 * ```ts
	 * const port = await app.oauth.start({ ports: [5173, 5174] });
	 * ```
	 */
	start(options?: OAuthStartOptions): Promise<number>;

	/**
	 * Listen for OAuth redirect URLs. Returns an unlisten function.
	 *
	 * @example
	 * ```ts
	 * const unlisten = await app.oauth.onUrl((url) => {
	 *   console.log('OAuth callback:', url);
	 * });
	 * ```
	 */
	onUrl(callback: (url: string) => void): Promise<UnlistenFn>;

	/**
	 * Listen for invalid OAuth redirect URLs. Returns an unlisten function.
	 */
	onInvalidUrl(callback: (url: string) => void): Promise<UnlistenFn>;
}

/**
 * Toolbar below the app header (meta badges, primary actions, bulk selection).
 */
export interface PluginAppToolbarApi {
	set(config: ToolbarConfig): void;

	reset(): void;
}

export type {
	ToolbarConfig,
	ToolbarAction,
	ToolbarMetaItem,
	ToolbarSelectAll
};

/**
 * Open URLs in the system default browser.
 */
export interface PluginAppOpenerApi {
	/**
	 * Open a URL externally.
	 *
	 * @example
	 * ```ts
	 * await app.opener.openUrl('https://streamkit.dev/docs');
	 * ```
	 */
	openUrl(url: string): Promise<void>;
}

/**
 * Broadcast events to OBS browser-source overlays.
 */
export interface PluginAppOverlayApi {
	/** Current overlay projects (id, name, expected events). */
	readonly items: Array<{
		id: string;
		name: string;
		expectedEvents: string[];
	}>;

	/** Push an event payload to a connected overlay. */
	broadcast(overlayId: string, event: string, payload?: unknown): Promise<void>;
}

/**
 * APIs available to plugin authors via the `app` parameter and lifecycle {@link PluginSettingsContext}.
 */
export interface PluginAppApi {
	/** Show transient notifications to the user. */
	toast: PluginAppToastApi;

	/** Ask the user to confirm destructive actions. */
	confirm: PluginAppConfirmApi;

	/** Create modal dialogs with custom content. */
	modal: PluginAppModalApi;

	/** Access other plugins' public APIs. */
	plugins: PluginAppPluginsApi;

	/** Register sidebar menu items at runtime. */
	menu: PluginAppMenuApi;

	/** Configure the toolbar below the app header. */
	toolbar: PluginAppToolbarApi;

	/** Read and write files through the app filesystem abstraction. */
	fs: PluginAppFsApi;

	/** Play audio blobs. */
	audio: PluginAppAudioApi;

	/** Authenticated cloud user media library (`user_files`). */
	userFiles: PluginAppUserFilesApi;

	/** Probe local media files (for example video duration). */
	media: PluginAppMediaApi;

	/** Lightweight network reachability checks. */
	network: PluginAppNetworkApi;

	/** Bridge to the local (Piper) TTS runtime. */
	localTts: PluginAppLocalTtsApi;

	/** Application start and exit events. */
	lifecycle: PluginAppLifecycleApi;

	/** Watch OS process start/stop events. */
	process: PluginAppProcessApi;

	/** Register global keyboard shortcut listeners. */
	hotkeys: PluginAppHotkeysApi;

	/** Control and observe action queues. */
	actionQueues: PluginAppActionQueuesApi;

	/** Register plugin database migrations. */
	db: PluginAppDbApi;

	/** Translate user-facing strings. */
	i18n: PluginAppI18nApi;

	/** Run and refresh user-configured actions. */
	actions: PluginAppActionsApi;

	/** Integrate with the Commands plugin. */
	commands: PluginAppCommandsApi;

	/** Stream Kit account authentication and public profile. */
	auth: PluginAppAuthApi;

	/** OAuth redirect flow helpers. */
	oauth: PluginAppOAuthApi;

	/** Open URLs in the default browser. */
	opener: PluginAppOpenerApi;

	/** Send events to browser-source overlays. */
	overlay: PluginAppOverlayApi;

	/** Extend the inbound WebSocket API server with plugin methods and events. */
	api: PluginAppApiServerApi;

	/**
	 * Serialize work that touches the same shared resource across concurrent action runs.
	 *
	 * @example
	 * ```ts
	 * await app.withResourceLock('obs:media:alerts', async () => {
	 *   await updateObsMediaSource();
	 * });
	 * ```
	 */
	withResourceLock<T>(key: string, fn: () => Promise<T>): Promise<T>;
}
