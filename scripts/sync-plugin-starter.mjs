import { execSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { GITHUB_ORG } from './plugin-distribution-config.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const templateRoot = path.join(root, 'packages/plugin-template');
const overlayRoot = path.join(root, 'scripts/templates/plugin-starter');
const repoSlug = `${GITHUB_ORG}/plugin-starter`;

const SOURCE_PATHS = ['src', 'manifest.json', 'scripts/package.mjs'];

function parseArgs(argv) {
	return {
		dryRun: argv.includes('--dry-run')
	};
}

function run(command, cwd = root) {
	console.log(`> ${command}`);
	execSync(command, { cwd, stdio: 'inherit' });
}

function runCapture(command, cwd = root) {
	return execSync(command, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
}

function repoExists() {
	try {
		runCapture(`gh repo view ${repoSlug} --json name`);
		return true;
	} catch {
		return false;
	}
}

function readPackageVersion(packageName) {
	const pkgPath = path.join(root, 'packages', packageName, 'package.json');
	const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
	return pkg.version;
}

function renderPackageJson(template) {
	const pluginVersion = readPackageVersion('plugin');
	const coreVersion = readPackageVersion('core');
	const uiVersion = readPackageVersion('ui');

	return template
		.replaceAll('{{SDK_PLUGIN_VERSION}}', pluginVersion)
		.replaceAll('{{SDK_CORE_VERSION}}', coreVersion)
		.replaceAll('{{SDK_UI_VERSION}}', uiVersion);
}

function copyRecursive(source, destination) {
	cpSync(source, destination, { recursive: true });
}

function buildStarterTree(targetDir) {
	for (const relativePath of SOURCE_PATHS) {
		const source = path.join(templateRoot, relativePath);
		const destination = path.join(targetDir, relativePath);

		mkdirSync(path.dirname(destination), { recursive: true });
		copyRecursive(source, destination);
	}

	for (const entry of readdirSync(overlayRoot, { withFileTypes: true })) {
		const source = path.join(overlayRoot, entry.name);
		const destination = path.join(targetDir, entry.name);

		if (entry.isDirectory()) {
			copyRecursive(source, destination);
			continue;
		}

		if (entry.name === 'package.json') {
			const template = readFileSync(source, 'utf8');
			writeFileSync(destination, renderPackageJson(template));
			continue;
		}

		if (entry.name === 'README.md') {
			const template = readFileSync(source, 'utf8');
			writeFileSync(destination, renderPackageJson(template));
			continue;
		}

		copyRecursive(source, destination);
	}
}

function clearDirectoryContents(directory) {
	for (const entry of readdirSync(directory, { withFileTypes: true })) {
		if (entry.name === '.git') {
			continue;
		}

		rmSync(path.join(directory, entry.name), { force: true, recursive: true });
	}
}

const options = parseArgs(process.argv.slice(2));

const stagingDir = mkdtempSync(path.join(tmpdir(), 'stream-kit-plugin-starter-'));
buildStarterTree(stagingDir);

if (options.dryRun) {
	console.log(`[dry-run] Built starter tree at ${stagingDir}`);
	console.log(
		`[dry-run] SDK versions: plugin@${readPackageVersion('plugin')}, core@${readPackageVersion('core')}, ui@${readPackageVersion('ui')}`
	);
	process.exit(0);
}

if (!repoExists()) {
	throw new Error(
		`Repository ${repoSlug} does not exist. Run \`pnpm create:plugin-starter-repo\` first.`
	);
}

const workDir = mkdtempSync(path.join(tmpdir(), 'stream-kit-plugin-starter-sync-'));

try {
	run(`git clone --depth 1 https://github.com/${repoSlug}.git "${workDir}"`);
	clearDirectoryContents(workDir);

	for (const entry of readdirSync(stagingDir, { withFileTypes: true })) {
		copyRecursive(path.join(stagingDir, entry.name), path.join(workDir, entry.name));
	}

	run('git add -A', workDir);

	try {
		run('git commit -m "chore: sync plugin starter from monorepo"', workDir);
	} catch {
		console.log('No changes to commit for plugin-starter');
		process.exit(0);
	}

	run('git push origin main', workDir);
	console.log(`Synced ${repoSlug}`);
} finally {
	rmSync(stagingDir, { force: true, recursive: true });
	rmSync(workDir, { force: true, recursive: true });
}
