import { cpSync, mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.resolve(root, '../../packages/app/static/overlay-sdk');

mkdirSync(outDir, { recursive: true });

cpSync(path.resolve(root, 'dist/index.js'), path.resolve(outDir, 'index.js'));
cpSync(path.resolve(root, 'dist/index.d.ts'), path.resolve(outDir, 'index.d.ts'));
cpSync(path.resolve(root, 'dist/bootstrap.js'), path.resolve(outDir, 'bootstrap.js'));

writeFileSync(
	path.resolve(outDir, 'package.json'),
	JSON.stringify(
		{
			name: '@stream-kit/overlay-sdk',
			type: 'module',
			exports: {
				'.': './index.js'
			}
		},
		null,
		2
	)
);

console.log(`Copied overlay SDK to ${outDir}`);
