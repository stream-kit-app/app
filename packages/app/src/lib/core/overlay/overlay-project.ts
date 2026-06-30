import type { Filesystem } from '../filesystem';
import type { OverlayFrameworkId, OverlayManifest } from './types';

import { BaseDirectory } from '@tauri-apps/plugin-fs';

import { deleteOverlay, getOverlays, saveOverlay, type SaveOverlayInput } from '$db/repositories/overlays';

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
		expectedEvents: row.expectedEvents ?? []
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

	const manifest: OverlayManifest = {
		id: input.id,
		name: input.name,
		framework: input.framework,
		expectedEvents: framework.expectedEvents
	};

	await writeOverlayFile(input.id, 'manifest.json', JSON.stringify(manifest, null, 2));

	const record: SaveOverlayInput = {
		id: input.id,
		name: input.name,
		template: input.framework,
		config: {},
		expectedEvents: framework.expectedEvents
	};

	await saveOverlay(record);

	return record;
}

export async function updateOverlayMetadata(record: SaveOverlayInput): Promise<void> {
	await saveOverlay(record);

	const manifest: OverlayManifest = {
		id: record.id,
		name: record.name,
		framework: record.template as OverlayFrameworkId,
		expectedEvents: record.expectedEvents
	};

	await writeOverlayFile(record.id, 'manifest.json', JSON.stringify(manifest, null, 2));
	await syncOverlayScaffoldMetadata(record.id, record.name, record.template as OverlayFrameworkId);
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

async function syncOverlayScaffoldMetadata(
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

async function writeOverlayFileRaw(path: string, content: string): Promise<void> {
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
