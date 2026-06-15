import type { LanguageServerConfig } from '@stream-kit/ui/codemirror';
import type { OverlayProjectFile } from '$lib/core/overlay/types';
import { VIRTUAL_EDITORCONFIG, VIRTUAL_PRETTIERRC } from '@stream-kit/ui/codemirror';

import overlaySdkTypes from '../../../static/overlay-sdk/index.d.ts?raw';
import svelteTypes from './overlay-svelte-types.d.ts?raw';
import { OVERLAY_ENTRY_PATH } from '$lib/core/overlay/overlay-source-file';

const OVERLAY_PACKAGE_JSON = {
	name: 'overlay-project',
	private: true,
	type: 'module',
	dependencies: {
		svelte: '^5.56.1',
		'@stream-kit/overlay-sdk': '0.1.0'
	}
} as const;

// NOTE: The in-browser Svelte language server (svelte-language-server-web) bundles
// TypeScript 4.9. Keep these options within the TS 4.9 feature set. TS 5.0+ options such as
// `moduleResolution: "bundler"`, `allowImportingTsExtensions`, and `verbatimModuleSyntax`
// are silently rejected by TS 4.9 and break module resolution (it falls back to classic
// resolution, so even extensionless relative imports stop resolving). `moduleResolution:
// "node"` lets the editor resolve relative imports (`./util`) and bare imports
// (`@stream-kit/overlay-sdk`) the same way the esbuild bundler does.
const OVERLAY_TSCONFIG = {
	compilerOptions: {
		target: 'ESNext',
		module: 'ESNext',
		moduleResolution: 'node',
		resolveJsonModule: true,
		esModuleInterop: true,
		strict: true,
		skipLibCheck: true,
		allowJs: true,
		isolatedModules: true,
		noEmit: true,
		types: ['svelte'],
		baseUrl: '.',
		paths: {
			'@stream-kit/overlay-sdk': ['./node_modules/@stream-kit/overlay-sdk/index.d.ts']
		}
	},
	include: [
		'src/**/*.ts',
		'src/**/*.svelte.ts',
		'src/**/*.d.ts',
		'src/**/*.svelte',
		'src/app.d.ts',
		'svelte.config.js',
		'node_modules/@stream-kit/overlay-sdk/**/*.d.ts'
	]
};

const OVERLAY_SVELTE_CONFIG = `export default {
	compilerOptions: {
		runes: true
	}
};
`;

const OVERLAY_APP_D_TS = `/// <reference types="svelte" />

declare module '*.svelte' {
	import type { Component } from 'svelte';

	const component: Component;
	export default component;
}

declare global {
	interface Window {
		__OVERLAY_CONTEXT__?: {
			overlayId: string;
			context: Record<string, unknown>;
		};
	}
}

export {};
`;

const OVERLAY_SDK_PACKAGE_JSON = JSON.stringify(
	{
		name: '@stream-kit/overlay-sdk',
		version: '0.1.0',
		type: 'module',
		types: './index.d.ts',
		exports: {
			'.': {
				types: './index.d.ts',
				import: './index.js',
				default: './index.js'
			}
		}
	},
	null,
	2
);

const OVERLAY_SDK_INDEX_JS = `export function createOverlay() {
	throw new Error('@stream-kit/overlay-sdk is only available in the overlay runtime');
}
`;

const OVERLAY_TYPE_ACQUISITION_PACKAGE_JSON = {
	name: 'overlay-project',
	private: true,
	type: 'module',
	dependencies: {
		svelte: '^5.56.1'
	}
} as const;

const OVERLAY_SVELTE_PACKAGE_JSON = JSON.stringify(
	{
		name: 'svelte',
		version: '5.56.1',
		types: './types/index.d.ts'
	},
	null,
	2
);

function toWorkspaceUri(path: string): string {
	return path.startsWith('file:///') ? path : `file:///${path}`;
}

function toWorkspaceFiles(sourceFiles: OverlayProjectFile[]): Record<string, string> {
	const workspace: Record<string, string> = {
		'file:///package.json': JSON.stringify(OVERLAY_PACKAGE_JSON, null, 2),
		'file:///.editorconfig': VIRTUAL_EDITORCONFIG,
		'file:///.prettierrc': VIRTUAL_PRETTIERRC,
		'file:///tsconfig.json': JSON.stringify(OVERLAY_TSCONFIG, null, 2),
		'file:///svelte.config.js': OVERLAY_SVELTE_CONFIG,
		'file:///src/app.d.ts': OVERLAY_APP_D_TS,
		'file:///node_modules/svelte/package.json': OVERLAY_SVELTE_PACKAGE_JSON,
		'file:///node_modules/svelte/types/index.d.ts': svelteTypes,
		'file:///node_modules/@stream-kit/overlay-sdk/package.json': OVERLAY_SDK_PACKAGE_JSON,
		'file:///node_modules/@stream-kit/overlay-sdk/index.d.ts': overlaySdkTypes,
		'file:///node_modules/@stream-kit/overlay-sdk/index.js': OVERLAY_SDK_INDEX_JS
	};

	for (const file of sourceFiles) {
		workspace[toWorkspaceUri(file.path)] = file.content;
	}

	return workspace;
}

function overlayLspKind(_path: string): LanguageServerConfig['kind'] {
	return 'svelte';
}

function buildOverlayLspWorkspace(
	sourceFiles: OverlayProjectFile[],
	activeDocumentPath = OVERLAY_ENTRY_PATH
): LanguageServerConfig {
	return {
		kind: overlayLspKind(activeDocumentPath),
		workspace: toWorkspaceFiles(sourceFiles),
		rootUri: 'file:///',
		documentUri: toWorkspaceUri(activeDocumentPath),
		packageJson: { ...OVERLAY_TYPE_ACQUISITION_PACKAGE_JSON }
	};
}

export {
	OVERLAY_ENTRY_PATH,
	OVERLAY_PACKAGE_JSON,
	buildOverlayLspWorkspace,
	toWorkspaceFiles,
	toWorkspaceUri
};
