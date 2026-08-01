import type { ServiceError } from './base.service';
import type { ResultAsync } from 'neverthrow';
import type { UserOverlaysResponse } from '$lib/pocketbase/types';

import { unzipSync } from 'fflate';
import { fromPromise } from 'neverthrow';
import { ClientResponseError } from 'pocketbase';

import { PUBLIC_POCKETBASE_URL } from '$app/env/public';

import { Service } from './base.service';

const COLLECTION_ID = 'pbc_8940103850';
const MAX_CACHE_ENTRIES = 32;

export type OverlayAsset = {
	path: string;
	bytes: Uint8Array;
	contentType: string;
};

type CacheEntry = {
	key: string;
	files: Map<string, Uint8Array>;
	accessedAt: number;
};

const bundleCache = new Map<string, CacheEntry>();

function contentTypeForPath(path: string): string {
	const lower = path.toLowerCase();
	if (lower.endsWith('.html') || lower.endsWith('.htm')) return 'text/html; charset=utf-8';
	if (lower.endsWith('.js') || lower.endsWith('.mjs')) return 'text/javascript; charset=utf-8';
	if (lower.endsWith('.css')) return 'text/css; charset=utf-8';
	if (lower.endsWith('.json')) return 'application/json; charset=utf-8';
	if (lower.endsWith('.svg')) return 'image/svg+xml';
	if (lower.endsWith('.png')) return 'image/png';
	if (lower.endsWith('.jpg') || lower.endsWith('.jpeg')) return 'image/jpeg';
	if (lower.endsWith('.gif')) return 'image/gif';
	if (lower.endsWith('.webp')) return 'image/webp';
	if (lower.endsWith('.woff')) return 'font/woff';
	if (lower.endsWith('.woff2')) return 'font/woff2';
	if (lower.endsWith('.map')) return 'application/json';
	return 'application/octet-stream';
}

function normalizeAssetPath(path: string): string {
	return path.replace(/^\/+/, '').replace(/\\/g, '/');
}

function isSafeRelativePath(path: string): boolean {
	if (!path || path.includes('\0')) return false;
	const parts = path.split('/');
	return !parts.some((part) => part === '..');
}

/**
 * Vite builds overlays with `base: './'`. SvelteKit serves the page without a trailing
 * slash (`/app/overlays/{id}`), so relative `./assets/...` would resolve to
 * `/app/overlays/assets/...`. Inject `<base>` so assets stay under the overlay id.
 */
function withOverlayBaseHref(html: Uint8Array, overlayId: string): Uint8Array {
	const text = new TextDecoder('utf-8').decode(html);
	const baseHref = `/app/overlays/${encodeURIComponent(overlayId)}/`;
	if (/<base\b/i.test(text)) {
		return html;
	}
	const tag = `<base href="${baseHref}" />`;
	const withHead = text.replace(/<head([^>]*)>/i, `<head$1>${tag}`);
	if (withHead !== text) {
		return new TextEncoder().encode(withHead);
	}
	return new TextEncoder().encode(`${tag}${text}`);
}

function bundleUrl(record: UserOverlaysResponse): string {
	const base = PUBLIC_POCKETBASE_URL.replace(/\/$/, '');
	const filename = String(record.bundle);
	return `${base}/api/files/${COLLECTION_ID}/${record.id}/${encodeURIComponent(filename)}`;
}

function touchCache(entry: CacheEntry): void {
	entry.accessedAt = Date.now();
	while (bundleCache.size > MAX_CACHE_ENTRIES) {
		let oldestKey: string | null = null;
		let oldestAt = Infinity;
		for (const [key, value] of bundleCache) {
			if (value.accessedAt < oldestAt) {
				oldestAt = value.accessedAt;
				oldestKey = key;
			}
		}
		if (!oldestKey) break;
		bundleCache.delete(oldestKey);
	}
}

function unzipBundle(bytes: Uint8Array): Map<string, Uint8Array> {
	const unzipped = unzipSync(bytes);
	const files = new Map<string, Uint8Array>();
	for (const [rawPath, fileBytes] of Object.entries(unzipped)) {
		const path = normalizeAssetPath(rawPath);
		if (!path || !isSafeRelativePath(path) || path.endsWith('/')) continue;
		files.set(path, fileBytes);
	}
	return files;
}

export class OverlaysService extends Service {
	getPublishedAsset(
		uuid: string,
		assetPath: string | undefined
	): ResultAsync<OverlayAsset, ServiceError<2000, 'OVERLAY_NOT_FOUND'> | ServiceError<2001, 'OVERLAY_ASSET_FAILED'>> {
		const requested = normalizeAssetPath(assetPath?.trim() || 'index.html');
		if (!isSafeRelativePath(requested)) {
			return fromPromise(Promise.reject(new Error('Invalid asset path')), (error) =>
				this.error(2001, 'OVERLAY_ASSET_FAILED', error)
			);
		}

		return fromPromise(this.loadPublishedFiles(uuid), (error) => {
			if (error instanceof ClientResponseError && error.status === 404) {
				return this.error(2000, 'OVERLAY_NOT_FOUND', error);
			}
			return this.error(2001, 'OVERLAY_ASSET_FAILED', error);
		}).andThen((files) => {
			const candidates =
				requested === 'index.html' || requested === ''
					? ['index.html', 'dist/index.html']
					: [requested, `dist/${requested}`];

			for (const candidate of candidates) {
				const bytes = files.get(candidate);
				if (bytes) {
					const contentType = contentTypeForPath(candidate);
					const body = contentType.startsWith('text/html')
						? withOverlayBaseHref(bytes, uuid)
						: bytes;
					return fromPromise(
						Promise.resolve({
							path: candidate,
							bytes: body,
							contentType
						}),
						(error) => this.error(2001, 'OVERLAY_ASSET_FAILED', error)
					);
				}
			}

			return fromPromise(Promise.reject(new Error('Asset not found')), (error) =>
				this.error(2000, 'OVERLAY_NOT_FOUND', error)
			);
		});
	}

	isPublished(uuid: string): ResultAsync<boolean, ServiceError<2001, 'OVERLAY_ASSET_FAILED'>> {
		return fromPromise(
			this.pocketbase
				.collection('user_overlays')
				.getFirstListItem(
					this.pocketbase.filter('overlayId={:overlayId} && published=true', {
						overlayId: uuid
					})
				)
				.then(() => true)
				.catch((error) => {
					if (error instanceof ClientResponseError && error.status === 404) {
						return false;
					}
					throw error;
				}),
			(error) => this.error(2001, 'OVERLAY_ASSET_FAILED', error)
		);
	}

	private async loadPublishedFiles(uuid: string): Promise<Map<string, Uint8Array>> {
		const record = await this.pocketbase.collection('user_overlays').getFirstListItem(
			this.pocketbase.filter('overlayId={:overlayId} && published=true', {
				overlayId: uuid
			})
		);
		if (!record.bundle) {
			throw new Error('Overlay has no bundle');
		}

		const cacheKey = `${record.id}:${record.updatedAt}:${String(record.bundle)}`;
		const cached = bundleCache.get(cacheKey);
		if (cached) {
			touchCache(cached);
			return cached.files;
		}

		const response = await fetch(bundleUrl(record));
		if (!response.ok) {
			throw new Error(`Failed to download overlay bundle (${response.status})`);
		}

		const bytes = new Uint8Array(await response.arrayBuffer());
		const files = unzipBundle(bytes);
		const entry: CacheEntry = { key: cacheKey, files, accessedAt: Date.now() };
		bundleCache.set(cacheKey, entry);
		touchCache(entry);
		return files;
	}
}
