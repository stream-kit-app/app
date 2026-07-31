import { isCloudFileUrl } from './user-files';

/** True when the value is an overlay-bundled relative asset path (`./foo.webm`). */
export function isOverlayRelativePath(value: unknown): boolean {
	if (typeof value !== 'string' || !value.trim()) {
		return false;
	}
	const trimmed = value.trim().replace(/\\/g, '/');
	return trimmed.startsWith('./') || trimmed.startsWith('../');
}

/**
 * Strip `./` / leading `../` segments for resolving under an overlay project root.
 * Returns null when the path would escape the overlay directory.
 */
export function overlayRelativePathWithinProject(value: string): string | null {
	const trimmed = value.trim().replace(/\\/g, '/');
	if (!trimmed.startsWith('./') && !trimmed.startsWith('../')) {
		return null;
	}
	const parts = trimmed.split('/').filter((part) => part.length > 0 && part !== '.');
	const resolved: string[] = [];
	for (const part of parts) {
		if (part === '..') {
			if (resolved.length === 0) {
				return null;
			}
			resolved.pop();
			continue;
		}
		resolved.push(part);
	}
	return resolved.length > 0 ? resolved.join('/') : null;
}

/** True when the field still holds a local filesystem path (not a cloud/http/relative URL). */
export function isLocalFilePath(value: unknown): boolean {
	if (typeof value !== 'string' || !value.trim()) {
		return false;
	}
	const trimmed = value.trim();
	if (isCloudFileUrl(trimmed) || trimmed.startsWith('data:')) {
		return false;
	}
	// Overlay bundled assets (./foo.webm) and remote URLs are not OS paths.
	if (isOverlayRelativePath(trimmed) || /^https?:\/\//i.test(trimmed)) {
		return false;
	}
	// Windows drive / UNC, or absolute POSIX path from the file picker.
	return /^[a-zA-Z]:[\\/]/.test(trimmed) || trimmed.startsWith('\\\\') || trimmed.startsWith('/');
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
