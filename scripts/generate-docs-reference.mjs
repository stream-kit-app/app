import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { flattenDefinitionTree, resolveDefinitionId } from './lib/definition-id.mjs';
import {
	findFactoryFile,
	parseAllContextTypes,
	parseContextTypes,
	parseDefinitionProps,
	parseIndexSection,
	parseVariableLabels,
	resolveFactoryName,
	resolveTestContextDetails
} from './lib/parse-plugin-definitions.mjs';
import {
	describeCondition,
	describeField,
	formatVariableExample,
	simplifyVariableType,
	variableDescription
} from './lib/docs-reference-metadata.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const docsApiDir = path.join(root, 'docs', 'api');
const pluginsDir = path.join(root, 'plugins');
const appOverlayHandler = path.join(
	root,
	'packages/app/src/lib/core/overlay/handlers/send-to-overlay.ts'
);
const appOverlayTrigger = path.join(
	root,
	'packages/app/src/lib/core/overlay/triggers/message-received.ts'
);
const appOverlayContexts = path.join(root, 'packages/app/src/lib/core/overlay/contexts.ts');

/** Matches docs/plugins/meta.json order */
const PLUGIN_ORDER = [
	'core',
	'bot',
	'rankings',
	'quotes',
	'twitch',
	'youtube',
	'discord',
	'obs',
	'tts',
	'websocket',
	'stream-deck',
	'overlay'
];

/** Display overrides when manifest names are awkward for docs */
const PLUGIN_DISPLAY_NAMES = {
	core: 'Core',
	bot: 'Bot',
	rankings: 'Rankings',
	quotes: 'Quotes',
	twitch: 'Twitch',
	youtube: 'YouTube',
	discord: 'Discord',
	obs: 'OBS',
	tts: 'TTS',
	websocket: 'WebSocket',
	'stream-deck': 'Stream Deck',
	overlay: 'Overlay'
};

const MANUAL_RUN_SCRIPT_ID = 'core:core:script:run-script';
const MANUAL_RUN_SCRIPT_SLUG = 'run-script';

/** @param {string} pluginKey */
function pluginDisplayName(pluginKey) {
	return PLUGIN_DISPLAY_NAMES[pluginKey] ?? pluginKey;
}

/** @param {string[]} keys */
function sortPluginKeys(keys) {
	return [...keys].sort((a, b) => {
		const ai = PLUGIN_ORDER.indexOf(a);
		const bi = PLUGIN_ORDER.indexOf(b);
		const aOrder = ai === -1 ? PLUGIN_ORDER.length : ai;
		const bOrder = bi === -1 ? PLUGIN_ORDER.length : bi;
		if (aOrder !== bOrder) return aOrder - bOrder;
		return a.localeCompare(b);
	});
}

/** @param {string} text */
function escapeMdxTableCell(text) {
	const escaped = text.replace(/\|/g, '\\|');
	if (escaped.includes('{') || escaped.includes('}')) {
		return `\`${escaped.replace(/`/g, '\\`')}\``;
	}
	return escaped;
}

/**
 * Prefer unique trailing segments of the handler/trigger id so siblings like
 * `tts:tts:local:speak-text` and `tts:tts:elevenlabs:speak-text` do not collide.
 * @param {string} id
 */
function referenceSlug(id) {
	const parts = id.split(':').filter(Boolean);

	if (parts.length <= 2) {
		return parts.at(-1) ?? id;
	}

	return parts.slice(2).join('-');
}

/**
 * @param {{ id: string }[]} items
 */
function dedupeById(items) {
	const seen = new Set();
	/** @type {typeof items} */
	const unique = [];
	for (const item of items) {
		if (seen.has(item.id)) continue;
		seen.add(item.id);
		unique.push(item);
	}
	return unique;
}

/**
 * @param {{ category: string, name: string }[]} items
 */
function sortByCategoryThenName(items) {
	return [...items].sort((a, b) => {
		const cat = a.category.localeCompare(b.category);
		if (cat !== 0) return cat;
		return a.name.localeCompare(b.name);
	});
}

