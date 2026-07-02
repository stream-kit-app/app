import type { FileInfo } from './file-info';

import type { SeekMode } from './seek-mode';

/** Opaque readable/writable file handle returned by {@link PluginAppFsApi.open} and {@link PluginAppFsApi.create}. */
export interface FileHandle {
	/** Read bytes into `buffer`. Returns bytes read, or null at EOF. */
	read(buffer: Uint8Array): Promise<number | null>;
	/** Set the read/write position. Returns the new offset. */
	seek(offset: number, whence: SeekMode): Promise<number>;
	/** Read metadata for the open file. */
	stat(): Promise<FileInfo>;
	/** Truncate the file to `len` bytes (defaults to current position). */
	truncate(len?: number): Promise<void>;
	/** Write bytes from `data`. Returns the number of bytes written. */
	write(data: Uint8Array): Promise<number>;
	/** Close the handle and release resources. */
	close(): Promise<void>;
}
