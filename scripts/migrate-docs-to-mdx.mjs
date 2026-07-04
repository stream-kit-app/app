import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const docsDir = path.join(root, 'docs');

/** @param {string} fromFile */
function docsUrl(fromFile, linkPath) {
	const [rawPath, anchor] = linkPath.split('#');
	if (!rawPath || rawPath.startsWith('http') || rawPath.startsWith('mailto:')) {
		return linkPath;
	}
	if (rawPath.startsWith('../../')) {
		return linkPath;
	}

	const fromDir = path.dirname(fromFile);
	const target = path.normalize(path.join(fromDir, rawPath));
	let rel = path.relative(docsDir, target).replace(/\\/g, '/');

	if (rel.endsWith('/README.md')) {
		rel = rel.slice(0, -'/README.md'.length);
	} else if (rel === 'README.md') {
		rel = '';
	} else {
		rel = rel.replace(/\.mdx?$/, '');
	}

	const url = rel ? `/docs/${rel}` : '/docs';
	return anchor ? `${url}#${anchor}` : url;
}

/** @param {string} content @param {string} file */
function rewriteLinks(content, file) {
	return content.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, href) => {
		if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('../../')) {
			return match;
		}
		if (!href.endsWith('.md') && !href.endsWith('.mdx') && !href.includes('.md#')) {
			return match;
		}
		return `[${text}](${docsUrl(file, href)})`;
	});
}

/** @param {string} content */
function extractTitle(content) {
	const match = content.match(/^#\s+(.+)$/m);
	return match ? match[1].trim() : 'Untitled';
}

/** @param {string} content */
function extractDescription(content) {
	const lines = content.split('\n');
	for (const line of lines) {
		if (line.startsWith('#')) continue;
		const trimmed = line.trim();
		if (trimmed && !trimmed.startsWith('|') && !trimmed.startsWith('```')) {
			return trimmed.slice(0, 160);
		}
	}
	return undefined;
}

/** @param {string} dir */
function walkMdFiles(dir) {
	/** @type {string[]} */
	const files = [];
	for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			files.push(...walkMdFiles(full));
		} else if (entry.name.endsWith('.md')) {
			files.push(full);
		}
	}
	return files;
}

for (const mdFile of walkMdFiles(docsDir)) {
	const content = fs.readFileSync(mdFile, 'utf8');
	const title = extractTitle(content);
	const description = extractDescription(content);
	const body = rewriteLinks(content, mdFile);

	const frontmatter = ['---', `title: ${JSON.stringify(title)}`];
	if (description) {
		frontmatter.push(`description: ${JSON.stringify(description)}`);
	}
	frontmatter.push('---', '');

	const outFile =
		path.basename(mdFile) === 'README.md'
			? path.join(path.dirname(mdFile), 'index.mdx')
			: mdFile.replace(/\.md$/, '.mdx');

	fs.writeFileSync(outFile, `${frontmatter.join('\n')}\n${body}`, 'utf8');
	fs.unlinkSync(mdFile);
	console.log(`migrated ${path.relative(root, mdFile)} -> ${path.relative(root, outFile)}`);
}
