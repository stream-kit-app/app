import type { Filesystem } from '../filesystem';
import type { OverlayManifest, OverlayProjectFile, OverlayTemplateId } from './types';

import { BaseDirectory } from '@tauri-apps/plugin-fs';

import { deleteOverlay, getOverlays, saveOverlay, type SaveOverlayInput } from '$db/repositories/overlays';

import {
	OVERLAY_INDEX_HTML,
	OVERLAY_MAIN_JS,
	overlayIndexHtmlNeedsMigration,
	overlayMainJsNeedsMigration
} from './build/overlay-dist';
import {
	OVERLAY_ENTRY_PATH,
	isAllowedOverlayFileName,
	isOverlayScaffoldSourceFile,
	overlayFileName
} from './overlay-source-file';
import { getOverlayTemplate } from './templates';
import {
	getOverlayScaffoldFile,
	getOverlayScaffoldFiles,
	getOverlayScaffoldMetadataPaths,
	getOverlayScaffoldRefreshPaths
} from './overlay-scaffold';

const OVERLAYS_ROOT = 'overlays';

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
		width: row.width,
		height: row.height,
		config: row.config ?? {},
		expectedEvents: row.expectedEvents ?? []
	}));
}

export async function createOverlayProject(
	fs: Filesystem,
	input: {
		id: string;
		name: string;
		template: OverlayTemplateId;
	}
): Promise<SaveOverlayInput> {
	const template = getOverlayTemplate(input.template);
	const dir = overlayDir(input.id);

	await fs.mkdir(dir, { baseDir: BaseDirectory.AppData, recursive: true });
	await fs.mkdir(`${dir}/src`, { baseDir: BaseDirectory.AppData, recursive: true });
	await fs.mkdir(`${dir}/dist`, { baseDir: BaseDirectory.AppData, recursive: true });

	for (const file of template.files) {
		await fs.writeTextFile(`${dir}/${file.path}`, file.content, {
			baseDir: BaseDirectory.AppData
		});
	}

	await writeOverlayScaffold(input.id, input.name, { overwrite: true });

	const manifest: OverlayManifest = {
		id: input.id,
		name: input.name,
		width: template.width,
		height: template.height,
		entry: 'src/App.svelte',
		expectedEvents: template.expectedEvents,
		template: input.template
	};

	await fs.writeTextFile(`${dir}/manifest.json`, JSON.stringify(manifest, null, 2), {
		baseDir: BaseDirectory.AppData
	});

	const record: SaveOverlayInput = {
		id: input.id,
		name: input.name,
		template: input.template,
		width: template.width,
		height: template.height,
		config: {},
		expectedEvents: template.expectedEvents
	};

	await saveOverlay(record);

	return record;
}

export async function updateOverlayMetadata(record: SaveOverlayInput): Promise<void> {
	await saveOverlay(record);

	const manifest: OverlayManifest = {
		id: record.id,
		name: record.name,
		width: record.width,
		height: record.height,
		entry: 'src/App.svelte',
		expectedEvents: record.expectedEvents,
		template: record.template as OverlayTemplateId
	};

	await writeOverlayFile(record.id, 'manifest.json', JSON.stringify(manifest, null, 2));
	await syncOverlayScaffoldMetadata(record.id, record.name);
}

export async function removeOverlayProject(fs: Filesystem, id: string): Promise<void> {
	await deleteOverlay(id);

	const dir = overlayDir(id);

	if (await fs.exists(dir, { baseDir: BaseDirectory.AppData })) {
		await fs.remove(dir, { baseDir: BaseDirectory.AppData, recursive: true });
	}
}

export async function readOverlaySourceFiles(id: string): Promise<OverlayProjectFile[]> {
	const { exists, readDir, readTextFile } = await import('@tauri-apps/plugin-fs');
	const files: OverlayProjectFile[] = [];
	const srcRoot = `${overlayDir(id)}/src`;

	if (!(await exists(srcRoot, { baseDir: BaseDirectory.AppData }))) {
		return files;
	}

	async function walk(relativeDir: string, projectPrefix: string): Promise<void> {
		const entries = await readDir(relativeDir, { baseDir: BaseDirectory.AppData });

		for (const entry of entries) {
			const fullPath = `${relativeDir}/${entry.name}`;
			const projectPath = projectPrefix ? `${projectPrefix}/${entry.name}` : entry.name;

			if (entry.isDirectory) {
				await walk(fullPath, projectPath);
				continue;
			}

			if (!/\.(svelte\.ts|svelte|ts|json)$/i.test(entry.name)) {
				continue;
			}

			if (!isAllowedOverlayFileName(entry.name)) {
				continue;
			}

			if (isOverlayScaffoldSourceFile(projectPath)) {
				continue;
			}

			files.push({
				path: projectPath,
				content: await readTextFile(fullPath, { baseDir: BaseDirectory.AppData })
			});
		}
	}

	await walk(srcRoot, 'src');

	return files;
}

