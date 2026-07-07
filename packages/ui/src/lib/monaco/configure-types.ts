import type { MonacoExtraLib } from './types';

const DEFAULT_COMPILER_OPTIONS = {
	target: 99, // ESNext
	module: 99, // ESNext
	moduleResolution: 2, // NodeJs
	strict: true,
	skipLibCheck: true,
	allowJs: true,
	isolatedModules: true,
	noEmit: true,
	allowNonTsExtensions: true,
	esModuleInterop: true
} as const;

let configuredLibSignature = '';

type MonacoTsLanguage = {
	typescriptDefaults: {
		setCompilerOptions(options: Record<string, unknown>): void;
		getCompilerOptions(): Record<string, unknown>;
		setDiagnosticsOptions(options: Record<string, unknown>): void;
		setExtraLibs(libs: { content: string; filePath: string }[]): void;
	};
};

export async function configureMonacoTypescript(extraLibs: MonacoExtraLib[] = []): Promise<void> {
	const signature = extraLibs
		.map((lib) => `${lib.filePath ?? ''}\0${lib.content}`)
		.join('\0');

	if (signature === configuredLibSignature) {
		return;
	}

	configuredLibSignature = signature;

	const monaco = await import('monaco-editor');
	const { typescriptDefaults } = (monaco.languages as unknown as { typescript: MonacoTsLanguage })
		.typescript;

	typescriptDefaults.setCompilerOptions({
		...typescriptDefaults.getCompilerOptions(),
		...DEFAULT_COMPILER_OPTIONS
	});

	typescriptDefaults.setDiagnosticsOptions({
		noSemanticValidation: false,
		noSyntaxValidation: false,
		noSuggestionDiagnostics: false
	});

	typescriptDefaults.setExtraLibs(
		extraLibs.map((lib) => ({
			content: lib.content,
			filePath: lib.filePath ?? 'file:///node_modules/@stream-kit/script-api/index.d.ts'
		}))
	);
}
