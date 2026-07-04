import type { Filesystem } from '../filesystem';
import type { OverlayFrameworkId } from './types';
import type { OverlayManifest } from './overlay-manifest';

import { BaseDirectory } from '@tauri-apps/plugin-fs';

import { deleteOverlay, getOverlays, saveOverlay, type SaveOverlayInput } from '$db/repositories/overlays';

import { createOverlayManifest } from './overlay-manifest-defaults';
import {
	getOverlayManifestSchemaContent,
	OVERLAY_MANIFEST_SCHEMA_FILE,
	serializeOverlayManifest
} from './overlay-manifest-schema';
import { collectOverlayDefaultConfig, parseOverlayManifest } from './overlay-manifest';

import {
	getOverlayScaffoldFile,
	getOverlayScaffoldFiles,
	getOverlayScaffoldMetadataPaths
} from './overlay-scaffold';
import { getOverlayFramework } from './templates';

const OVERLAYS_ROOT = 'overlays';
const SCAFFOLD_ALWAYS_REFRESH = new Set(['vite.config.ts']);

function overlayDir(id: string): string {
	return `${OVERLAYS_ROOT}/${id}`;
}

export { overlayDir };

export async function listOverlayProjects(): Promise<SaveOverlayInput[]> {
	const rows = await getOverlays();

	return rows.map((row) => ({
		id: row.id,
		name: row.name,
		template: row.template,
		config: row.config ?? {},
		version: row.version ?? 0,
		expectedEvents: row.expectedEvents ?? [],
		requiredPlugins: row.requiredPlugins ?? [],
		installedActionKeys: row.installedActionKeys ?? []
	}));
}

export async function createOverlayProject(
	fs: Filesystem,
	input: {
		id: string;
		name: string;
		framework: OverlayFrameworkId;
	}
): Promise<SaveOverlayInput> {
	const framework = getOverlayFramework(input.framework);
	const dir = overlayDir(input.id);

	await fs.mkdir(dir, { baseDir: BaseDirectory.AppData, recursive: true });
	await fs.mkdir(`${dir}/dist`, { baseDir: BaseDirectory.AppData, recursive: true });

	if (input.framework !== 'vanilla') {
		await fs.mkdir(`${dir}/src`, { baseDir: BaseDirectory.AppData, recursive: true });
	}

	for (const file of getOverlayScaffoldFiles(input.framework, input.name, input.id)) {
		await writeOverlayFileRaw(`${dir}/${file.path}`, file.content);
	}

	const manifest = createOverlayManifest({
		id: input.id,
		name: input.name,
		framework: input.framework,
		expectedEvents: framework.expectedEvents
	});

	await writeOverlayFile(input.id, 'manifest.json', serializeOverlayManifest(manifest));

	const defaultConfig = collectOverlayDefaultConfig(manifest.settings);

	const record: SaveOverlayInput = {
		id: input.id,
		name: input.name,
		template: input.framework,
		config: defaultConfig,
		version: manifest.version ?? 0,
		expectedEvents: manifest.expectedEvents,
		requiredPlugins: manifest.requiredPlugins ?? [],
		installedActionKeys: []
	};

	await saveOverlay(record);

	return record;
}

export async function updateOverlayMetadata(record: SaveOverlayInput): Promise<void> {
	await saveOverlay(record);

	const existingManifest = await readOverlayManifestIfExists(record.id);
	let manifest: OverlayManifest;

	if (existingManifest) {
		manifest = {
			...existingManifest,
			id: record.id,
			name: record.name
		};
	} else if (await overlayManifestExists(record.id)) {
		throw new Error('Could not parse manifest.json. Fix the file before updating this overlay.');
	} else {
		manifest = createOverlayManifest({
			id: record.id,
			name: record.name,
			framework: record.template as OverlayFrameworkId,
			expectedEvents: record.expectedEvents
		});
	}

	await writeOverlayFile(record.id, 'manifest.json', serializeOverlayManifest(manifest));
	await syncOverlayScaffoldMetadata(record.id, record.name, record.template as OverlayFrameworkId);
	await ensureOverlayManifestEditorSupport(record.id);
}

