export type FileSystemFilter = {
	name: string;
	extensions: string[];
};

export type FileSystemSelectOptions = {
	type: 'file' | 'folder';
	filters?: FileSystemFilter[];
};

export type {
	CopyFileOptions,
	CreateOptions,
	DebouncedWatchOptions,
	DirEntry,
	ExistsOptions,
	FileInfo,
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
} from '@tauri-apps/plugin-fs';

export { BaseDirectory, FileHandle, SeekMode } from '@tauri-apps/plugin-fs';
