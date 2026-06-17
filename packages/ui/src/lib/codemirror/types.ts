export type CodeLanguage = 'typescript' | 'javascript' | 'svelte' | 'json';

export type LanguageServerKind = 'typescript';

export type LanguageServerConfig = {
	kind: LanguageServerKind;
	workspace: Record<string, string>;
	rootUri: string;
	documentUri: string;
	/** Parsed package.json for automatic type acquisition (npm/jsdelivr). */
	packageJson?: Record<string, unknown>;
};
