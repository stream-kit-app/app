import { copyFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const pluginConfigPaths = [
	'plugins/twitch/src/config.ts',
	'plugins/youtube/src/config.ts',
	'plugins/discord/src/config.ts'
];

for (const configPath of pluginConfigPaths) {
	const targetPath = join(root, configPath);

	if (existsSync(targetPath)) {
		continue;
	}

	const examplePath = targetPath.replace(/\.ts$/, '.example.ts');
	copyFileSync(examplePath, targetPath);
	console.log(`Created ${configPath} from ${configPath.replace(/\.ts$/, '.example.ts')}`);
}