/**
 * @param {{ name: string, type?: string, description: string, example?: string }[]} variables
 */
function renderVariablesTable(variables) {
	const entries = variables
		.map((variable) => {
			const parts = [`name: ${JSON.stringify(variable.name)}`];
			if (variable.type) parts.push(`type: ${JSON.stringify(variable.type)}`);
			if (variable.description) parts.push(`description: ${JSON.stringify(variable.description)}`);
			if (variable.example) parts.push(`example: ${JSON.stringify(variable.example)}`);
			return `  { ${parts.join(', ')} }`;
		})
		.join(',\n');

	return `## Variables

Copy variables into handler fields using \`{variableName}\` syntax.

<VariablesTable variables={[
${entries}
]} />

`;
}

/**
 * @param {{
 *   id: string,
 *   name: string,
 *   kind: 'trigger' | 'handler',
 *   pluginKey: string,
 *   pluginName: string,
 *   category: string,
 *   fields: { name: string, type: string, required?: boolean, placeholder?: string }[],
 *   conditions: { name: string, fnName: string, key: string }[],
 *   variables: { name: string, type?: string, description: string, example?: string }[]
 * }} item
 */
function renderReferencePage(item) {
	const typeLabel = item.kind === 'trigger' ? 'Trigger ID' : 'Handler ID';

	let body = `---
title: ${JSON.stringify(item.name)}
description: ${JSON.stringify(`${item.pluginName} ${item.kind}: ${item.id}`)}
---

# ${item.name}

| | |
| --- | --- |
| **${typeLabel}** | \`${item.id}\` |
| **Plugin** | ${item.pluginName} |
| **Category** | ${item.category} |

`;

	if (item.variables.length > 0) {
		body += renderVariablesTable(item.variables);
	}

	if (item.kind === 'trigger' && item.conditions.length > 0) {
		body += `## Conditions\n\n| Condition | Description |\n| --- | --- |\n`;
		for (const condition of item.conditions) {
			const description = describeCondition(condition.fnName, condition.key, condition.name);
			body += `| ${escapeMdxTableCell(condition.name)} | ${escapeMdxTableCell(description)} |\n`;
		}
		body += '\n';
	}

	if (item.fields.length > 0) {
		body += `## Configuration\n\n| Field | Type | Required | Description |\n| --- | --- | --- | --- |\n`;
		for (const field of item.fields) {
			const description = escapeMdxTableCell(describeField(field.type, field.placeholder));
			body += `| ${field.name} | ${field.type} | ${field.required ? 'Yes' : 'No'} | ${description} |\n`;
		}
		body += '\n';
	}

	body += `## Related\n\n- [${item.pluginName} plugin](/docs/plugins/${item.pluginKey})\n`;
	if (item.kind === 'trigger') {
		body += `- [Triggers guide](/docs/guide/triggers)\n`;
	} else {
		body += `- [Actions guide](/docs/guide/actions)\n`;
	}

	return { slug: referenceSlug(item.id), body };
}

/**
 * @param {string} pluginDir
 * @param {string} pluginKey
 * @param {string} pluginName
 * @param {'trigger' | 'handler'} kind
 */
