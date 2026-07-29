import { strToU8, zipSync, type Zippable } from 'fflate';
import { BaseDirectory } from '@tauri-apps/plugin-fs';

import type { OverlayManifest, OverlayProjectFile } from './types';

import { ensureOverlayScaffold, overlayDir } from './overlay-project';

const EXPORT_SKIP_DIRS = new Set(['dist', 'node_modules']);

export async function readOverlayExportFiles(id: string): Promise<OverlayProjectFile[]> {
	const { exists, readDir, readTextFile } = await import('@tauri-apps/plugin-fs');
	const root = overlayDir(id);
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

export async function buildOverlayProjectZip(overlayId: string): Promise<Uint8Array> {
	const { readTextFile } = await import('@tauri-apps/plugin-fs');
	const manifest = JSON.parse(
		await readTextFile(`${overlayDir(overlayId)}/manifest.json`, {
			baseDir: BaseDirectory.AppData
		})
	) as OverlayManifest;

	await ensureOverlayScaffold(overlayId, manifest.name, manifest.framework);

	const files = await readOverlayExportFiles(overlayId);

	if (files.length === 0) {
		throw new Error('Overlay export has no project files');
	}

	const tree: Zippable = {};

	for (const file of files) {
		tree[file.path] = strToU8(file.content);
	}

	return zipSync(tree, { level: 6 });
}

/** Zip only `dist/` for cloud publish (binary-safe). */
export async function buildOverlayDistZip(overlayId: string): Promise<Uint8Array> {
	const { exists, readDir, readFile } = await import('@tauri-apps/plugin-fs');
	const root = `${overlayDir(overlayId)}/dist`;

	if (!(await exists(`${root}/index.html`, { baseDir: BaseDirectory.AppData }))) {
		throw new Error('Overlay is not built');
	}

	const tree: Zippable = {};

	async function walk(relativeDir: string, zipPrefix: string): Promise<void> {
		const entries = await readDir(relativeDir, { baseDir: BaseDirectory.AppData });

		for (const entry of entries) {
			const fullPath = `${relativeDir}/${entry.name}`;
			const zipPath = zipPrefix ? `${zipPrefix}/${entry.name}` : entry.name;

			if (entry.isDirectory) {
				await walk(fullPath, zipPath);
				continue;
			}

			tree[zipPath] = await readFile(fullPath, { baseDir: BaseDirectory.AppData });
		}
	}

	await walk(root, '');

	if (Object.keys(tree).length === 0) {
		throw new Error('Overlay dist is empty');
	}

	return zipSync(tree, { level: 6 });
}

export { overlayProjectSlug } from './overlay-scaffold';
