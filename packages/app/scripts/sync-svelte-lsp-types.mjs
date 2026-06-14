import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const svelteTypesPath = path.join(
	path.dirname(require.resolve('svelte/package.json')),
	'types/index.d.ts'
);
const outputPath = path.resolve('src/lib/codemirror/overlay-svelte-types.d.ts');
const source = fs.readFileSync(svelteTypesPath, 'utf8');
const content = `// Generated from svelte/types/index.d.ts — do not edit\n\n${source}`;

fs.writeFileSync(outputPath, content);
console.log(`Wrote ${outputPath} (${content.length} bytes)`);
