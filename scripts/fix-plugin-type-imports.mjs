import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(fileURLToPath(new URL('.', import.meta.url)), '..', 'plugins');
const pluginTypes = new Set([
	'Action',
	'ActionHandler',
	'ActionTrigger',
	'ConditionDefinition',
	'ConditionGroupNode',
	'ConditionLeafNode',
	'ConditionNode',
	'CorePluginApi',
	'FieldValue',
	'HandlerDefinitionProps',
	'HandlerExecuteFn',
	'HandlerFieldDefinition',
	'HandlerFieldVariable',
	'HandlerFileFilter',
	'HandlerNext',
	'Operator',
	'Plugin',
	'PluginAppApi',
	'PluginRegistration',
	'PluginSettingsContext',
	'PluginStore',
	'SelectItem',
	'SelectItemsSource',
	'TriggerDefinitionProps',
	'TriggerTestFn',
	'TriggerValidateFormFn'
]);

function walk(dir, files = []) {
	for (const entry of readdirSync(dir, { withFileTypes: true })) {
		if (entry.name === 'node_modules' || entry.name === 'dist') {
			continue;
		}

		const fullPath = join(dir, entry.name);
		if (entry.isDirectory()) {
			walk(fullPath, files);
			continue;
		}

		if (entry.name.endsWith('.ts')) {
			files.push(fullPath);
		}
	}

	return files;
}

function parseImportNames(specifier) {
	return specifier
		.split(',')
		.map((part) => part.trim())
		.filter(Boolean)
		.map((part) => {
			const typeAliasMatch = part.match(/^type\s+(\w+)(?:\s+as\s+(\w+))?$/);
			if (typeAliasMatch) {
				return {
					exported: typeAliasMatch[2] ?? typeAliasMatch[1],
					source: typeAliasMatch[1],
					isTypeKeyword: true
				};
			}

			const aliasMatch = part.match(/^(\w+)\s+as\s+(\w+)$/);
			if (aliasMatch) {
				return { exported: aliasMatch[2], source: aliasMatch[1], isTypeKeyword: false };
			}

			return { exported: part, source: part, isTypeKeyword: false };
		});
}

function formatImport(isTypeOnly, names, module) {
	const prefix = isTypeOnly ? 'import type' : 'import';
	const body = names
		.map((entry) => {
			if (entry.isTypeKeyword) {
				return entry.exported === entry.source
					? `type ${entry.source}`
					: `type ${entry.source} as ${entry.exported}`;
			}

			return entry.exported === entry.source
				? entry.source
				: `${entry.source} as ${entry.exported}`;
		})
		.join(', ');

	return `${prefix} { ${body} } from '${module}';`;
}

function rewriteImports(source) {
	const importPattern =
		/import\s+(type\s+)?\{([^}]+)\}\s+from\s+['"]@stream-kit\/core['"];?/g;

	return source.replace(importPattern, (match, typeKeyword, specifier) => {
		const isTypeOnly = Boolean(typeKeyword);
		const names = parseImportNames(specifier);
		const pluginNames = names.filter((entry) => pluginTypes.has(entry.source));
		const coreNames = names.filter((entry) => !pluginTypes.has(entry.source));

		if (pluginNames.length === 0) {
			return match;
		}

		const lines = [];
		if (coreNames.length > 0) {
			lines.push(formatImport(isTypeOnly, coreNames, '@stream-kit/core'));
		}
		lines.push(formatImport(isTypeOnly, pluginNames, '@stream-kit/plugin'));

		return lines.join('\n');
	});
}

let updated = 0;

for (const file of walk(root)) {
	const original = readFileSync(file, 'utf8');
	const next = rewriteImports(original);

	if (next !== original) {
		writeFileSync(file, next);
		updated += 1;
	}
}

console.log(`Updated ${updated} plugin files.`);
