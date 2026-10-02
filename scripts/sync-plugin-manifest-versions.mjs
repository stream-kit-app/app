import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const pluginsRoot = join(root, 'plugins');

// Changesets only bumps package.json; plugin distribution and updates read the manifest version.
for (const entry of readdirSync(pluginsRoot, { withFileTypes: true })) {
	if (!entry.isDirectory()) {
		continue;
	}

	const packageJsonPath = join(pluginsRoot, entry.name, 'package.json');
	const manifestPath = join(pluginsRoot, entry.name, 'manifest.json');

	if (!existsSync(packageJsonPath) || !existsSync(manifestPath)) {
		continue;
	}

	const { version } = JSON.parse(readFileSync(packageJsonPath, 'utf8'));
	const manifestSource = readFileSync(manifestPath, 'utf8');
	const manifest = JSON.parse(manifestSource);

	if (manifest.version === version) {
		continue;
	}

	// Replace only the top-level version so the manifest keeps its own formatting.
	const updated = manifestSource.replace(/("version"\s*:\s*)"[^"]*"/, `$1"${version}"`);
	writeFileSync(manifestPath, updated);
	console.log(`Synced ${entry.name} manifest version ${manifest.version} -> ${version}`);
}
