import { copyFileSync, existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { ensurePluginConfigs } from './prepare-plugin-configs.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

/** @type {{ example: string; target: string; required?: string[] }[]} */
const envFiles = [
	{
		example: join(root, 'packages/app/.env.example'),
		target: join(root, 'packages/app/.env'),
		required: ['PUBLIC_POCKETBASE_URL', 'PUBLIC_SITE_URL']
	},
	{
		example: join(root, 'site/.env.example'),
		target: join(root, 'site/.env'),
		required: ['PUBLIC_POCKETBASE_URL']
	}
];

/**
 * @param {string} contents
 * @param {string} key
 */
function hasEnvKey(contents, key) {
	return new RegExp(`^${key}=`, 'm').test(contents);
}

for (const { example, target, required = [] } of envFiles) {
	const relTarget = target.slice(root.length + 1).replaceAll('\\', '/');

	if (!existsSync(example)) {
		console.warn(`[bootstrap] Missing example env: ${example}`);
		continue;
	}

	if (!existsSync(target)) {
		copyFileSync(example, target);
		console.log(`[bootstrap] Created ${relTarget} from .env.example`);
	}

	const contents = readFileSync(target, 'utf8');
	for (const key of required) {
		if (!hasEnvKey(contents, key)) {
			console.warn(
				`[bootstrap] ${relTarget} is missing ${key}. Account / cloud features may not work.`
			);
		}
	}
}

ensurePluginConfigs({
	log: (message) => console.log(`[bootstrap] ${message}`)
});

console.log('[bootstrap] Dev env ready');
