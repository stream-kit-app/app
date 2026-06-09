import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import * as esbuild from 'esbuild';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const watch = process.argv.includes('--watch');
const outDir = path.resolve(root, 'dist');

const options = {
	entryPoints: [path.resolve(root, 'src/index.ts')],
	outfile: path.resolve(outDir, 'index.js'),
	bundle: true,
	format: 'esm',
	platform: 'browser',
	target: 'es2022',
	conditions: ['svelte', 'browser', 'import', 'default'],
	external: ['@stream-kit/app/api', '@stream-kit/core']
};

function writeTypes() {
	writeFileSync(
		path.resolve(outDir, 'index.d.ts'),
		"import type { Plugin } from '@stream-kit/app/api';\n\ndeclare const plugin: Plugin;\nexport default plugin;\n"
	);
}

rmSync(outDir, { force: true, recursive: true });
mkdirSync(outDir, { recursive: true });

if (watch) {
	const context = await esbuild.context(options);
	await context.watch();
	writeTypes();
	console.log('Watching Hello World plugin...');
} else {
	await esbuild.build(options);
	writeTypes();
}
