/** Host-independent cloud path key (lowercase, no query). */
export function normalizeManifestKey(value: string): string | null {
	const trimmed = value.trim();
	if (!trimmed) {
		return null;
	}
	if (trimmed.startsWith('/api/files/')) {
		return trimmed.split(/[?#]/)[0].toLowerCase();
	}
	if (!/^https?:\/\//i.test(trimmed)) {
		return null;
	}
	try {
		const parsed = new URL(trimmed);
		if (!parsed.pathname.includes('/api/files/')) {
			return null;
		}
		return parsed.pathname.toLowerCase();
	} catch {
		return null;
	}
}

/** Safe single path segment for cache filenames (no separators / traversal). */
export function sanitizeFileName(name: string): string {
	const trimmed = name.trim() || 'file';
	const cleaned = trimmed
		.replace(/[<>:"/\\|?*\u0000-\u001f]/g, '_')
		.replace(/^\.+/, '')
		.replace(/\.\.+/g, '.')
		.slice(0, 200);
	if (!cleaned || cleaned === '.' || cleaned === '..') {
		return 'file';
	}
	return cleaned;
}

/** PocketBase ids are typically alphanumeric; allow `_`/`-` but reject path separators. */
export function sanitizeRecordId(id: string): string | null {
	const trimmed = id.trim();
	if (!trimmed || trimmed.length > 64) {
		return null;
	}
	if (!/^[a-zA-Z0-9_-]+$/.test(trimmed)) {
		return null;
	}
	return trimmed;
}

export function sanitizeUserId(id: string | null | undefined): string | null {
	if (typeof id !== 'string') {
		return null;
	}
	return sanitizeRecordId(id);
}

export function parseCloudFilePath(
	relativePath: string
): { recordId: string; fileName: string } | null {
	const parts = relativePath.split('/').filter(Boolean);
	if (parts.length < 5 || parts[0] !== 'api' || parts[1] !== 'files') {
		return null;
	}
	const recordId = sanitizeRecordId(parts[3]!);
	if (!recordId) {
		return null;
	}
	try {
		return {
			recordId,
			fileName: decodeURIComponent(parts.slice(4).join('/'))
		};
	} catch {
		return {
			recordId,
			fileName: parts.slice(4).join('/')
		};
	}
}

/** True when `path` stays under `userRoot` (segment-aware; allows names like `file.mp4`). */
export function isSafeCacheRelativePath(path: string, userRoot: string): boolean {
	const normalized = path.replace(/\\/g, '/');
	const root = userRoot.replace(/\\/g, '/');
	if (!normalized || !root || normalized.startsWith('/')) {
		return false;
	}
	const segments = normalized.split('/');
	if (segments.some((segment) => segment === '' || segment === '.' || segment === '..')) {
		return false;
	}
	return normalized === root || normalized.startsWith(`${root}/`);
}
