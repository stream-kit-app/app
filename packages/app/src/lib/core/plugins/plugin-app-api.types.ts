import type { HandlerTriggerContext } from '../action/handler-context';
import type { ConfirmOptions } from '../confirm/confirm.svelte';
import type {
	CopyFileOptions,
	CreateOptions,
	DebouncedWatchOptions,
	ExistsOptions,
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
import type { MenuItem } from '../menu/types';
import type { Modal } from '../modal/modal.svelte';
import type { ModalProps } from '../modal/modal.svelte';
import type { OAuthStartOptions } from '../oauth/oauth';
import type { ToastCreateProps } from '../toast/toast.svelte';
import type { ToastItem } from '../toast/toast-item.svelte';
import type { CommandRecord } from '$lib/types/command-types';
import type { PluginMigration } from '$db/plugin-migrations';
import type { DirEntry, FileHandle, FileInfo, UnwatchFn } from '@tauri-apps/plugin-fs';
import type { UnlistenFn } from '@tauri-apps/api/event';

/**
 * Factory registered by the Commands plugin to activate chat command handling.
 * Called when the commands plugin boots or is enabled.
 */
export type CommandRuntimeFactory = (app: PluginAppApi) => () => void;

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
	 *   props: { itemId: 'abc' }
	 * });
	 * modal.open();
	 * ```
	 */
	create(props: ModalProps): Modal;
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
 * Filesystem access via Tauri. Paths and options follow `@tauri-apps/plugin-fs` semantics.
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

	/** Join path segments using the platform separator. */
	join(...paths: string[]): Promise<string>;

	/** Create a file. Wraps Tauri `create`. */
	create(path: string | URL, options?: CreateOptions): Promise<FileHandle>;

	/** Open a file handle. Wraps Tauri `open`. */
	open(path: string | URL, options?: OpenOptions): Promise<FileHandle>;

	/** Copy a file. Wraps Tauri `copyFile`. */
	copyFile(fromPath: string | URL, toPath: string | URL, options?: CopyFileOptions): Promise<void>;

	/** Create a directory. Wraps Tauri `mkdir`. */
	mkdir(path: string | URL, options?: MkdirOptions): Promise<void>;

	/** Read directory entries. Wraps Tauri `readDir`. */
	readDir(path: string | URL, options?: ReadDirOptions): Promise<DirEntry[]>;

	/** Read a file as bytes. Wraps Tauri `readFile`. */
	readFile(path: string | URL, options?: ReadFileOptions): Promise<Uint8Array>;

	/** Read a file as UTF-8 text. Wraps Tauri `readTextFile`. */
	readTextFile(path: string | URL, options?: ReadFileOptions): Promise<string>;

	/** Read a file line-by-line. Wraps Tauri `readTextFileLines`. */
	readTextFileLines(
		path: string | URL,
		options?: ReadFileOptions
	): Promise<AsyncIterableIterator<string>>;

	/** Delete a file or directory. Wraps Tauri `remove`. */
	remove(path: string | URL, options?: RemoveOptions): Promise<void>;

	/** Rename or move a file. Wraps Tauri `rename`. */
	rename(oldPath: string | URL, newPath: string | URL, options?: RenameOptions): Promise<void>;

	/** Get file metadata. Wraps Tauri `stat`. */
	stat(path: string | URL, options?: StatOptions): Promise<FileInfo>;

	/** Get symlink metadata without following links. Wraps Tauri `lstat`. */
	lstat(path: string | URL, options?: StatOptions): Promise<FileInfo>;

	/** Truncate a file to a length. Wraps Tauri `truncate`. */
	truncate(path: string | URL, len?: number, options?: TruncateOptions): Promise<void>;

	/** Write bytes to a file. Wraps Tauri `writeFile`. */
	writeFile(
		path: string | URL,
		data: Uint8Array | ReadableStream<Uint8Array>,
		options?: WriteFileOptions
	): Promise<void>;

	/** Write UTF-8 text to a file. Wraps Tauri `writeTextFile`. */
	writeTextFile(path: string | URL, data: string, options?: WriteFileOptions): Promise<void>;

	/** Check whether a path exists. Wraps Tauri `exists`. */
	exists(path: string | URL, options?: ExistsOptions): Promise<boolean>;

	/** Watch paths with debounced callbacks. Wraps Tauri `watch`. */
	watch(
		paths: string | string[] | URL | URL[],
		callback: (event: WatchEvent) => void,
		options?: DebouncedWatchOptions
	): Promise<UnwatchFn>;

	/** Watch paths with immediate callbacks. Wraps Tauri `watchImmediate`. */
	watchImmediate(
		paths: string | string[] | URL | URL[],
		callback: (event: WatchEvent) => void,
		options?: WatchOptions
	): Promise<UnwatchFn>;

	/** Return file size in bytes. Wraps Tauri `size`. */
	size(path: string | URL): Promise<number>;
}

/**
 * Audio playback helpers.
 */
export interface PluginAppAudioApi {
	/**
	 * Play audio from a blob. Volume is clamped between `0` and `1`.
	 *
	 * @example
	 * ```ts
	 * const blob = await fetch('/sounds/alert.mp3').then((r) => r.blob());
	 * await app.audio.play(blob, 0.8);
	 * ```
	 */
	play(blob: Blob, volume?: number): Promise<void>;
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
	 * Run a chat command by database id.
	 *
	 * @returns `true` when the command ran successfully.
	 */
	runById(id: number, context: HandlerTriggerContext): boolean;

	/**
	 * Find a command record by its trigger string (e.g. `!hello`).
	 *
	 * @example
	 * ```ts
	 * const command = app.commands.findByTrigger('!hello');
	 * ```
	 */
	findByTrigger(trigger: string): Record<string, unknown> | undefined;
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

	/** Read and write files via Tauri. */
	fs: PluginAppFsApi;

	/** Play audio blobs. */
	audio: PluginAppAudioApi;

	/** Register plugin database migrations. */
	db: PluginAppDbApi;

	/** Run and refresh user-configured actions. */
	actions: PluginAppActionsApi;

	/** Integrate with the Commands plugin. */
	commands: PluginAppCommandsApi;

	/** OAuth redirect flow helpers. */
	oauth: PluginAppOAuthApi;

	/** Open URLs in the default browser. */
	opener: PluginAppOpenerApi;
}
