import { copyFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

export const PLUGIN_CONFIG_PATHS = [
	'plugins/twitch/src/config.ts',
	'plugins/youtube/src/config.ts',
	'plugins/discord/src/config.ts'
];

/**
 * Copy missing plugin OAuth config stubs from `*.example.ts`.
 * @param {{ log?: (message: string) => void }} [options]
 * @returns {string[]} Created relative paths
 */
export function ensurePluginConfigs(options = {}) {
	const log = options.log ?? console.log;
	const created = [];

	for (const configPath of PLUGIN_CONFIG_PATHS) {
		const targetPath = join(root, configPath);
		if (existsSync(targetPath)) {
			continue;
		}

		const examplePath = targetPath.replace(/\.ts$/, '.example.ts');
		if (!existsSync(examplePath)) {
			continue;
		}

		copyFileSync(examplePath, targetPath);
		log(`Created ${configPath} from ${configPath.replace(/\.ts$/, '.example.ts')}`);
		created.push(configPath);
	}

	return created;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
	ensurePluginConfigs();
}
