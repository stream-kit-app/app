import type { OverlayProjectFile } from '../types';

import { compile } from 'svelte/compiler';
import * as esbuild from 'esbuild-wasm';
import esbuildWasm from 'esbuild-wasm/esbuild.wasm?url';

import {
	OVERLAY_ENTRY_PATH,
	resolveOverlayImportPath
} from '../overlay-source-file';

const EXTERNAL_PACKAGES = [
	'@stream-kit/overlay-sdk',
	'svelte',
	'svelte/internal/disclose-version',
	'svelte/internal/client',
	'svelte/internal/flags/legacy',
	'svelte/internal/flags/async',
	'svelte/internal/flags/tracing',
	'svelte/reactivity'
];

let esbuildReady: Promise<void> | undefined;

async function ensureEsbuildReady(): Promise<void> {
	if (!esbuildReady) {
		esbuildReady = esbuild.initialize({
			wasmURL: esbuildWasm,
			worker: false
		});
	}

	await esbuildReady;
}

function loaderForPath(path: string): esbuild.Loader {
	if (path.endsWith('.json')) {
		return 'json';
	}

	if (path.endsWith('.svelte.ts') || path.endsWith('.ts')) {
		return 'ts';
	}

	return 'js';
}

function compileSvelteFile(path: string, content: string): { code: string; css: string } {
	const compiled = compile(content, {
		filename: path,
		generate: 'client',
		css: 'external',
		dev: false,
		runes: true
	});

	return {
		code: compiled.js.code,
		css: compiled.css?.code ?? ''
	};
}

export async function bundleOverlaySources(files: OverlayProjectFile[]): Promise<{
	code: string;
	css: string;
}> {
	if (!files.some((file) => file.path === OVERLAY_ENTRY_PATH)) {
		throw new Error('Overlay project must include src/App.svelte');
	}

	await ensureEsbuildReady();

	const cssChunks: string[] = [];
	const fileMap = new Map(files.map((file) => [file.path, file.content]));
	const filePaths = files.map((file) => file.path);

	const plugin: esbuild.Plugin = {
		name: 'overlay-virtual-fs',
		setup(build) {
			build.onResolve({ filter: /.*/ }, (args) => {
				if (EXTERNAL_PACKAGES.some((pkg) => args.path === pkg || args.path.startsWith(`${pkg}/`))) {
					return { path: args.path, external: true };
				}

				if (fileMap.has(args.path)) {
					return { path: args.path, namespace: 'overlay' };
				}

				if (!args.path.startsWith('.') && !args.path.startsWith('/')) {
					return { path: args.path, external: true };
				}

				const normalized = resolveOverlayImportPath(args.path, args.importer, filePaths);

				if (!normalized) {
					return { errors: [{ text: `Could not resolve "${args.path}" from ${args.importer}` }] };
				}

				return { path: normalized, namespace: 'overlay' };
			});

			build.onLoad({ filter: /.*/, namespace: 'overlay' }, (args) => {
				const content = fileMap.get(args.path);

				if (content === undefined) {
					return { errors: [{ text: `Missing overlay source file: ${args.path}` }] };
				}

				if (args.path.endsWith('.svelte') && !args.path.endsWith('.svelte.ts')) {
					const compiled = compileSvelteFile(args.path, content);
					cssChunks.push(compiled.css);

					return {
						contents: compiled.code,
						loader: 'js'
					};
				}

				return {
					contents: content,
					loader: loaderForPath(args.path)
				};
			});
		}
	};

	const result = await esbuild.build({
		entryPoints: [OVERLAY_ENTRY_PATH],
		bundle: true,
		write: false,
		format: 'esm',
		platform: 'browser',
		target: 'es2022',
		logLevel: 'silent',
		plugins: [plugin]
	});

	if (!result.outputFiles?.[0]) {
		throw new Error('Overlay bundle produced no output');
	}

	return {
		code: result.outputFiles[0].text,
		css: cssChunks.filter(Boolean).join('\n')
	};
}
