import type {
	CopyFileOptions,
	CreateOptions,
	DebouncedWatchOptions,
	DirEntry,
	ExistsOptions,
	FileHandle,
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
	WatchOptions,
	WriteFileOptions,
	FileSystemSelectOptions
} from './types';

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

import { asTauriFsOptions } from './tauri-bridge';

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

	create(path: string | URL, options?: CreateOptions): Promise<FileHandle> {
		return create(path, asTauriFsOptions(options));
	}

	open(path: string | URL, options?: OpenOptions): Promise<FileHandle> {
		return open(path, asTauriFsOptions(options));
	}

	copyFile(
		fromPath: string | URL,
		toPath: string | URL,
		options?: CopyFileOptions
	): Promise<void> {
		return copyFile(fromPath, toPath, asTauriFsOptions(options));
	}

	mkdir(path: string | URL, options?: MkdirOptions): Promise<void> {
		return mkdir(path, asTauriFsOptions(options));
	}

	readDir(path: string | URL, options?: ReadDirOptions): Promise<DirEntry[]> {
		return readDir(path, asTauriFsOptions(options));
	}

	readFile(path: string | URL, options?: ReadFileOptions): Promise<Uint8Array> {
		return readFile(path, asTauriFsOptions(options));
	}

	readTextFile(path: string | URL, options?: ReadFileOptions): Promise<string> {
		return readTextFile(path, asTauriFsOptions(options));
	}

	readTextFileLines(
		path: string | URL,
		options?: ReadFileOptions
	): Promise<AsyncIterableIterator<string>> {
		return readTextFileLines(path, asTauriFsOptions(options));
	}

	remove(path: string | URL, options?: RemoveOptions): Promise<void> {
		return remove(path, asTauriFsOptions(options));
	}

	rename(oldPath: string | URL, newPath: string | URL, options?: RenameOptions): Promise<void> {
		return rename(oldPath, newPath, asTauriFsOptions(options));
	}

	stat(path: string | URL, options?: StatOptions): Promise<FileInfo> {
		return stat(path, asTauriFsOptions(options));
	}

	lstat(path: string | URL, options?: StatOptions): Promise<FileInfo> {
		return lstat(path, asTauriFsOptions(options));
	}

	truncate(path: string | URL, len?: number, options?: TruncateOptions): Promise<void> {
		return truncate(path, len, asTauriFsOptions(options));
	}

	writeFile(
		path: string | URL,
		data: Uint8Array | ReadableStream<Uint8Array>,
		options?: WriteFileOptions
	): Promise<void> {
		return writeFile(path, data, asTauriFsOptions(options));
	}

	writeTextFile(path: string | URL, data: string, options?: WriteFileOptions): Promise<void> {
		return writeTextFile(path, data, asTauriFsOptions(options));
	}

	exists(path: string | URL, options?: ExistsOptions): Promise<boolean> {
		return exists(path, asTauriFsOptions(options));
	}

	watch(
		paths: string | string[] | URL | URL[],
		callback: (event: WatchEvent) => void,
		options?: DebouncedWatchOptions
	): Promise<UnwatchFn> {
		return watch(paths, callback, asTauriFsOptions(options));
	}

	watchImmediate(
		paths: string | string[] | URL | URL[],
		callback: (event: WatchEvent) => void,
		options?: WatchOptions
	): Promise<UnwatchFn> {
		return watchImmediate(paths, callback, asTauriFsOptions(options));
	}

	size(path: string | URL): Promise<number> {
		return size(path);
	}
}
