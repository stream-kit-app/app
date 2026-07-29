import { spawn } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { platform } from 'node:os';

import { ensurePocketBase } from './setup-pocketbase.mjs';

const DEFAULT_POCKETBASE_URL = 'http://127.0.0.1:8090';
const ADMIN_EMAIL = process.env.POCKETBASE_ADMIN_EMAIL ?? 'admin@stream-kit.local';
const ADMIN_PASSWORD = process.env.POCKETBASE_ADMIN_PASSWORD ?? 'stream-kit-dev';
const __dirname = dirname(fileURLToPath(import.meta.url));
const pbDir = join(__dirname, '..', 'pb');
const dataDir = join(pbDir, 'pb_data');

/**
 * Resolve a localhost-only PocketBase URL and HTTP bind address.
 * @param {string} rawUrl
 */
function resolveLocalServeTarget(rawUrl) {
	let parsed;
	try {
		parsed = new URL(rawUrl);
	} catch {
		throw new Error(`Invalid PUBLIC_POCKETBASE_URL: ${rawUrl}`);
	}

	const host = parsed.hostname.toLowerCase();
	if (host !== '127.0.0.1' && host !== 'localhost' && host !== '::1') {
		throw new Error(
			`Refusing to run PocketBase against ${rawUrl} (not localhost). ` +
				`Use http://127.0.0.1:8090 (or localhost) for local dev.`
		);
	}

	const port = parsed.port || '8090';
	// Always bind IPv4 loopback so health checks and the binary agree.
	const bindHost = '127.0.0.1';
	const bind = `${bindHost}:${port}`;
	const healthUrl = `http://${bindHost}:${port}`;

	return { parsed, bind, healthUrl, port };
}

const rawPocketBaseUrl = process.env.PUBLIC_POCKETBASE_URL ?? DEFAULT_POCKETBASE_URL;
const { bind, healthUrl } = resolveLocalServeTarget(rawPocketBaseUrl);

async function isPocketBaseRunning() {
	try {
		const response = await fetch(`${healthUrl}/api/health`, {
			signal: AbortSignal.timeout(2000)
		});
		return response.ok;
	} catch {
		return false;
	}
}

/**
 * @param {string} binaryPath
 */
function upsertSuperuser(binaryPath) {
	return new Promise((resolve, reject) => {
		const child = spawn(
			binaryPath,
			['superuser', 'upsert', ADMIN_EMAIL, ADMIN_PASSWORD, `--dir=${dataDir}`],
			{
				cwd: pbDir,
				stdio: ['ignore', 'pipe', 'pipe']
			}
		);

		let stderr = '';
		child.stderr.on('data', (chunk) => {
			stderr += chunk.toString();
		});

		child.on('error', reject);
		child.on('exit', (code) => {
			if (code === 0) {
				console.log(
					`[pocketbase] Superuser ready: ${ADMIN_EMAIL} (local-dev default; override with POCKETBASE_ADMIN_*)`
				);
				resolve();
				return;
			}
			reject(new Error(`superuser upsert failed (exit ${code}): ${stderr.trim()}`));
		});
	});
}

async function waitForHealthy(timeoutMs = 30_000) {
	const started = Date.now();
	while (Date.now() - started < timeoutMs) {
		if (await isPocketBaseRunning()) {
			return;
		}
		await new Promise((resolve) => setTimeout(resolve, 250));
	}
	throw new Error(`PocketBase did not become healthy at ${healthUrl}`);
}

async function seedDevData() {
	await new Promise((resolve, reject) => {
		const child = spawn(process.execPath, [join(__dirname, 'seed-dev-data.mjs')], {
			cwd: join(__dirname, '..'),
			env: {
				...process.env,
				PUBLIC_POCKETBASE_URL: healthUrl,
				POCKETBASE_ADMIN_EMAIL: ADMIN_EMAIL,
				POCKETBASE_ADMIN_PASSWORD: ADMIN_PASSWORD
			},
			stdio: 'inherit'
		});
		child.on('error', reject);
		child.on('exit', (code) => {
			if (code === 0) {
				resolve();
				return;
			}
			reject(new Error(`seed-dev-data exited with code ${code}`));
		});
	});
}

/**
 * @param {import('node:child_process').ChildProcessWithoutNullStreams | import('node:child_process').ChildProcess} child
 * @param {NodeJS.Signals | number} [signal]
 */
function killChild(child, signal = 'SIGTERM') {
	if (!child.pid || child.killed) {
		return;
	}

	if (platform() === 'win32') {
		spawn('taskkill', ['/pid', String(child.pid), '/t', '/f'], {
			stdio: 'ignore',
			windowsHide: true
		});
		return;
	}

	child.kill(signal);
}

if (await isPocketBaseRunning()) {
	console.error(
		`[pocketbase] Already running at ${healthUrl}. Stop that process first so this task can own PocketBase.\n` +
			`  (Avoids orphan turbo tasks and accidental seeding of a shared instance.)`
	);
	process.exit(1);
}

const binaryPath = await ensurePocketBase();
await upsertSuperuser(binaryPath);

const child = spawn(
	binaryPath,
	[
		'serve',
		`--dir=${dataDir}`,
		`--migrationsDir=${join(pbDir, 'pb_migrations')}`,
		`--hooksDir=${join(pbDir, 'pb_hooks')}`,
		`--http=${bind}`
	],
	{
		cwd: pbDir,
		stdio: 'inherit'
	}
);

const shutdown = () => {
	killChild(child);
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

child.on('exit', (code, signal) => {
	if (signal) {
		process.exit(0);
	}
	process.exit(code ?? 1);
});

try {
	await waitForHealthy();
	await seedDevData();
} catch (error) {
	console.warn(`[pocketbase] Dev seed skipped: ${error.message ?? error}`);
}
