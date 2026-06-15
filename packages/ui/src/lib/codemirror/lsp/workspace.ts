import type { WorkerRPC } from 'svelte-language-server-web';

/** Upload order matters: config and ambient types before the Svelte document. */
const SVELTE_WORKSPACE_UPLOAD_ORDER = [
	'file:///package.json',
	'file:///.editorconfig',
	'file:///.prettierrc',
	'file:///tsconfig.json',
	'file:///svelte.config.js',
	'file:///node_modules/svelte/package.json',
	'file:///node_modules/svelte/types/index.d.ts',
	'file:///node_modules/@stream-kit/overlay-sdk/package.json',
	'file:///node_modules/@stream-kit/overlay-sdk/index.d.ts',
	'file:///node_modules/@stream-kit/overlay-sdk/index.js',
	'file:///src/app.d.ts'
] as const;

/**
 * svelte-language-server-web skips the shortest key in batch {@link WorkerRPC.addFiles}
 * calls. Upload each virtual file individually so runes config and ambient types
 * are never dropped.
 */
export async function uploadWorkspaceToWorker(
	workerRpc: WorkerRPC,
	workspace: Record<string, string>
): Promise<void> {
	const uploaded = new Set<string>();

	for (const path of SVELTE_WORKSPACE_UPLOAD_ORDER) {
		const content = workspace[path];

		if (content === undefined) {
			continue;
		}

		await workerRpc.addFiles(path, content);
		uploaded.add(path);
	}

	for (const [path, content] of Object.entries(workspace)) {
		if (uploaded.has(path)) {
			continue;
		}

		await workerRpc.addFiles(path, content);
	}
}

export async function syncWorkspaceChangesToWorker(
	workerRpc: WorkerRPC,
	workspace: Record<string, string>,
	knownContent: Map<string, string>
): Promise<Map<string, string>> {
	const changed: Record<string, string> = {};

	for (const [path, content] of Object.entries(workspace)) {
		if (knownContent.get(path) !== content) {
			changed[path] = content;
		}
	}

	for (const path of knownContent.keys()) {
		if (!(path in workspace)) {
			await workerRpc.deleteFile(path);
			knownContent.delete(path);
		}
	}

	if (Object.keys(changed).length > 0) {
		await uploadWorkspaceToWorker(workerRpc, changed);

		for (const [path, content] of Object.entries(changed)) {
			knownContent.set(path, content);
		}
	}

	return knownContent;
}

export function pickWorkspaceFiles(
	workspace: Record<string, string>,
	paths: readonly string[]
): Record<string, string> {
	const picked: Record<string, string> = {};

	for (const path of paths) {
		const content = workspace[path];

		if (content !== undefined) {
			picked[path] = content;
		}
	}

	return picked;
}
