import type { Environment } from 'monaco-editor/editor/editor.api';

declare global {
	// eslint-disable-next-line no-var
	var MonacoEnvironment: Environment | undefined;
}

export {};
