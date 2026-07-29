/**
 * Infer mime type from a filename when PocketBase `filesystem.File` has no `type`.
 * Cloud uploads only allow the extensions listed in ALLOWED_CLOUD_EXTENSION_MIME.
 */
export const ALLOWED_CLOUD_EXTENSION_MIME: Record<string, string> = {
	mp3: 'audio/mpeg',
	mpeg: 'audio/mpeg',
	wav: 'audio/wav',
	ogg: 'audio/ogg',
	webm: 'audio/webm',
	flac: 'audio/flac',
	aac: 'audio/aac',
	m4a: 'audio/mp4',
	png: 'image/png',
	jpg: 'image/jpeg',
	jpeg: 'image/jpeg',
	webp: 'image/webp',
	gif: 'image/gif',
	svg: 'image/svg+xml',
	mp4: 'video/mp4',
	mov: 'video/quicktime'
};

const EXTENSION_MIME: Record<string, string> = {
	...ALLOWED_CLOUD_EXTENSION_MIME,
	bin: 'application/octet-stream',
	zip: 'application/zip'
};

export function extensionOf(name: string): string {
	const base = name.split(/[/\\]/).pop() ?? name;
	const dot = base.lastIndexOf('.');
	if (dot < 0) {
		return '';
	}
	return base.slice(dot + 1).toLowerCase();
}

export function mimeFromFileName(name: string, fallback = 'application/octet-stream'): string {
	const ext = extensionOf(name);
	if (!ext) {
		return fallback;
	}
	return EXTENSION_MIME[ext] ?? fallback;
}

/** Mime for cloud upload, or `null` when the extension is not allowlisted. */
export function mimeForCloudUpload(name: string): string | null {
	const ext = extensionOf(name);
	if (!ext) {
		return null;
	}
	return ALLOWED_CLOUD_EXTENSION_MIME[ext] ?? null;
}

export function isAllowedCloudUploadName(name: string): boolean {
	return mimeForCloudUpload(name) != null;
}
