import { execFileSync, execSync } from 'node:child_process';
import { existsSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import {
	PLUGIN_KEYS,
	getDownloadUrl,
	getPluginDir,
	getRepoSlug,
	getUpdateManifestUrl,
	getZipFileName
} from './plugin-distribution-config.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const readmeTemplate = readFileSync(
	path.join(root, 'scripts/templates/plugin-distribution-README.md'),
	'utf8'
);

function parseArgs(argv) {
	const options = {
		plugins: [],
		dryRun: false,
		skipBuild: false
	};

	for (let index = 0; index < argv.length; index += 1) {
		const arg = argv[index];

		if (arg === '--all') {
			options.plugins = [...PLUGIN_KEYS];
		} else if (arg === '--plugin') {
			options.plugins.push(argv[index + 1]);
			index += 1;
		} else if (arg === '--dry-run') {
			options.dryRun = true;
		} else if (arg === '--skip-build') {
			options.skipBuild = true;
		}
	}

	return options;
}

function getGithubToken() {
	return process.env.GH_TOKEN || process.env.GITHUB_TOKEN || '';
}

function gitRemoteUrl(slug, token) {
	if (token) {
		return `https://x-access-token:${token}@github.com/${slug}.git`;
	}

	return `https://github.com/${slug}.git`;
}

function redactToken(command, token) {
	if (!token) {
		return command;
	}

	return command.replaceAll(token, '***');
}

function run(command, cwd = root) {
	const token = getGithubToken();
	console.log(`> ${redactToken(command, token)}`);
	return execSync(command, { cwd, stdio: 'inherit', encoding: 'utf8' });
}

function runCapture(command, cwd = root) {
	return execSync(command, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
}

function configureGitIdentity(workDir) {
	const name = process.env.GIT_AUTHOR_NAME || 'github-actions[bot]';
	const email =
		process.env.GIT_AUTHOR_EMAIL || '41898282+github-actions[bot]@users.noreply.github.com';

	runCapture(`git config user.name "${name}"`, workDir);
	runCapture(`git config user.email "${email}"`, workDir);
}

function hasStagedChanges(workDir) {
	try {
		execSync('git diff --cached --quiet', { cwd: workDir, stdio: 'ignore' });
		return false;
	} catch {
		return true;
	}
}

function renderReadme(manifest, key) {
	return readmeTemplate
		.replaceAll('{{PLUGIN_NAME}}', manifest.name)
		.replaceAll('{{PLUGIN_KEY}}', key)
		.replaceAll('{{REPO_SLUG}}', getRepoSlug(key));
}

function buildDistributionManifest(manifest, key, sha256) {
	const version = manifest.version;

	return {
		key: manifest.key,
		name: manifest.name,
		version,
		description: manifest.description,
		icon: manifest.icon,
		entry: manifest.entry,
		dependencies: manifest.dependencies ?? [],
		streamKitVersion: manifest.streamKitVersion ?? '>=0.1.0',
		updateManifestUrl: getUpdateManifestUrl(key),
		downloadUrl: getDownloadUrl(key, version),
		sha256
	};
}

function parsePackageOutput(output) {
	const trimmed = output.trim();

	try {
		return JSON.parse(trimmed);
	} catch {
		const start = trimmed.indexOf('[');
		const end = trimmed.lastIndexOf(']');

		if (start === -1 || end === -1 || end < start) {
			throw new Error(
				`package-plugin did not return JSON. Output:\n${trimmed.slice(0, 500)}`
			);
		}

		return JSON.parse(trimmed.slice(start, end + 1));
	}
}

function packagePlugin(key, skipBuild) {
	const args = ['scripts/package-plugin.mjs', '--plugin', key];

	if (skipBuild) {
		args.push('--skip-build');
	}

	process.env.JSON_OUTPUT = '1';
	const output = execFileSync(process.execPath, args, {
		cwd: root,
		encoding: 'utf8'
	});
	delete process.env.JSON_OUTPUT;

	return parsePackageOutput(output);
}

function releaseExists(slug, tag) {
	try {
		runCapture(`gh release view ${tag} --repo ${slug}`);
		return true;
	} catch {
		return false;
	}
}

function publishPlugin(key, options) {
	const slug = getRepoSlug(key);
	const pluginDir = getPluginDir(root, key);
	const sourceManifest = JSON.parse(
		readFileSync(path.join(pluginDir, 'manifest.json'), 'utf8')
	);

	const packaged = options.dryRun
		? {
				zipPath: path.join(pluginDir, 'dist', getZipFileName(key)),
				sha256: 'dry-run-sha256',
				version: sourceManifest.version,
				manifest: sourceManifest
			}
		: packagePlugin(key, options.skipBuild)[0];

	if (!options.dryRun && !existsSync(packaged.zipPath)) {
		throw new Error(`Zip not found for ${key}: ${packaged.zipPath}`);
	}

	const distributionManifest = buildDistributionManifest(
		sourceManifest,
		key,
		packaged.sha256
	);
	const tag = `v${distributionManifest.version}`;
	const readme = renderReadme(sourceManifest, key);
	const workDir = mkdtempSync(path.join(tmpdir(), `stream-kit-plugin-${key}-`));

	try {
		if (options.dryRun) {
			console.log(`[dry-run] Would publish ${slug} ${tag}`);
			console.log(JSON.stringify(distributionManifest, null, 2));
			return;
		}

		run(`git clone --depth 1 "${gitRemoteUrl(slug, getGithubToken())}" "${workDir}"`);

		configureGitIdentity(workDir);

		writeFileSync(path.join(workDir, 'manifest.json'), `${JSON.stringify(distributionManifest, null, 2)}\n`);
		writeFileSync(path.join(workDir, 'README.md'), readme);

		run('git add manifest.json README.md', workDir);

		if (hasStagedChanges(workDir)) {
			run('git commit -m "chore: publish plugin distribution manifest"', workDir);
			run('git push origin main', workDir);
		} else {
			console.log(`No manifest changes to commit for ${slug}`);
		}

		if (!releaseExists(slug, tag)) {
			run(`gh release create ${tag} --repo ${slug} --title "${sourceManifest.name} ${tag}" --notes "Stream Kit ${sourceManifest.name} plugin release."`, workDir);
		} else {
			console.log(`Release ${tag} already exists for ${slug}, uploading asset only.`);
		}

		run(`gh release upload ${tag} "${packaged.zipPath}" --repo ${slug} --clobber`, workDir);

		writeFileSync(
			path.join(pluginDir, 'manifest.json'),
			`${JSON.stringify(
				{
					...sourceManifest,
					streamKitVersion: distributionManifest.streamKitVersion,
					updateManifestUrl: distributionManifest.updateManifestUrl,
					downloadUrl: distributionManifest.downloadUrl,
					sha256: distributionManifest.sha256
				},
				null,
				2
			)}\n`
		);

		console.log(`Published ${slug} ${tag}`);
	} finally {
		rmSync(workDir, { force: true, recursive: true });
	}
}

const options = parseArgs(process.argv.slice(2));
const plugins = options.plugins.length > 0 ? options.plugins : PLUGIN_KEYS;

for (const key of plugins) {
	if (!PLUGIN_KEYS.includes(key)) {
		throw new Error(`Unknown plugin key "${key}"`);
	}

	publishPlugin(key, options);
}

console.log('Plugin distribution publish complete.');
