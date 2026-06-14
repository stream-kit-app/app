import type { LanguageServerConfig } from '@stream-kit/ui/codemirror';
import { VIRTUAL_EDITORCONFIG, VIRTUAL_PRETTIERRC } from '@stream-kit/ui/codemirror';

/** Curated ambient types exposed to user scripts in the code editor. */
export const SCRIPT_API_TYPES = `
/** One trigger payload passed to script handlers. Always provided as an array. */
declare type HandlerTriggerContext = {
\ttrigger: string;
\tdata: unknown;
};
`;

const SCRIPT_DOCUMENT_URI = 'file:///src/handler.ts';

const SCRIPT_PACKAGE_JSON = {
	name: 'stream-kit-script',
	private: true,
	type: 'module'
} as const;

const SCRIPT_TSCONFIG = {
	compilerOptions: {
		target: 'ESNext',
		module: 'ESNext',
		moduleResolution: 'bundler',
		strict: true,
		skipLibCheck: true,
		allowJs: true,
		isolatedModules: true,
		noEmit: true
	},
	include: ['src/**/*.ts', 'node_modules/@stream-kit/script-api/**/*.d.ts']
};

function toScriptWorkspaceFiles(scriptSource: string): Record<string, string> {
	return {
		'file:///package.json': JSON.stringify(SCRIPT_PACKAGE_JSON, null, 2),
		'file:///.editorconfig': VIRTUAL_EDITORCONFIG,
		'file:///.prettierrc': VIRTUAL_PRETTIERRC,
		'file:///tsconfig.json': JSON.stringify(SCRIPT_TSCONFIG, null, 2),
		'file:///src/handler.ts': scriptSource,
		'file:///node_modules/@stream-kit/script-api/package.json': JSON.stringify(
			{
				name: '@stream-kit/script-api',
				version: '0.0.0',
				exports: {
					'.': {
						types: './index.d.ts'
					}
				}
			},
			null,
			2
		),
		'file:///node_modules/@stream-kit/script-api/index.d.ts': SCRIPT_API_TYPES
	};
}

function buildScriptLspWorkspace(scriptSource = ''): LanguageServerConfig {
	return {
		kind: 'typescript',
		workspace: toScriptWorkspaceFiles(scriptSource),
		rootUri: 'file:///',
		documentUri: SCRIPT_DOCUMENT_URI,
		packageJson: { ...SCRIPT_PACKAGE_JSON }
	};
}

export { SCRIPT_DOCUMENT_URI, buildScriptLspWorkspace, toScriptWorkspaceFiles };
