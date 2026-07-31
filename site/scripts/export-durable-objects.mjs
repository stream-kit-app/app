import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const workerPath = join(root, '.svelte-kit/cloudflare/_worker.js');
const marker = '/* stream-kit:durable-object-exports */';
const exportLine = `${marker}\nexport { OverlayRoom } from '../../src/workers/overlay-room.ts';\n`;

const existing = readFileSync(workerPath, 'utf8');
if (existing.includes(marker)) {
	console.log('Durable Object exports already present in _worker.js');
	process.exit(0);
}

writeFileSync(workerPath, `${existing.trimEnd()}\n${exportLine}`);
console.log('Appended OverlayRoom export to _worker.js');
