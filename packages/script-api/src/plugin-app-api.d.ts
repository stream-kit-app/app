/// <reference path="./trigger-data.d.ts" />
/// <reference path="./index.d.ts" />

declare const BaseDirectory: {
	readonly Audio: 1;
	readonly Cache: 2;
	readonly Config: 3;
	readonly Data: 4;
	readonly LocalData: 5;
	readonly Document: 6;
	readonly Download: 7;
	readonly Picture: 8;
	readonly Public: 9;
	readonly Video: 10;
	readonly Resource: 11;
	readonly Temp: 12;
	readonly AppConfig: 13;
	readonly AppData: 14;
	readonly AppLocalData: 15;
	readonly AppCache: 16;
	readonly AppLog: 17;
	readonly Desktop: 18;
	readonly Executable: 19;
	readonly Font: 20;
	readonly Home: 21;
	readonly Runtime: 22;
	readonly Template: 23;
};
type BaseDirectory = (typeof BaseDirectory)[keyof typeof BaseDirectory];

declare const SeekMode: { readonly Start: 0; readonly Current: 1; readonly End: 2 };
type SeekMode = (typeof SeekMode)[keyof typeof SeekMode];

type UnlistenFn = () => void;
type UnwatchFn = () => void;
type TranslationKey = string;
type HandlerDefinition = unknown;
type PluginSettingsContext = unknown;
type PluginMigration = unknown;
type SettingsFieldValue = string | number | boolean;
type ConfirmOptions = { title?: string; description?: string; confirmLabel?: string; cancelLabel?: string; variant?: string };
type FileSystemFilter = { name: string; extensions: string[] };
type FileSystemSelectOptions = { type: 'file' | 'folder'; filters?: FileSystemFilter[] };
type CreateOptions = { baseDir?: BaseDirectory };
type OpenOptions = { read?: boolean; write?: boolean; append?: boolean; truncate?: boolean; create?: boolean; createNew?: boolean; mode?: number; baseDir?: BaseDirectory };
type CopyFileOptions = { fromPathBaseDir?: BaseDirectory; toPathBaseDir?: BaseDirectory };
type MkdirOptions = { mode?: number; recursive?: boolean; baseDir?: BaseDirectory };
type ReadDirOptions = { baseDir?: BaseDirectory };
type ReadFileOptions = { baseDir?: BaseDirectory; encoding?: string };
type RemoveOptions = { recursive?: boolean; baseDir?: BaseDirectory };
type RenameOptions = { oldPathBaseDir?: BaseDirectory; newPathBaseDir?: BaseDirectory };
type StatOptions = { baseDir?: BaseDirectory };
type TruncateOptions = { baseDir?: BaseDirectory };
type WriteFileOptions = { append?: boolean; create?: boolean; createNew?: boolean; mode?: number; baseDir?: BaseDirectory };
type WatchOptions = { recursive?: boolean; baseDir?: BaseDirectory };
type DebouncedWatchOptions = WatchOptions & { delayMs?: number };
type ExistsOptions = { baseDir?: BaseDirectory };
type WatchEventKindAccess = { kind: 'any' } | { kind: 'close'; mode: 'any' | 'execute' | 'read' | 'write' | 'other' } | { kind: 'open'; mode: 'any' | 'execute' | 'read' | 'write' | 'other' } | { kind: 'other' };
type WatchEventKindCreate = { kind: 'any' } | { kind: 'file' } | { kind: 'folder' } | { kind: 'other' };
type WatchEventKindModify = { kind: 'any' } | { kind: 'data'; mode: 'any' | 'size' | 'content' | 'other' } | { kind: 'metadata'; mode: 'any' | 'access-time' | 'write-time' | 'permissions' | 'ownership' | 'extended' | 'other' } | { kind: 'rename'; mode: 'any' | 'to' | 'from' | 'both' | 'other' } | { kind: 'other' };
type WatchEventKindRemove = { kind: 'any' } | { kind: 'file' } | { kind: 'folder' } | { kind: 'other' };
type WatchEventKind = 'any' | { access: WatchEventKindAccess } | { create: WatchEventKindCreate } | { modify: WatchEventKindModify } | { remove: WatchEventKindRemove } | 'other';
type WatchEvent = { type: WatchEventKind; paths: string[]; attrs: unknown };
type DirEntry = { name: string; isDirectory: boolean; isFile: boolean; isSymlink: boolean };
type FileInfo = { isFile: boolean; isDirectory: boolean; isSymlink: boolean; size: number; mtime: Date | null; atime: Date | null; birthtime: Date | null; readonly: boolean; fileAttributes: number | null; dev: number | null; ino: number | null; mode: number | null; nlink: number | null; uid: number | null; gid: number | null; rdev: number | null; blksize: number | null; blocks: number | null };
type FileHandle = { read(buffer: Uint8Array): Promise<number | null>; seek(offset: number, whence: SeekMode): Promise<number>; stat(): Promise<FileInfo>; truncate(len?: number): Promise<void>; write(data: Uint8Array): Promise<number>; close(): Promise<void> };
type MenuItemChild = { path: string; title?: TranslationKey | string; isDisabled?: boolean | (() => boolean); onClick?: () => void };
type MenuItem = { path: string; title?: TranslationKey | string; icon: string; children?: MenuItemChild[]; isGroupOnly?: boolean; isDisabled?: boolean | (() => boolean); onClick?: () => void; fromPlugin?: boolean };
type Modal = { id: string; title: string; size: "sm" | "md" | "lg" | "full"; description?: string; content: unknown; props: Record<string, unknown>; contentHost: "app" | "plugin"; onClose?: () => void; isOpen: boolean; open(): void; close(): void };
type ModalProps = { id: string; title: string; description?: string; size?: "sm" | "md" | "lg" | "full"; content: unknown; props?: Record<string, unknown>; contentHost?: "app" | "plugin"; onClose?: () => void };
type OAuthStartOptions = { ports?: number[]; response?: unknown };
type ToastVariant = 'default' | 'success' | 'error' | 'warning';
type ToastCreateProps = { id?: string; title: string; description?: string; variant?: ToastVariant; duration?: number; content?: unknown; props?: Record<string, unknown> };
type ToastItem = { id: string; title: string; description?: string; variant: ToastVariant; duration?: number };
type CommandRecord = { id: string; name: string; group: string; groupSortOrder: number; sortOrder: number; commandNames: string[]; handlers: unknown[]; sources: unknown[]; permissions: unknown; cooldownGlobalMs: number | null; cooldownUserMs: number | null; enabled: boolean };
type RunProgramOptions = { command: string; workingDirectory?: string; arguments?: string; waitSeconds?: number; environment?: Record<string, string>; hideWindow?: boolean; useShell?: boolean };
type RunProgramResult = { exitCode: number | null; stdout: string; stderr: string; outputLines: string[] };
type LocalTtsRuntimeInfo = { installed: boolean };
type LocalTtsVoiceInfo = { id: string; name: string; language: string; quality: string; installed: boolean };
type ActionQueueDefinition = { id: number; name: string; concurrency: number; maxLength: number | null; sortOrder: number };
type ActionQueueEvent = 'paused' | 'resumed' | 'idle' | 'job_enqueued' | 'job_started' | 'job_completed';
type ActionQueueJobContext = { jobId: string; actionId: number | null; actionName: string };
type ActionQueueEventContext = { queueId: number; queueName: string; pending: number; active: number; paused: boolean; job?: ActionQueueJobContext };
type QueuedActionEntry = { jobId: string; actionId: number | null; actionName: string };
type ActionQueueStats = { pending: number; active: number; paused: boolean; pendingActions: QueuedActionEntry[]; activeActions: QueuedActionEntry[] };
type HotkeyEventContext = { shortcut: string; modifiers: string[]; key: string };

