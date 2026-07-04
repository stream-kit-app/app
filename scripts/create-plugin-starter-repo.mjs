import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

import { GITHUB_ORG } from './plugin-distribution-config.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const repoName = 'plugin-starter';
const repoSlug = `${GITHUB_ORG}/${repoName}`;
const description = 'Starter template for Stream Kit plugins';
const dryRun = process.argv.includes('--dry-run');

function run(command) {
	if (dryRun) {
		console.log(`[dry-run] ${command}`);
		return '';
	}

	console.log(`> ${command}`);
	return execSync(command, {
		cwd: root,
		encoding: 'utf8',
		stdio: ['ignore', 'pipe', 'inherit']
	});
}

function repoExists() {
	try {
		execSync(`gh repo view ${repoSlug} --json name`, {
			cwd: root,
			stdio: ['ignore', 'pipe', 'inherit']
		});
		return true;
	} catch {
		return false;
	}
}

if (repoExists()) {
	console.log(`Repository already exists: ${repoSlug}`);
	console.log('Enable "Template repository" in GitHub repo settings if you have not already.');
	process.exit(0);
}

run(
	`gh repo create ${GITHUB_ORG}/${repoName} --public --description "${description}"`
);

console.log(`Created ${repoSlug}`);
console.log('Next steps:');
console.log('  1. pnpm sync:plugin-starter');
console.log('  2. GitHub → Settings → General → Template repository → enable');
