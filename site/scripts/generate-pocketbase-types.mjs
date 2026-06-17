import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const siteDir = join(__dirname, '..');
const dbPath = join(siteDir, 'pb', 'pb_data', 'data.db');
const outPath = join(siteDir, 'src', 'lib', 'pocketbase', 'types.ts');

if (!existsSync(dbPath)) {
	console.log('[pb:typegen] Skipping — pb_data/data.db not found yet. Start PocketBase first.');
	process.exit(0);
}

mkdirSync(dirname(outPath), { recursive: true });

console.log('[pb:typegen] Generating types from', dbPath);

const result = spawnSync(
	'pnpm',
	['exec', 'pocketbase-typegen', '--db', dbPath, '--out', outPath],
	{ cwd: siteDir, stdio: 'inherit', shell: true }
);

process.exit(result.status ?? 1);