/** Opaque Drizzle client returned by {@link PluginAppDbApi.getClient}. */
type PluginDbClient = unknown;

/**
 * Factory registered by the Commands plugin to activate chat command handling.
 * Called when the commands plugin boots or is enabled.
 */
type CommandRuntimeFactory = (app: PluginAppApi) => () => void;

/**
 * Global keyboard shortcuts registered through the Tauri global-shortcut plugin.
 */
interface PluginAppHotkeysApi {
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
interface PluginAppActionQueuesApi {
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
interface PluginAppToastApi {
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
interface PluginAppConfirmApi {
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
interface PluginAppModalApi {
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
	 *   props: { itemId: 'abc' }
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
interface PluginAppPluginsApi {
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
interface PluginAppMenuApi {
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
	add(item: MenuItem): MenuItem;

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
interface PluginAppFsApi {
	/**
	 * Open a native file or folder picker.
	 *
	 * @example
	 * ```ts
	 * const path = await app.fs.select({ type: 'file', filters: [{ name: 'JSON', extensions: ['json'] }] });
	 * ```
	 */
	select(options: FileSystemSelectOptions): Promise<string | null>;

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
interface PluginAppLifecycleApi {
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
interface PluginAppProcessApi {
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
interface PluginAppMediaApi {
	/** Returns the duration of a local video/audio file in milliseconds, or null when unknown. */
	getFileDurationMs(filePath: string): Promise<number | null>;
}

/**
 * Lightweight network reachability checks that avoid noisy browser WebSocket errors.
 */
interface PluginAppNetworkApi {
	/** Returns whether a TCP port accepts connections on the given host. */
	isTcpPortReachable(host: string, port: number, timeoutMs?: number): Promise<boolean>;
}

/**
 * Audio playback helpers.
 */
interface PluginAppAudioApi {
	/**
	 * Play audio from a blob. Volume is clamped between `0` and `2` (`1` = 100%).
	 *
	 * @example
	 * ```ts
	 * const blob = await fetch('/sounds/alert.mp3').then((r) => r.blob());
	 * await app.audio.play(blob, 0.8);
	 * ```
	 */
	play(blob: Blob, volume?: number): Promise<void>;
	/**
	 * Play audio from a file path. The file is read and decoded in the app layer.
	 * Prefer this over `play` for local files to avoid loading large files into memory.
	 */
	playFile(path: string, volume?: number): Promise<void>;
}

/**
 * App-owned bridge to the local (Piper) TTS runtime. Keeps Tauri command
 * invocation in the app layer so plugins stay platform-agnostic.
 */
interface PluginAppLocalTtsApi {
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
interface PluginAppI18nApi {
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
interface PluginAppDbApi {
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
interface PluginAppActionsApi {
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
}

/**
 * Chat commands plugin integration. Requires the Commands plugin to be enabled.
 */
interface PluginAppCommandsApi {
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
}

/**
 * OAuth redirect flow helpers via the Tauri OAuth plugin.
 */
interface PluginAppOAuthApi {
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
interface PluginAppToolbarApi {
	set(config: ToolbarConfig): void;

	reset(): void;
}

type {
	ToolbarConfig,
	ToolbarAction,
	ToolbarMetaItem,
	ToolbarSelectAll
};

/**
 * Open URLs in the system default browser.
 */
interface PluginAppOpenerApi {
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
 * APIs available to plugin authors via the `app` parameter and lifecycle {@link PluginSettingsContext}.
 */
interface PluginAppApi {
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

	/** OAuth redirect flow helpers. */
	oauth: PluginAppOAuthApi;

	/** Open URLs in the default browser. */
	opener: PluginAppOpenerApi;

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
