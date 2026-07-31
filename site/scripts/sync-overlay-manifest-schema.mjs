import { copyFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const source = join(
	root,
	'../packages/app/src/lib/core/overlay/overlay-manifest.schema.json'
);
const destDir = join(root, 'static/schemas');
const dest = join(destDir, 'overlay-manifest.schema.json');

mkdirSync(destDir, { recursive: true });
copyFileSync(source, dest);
console.log(`Synced overlay manifest schema → ${dest}`);
