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
} from './types';
import type { DirEntry, FileInfo, UnwatchFn } from '@tauri-apps/plugin-fs';

import { join } from '@tauri-apps/api/path';
import { open as openDialog } from '@tauri-apps/plugin-dialog';
import {
	copyFile,
	create,
	exists,
	lstat,
	mkdir,
	open,
	readDir,
	readFile,
	readTextFile,
	readTextFileLines,
	remove,
	rename,
	size,
	stat,
	truncate,
	watch,
	watchImmediate,
	writeFile,
	writeTextFile
} from '@tauri-apps/plugin-fs';

export class Filesystem {
	async select(options: FileSystemSelectOptions): Promise<string | null> {
		const selected = await openDialog({
			multiple: false,
			directory: options.type === 'folder',
			filters: options.type === 'file' ? options.filters : undefined
		});

		if (!selected || Array.isArray(selected)) {
			return null;
		}

		return selected;
	}

	join(...paths: string[]): Promise<string> {
		return join(...paths);
	}

	create(path: string | URL, options?: CreateOptions) {
		return create(path, options);
	}

	open(path: string | URL, options?: OpenOptions) {
		return open(path, options);
	}

	copyFile(
		fromPath: string | URL,
		toPath: string | URL,
		options?: CopyFileOptions
	): Promise<void> {
		return copyFile(fromPath, toPath, options);
	}

	mkdir(path: string | URL, options?: MkdirOptions): Promise<void> {
		return mkdir(path, options);
	}

	readDir(path: string | URL, options?: ReadDirOptions): Promise<DirEntry[]> {
		return readDir(path, options);
	}

	readFile(path: string | URL, options?: ReadFileOptions): Promise<Uint8Array> {
		return readFile(path, options);
	}

	readTextFile(path: string | URL, options?: ReadFileOptions): Promise<string> {
		return readTextFile(path, options);
	}

	readTextFileLines(
		path: string | URL,
		options?: ReadFileOptions
	): Promise<AsyncIterableIterator<string>> {
		return readTextFileLines(path, options);
	}

	remove(path: string | URL, options?: RemoveOptions): Promise<void> {
		return remove(path, options);
	}

	rename(oldPath: string | URL, newPath: string | URL, options?: RenameOptions): Promise<void> {
		return rename(oldPath, newPath, options);
	}

	stat(path: string | URL, options?: StatOptions): Promise<FileInfo> {
		return stat(path, options);
	}

	lstat(path: string | URL, options?: StatOptions): Promise<FileInfo> {
		return lstat(path, options);
	}

	truncate(path: string | URL, len?: number, options?: TruncateOptions): Promise<void> {
		return truncate(path, len, options);
	}

	writeFile(
		path: string | URL,
		data: Uint8Array | ReadableStream<Uint8Array>,
		options?: WriteFileOptions
	): Promise<void> {
		return writeFile(path, data, options);
	}

	writeTextFile(path: string | URL, data: string, options?: WriteFileOptions): Promise<void> {
		return writeTextFile(path, data, options);
	}

	exists(path: string | URL, options?: ExistsOptions): Promise<boolean> {
		return exists(path, options);
	}

	watch(
		paths: string | string[] | URL | URL[],
		callback: (event: WatchEvent) => void,
		options?: DebouncedWatchOptions
	): Promise<UnwatchFn> {
		return watch(paths, callback, options);
	}

	watchImmediate(
		paths: string | string[] | URL | URL[],
		callback: (event: WatchEvent) => void,
		options?: WatchOptions
	): Promise<UnwatchFn> {
		return watchImmediate(paths, callback, options);
	}

	size(path: string | URL): Promise<number> {
		return size(path);
	}
}
