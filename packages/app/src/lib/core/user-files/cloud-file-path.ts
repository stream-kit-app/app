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
