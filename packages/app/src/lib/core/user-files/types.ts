export type UserFileRecord = {
	id: string;
	url: string;
	size: number;
	mimeType: string;
	originalName: string;
	createdAt: string | null;
};

export type UserFilesQuota = {
	usedBytes: number;
	maxStorageBytes: number;
	maxFileBytes: number;
	planKey: string;
	planName: string;
};

export type UserFilesListOptions = {
	/** Match mime types that start with this prefix (e.g. `audio/`, `image/`). */
	mimePrefix?: string;
	/** Match files whose original name ends with one of these extensions (no dot). */
	extensions?: string[];
};

export type UserFilesUploadOptions = {
	originalName: string;
};
