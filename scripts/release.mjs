import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const appPackageJsonPath = join(root, 'packages/app/package.json');

const { version } = JSON.parse(readFileSync(appPackageJsonPath, 'utf8'));
const tag = `v${version}`;

function tagExists(name) {
	try {
		execSync(`git rev-parse ${name}^{tag}`, { stdio: 'ignore', cwd: root });
		return true;
	} catch {
		return false;
	}
}

if (tagExists(tag)) {
	console.log(`Tag ${tag} already exists, skipping.`);
	process.exit(0);
}

execSync(`git tag ${tag}`, { stdio: 'inherit', cwd: root });
console.log(`Created tag ${tag}`);