export async function ensureOverlayManifestEditorSupport(id: string): Promise<void> {
	const schemaPath = `${overlayDir(id)}/${OVERLAY_MANIFEST_SCHEMA_FILE}`;
	const { exists, readTextFile } = await import('@tauri-apps/plugin-fs');

	if (!(await exists(schemaPath, { baseDir: BaseDirectory.AppData }))) {
		await writeOverlayFileRaw(schemaPath, getOverlayManifestSchemaContent());
	}

	const manifestPath = `${overlayDir(id)}/manifest.json`;

	if (!(await exists(manifestPath, { baseDir: BaseDirectory.AppData }))) {
		return;
	}

	const raw = await readTextFile(manifestPath, { baseDir: BaseDirectory.AppData });

	let rawParsed: Record<string, unknown>;

	try {
		rawParsed = JSON.parse(raw) as Record<string, unknown>;
	} catch {
		throw new Error('manifest.json contains invalid JSON');
	}

	let parsed: OverlayManifest;

	try {
		parsed = parseOverlayManifest(rawParsed);
	} catch (error) {
		throw new Error(
			error instanceof Error ? error.message : 'Could not parse manifest.json'
		);
	}

	const hadSchema = typeof rawParsed.$schema === 'string';

	if (!hadSchema) {
		await writeOverlayFile(id, 'manifest.json', serializeOverlayManifest(parsed));
	}
}

async function overlayManifestExists(id: string): Promise<boolean> {
	const { exists } = await import('@tauri-apps/plugin-fs');

	return exists(`${overlayDir(id)}/manifest.json`, { baseDir: BaseDirectory.AppData });
}

async function readOverlayManifestIfExists(id: string): Promise<OverlayManifest | null> {
	const { exists, readTextFile } = await import('@tauri-apps/plugin-fs');
	const path = `${overlayDir(id)}/manifest.json`;

	if (!(await exists(path, { baseDir: BaseDirectory.AppData }))) {
		return null;
	}

	const raw = await readTextFile(path, { baseDir: BaseDirectory.AppData });

	try {
		return parseOverlayManifest(JSON.parse(raw));
	} catch (error) {
		throw new Error(
			error instanceof Error ? error.message : 'Could not parse manifest.json'
		);
	}
}

export async function removeOverlayProject(fs: Filesystem, id: string): Promise<void> {
	await deleteOverlay(id);

	const dir = overlayDir(id);

	if (await fs.exists(dir, { baseDir: BaseDirectory.AppData })) {
		await fs.remove(dir, { baseDir: BaseDirectory.AppData, recursive: true });
	}
}

export async function isOverlayBuilt(id: string): Promise<boolean> {
	const { exists } = await import('@tauri-apps/plugin-fs');
	const indexPath = `${overlayDir(id)}/dist/index.html`;

	return exists(indexPath, { baseDir: BaseDirectory.AppData });
}

export async function ensureOverlayScaffold(
	id: string,
	name: string,
	framework: OverlayFrameworkId
): Promise<void> {
	for (const file of getOverlayScaffoldFiles(framework, name, id)) {
		const target = `${overlayDir(id)}/${file.path}`;
		const { exists } = await import('@tauri-apps/plugin-fs');

		if (!SCAFFOLD_ALWAYS_REFRESH.has(file.path) && (await exists(target, { baseDir: BaseDirectory.AppData }))) {
			continue;
		}

		await writeOverlayFileRaw(target, file.content);
	}
}

export async function syncOverlayScaffoldMetadata(
	id: string,
	name: string,
	framework: OverlayFrameworkId
): Promise<void> {
	for (const path of getOverlayScaffoldMetadataPaths()) {
		const file = getOverlayScaffoldFile(framework, name, id, path);

		if (!file) {
			continue;
		}

		await writeOverlayFileRaw(`${overlayDir(id)}/${path}`, file.content);
	}
}

async function writeOverlayFile(id: string, relativePath: string, content: string): Promise<void> {
	await writeOverlayFileRaw(`${overlayDir(id)}/${relativePath}`, content);
}

export async function writeOverlayFileRaw(path: string, content: string): Promise<void> {
	const { writeTextFile, mkdir } = await import('@tauri-apps/plugin-fs');
	const parts = path.split('/');

	if (parts.length > 2) {
		const dir = parts.slice(0, -1).join('/');
		await mkdir(dir, { baseDir: BaseDirectory.AppData, recursive: true });
	}

	await writeTextFile(path, content, { baseDir: BaseDirectory.AppData });
}

export function getOverlayProjectDir(id: string): string {
	return overlayDir(id);
}
