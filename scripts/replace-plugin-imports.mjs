import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const extensions = new Set(['.ts', '.tsx', '.svelte', '.json', '.mjs', '.md']);

function walk(dir, files = []) {
	for (const entry of readdirSync(dir, { withFileTypes: true })) {
		if (entry.name === 'node_modules' || entry.name === 'dist' || entry.name === 'target') {
			continue;
		}

		const fullPath = join(dir, entry.name);

		if (entry.isDirectory()) {
			walk(fullPath, files);
			continue;
		}

		const dot = entry.name.lastIndexOf('.');
		if (dot === -1 || !extensions.has(entry.name.slice(dot))) {
			continue;
		}

		files.push(fullPath);
	}

	return files;
}

let updated = 0;

for (const file of walk(root)) {
	const content = readFileSync(file, 'utf8');
	if (!content.includes('@stream-kit/plugin')) {
		continue;
	}

	writeFileSync(file, content.replaceAll('@stream-kit/plugin', '@stream-kit/plugin'));
	updated += 1;
}

console.log(`Updated ${updated} files.`);