function collectPluginDefinitions(pluginDir, pluginKey, pluginName, kind) {
	const indexPath = path.join(pluginDir, 'src', 'index.ts');
	if (!fs.existsSync(indexPath)) return [];

	const section = kind === 'trigger' ? 'triggers' : 'handlers';
	const indexContent = fs.readFileSync(indexPath, 'utf8');
	const tree = parseIndexSection(indexContent, section);
	const leaves = flattenDefinitionTree(tree, pluginKey, pluginKey, kind);
	const variableLabels = parseVariableLabels(pluginDir);
	const contextTypes = parseAllContextTypes(pluginDir);

	const items = leaves.map((leaf) => {
		const factoryFile = findFactoryFile(pluginDir, leaf.factory ?? '');
		let props = { name: undefined, explicitId: undefined, fields: [], conditions: [], testFactory: null };

		if (factoryFile) {
			props = parseDefinitionProps(
				fs.readFileSync(factoryFile, 'utf8'),
				leaf.factory,
				pluginDir
			);
		}

		const resolvedName =
			resolveFactoryName(leaf.factory ?? '', leaf.factoryArg) ?? props.name ?? leaf.factory ?? 'Unknown';
		const id = resolveDefinitionId(props.explicitId, resolvedName, leaf.parentScope);
		const category = leaf.path[leaf.path.length - 1] ?? pluginName;
		const testDetails = resolveTestContextDetails(pluginDir, props.testFactory, factoryFile);
		const contextFields =
			(testDetails.contextType && contextTypes.get(testDetails.contextType)) || new Map();
		const sampleByName = new Map(testDetails.variables.map((item) => [item.name, item.sample]));

		const variableNames =
			testDetails.variables.length > 0
				? [
						...new Set([
							...testDetails.variables.map((item) => item.name),
							...contextFields.keys()
						])
					]
				: [...contextFields.keys()].slice(0, 40);

		const variables = variableNames.map((name) => {
			const type = contextFields.get(name);
			const sample = sampleByName.get(name);
			const meta = { label: variableLabels[name], type, sample };
			return {
				name,
				type: simplifyVariableType(type),
				description: variableDescription(name, meta),
				example: sample ? formatVariableExample(sample) : undefined
			};
		});

		return {
			id,
			name: resolvedName,
			kind,
			pluginKey,
			pluginName,
			category,
			fields: props.fields,
			conditions: props.conditions,
			variables
		};
	});

	return dedupeById(items);
}

function collectOverlayHandlers() {
	const content = fs.readFileSync(appOverlayHandler, 'utf8');
	const props = parseDefinitionProps(content);
	const id = resolveDefinitionId(props.explicitId, props.name ?? 'Send to Overlay', 'overlay:overlay');

	return [
		{
			id,
			name: props.name ?? 'Send to Overlay',
			kind: 'handler',
			pluginKey: 'overlay',
			pluginName: 'Overlay',
			category: 'Overlay',
			fields: props.fields,
			conditions: [],
			variables: [
				{
					name: 'overlayId',
					type: 'string',
					description: 'ID of the overlay that received the event.'
				},
				{
					name: 'event',
					type: 'string',
					description: 'Event name sent to the overlay (for example alert or clear).'
				},
				{
					name: 'payload',
					type: 'object',
					description:
						'Data object delivered to the overlay. Omit the handler payload to forward trigger context.'
				},
				{
					name: 'timestamp',
					type: 'string',
					description: 'ISO timestamp when the overlay event was sent.'
				}
			]
		}
	];
}

function collectOverlayTriggers() {
	const content = fs.readFileSync(appOverlayTrigger, 'utf8');
	const props = parseDefinitionProps(content);
	const id = resolveDefinitionId(props.explicitId, 'Message Received', 'overlay:overlay');
	const contextTypes = parseContextTypes(appOverlayContexts);
	const contextFields = contextTypes.get('OverlayMessageContext') ?? new Map();

	const variables = [...contextFields.keys()].map((name) => ({
		name,
		type: simplifyVariableType(contextFields.get(name)),
		description: variableDescription(name, {
			label: undefined,
			type: contextFields.get(name),
			sample: undefined
		})
	}));

	return [
		{
			id,
			name: 'Message Received',
			kind: 'trigger',
			pluginKey: 'overlay',
			pluginName: 'Overlay',
			category: 'Overlay',
			fields: [],
			conditions: [
				{ name: 'Overlay', fnName: 'overlaySelectCondition', key: 'overlay' },
				{ name: 'Event name', fnName: 'eventNameCondition', key: 'event-name' },
				{ name: 'Event', fnName: 'eventMatchCondition', key: 'event' },
				{ name: 'JSON field', fnName: 'jsonFieldCondition', key: 'json-field' }
			],
			variables
		}
	];
}

function cleanApiDir() {
	for (const kind of ['triggers', 'handlers']) {
		const kindDir = path.join(docsApiDir, kind);
		if (fs.existsSync(kindDir)) {
			fs.rmSync(kindDir, { recursive: true, force: true });
		}
		fs.mkdirSync(kindDir, { recursive: true });
	}
}

