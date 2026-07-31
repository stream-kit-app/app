import { isCloudFileUrl } from './user-files';

/** True when the field still holds a local path (not a cloud/http URL). */
export function isLocalFilePath(value: unknown): boolean {
	if (typeof value !== 'string' || !value.trim()) {
		return false;
	}
	const trimmed = value.trim();
	if (isCloudFileUrl(trimmed) || trimmed.startsWith('data:')) {
		return false;
	}
	return true;
}

export function usesCloudFileStorage(config: {
	mode: 'file' | 'folder';
	storage?: 'cloud' | 'local';
}): boolean {
	if (config.mode !== 'file') {
		return false;
	}
	return config.storage !== 'local';
}

/** Signed in with an entitled plan (active or grace) — same gate as Profile cloud files. */
export function hasCloudFileAccess(auth: {
	isAuthenticated: boolean;
	user?: { subscription?: unknown } | null;
}): boolean {
	return Boolean(auth.isAuthenticated && auth.user?.subscription);
}
