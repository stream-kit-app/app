export const DEFAULT_RANK_ICON = 'ri:award-line';
export const RANK_ICON_MAX_SIZE = 40;

export type RankIconKind = 'iconify' | 'image' | 'empty';

export type RankIconUserFiles = {
	isCloudUrl(value: string | null | undefined): boolean;
	fetchBlob(url: string): Promise<Blob>;
	resolveUrl(value: string): string;
	resolveAuthenticatedUrl?(value: string): Promise<string>;
};

export function getRankIconKind(icon: string | undefined | null): RankIconKind {
	if (icon == null || !icon.trim()) {
		return 'empty';
	}

	const trimmed = icon.trim();
	if (
		trimmed.startsWith('data:image/') ||
		trimmed.startsWith('/api/files/') ||
		/^https?:\/\//i.test(trimmed)
	) {
		return 'image';
	}

	return 'iconify';
}

export function guessMimeFromPath(path: string): string {
	const extension = path.split('.').pop()?.toLowerCase() ?? '';

	switch (extension) {
		case 'svg':
			return 'image/svg+xml';
		case 'png':
			return 'image/png';
		case 'jpg':
		case 'jpeg':
			return 'image/jpeg';
		case 'webp':
			return 'image/webp';
		case 'gif':
			return 'image/gif';
		default:
			return 'image/png';
	}
}

async function svgBytesToDataUrl(bytes: Uint8Array): Promise<string> {
	const svgText = new TextDecoder().decode(bytes);
	return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgText)}`;
}

async function resizeImageToMax(
	bytes: Uint8Array,
	mime: string,
	max = RANK_ICON_MAX_SIZE
): Promise<string> {
	if (mime === 'image/svg+xml') {
		return svgBytesToDataUrl(bytes);
	}

	const blob = new Blob([Uint8Array.from(bytes)], { type: mime });
	const objectUrl = URL.createObjectURL(blob);

	try {
		const img = await new Promise<HTMLImageElement>((resolve, reject) => {
			const image = new Image();
			image.onload = () => resolve(image);
			image.onerror = () => reject(new Error('Failed to load image'));
			image.src = objectUrl;
		});
		const scale = Math.min(1, max / img.width, max / img.height);
		const width = Math.max(1, Math.round(img.width * scale));
		const height = Math.max(1, Math.round(img.height * scale));
		const canvas = document.createElement('canvas');
		canvas.width = width;
		canvas.height = height;
		const ctx = canvas.getContext('2d');

		if (!ctx) {
			throw new Error('Could not create canvas context');
		}

		ctx.drawImage(img, 0, 0, width, height);
		return canvas.toDataURL('image/png');
	} finally {
		URL.revokeObjectURL(objectUrl);
	}
}

export async function fileBytesToRankIcon(bytes: Uint8Array, path: string): Promise<string> {
	const mime = guessMimeFromPath(path);
	return resizeImageToMax(bytes, mime);
}

export async function dataUrlToBlob(dataUrl: string): Promise<Blob> {
	const response = await fetch(dataUrl);
	return response.blob();
}

export async function blobToDataUrl(blob: Blob): Promise<string> {
	const buffer = await blob.arrayBuffer();
	const bytes = new Uint8Array(buffer);
	let binary = '';

	for (let i = 0; i < bytes.length; i += 1) {
		binary += String.fromCharCode(bytes[i]!);
	}

	const mime = blob.type.trim() || 'image/png';
	return `data:${mime};base64,${btoa(binary)}`;
}

/**
 * Make a rank icon usable in OBS overlays.
 * Iconify ids stay as-is; cloud / relative image refs become data URLs.
 */
export async function resolveOverlayRankIcon(
	icon: string | undefined | null,
	userFiles?: RankIconUserFiles | null
): Promise<string> {
	const trimmed = icon?.trim() || '';

	if (!trimmed) {
		return DEFAULT_RANK_ICON;
	}

	const kind = getRankIconKind(trimmed);

	if (kind === 'iconify') {
		return trimmed;
	}

	if (trimmed.startsWith('data:image/')) {
		return trimmed;
	}

	if (/^https?:\/\//i.test(trimmed)) {
		return trimmed;
	}

	if (userFiles?.isCloudUrl(trimmed)) {
		try {
			const blob = await userFiles.fetchBlob(trimmed);
			return await blobToDataUrl(blob);
		} catch {
			try {
				if (userFiles.resolveAuthenticatedUrl) {
					return await userFiles.resolveAuthenticatedUrl(trimmed);
				}

				return userFiles.resolveUrl(trimmed);
			} catch {
				return DEFAULT_RANK_ICON;
			}
		}
	}

	// Relative / unrecognized image path — prefer absolute cloud URL when possible.
	if (userFiles) {
		try {
			return userFiles.resolveUrl(trimmed);
		} catch {
			return DEFAULT_RANK_ICON;
		}
	}

	return DEFAULT_RANK_ICON;
}
