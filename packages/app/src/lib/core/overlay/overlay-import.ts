import type { Filesystem } from '../filesystem';
import type { OverlayFrameworkId } from './types';
import type { OverlayProjectFile } from './types';

import { unzipSync } from 'fflate';

import { BaseDirectory } from '@tauri-apps/plugin-fs';

import { getOverlay, saveOverlay, type SaveOverlayInput } from '$db/repositories/overlays';

import { translate } from '$lib/i18n';

import { collectOverlayDefaultConfig, parseOverlayManifest } from './overlay-manifest';
import { serializeOverlayManifest } from './overlay-manifest-schema';
import {
	ensureOverlayManifestEditorSupport,
	overlayDir,
	removeOverlayProject,
	syncOverlayScaffoldMetadata,
	writeOverlayFileRaw
} from './overlay-project';

const IMPORT_SKIP_DIRS = new Set(['node_modules']);

function normalizeZipPath(path: string): string {
	return path.replace(/\\/g, '/').replace(/^\/+/, '').replace(/\/+$/, '');
}

function assertSafeZipPath(path: string): void {
	if (!path) {
		throw new Error(translate('Zip archive contains an invalid path.'));
	}

	if (path.includes('..') || path.startsWith('/') || path.includes('\\')) {
		throw new Error(translate('Zip archive contains an invalid path.'));
	}

	const segments = path.split('/');

	for (const segment of segments) {
		if (segment === '..') {
			throw new Error(translate('Zip archive contains an invalid path.'));
		}
	}
}

function shouldSkipImportPath(path: string): boolean {
	const segments = path.split('/');

	return segments.some((segment) => IMPORT_SKIP_DIRS.has(segment));
}

function stripSingleRootPrefix(paths: string[]): { prefix: string; paths: string[] } {
	if (paths.length === 0) {
		return { prefix: '', paths };
	}

	const firstSegments = paths.map((path) => path.split('/')[0] ?? '');
	const root = firstSegments[0];

	if (!root || !paths.every((path) => path.startsWith(`${root}/`))) {
		return { prefix: '', paths };
	}

	return {
		prefix: root,
		paths: paths.map((path) => path.slice(root.length + 1)).filter(Boolean)
	};
}

function decodeZipEntry(bytes: Uint8Array, path: string): string {
	try {
		return new TextDecoder('utf-8', { fatal: true }).decode(bytes);
	} catch {
		throw new Error(
			translate('Zip archive contains a non-text file that cannot be imported: {path}.', { path })
		);
	}
}

function parseZipEntries(zipBytes: Uint8Array): OverlayProjectFile[] {
	let entries: Record<string, Uint8Array>;

	try {
		entries = unzipSync(zipBytes);
	} catch {
		throw new Error(translate('Failed to read zip archive.'));
	}

	const normalizedPaths = Object.keys(entries)
		.map(normalizeZipPath)
		.filter(Boolean);

	for (const path of normalizedPaths) {
		assertSafeZipPath(path);
	}

	const { prefix } = stripSingleRootPrefix(normalizedPaths);
	const pathMap = new Map<string, Uint8Array>();

	for (const [rawPath, content] of Object.entries(entries)) {
		const normalized = normalizeZipPath(rawPath);

		if (!normalized) {
			continue;
		}

		const relative = prefix
			? normalized.startsWith(`${prefix}/`)
				? normalized.slice(prefix.length + 1)
				: null
			: normalized;

		if (!relative || shouldSkipImportPath(relative)) {
			continue;
		}

		pathMap.set(relative, content);
	}

	if (!pathMap.has('manifest.json')) {
		throw new Error(
			translate('Zip archive does not contain manifest.json at the project root.')
		);
	}

	return [...pathMap.entries()].map(([path, content]) => ({
		path,
		content: decodeZipEntry(content, path)
	}));
}

export async function importOverlayProjectFromZip(
	fs: Filesystem,
	zipBytes: Uint8Array,
	options?: { replaceExisting?: boolean }
): Promise<SaveOverlayInput> {
	const files = parseZipEntries(zipBytes);
	const manifestFile = files.find((file) => file.path === 'manifest.json');

	if (!manifestFile) {
		throw new Error(
			translate('Zip archive does not contain manifest.json at the project root.')
		);
	}

	let rawParsed: Record<string, unknown>;

	try {
		rawParsed = JSON.parse(manifestFile.content) as Record<string, unknown>;
	} catch {
		throw new Error(translate('manifest.json contains invalid JSON'));
	}

	const manifest = parseOverlayManifest(rawParsed);
	const overlayId = manifest.id.trim();

	if (!overlayId) {
		throw new Error(translate('manifest.json requires id'));
	}

	const existing = await getOverlay(overlayId);

	if (existing && !options?.replaceExisting) {
		throw new Error(
			translate("an overlay with id '{id}' is already installed", { id: overlayId })
		);
	}

	if (existing) {
		await removeOverlayProject(fs, overlayId);
	}

	await fs.mkdir(overlayDir(overlayId), { baseDir: BaseDirectory.AppData, recursive: true });

	for (const file of files) {
		if (file.path === 'manifest.json') {
			continue;
		}

		await writeOverlayFileRaw(`${overlayDir(overlayId)}/${file.path}`, file.content);
	}

	await writeOverlayFileRaw(
		`${overlayDir(overlayId)}/manifest.json`,
		serializeOverlayManifest(manifest)
	);

	await ensureOverlayManifestEditorSupport(overlayId);
	await syncOverlayScaffoldMetadata(
		overlayId,
		manifest.name,
		manifest.framework as OverlayFrameworkId
	);

	const defaultConfig = collectOverlayDefaultConfig(manifest.settings);

	const record: SaveOverlayInput = {
		id: overlayId,
		name: manifest.name,
		template: manifest.framework,
		config: defaultConfig,
		version: manifest.version ?? 0,
		expectedEvents: manifest.expectedEvents,
		requiredPlugins: manifest.requiredPlugins ?? [],
		installedActionKeys: []
	};

	await saveOverlay(record);

	return record;
}
