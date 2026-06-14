import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

import {
	GITHUB_ORG,
	PLUGIN_DESCRIPTIONS,
	PLUGIN_KEYS,
	getRepoName,
	getRepoSlug
} from './plugin-distribution-config.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dryRun = process.argv.includes('--dry-run');

function run(command) {
	if (dryRun) {
		console.log(`[dry-run] ${command}`);
		return '';
	}

	return execSync(command, {
		cwd: root,
		encoding: 'utf8',
		stdio: ['ignore', 'pipe', 'inherit']
	});
}

function repoExists(slug) {
	try {
		run(`gh repo view ${slug} --json name`);
		return true;
	} catch {
		return false;
	}
}

for (const key of PLUGIN_KEYS) {
	const slug = getRepoSlug(key);
	const description = PLUGIN_DESCRIPTIONS[key];

	if (repoExists(slug)) {
		console.log(`Repository already exists: ${slug}`);
		continue;
	}

	console.log(`Creating repository: ${slug}`);
	run(
		`gh repo create ${GITHUB_ORG}/${getRepoName(key)} --public --description "${description}" --add-readme`
	);
}

console.log('Done.');
