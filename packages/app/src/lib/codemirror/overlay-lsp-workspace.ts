import type { LanguageServerConfig } from '@stream-kit/ui/codemirror';
import { VIRTUAL_EDITORCONFIG, VIRTUAL_PRETTIERRC } from '@stream-kit/ui/codemirror';

import overlaySdkTypes from '../../../static/overlay-sdk/index.d.ts?raw';
import svelteTypes from './overlay-svelte-types.d.ts?raw';

const OVERLAY_DOCUMENT_URI = 'file:///src/App.svelte';

const OVERLAY_PACKAGE_JSON = {
	name: 'overlay-project',
	private: true,
	type: 'module',
	dependencies: {
		svelte: '^5.56.1',
		'@stream-kit/overlay-sdk': '0.1.0'
	}
} as const;

const OVERLAY_TSCONFIG = {
	compilerOptions: {
		target: 'ESNext',
		module: 'ESNext',
		moduleResolution: 'bundler',
		verbatimModuleSyntax: true,
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

/** Runtime stub so bundler-style module resolution can pair JS with adjacent types. */
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

function toWorkspaceFiles(appSource: string): Record<string, string> {
	return {
		'file:///package.json': JSON.stringify(OVERLAY_PACKAGE_JSON, null, 2),
		'file:///.editorconfig': VIRTUAL_EDITORCONFIG,
		'file:///.prettierrc': VIRTUAL_PRETTIERRC,
		'file:///tsconfig.json': JSON.stringify(OVERLAY_TSCONFIG, null, 2),
		'file:///svelte.config.js': OVERLAY_SVELTE_CONFIG,
		'file:///src/app.d.ts': OVERLAY_APP_D_TS,
		'file:///src/App.svelte': appSource,
		'file:///node_modules/svelte/package.json': OVERLAY_SVELTE_PACKAGE_JSON,
		'file:///node_modules/svelte/types/index.d.ts': svelteTypes,
		'file:///node_modules/@stream-kit/overlay-sdk/package.json': OVERLAY_SDK_PACKAGE_JSON,
		'file:///node_modules/@stream-kit/overlay-sdk/index.d.ts': overlaySdkTypes,
		'file:///node_modules/@stream-kit/overlay-sdk/index.js': OVERLAY_SDK_INDEX_JS,
	};
}

function buildOverlayLspWorkspace(appSource: string): LanguageServerConfig {
	return {
		kind: 'svelte',
		workspace: toWorkspaceFiles(appSource),
		rootUri: 'file:///',
		documentUri: OVERLAY_DOCUMENT_URI,
		packageJson: { ...OVERLAY_TYPE_ACQUISITION_PACKAGE_JSON }
	};
}

export { OVERLAY_DOCUMENT_URI, OVERLAY_PACKAGE_JSON, buildOverlayLspWorkspace, toWorkspaceFiles };
