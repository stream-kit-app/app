import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const appPackageJsonPath = join(root, 'packages/app/package.json');

const { version } = JSON.parse(readFileSync(appPackageJsonPath, 'utf8'));
const tag = `v${version}`;
const isCi = process.env.GITHUB_ACTIONS === 'true';

function run(command) {
	execSync(command, { stdio: 'inherit', cwd: root });
}

function tagExists(name) {
	try {
		execSync(`git rev-parse --verify --quiet refs/tags/${name}`, {
			stdio: 'ignore',
			cwd: root
		});
		return true;
	} catch {
		return false;
	}
}

function remoteTagExists(name) {
	const output = execSync(`git ls-remote --tags origin refs/tags/${name}`, {
		encoding: 'utf8',
		cwd: root,
		stdio: ['ignore', 'pipe', 'ignore']
	}).trim();

	return output.length > 0;
}

if (isCi && remoteTagExists(tag)) {
	console.log(`Tag ${tag} already exists on origin, skipping.`);
	process.exit(0);
}

if (!tagExists(tag)) {
	run(`git tag ${tag}`);
	console.log(`Created tag ${tag}`);
} else {
	console.log(`Tag ${tag} already exists locally.`);
}

if (isCi) {
	run(`git push origin refs/tags/${tag}`);
	console.log(`Pushed tag ${tag} to origin`);
} else {
	console.log(
		`Not running in CI — tag was not pushed. Run \`git push origin refs/tags/${tag}\` to publish.`
	);
}
