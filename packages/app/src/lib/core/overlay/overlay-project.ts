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
import { getOverlayTemplate } from './templates';

const OVERLAYS_ROOT = 'overlays';

function overlayDir(id: string): string {
	return `${OVERLAYS_ROOT}/${id}`;
}

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
	await fs.writeTextFile(`${dir}/context.json`, JSON.stringify(template.context, null, 2), {
		baseDir: BaseDirectory.AppData
	});

	const record: SaveOverlayInput = {
		id: input.id,
		name: input.name,
		template: input.template,
		width: template.width,
		height: template.height,
		config: template.context,
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
	await writeOverlayFile(record.id, 'context.json', JSON.stringify(record.config, null, 2));
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

			if (!/\.(svelte|ts|js)$/i.test(entry.name)) {
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
	await writeOverlayFile(id, path, content);
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
