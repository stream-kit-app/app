import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const docsDir = path.join(root, 'docs');

/** @param {string} content */
function escapeBraces(content) {
	const parts = content.split(/(```[\s\S]*?```)/g);

	return parts
		.map((part) => {
			if (part.startsWith('```')) return part;

			return part.replace(/\{([a-zA-Z_][a-zA-Z0-9_.]*)\}/g, (match, _name, offset, str) => {
				const before = str.slice(0, offset);
				const backtickCount = (before.match(/`/g) || []).length;
				if (backtickCount % 2 === 1) return match;
				if (before.endsWith('\\')) return match;
				return `\\{${_name}\\}`;
			});
		})
		.join('');
}

/** @param {string} dir */
function walkMdx(dir) {
	for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			walkMdx(full);
		} else if (entry.name.endsWith('.mdx')) {
			const original = fs.readFileSync(full, 'utf8');
			const escaped = escapeBraces(original);
			if (escaped !== original) {
				fs.writeFileSync(full, escaped, 'utf8');
				console.log(`escaped braces in ${path.relative(root, full)}`);
			}
		}
	}
}

walkMdx(docsDir);
