import { mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import * as esbuild from 'esbuild';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.resolve(root, 'dist');

mkdirSync(outDir, { recursive: true });

await esbuild.build({
	entryPoints: [path.resolve(root, 'src/runtime.ts')],
	outfile: path.resolve(outDir, 'index.js'),
	bundle: true,
	format: 'esm',
	platform: 'neutral',
	logLevel: 'silent',
	alias: {
		'@stream-kit/core': path.resolve(root, '../core/src/index.ts')
	}
});
