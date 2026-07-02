/** Seek origin when positioning a file handle via {@link FileHandle.seek}. */
export const SeekMode = {
	/** Seek from the start of the file. */
	Start: 0,
	/** Seek relative to the current position. */
	Current: 1,
	/** Seek from the end of the file. */
	End: 2
} as const;

export type SeekMode = (typeof SeekMode)[keyof typeof SeekMode];
