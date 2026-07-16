import { invoke } from '@tauri-apps/api/core';

import { runProgram, type RunProgramOptions } from '../process/run-program';

const FALLBACK_EDITORS = ['cursor', 'code', 'code-insiders'] as const;
const VSCODE_DEV_URL = 'https://vscode.dev/';

export type OpenProjectInEditorResult =
	| { opened: 'editor' }
	| { opened: 'folder'; projectPath: string };

export type OpenProjectInEditorCallbacks = {
	onOpenFolder: (path: string) => Promise<void>;
	onCopyPath: (path: string) => Promise<void>;
	onOpenUrl: (url: string) => Promise<void>;
};

function pathToFileUri(path: string): string {
	const normalized = path.replace(/\\/g, '/');

	if (/^[a-zA-Z]:/.test(normalized)) {
		return `file:///${normalized}`;
	}

	return `file://${normalized.startsWith('/') ? '' : '/'}${normalized}`;
}

function quotePath(path: string): string {
	return path.includes(' ') ? `"${path}"` : path;
}

async function resolveEditorCommands(): Promise<string[]> {
	try {
		const commands = await invoke<string[]>('resolve_editor_commands');

		if (commands.length > 0) {
			return commands;
		}
	} catch {
		// Fall back to shell command names when editor discovery is unavailable.
	}

	return [...FALLBACK_EDITORS];
}

async function tryLaunchEditor(options: RunProgramOptions): Promise<void> {
	await runProgram({
		waitSeconds: 0,
		hideWindow: true,
		...options
	});
}

async function openFolderInEditor(editor: string, projectPath: string): Promise<void> {
	const folderUri = pathToFileUri(projectPath);
	const quotedProjectPath = quotePath(projectPath);
	const attempts: RunProgramOptions[] = [
		{
			command: editor,
			arguments: quotedProjectPath
		},
		{
			command: editor,
			arguments: `--folder-uri "${folderUri}"`
		},
		{
			command: editor,
			workingDirectory: projectPath,
			arguments: '.'
		},
		{
			command: editor,
			workingDirectory: projectPath,
			arguments: '.',
			useShell: true
		},
		{
			command: editor,
			arguments: `--folder-uri "${folderUri}"`,
			useShell: true
		}
	];

	let lastError = '';

	for (const attempt of attempts) {
		try {
			await tryLaunchEditor(attempt);
			return;
		} catch (error) {
			lastError = error instanceof Error ? error.message : String(error);
		}
	}

	throw new Error(lastError || `failed to start ${editor}`);
}

async function runCallbacks(
	callbacks: OpenProjectInEditorCallbacks,
	projectPath: string
): Promise<void> {
	try {
		await callbacks.onOpenFolder(projectPath);
	} catch {
		// Folder open is best-effort when no editor CLI is available.
	}

	try {
		await callbacks.onCopyPath(projectPath);
	} catch {
		// Clipboard copy is best-effort.
	}

	try {
		await callbacks.onOpenUrl(VSCODE_DEV_URL);
	} catch {
		// Browser fallback is best-effort.
	}
}

export async function openProjectInEditor(
	projectPath: string,
	callbacks?: OpenProjectInEditorCallbacks
): Promise<OpenProjectInEditorResult> {
	const editors = await resolveEditorCommands();
	let lastError = '';

	for (const editor of editors) {
		try {
			await openFolderInEditor(editor, projectPath);
			return { opened: 'editor' };
		} catch (error) {
			lastError = error instanceof Error ? error.message : String(error);
		}
	}

	if (callbacks) {
		await runCallbacks(callbacks, projectPath);

		return { opened: 'folder', projectPath };
	}

	throw new Error(
		lastError ||
			'Install Cursor or VS Code and enable the shell command in PATH.'
	);
}
