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

console.log(`Built overlay runtime at ${path.join(outDir, 'overlay-runtime.js')}`);
