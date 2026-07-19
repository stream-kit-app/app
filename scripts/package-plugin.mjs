import { createHash } from 'node:crypto';
import { execFileSync, execSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import {
	PLUGIN_KEYS,
	getPluginDir,
	getZipFileName
} from './plugin-distribution-config.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function parseArgs(argv) {
	const options = {
		plugins: [],
		skipBuild: false
	};

	for (let index = 0; index < argv.length; index += 1) {
		const arg = argv[index];

		if (arg === '--all') {
			options.plugins = [...PLUGIN_KEYS];
		} else if (arg === '--plugin') {
			const key = argv[index + 1];

			if (!key) {
				throw new Error('Missing value for --plugin');
			}

			options.plugins.push(key);
			index += 1;
		} else if (arg === '--skip-build') {
			options.skipBuild = true;
		} else if (!arg.startsWith('-')) {
			options.plugins.push(arg);
		}
	}

	return options;
}

function resolvePluginKey(explicitKeys) {
	if (explicitKeys.length === 1) {
		return explicitKeys[0];
	}

	if (explicitKeys.length > 1) {
		return null;
	}

	const cwd = process.cwd();
	const pluginsRoot = path.resolve(root, 'plugins');
	const relative = path.relative(pluginsRoot, cwd);

	if (relative && !relative.startsWith('..') && !path.isAbsolute(relative)) {
		const key = relative.split(path.sep)[0];

		if (PLUGIN_KEYS.includes(key)) {
			return key;
		}
	}

	return null;
}

function getFilterName(key) {
	const filters = {
		bot: '@stream-kit/plugin-bot',
		core: '@stream-kit/plugin-handlers',
		discord: '@stream-kit/plugin-discord',
		obs: '@stream-kit/plugin-obs',
		tts: '@stream-kit/plugin-tts',
		twitch: '@stream-kit/plugin-twitch',
		websocket: '@stream-kit/plugin-websocket',
		youtube: '@stream-kit/plugin-youtube'
	};

	return filters[key];
}

function ensureBuilt(key, skipBuild) {
	const pluginDir = getPluginDir(root, key);
	const entryPath = path.join(pluginDir, 'dist/index.js');

	if (existsSync(entryPath)) {
		return;
	}

	if (skipBuild) {
		throw new Error(`Missing build output for plugin "${key}" at ${entryPath}`);
	}

	const filter = getFilterName(key);

	if (!filter) {
		throw new Error(`Unknown plugin key "${key}"`);
	}

	const quiet = process.env.JSON_OUTPUT === '1';

	execSync(`pnpm --filter ${filter} build`, {
		cwd: root,
		stdio: quiet ? 'ignore' : 'inherit'
	});

	if (!existsSync(entryPath)) {
		throw new Error(`Build did not produce ${entryPath}`);
	}
}

function sha256File(filePath) {
	const hash = createHash('sha256');
	hash.update(readFileSync(filePath));
	return hash.digest('hex');
}

function createZip(pluginDir, key) {
	const packageDir = path.join(pluginDir, 'dist', 'plugin-package');
	const zipPath = path.join(pluginDir, 'dist', getZipFileName(key));

	rmSync(packageDir, { force: true, recursive: true });
	mkdirSync(path.join(packageDir, 'dist'), { recursive: true });

	const manifest = JSON.parse(readFileSync(path.join(pluginDir, 'manifest.json'), 'utf8'));
	writeFileSync(path.join(packageDir, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);
	cpSync(path.join(pluginDir, 'dist/index.js'), path.join(packageDir, 'dist/index.js'));

	rmSync(zipPath, { force: true });

	const quiet = process.env.JSON_OUTPUT === '1';
	const zipStdio = quiet ? 'ignore' : 'inherit';

	if (process.platform === 'win32') {
		execFileSync(
			'powershell',
			[
				'-NoProfile',
				'-Command',
				`Compress-Archive -Path "${packageDir}\\*" -DestinationPath "${zipPath}" -Force`
			],
			{ stdio: zipStdio }
		);
	} else {
		execFileSync('zip', ['-qr', zipPath, '.'], { cwd: packageDir, stdio: zipStdio });
	}

	rmSync(packageDir, { force: true, recursive: true });

	return {
		zipPath,
		sha256: sha256File(zipPath)
	};
}

function packagePlugin(key, skipBuild) {
	if (!PLUGIN_KEYS.includes(key)) {
		throw new Error(`Unknown plugin key "${key}"`);
	}

	const pluginDir = getPluginDir(root, key);
	ensureBuilt(key, skipBuild);

	const { zipPath, sha256 } = createZip(pluginDir, key);
	const manifest = JSON.parse(readFileSync(path.join(pluginDir, 'manifest.json'), 'utf8'));

	if (process.env.JSON_OUTPUT !== '1') {
		console.log(`Packaged ${key} v${manifest.version}`);
		console.log(`  zip: ${zipPath}`);
		console.log(`  sha256: ${sha256}`);
	}

	return { key, zipPath, sha256, version: manifest.version, manifest };
}

const options = parseArgs(process.argv.slice(2));
let targetPlugins = options.plugins;

if (process.argv.includes('--all')) {
	targetPlugins = [...PLUGIN_KEYS];
}

if (targetPlugins.length === 0) {
	const detected = resolvePluginKey([]);

	if (detected) {
		targetPlugins = [detected];
	} else {
		throw new Error('Specify --plugin <key>, --all, or run from plugins/<key>');
	}
}

const results = [];

for (const key of targetPlugins) {
	results.push(packagePlugin(key, options.skipBuild));
}

if (process.env.JSON_OUTPUT === '1') {
	console.log(JSON.stringify(results, null, 2));
}
