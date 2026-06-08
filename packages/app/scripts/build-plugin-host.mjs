import { mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import * as esbuild from 'esbuild';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.resolve(root, 'static/plugin-host');

mkdirSync(outDir, { recursive: true });

const shared = {
	bundle: true,
	format: 'esm',
	platform: 'browser',
	target: 'es2022'
};

await esbuild.build({
	...shared,
	entryPoints: [path.resolve(root, 'src/lib/core/plugins/host/core.ts')],
	outfile: path.resolve(outDir, 'core.js')
});

await esbuild.build({
	...shared,
	entryPoints: [path.resolve(root, 'src/lib/core/plugins/host/app-api.ts')],
	outfile: path.resolve(outDir, 'app-api.js')
});

console.log(`Built plugin host assets in ${outDir}`);
