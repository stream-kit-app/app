import type { BaseDirectory } from './base-directory';

export { BaseDirectory } from './base-directory';
export { SeekMode } from './seek-mode';
export type { FileHandle } from './file-handle';
export type { DirEntry } from './dir-entry';
export type { FileInfo } from './file-info';
export type {
	UnwatchFn,
	WatchEvent,
	WatchEventKind,
	WatchEventKindAccess,
	WatchEventKindCreate,
	WatchEventKindModify,
	WatchEventKindRemove
} from './watch-event';

/** File extension filter for native file/folder pickers. */
export type FileSystemFilter = {
	/** Display name for the filter group. */
	name: string;
	/** Allowed file extensions without dots (for example `['png', 'jpg']`). */
	extensions: string[];
};

/** Options for {@link PluginAppFsApi.selectFile} and {@link PluginAppFsApi.selectFolder}. */
export type FileSystemSelectOptions = {
	/** Whether to pick a file or folder. */
	type: 'file' | 'folder';
	/** Optional extension filters when `type` is `file`. */
	filters?: FileSystemFilter[];
};

/** Options for {@link PluginAppFsApi.save}. */
export type FileSystemSaveOptions = {
	/** Suggested file name or absolute path. */
	defaultPath?: string;
	/** Optional extension filters. */
	filters?: FileSystemFilter[];
};
/** Options for {@link PluginAppFsApi.create}. */
export type CreateOptions = {
	/** Base directory for the relative path. */
	baseDir?: BaseDirectory;
};

/** Options for {@link PluginAppFsApi.open}. */
export type OpenOptions = {
	/** Open for reading. */
	read?: boolean;
	/** Open for writing. */
	write?: boolean;
	/** Open in append mode. */
	append?: boolean;
	/** Truncate the file on open. */
	truncate?: boolean;
	/** Create the file if it does not exist. */
	create?: boolean;
	/** Fail if the file already exists. */
	createNew?: boolean;
	/** Unix file mode bits when creating. */
	mode?: number;
	/** Base directory for the relative path. */
	baseDir?: BaseDirectory;
};

/** Options for {@link PluginAppFsApi.copyFile}. */
export type CopyFileOptions = {
	/** Base directory for the source path. */
	fromPathBaseDir?: BaseDirectory;
	/** Base directory for the destination path. */
	toPathBaseDir?: BaseDirectory;
};

/** Options for {@link PluginAppFsApi.mkdir}. */
export type MkdirOptions = {
	/** Unix directory mode bits. */
	mode?: number;
	/** Create parent directories as needed. */
	recursive?: boolean;
	/** Base directory for the relative path. */
	baseDir?: BaseDirectory;
};

/** Options for {@link PluginAppFsApi.readDir}. */
export type ReadDirOptions = {
	/** Base directory for the relative path. */
	baseDir?: BaseDirectory;
};

/** Options for {@link PluginAppFsApi.readFile} and {@link PluginAppFsApi.readTextFile}. */
export type ReadFileOptions = {
	/** Base directory for the relative path. */
	baseDir?: BaseDirectory;
	/** Text encoding when reading as string (defaults to UTF-8). */
	encoding?: string;
};

/** Options for {@link PluginAppFsApi.remove}. */
export type RemoveOptions = {
	/** Remove directories recursively. */
	recursive?: boolean;
	/** Base directory for the relative path. */
	baseDir?: BaseDirectory;
};

/** Options for {@link PluginAppFsApi.rename}. */
export type RenameOptions = {
	/** Base directory for the old path. */
	oldPathBaseDir?: BaseDirectory;
	/** Base directory for the new path. */
	newPathBaseDir?: BaseDirectory;
};

/** Options for {@link PluginAppFsApi.stat}. */
export type StatOptions = {
	/** Base directory for the relative path. */
	baseDir?: BaseDirectory;
};

/** Options for {@link PluginAppFsApi.truncate}. */
export type TruncateOptions = {
	/** Base directory for the relative path. */
	baseDir?: BaseDirectory;
};

/** Options for {@link PluginAppFsApi.writeFile} and {@link PluginAppFsApi.writeTextFile}. */
export type WriteFileOptions = {
	/** Append instead of overwrite. */
	append?: boolean;
	/** Create the file if it does not exist. */
	create?: boolean;
	/** Fail if the file already exists. */
	createNew?: boolean;
	/** Unix file mode bits when creating. */
	mode?: number;
	/** Base directory for the relative path. */
	baseDir?: BaseDirectory;
};

/** Options for {@link PluginAppFsApi.watch} and {@link PluginAppFsApi.watchImmediate}. */
export type WatchOptions = {
	/** Watch subdirectories recursively. */
	recursive?: boolean;
	/** Base directory for the relative path. */
	baseDir?: BaseDirectory;
};

/** Options for {@link PluginAppFsApi.watchDebounced}. */
export type DebouncedWatchOptions = WatchOptions & {
	/** Debounce delay in milliseconds before invoking the callback. */
	delayMs?: number;
};

/** Options for {@link PluginAppFsApi.exists}. */
export type ExistsOptions = {
	/** Base directory for the relative path. */
	baseDir?: BaseDirectory;
};
