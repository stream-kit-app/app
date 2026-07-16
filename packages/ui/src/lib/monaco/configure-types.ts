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
	javascriptDefaults: {
		setCompilerOptions(options: Record<string, unknown>): void;
		setDiagnosticsOptions(options: Record<string, unknown>): void;
		setExtraLibs(libs: { content: string; filePath: string }[]): void;
	};
};

export type ConfigureMonacoTypescriptOptions = {
	force?: boolean;
};

export async function configureMonacoTypescript(
	extraLibs: MonacoExtraLib[] = [],
	options: ConfigureMonacoTypescriptOptions = {}
): Promise<void> {
	if (extraLibs.length === 0) {
		return;
	}

	const signature = extraLibs
		.map((lib) => `${lib.filePath ?? ''}\0${lib.content}`)
		.join('\0');

	if (!options.force && signature === configuredLibSignature) {
		return;
	}

	configuredLibSignature = signature;

	const monaco = await import('monaco-editor');
	const typescript = (monaco.languages as unknown as { typescript: MonacoTsLanguage }).typescript;
	const mappedLibs = extraLibs.map((lib) => ({
		content: lib.content,
		filePath: lib.filePath ?? 'file:///project/node_modules/@stream-kit/script-api/index.d.ts'
	}));

	for (const defaults of [typescript.typescriptDefaults, typescript.javascriptDefaults]) {
		defaults.setCompilerOptions({
			...DEFAULT_COMPILER_OPTIONS
		});

		defaults.setDiagnosticsOptions({
			noSemanticValidation: false,
			noSyntaxValidation: false,
			noSuggestionDiagnostics: false
		});

		defaults.setExtraLibs(mappedLibs);
	}
}
