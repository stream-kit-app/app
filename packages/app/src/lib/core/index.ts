import { bootApp } from './boot-app';
import { app } from './app-init';

export type { App } from './app.svelte';
export type { Plugin } from './plugins';
export type {
	PluginAppApi,
	PluginPublicApi,
	PluginRegistration,
	PluginSettingsContext,
	PluginStore
} from './plugins';
export { Plugins, RegisteredPlugin } from './plugins';
export type { OAuthStartOptions } from './oauth';
export { OAuth } from './oauth';
export { Opener } from './opener';
export { BaseDirectory, FileHandle, Filesystem, SeekMode } from './filesystem';
export type {
	CopyFileOptions,
	CreateOptions,
	DebouncedWatchOptions,
	DirEntry,
	ExistsOptions,
	FileInfo,
	FileSystemFilter,
	FileSystemSelectOptions,
	MkdirOptions,
	OpenOptions,
	ReadDirOptions,
	ReadFileOptions,
	RemoveOptions,
	RenameOptions,
	StatOptions,
	TruncateOptions,
	UnwatchFn,
	WatchEvent,
	WatchEventKind,
	WatchEventKindAccess,
	WatchEventKindCreate,
	WatchEventKindModify,
	WatchEventKindRemove,
	WatchOptions,
	WriteFileOptions
} from './filesystem';
export { Audio } from './audio';
export { ProcessWatcher } from './process';
export type { ProcessEventContext } from './process';
export { app, bootApp };
