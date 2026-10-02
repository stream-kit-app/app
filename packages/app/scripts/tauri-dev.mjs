import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import net from 'node:net';

const require = createRequire(import.meta.url);

const PREFERRED_PORT = 1420;
const MAX_ATTEMPTS = 50;

// Windows allows binding a port on one address while another address already holds it,
// so a single `localhost` probe misses servers on 127.0.0.1 / 0.0.0.0 / ::.
const PROBE_HOSTS = ['127.0.0.1', '::1', '0.0.0.0', '::'];

/**
 * @param {number} port
 * @param {string} host
 * @returns {Promise<boolean>}
 */
function isPortFreeOnHost(port, host) {
	return new Promise((resolve) => {
		const server = net.createServer();
		server.unref();
		server.once('error', (/** @type {NodeJS.ErrnoException} */ error) => {
			// No IPv6 stack: that address cannot be taken either.
			resolve(error.code === 'EADDRNOTAVAIL' || error.code === 'EAFNOSUPPORT');
		});
		server.listen({ port, host }, () => {
			server.close(() => resolve(true));
		});
	});
}

/**
 * @param {number} port
 * @returns {Promise<boolean>}
 */
async function isPortFree(port) {
	for (const host of PROBE_HOSTS) {
		if (!(await isPortFreeOnHost(port, host))) {
			return false;
		}
	}
	return true;
}

/**
 * Finds a port where both `port` (Vite) and `port + 1` (HMR) are free.
 * @returns {Promise<number>}
 */
async function findDevPort() {
	for (let port = PREFERRED_PORT; port < PREFERRED_PORT + MAX_ATTEMPTS * 2; port += 2) {
		if ((await isPortFree(port)) && (await isPortFree(port + 1))) {
			return port;
		}
	}
	throw new Error(`[tauri-dev] No free port found starting at ${PREFERRED_PORT}`);
}

const port = await findDevPort();
if (port !== PREFERRED_PORT) {
	console.log(`[tauri-dev] Port ${PREFERRED_PORT} is in use, using ${port}`);
}

const configOverride = JSON.stringify({ build: { devUrl: `http://localhost:${port}` } });
const tauriCli = require.resolve('@tauri-apps/cli/tauri.js');

const child = spawn(
	process.execPath,
	[tauriCli, 'dev', '--config', configOverride, ...process.argv.slice(2)],
	{
		stdio: 'inherit',
		env: { ...process.env, STREAM_KIT_DEV_PORT: String(port) }
	}
);

child.on('exit', (code, signal) => {
	if (signal) {
		process.kill(process.pid, signal);
		return;
	}
	process.exit(code ?? 0);
});