export async function writeOverlaySourceFile(
	id: string,
	path: string,
	content: string
): Promise<void> {
	if (!path.startsWith('src/')) {
		throw new Error('Overlay source files must live under src/');
	}

	if (path !== OVERLAY_ENTRY_PATH && !isAllowedOverlayFileName(overlayFileName(path))) {
		throw new Error(`Unsupported overlay source file: ${path}`);
	}

	if (isOverlayScaffoldSourceFile(path)) {
		throw new Error(`Cannot modify scaffold file: ${path}`);
	}

	await writeOverlayFile(id, path, content);
}

export async function removeOverlaySourceFile(id: string, path: string): Promise<void> {
	if (path === OVERLAY_ENTRY_PATH) {
		throw new Error('Cannot delete App.svelte');
	}

	const { remove } = await import('@tauri-apps/plugin-fs');
	const target = `${overlayDir(id)}/${path}`;

	if (await import('@tauri-apps/plugin-fs').then((module) =>
		module.exists(target, { baseDir: BaseDirectory.AppData })
	)) {
		await remove(target, { baseDir: BaseDirectory.AppData });
	}
}

export async function renameOverlaySourceFile(
	id: string,
	fromPath: string,
	toPath: string
): Promise<void> {
	if (fromPath === OVERLAY_ENTRY_PATH || toPath === OVERLAY_ENTRY_PATH) {
		throw new Error('Cannot rename App.svelte');
	}

	if (!toPath.startsWith('src/') || !isAllowedOverlayFileName(overlayFileName(toPath))) {
		throw new Error(`Invalid overlay source path: ${toPath}`);
	}

	const { readTextFile } = await import('@tauri-apps/plugin-fs');
	const from = `${overlayDir(id)}/${fromPath}`;
	const content = await readTextFile(from, { baseDir: BaseDirectory.AppData });

	await writeOverlaySourceFile(id, toPath, content);
	await removeOverlaySourceFile(id, fromPath);
}

export async function writeOverlayDistFiles(
	id: string,
	files: OverlayProjectFile[]
): Promise<void> {
	const distDir = `${overlayDir(id)}/dist`;

	for (const file of files) {
		const target = `${distDir}/${file.path}`;

		if (file.path.includes('/')) {
			const parts = file.path.split('/');
			parts.pop();
			await mkdirOverlay(`${distDir}/${parts.join('/')}`);
		}

		await writeOverlayFileRaw(target, file.content);
	}
}

async function mkdirOverlay(path: string): Promise<void> {
	const { mkdir } = await import('@tauri-apps/plugin-fs');

	await mkdir(path, { baseDir: BaseDirectory.AppData, recursive: true });
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

export async function migrateOverlayDist(id: string): Promise<boolean> {
	const { exists, readTextFile } = await import('@tauri-apps/plugin-fs');
	const distDir = `${overlayDir(id)}/dist`;
	let changed = false;

	const mainPath = `${distDir}/main.js`;
	if (await exists(mainPath, { baseDir: BaseDirectory.AppData })) {
		const mainJs = await readTextFile(mainPath, { baseDir: BaseDirectory.AppData });

		if (overlayMainJsNeedsMigration(mainJs)) {
			await writeOverlayFileRaw(mainPath, OVERLAY_MAIN_JS);
			changed = true;
		}
	}

	const indexPath = `${distDir}/index.html`;
	if (await exists(indexPath, { baseDir: BaseDirectory.AppData })) {
		const indexHtml = await readTextFile(indexPath, { baseDir: BaseDirectory.AppData });

		if (overlayIndexHtmlNeedsMigration(indexHtml)) {
			await writeOverlayFileRaw(indexPath, OVERLAY_INDEX_HTML);
			changed = true;
		}
	}

	return changed;
}

export async function migrateAllOverlayDist(ids: string[]): Promise<void> {
	for (const id of ids) {
		await migrateOverlayDist(id);
	}
}

export async function migrateAllOverlayProjects(
	items: Pick<SaveOverlayInput, 'id' | 'name'>[]
): Promise<void> {
	for (const item of items) {
		await migrateOverlayDist(item.id);
		await ensureOverlayScaffold(item.id, item.name);
	}
}

async function writeOverlayScaffold(
	id: string,
	name: string,
	options: { overwrite?: boolean } = {}
): Promise<void> {
	const { exists } = await import('@tauri-apps/plugin-fs');
	const refreshPaths = new Set(getOverlayScaffoldRefreshPaths());

	for (const file of getOverlayScaffoldFiles(name, id)) {
		const target = `${overlayDir(id)}/${file.path}`;

		if (
			!options.overwrite &&
			!refreshPaths.has(file.path) &&
			(await exists(target, { baseDir: BaseDirectory.AppData }))
		) {
			continue;
		}

		await writeOverlayFileRaw(target, file.content);
	}
}

export async function ensureOverlayScaffold(id: string, name: string): Promise<void> {
	await writeOverlayScaffold(id, name);
}

async function syncOverlayScaffoldMetadata(id: string, name: string): Promise<void> {
	for (const path of getOverlayScaffoldMetadataPaths()) {
		const file = getOverlayScaffoldFile(name, id, path);

		if (!file) {
			continue;
		}

		await writeOverlayFileRaw(`${overlayDir(id)}/${path}`, file.content);
	}
}

export function getOverlayProjectDir(id: string): string {
	return overlayDir(id);
}