/**
 * @param {string} id
 * @param {'triggers' | 'handlers'} kind
 * @param {string} pluginKey
 */
function pageSlugForItem(id, kind, pluginKey) {
	if (id === MANUAL_RUN_SCRIPT_ID && kind === 'handlers' && pluginKey === 'core') {
		return MANUAL_RUN_SCRIPT_SLUG;
	}
	return referenceSlug(id);
}

/**
 * @param {'triggers' | 'handlers'} kind
 * @param {string} pluginKey
 * @param {ReturnType<typeof collectPluginDefinitions>} items
 */
function writePluginSection(kind, pluginKey, items) {
	const pluginDir = path.join(docsApiDir, kind, pluginKey);
	fs.mkdirSync(pluginDir, { recursive: true });

	const displayName = pluginDisplayName(pluginKey);
	const sorted = sortByCategoryThenName(items);

	const indexRows = sorted
		.map((item) => {
			const slug = pageSlugForItem(item.id, kind, pluginKey);
			return `| ${escapeMdxTableCell(item.category)} | [${escapeMdxTableCell(item.name)}](/docs/api/${kind}/${pluginKey}/${slug}/) | \`${item.id}\` |`;
		})
		.join('\n');

	const indexBody = `---
title: ${JSON.stringify(displayName)}
description: ${JSON.stringify(`All ${kind} for the ${displayName} plugin.`)}
---

# ${displayName} ${kind}

| Category | Name | ID |
| --- | --- | --- |
${indexRows}
`;

	fs.writeFileSync(path.join(pluginDir, 'index.mdx'), indexBody, 'utf8');

	/** @type {string[]} */
	const pages = ['index'];
	/** @type {Map<string, string[]>} */
	const byCategory = new Map();

	for (const item of sorted) {
		const slug = pageSlugForItem(item.id, kind, pluginKey);
		const isManualRunScript = slug === MANUAL_RUN_SCRIPT_SLUG && pluginKey === 'core';

		if (!isManualRunScript) {
			const { body } = renderReferencePage(item);
			fs.writeFileSync(path.join(pluginDir, `${slug}.mdx`), body, 'utf8');
		}

		const list = byCategory.get(item.category) ?? [];
		list.push(slug);
		byCategory.set(item.category, list);
	}

	const categories = [...byCategory.keys()].sort((a, b) => a.localeCompare(b));
	const useSeparators = categories.length > 1;

	for (const category of categories) {
		if (useSeparators) {
			pages.push(`---${category}---`);
		}
		pages.push(...(byCategory.get(category) ?? []));
	}

	fs.writeFileSync(
		path.join(pluginDir, 'meta.json'),
		JSON.stringify({ title: displayName, pages }, null, 2) + '\n',
		'utf8'
	);
}

