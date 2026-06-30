import { runProgram, type RunProgramOptions } from '../process/run-program';

const EDITORS = ['cursor', 'code', 'code-insiders'] as const;
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

async function tryLaunchEditor(options: RunProgramOptions): Promise<void> {
	await runProgram({
		waitSeconds: 0,
		hideWindow: true,
		...options
	});
}

async function openFolderInEditor(editor: string, projectPath: string): Promise<void> {
	const folderUri = pathToFileUri(projectPath);
	const attempts: RunProgramOptions[] = [
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

export async function openProjectInEditor(
	projectPath: string,
	callbacks?: OpenProjectInEditorCallbacks
): Promise<OpenProjectInEditorResult> {
	let lastError = '';

	for (const editor of EDITORS) {
		try {
			await openFolderInEditor(editor, projectPath);
			return { opened: 'editor' };
		} catch (error) {
			lastError = error instanceof Error ? error.message : String(error);
		}
	}

	if (callbacks) {
		await callbacks.onOpenFolder(projectPath);
		await callbacks.onCopyPath(projectPath);
		await callbacks.onOpenUrl(VSCODE_DEV_URL);

		return { opened: 'folder', projectPath };
	}

	throw new Error(
		lastError ||
			'Install Cursor or VS Code and enable the shell command in PATH.'
	);
}
