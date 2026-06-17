import type { OverlayProjectFile } from './types';

import { strToU8, zipSync, type Zippable } from 'fflate';
import { BaseDirectory } from '@tauri-apps/plugin-fs';

import { OVERLAY_ENTRY_PATH } from './overlay-source-file';
import { ensureOverlayScaffold, overlayDir } from './overlay-project';
import type { OverlayManifest } from './types';

const EXPORT_SKIP_FILES = new Set(['manifest.json']);
const EXPORT_SKIP_DIRS = new Set(['dist']);

function overlayProjectPath(id: string): string {
	return overlayDir(id);
}

export async function readOverlayExportFiles(id: string): Promise<OverlayProjectFile[]> {
	const { exists, readDir, readTextFile } = await import('@tauri-apps/plugin-fs');
	const root = overlayProjectPath(id);
	const files: OverlayProjectFile[] = [];

	if (!(await exists(root, { baseDir: BaseDirectory.AppData }))) {
		throw new Error('Overlay project not found');
	}

	async function walk(relativeDir: string, projectPrefix: string): Promise<void> {
		const entries = await readDir(relativeDir, { baseDir: BaseDirectory.AppData });

		for (const entry of entries) {
			if (entry.isDirectory && EXPORT_SKIP_DIRS.has(entry.name)) {
				continue;
			}

			const fullPath = `${relativeDir}/${entry.name}`;
			const projectPath = projectPrefix ? `${projectPrefix}/${entry.name}` : entry.name;

			if (entry.isDirectory) {
				await walk(fullPath, projectPath);
				continue;
			}

			if (EXPORT_SKIP_FILES.has(entry.name) && !projectPrefix) {
				continue;
			}

			files.push({
				path: projectPath,
				content: await readTextFile(fullPath, { baseDir: BaseDirectory.AppData })
			});
		}
	}

	await walk(root, '');

	return files.map((file) => ({
		path: file.path.replace(/^\//, ''),
		content: file.content
	}));
}

/**
 * Build a standalone, runnable Svelte project archive from files on disk.
 */
export async function buildOverlayProjectZip(overlayId: string): Promise<Uint8Array> {
	const { readTextFile } = await import('@tauri-apps/plugin-fs');
	const manifest = JSON.parse(
		await readTextFile(`${overlayProjectPath(overlayId)}/manifest.json`, {
			baseDir: BaseDirectory.AppData
		})
	) as OverlayManifest;

	await ensureOverlayScaffold(overlayId, manifest.name);

	const files = await readOverlayExportFiles(overlayId);

	if (!files.some((file) => file.path === OVERLAY_ENTRY_PATH)) {
		throw new Error(`Overlay export is missing ${OVERLAY_ENTRY_PATH}`);
	}

	const tree: Zippable = {};

	for (const file of files) {
		tree[file.path] = strToU8(file.content);
	}

	return zipSync(tree, { level: 6 });
}

export { overlayProjectSlug } from './overlay-scaffold';
