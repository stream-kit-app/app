import { spawn } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ensurePocketBase } from './setup-pocketbase.mjs';

const POCKETBASE_URL = 'http://127.0.0.1:8090';
const __dirname = dirname(fileURLToPath(import.meta.url));
const pbDir = join(__dirname, '..', 'pb');

async function isPocketBaseRunning() {
	try {
		const response = await fetch(`${POCKETBASE_URL}/api/health`, { signal: AbortSignal.timeout(2000) });
		return response.ok;
	} catch {
		return false;
	}
}

if (await isPocketBaseRunning()) {
	console.log(`PocketBase is already running at ${POCKETBASE_URL}`);
	process.exit(0);
}

const binaryPath = await ensurePocketBase();

const child = spawn(
	binaryPath,
	[
		'serve',
		`--dir=${join(pbDir, 'pb_data')}`,
		`--migrationsDir=${join(pbDir, 'pb_migrations')}`,
		`--hooksDir=${join(pbDir, 'pb_hooks')}`,
		'--http=127.0.0.1:8090'
	],
	{
		cwd: pbDir,
		stdio: 'inherit'
	}
);

const shutdown = (signal) => {
	child.kill(signal);
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

child.on('exit', (code, signal) => {
	if (signal) {
		process.exit(0);
	}

	process.exit(code ?? 1);
});
