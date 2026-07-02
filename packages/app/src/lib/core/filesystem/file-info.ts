/** File or directory metadata returned by {@link PluginAppFsApi.stat} and {@link FileHandle.stat}. */
export interface FileInfo {
	/** True when the path is a regular file. */
	isFile: boolean;
	/** True when the path is a directory. */
	isDirectory: boolean;
	/** True when the path is a symbolic link. */
	isSymlink: boolean;
	/** File size in bytes. */
	size: number;
	/** Last modification time. */
	mtime: Date | null;
	/** Last access time. */
	atime: Date | null;
	/** Creation or birth time. */
	birthtime: Date | null;
	/** True when the file is read-only. */
	readonly: boolean;
	/** Platform-specific file attributes, when available. */
	fileAttributes: number | null;
	/** Device ID of the filesystem. */
	dev: number | null;
	/** Inode number. */
	ino: number | null;
	/** File mode bits. */
	mode: number | null;
	/** Number of hard links. */
	nlink: number | null;
	/** Owner user ID. */
	uid: number | null;
	/** Owner group ID. */
	gid: number | null;
	/** Device type for special files. */
	rdev: number | null;
	/** Preferred I/O block size. */
	blksize: number | null;
	/** Allocated storage blocks. */
	blocks: number | null;
}
