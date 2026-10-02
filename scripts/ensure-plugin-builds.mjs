import { spawnSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

// `pnpm dev` starts `vite build --watch` for every plugin, which rebuilds on start anyway
// and the app hot-reloads `dist/index.js`. Only plugins without a dist need a build up front.
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const pluginsDir = join(root, 'plugins');

const missing = readdirSync(pluginsDir, { withFileTypes: true })
	.filter((entry) => entry.isDirectory())
	.map((entry) => join(pluginsDir, entry.name))
	.filter((dir) => existsSync(join(dir, 'package.json')))
	.filter((dir) => !existsSync(join(dir, 'dist/index.js')))
	.map((dir) => JSON.parse(readFileSync(join(dir, 'package.json'), 'utf8')).name);

if (missing.length === 0) {
	process.exit(0);
}

console.log(`[dev] Building plugins without dist: ${missing.join(', ')}`);

const result = spawnSync(
	'pnpm',
	['turbo', 'run', 'build', ...missing.map((name) => `--filter=${name}`)],
	{ cwd: root, stdio: 'inherit', shell: true }
);

process.exit(result.status ?? 1);
