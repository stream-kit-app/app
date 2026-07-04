import { execSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

function resolveGithubToken() {
	if (process.env.GITHUB_TOKEN) {
		return process.env.GITHUB_TOKEN;
	}

	try {
		return execSync('gh auth token', { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
	} catch {
		throw new Error(
			'GITHUB_TOKEN is not set and `gh auth token` failed. Log in with `gh auth login` or set GITHUB_TOKEN.'
		);
	}
}

function run(command, env) {
	execSync(command, { stdio: 'inherit', cwd: root, env });
}

const env = {
	...process.env,
	GITHUB_TOKEN: resolveGithubToken()
};

run('pnpm exec changeset version', env);
run('node scripts/sync-app-version.mjs', env);