function main() {
	cleanApiDir();

	const pluginKeys = fs
		.readdirSync(pluginsDir, { withFileTypes: true })
		.filter((d) => d.isDirectory())
		.map((d) => d.name)
		.filter((name) => fs.existsSync(path.join(pluginsDir, name, 'manifest.json')));

	/** @type {Record<string, { triggers: ReturnType<typeof collectPluginDefinitions>, handlers: ReturnType<typeof collectPluginDefinitions> }>} */
	const all = {};

	for (const pluginKey of sortPluginKeys(pluginKeys)) {
		const manifestPath = path.join(pluginsDir, pluginKey, 'manifest.json');
		const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
		const pluginDir = path.join(pluginsDir, pluginKey);
		const pluginName = pluginDisplayName(pluginKey) || manifest.name || pluginKey;

		const triggers = collectPluginDefinitions(pluginDir, pluginKey, pluginName, 'trigger');
		const handlers = collectPluginDefinitions(pluginDir, pluginKey, pluginName, 'handler');

		all[pluginKey] = { triggers, handlers };

		if (triggers.length) {
			writePluginSection('triggers', pluginKey, triggers);
		}
		if (handlers.length) {
			writePluginSection('handlers', pluginKey, handlers);
		}
	}

	all.overlay = {
		triggers: collectOverlayTriggers(),
		handlers: collectOverlayHandlers()
	};
	writePluginSection('handlers', 'overlay', all.overlay.handlers);
	writePluginSection('triggers', 'overlay', all.overlay.triggers);

	const uniqueTriggerPlugins = sortPluginKeys(
		Object.keys(all).filter((k) => all[k].triggers.length > 0)
	);
	const uniqueHandlerPlugins = sortPluginKeys(
		Object.keys(all).filter((k) => all[k].handlers.length > 0)
	);

	fs.writeFileSync(
		path.join(docsApiDir, 'meta.json'),
		JSON.stringify(
			{
				title: 'API Reference',
				pages: [
					'index',
					'---Triggers---',
					...uniqueTriggerPlugins.map((k) => `triggers/${k}`),
					'---Handlers---',
					...uniqueHandlerPlugins.map((k) => `handlers/${k}`)
				]
			},
			null,
			2
		) + '\n',
		'utf8'
	);

	const catalogRows = sortPluginKeys([...new Set([...uniqueTriggerPlugins, ...uniqueHandlerPlugins])])
		.map((k) => {
			const name = pluginDisplayName(k);
			const triggerCount = all[k]?.triggers?.length ?? 0;
			const handlerCount = all[k]?.handlers?.length ?? 0;
			const triggerCell =
				triggerCount > 0
					? `[${triggerCount}](/docs/api/triggers/${k}/)`
					: '—';
			const handlerCell =
				handlerCount > 0
					? `[${handlerCount}](/docs/api/handlers/${k}/)`
					: '—';
			return `| [${name}](/docs/plugins/${k}) | ${triggerCell} | ${handlerCell} |`;
		})
		.join('\n');

	const totalTriggers = uniqueTriggerPlugins.reduce((n, k) => n + all[k].triggers.length, 0);
	const totalHandlers = uniqueHandlerPlugins.reduce((n, k) => n + all[k].handlers.length, 0);

	fs.writeFileSync(
		path.join(docsApiDir, 'index.mdx'),
		`---
title: API Reference
description: Complete reference of Stream Kit triggers and handlers with stable IDs and variables.
---

# API Reference

Browse every trigger and handler (sub-action) by plugin. Each definition has a stable **ID**, configuration fields, and — for triggers — variables and conditions.

Use search to jump by name or ID, or open a plugin table below (${totalTriggers} triggers, ${totalHandlers} handlers).

## Catalog

| Plugin | Triggers | Handlers |
| --- | ---: | ---: |
${catalogRows}

## Triggers by plugin

${uniqueTriggerPlugins.map((k) => `- [${pluginDisplayName(k)}](/docs/api/triggers/${k}/) — ${all[k].triggers.length}`).join('\n')}

## Handlers by plugin

${uniqueHandlerPlugins.map((k) => `- [${pluginDisplayName(k)}](/docs/api/handlers/${k}/) — ${all[k].handlers.length}`).join('\n')}
`,
		'utf8'
	);

	const manualRunScript = path.join(
		root,
		'scripts/templates/docs/api-handlers-core-run-script.mdx'
	);
	const runScriptTarget = path.join(docsApiDir, 'handlers/core/run-script.mdx');

	if (fs.existsSync(manualRunScript)) {
		fs.mkdirSync(path.dirname(runScriptTarget), { recursive: true });
		fs.copyFileSync(manualRunScript, runScriptTarget);
		// Remove thin auto-generated sibling if present
		const generatedSibling = path.join(docsApiDir, 'handlers/core/script-run-script.mdx');
		if (fs.existsSync(generatedSibling)) {
			fs.unlinkSync(generatedSibling);
		}
	}

	console.log(
		`Generated API reference: ${totalTriggers} triggers across ${uniqueTriggerPlugins.length} plugins, ${totalHandlers} handlers across ${uniqueHandlerPlugins.length} plugins`
	);
}

main();
