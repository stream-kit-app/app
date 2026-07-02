/** A file, directory, or symlink entry returned by {@link PluginAppFsApi.readDir}. */
export interface DirEntry {
	/** Entry name (not the full path). */
	name: string;
	/** True when the entry is a directory. */
	isDirectory: boolean;
	/** True when the entry is a regular file. */
	isFile: boolean;
	/** True when the entry is a symbolic link. */
	isSymlink: boolean;
}
