import { mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import * as esbuild from 'esbuild';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.resolve(root, '../../packages/app/static/overlay-sdk');

mkdirSync(outDir, { recursive: true });

await esbuild.build({
	entryPoints: [path.join(root, 'scripts/overlay-runtime-entry.js')],
	bundle: true,
	format: 'esm',
	platform: 'browser',
	outfile: path.join(outDir, 'overlay-runtime.js'),
	logLevel: 'silent'
});

/** Svelte submodules that overlays may import directly in the in-app editor. */
const OVERLAY_SVELTE_SUBMODULES = ['svelte/transition', 'svelte/easing', 'svelte/animate'];

for (const entry of OVERLAY_SVELTE_SUBMODULES) {
	const submodule = entry.slice('svelte/'.length);
	const outfile = path.join(outDir, 'svelte', `${submodule}.js`);

	mkdirSync(path.dirname(outfile), { recursive: true });

	await esbuild.build({
		entryPoints: [entry],
		bundle: true,
		format: 'esm',
		platform: 'browser',
		outfile,
		define: { 'import.meta.env.DEV': 'false' },
		conditions: ['browser'],
		logLevel: 'silent'
	});

	console.log(`Built overlay Svelte submodule at ${outfile}`);
}

console.log(`Built overlay runtime at ${path.join(outDir, 'overlay-runtime.js')}`);
