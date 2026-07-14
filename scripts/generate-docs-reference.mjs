import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { flattenDefinitionTree, resolveDefinitionId } from './lib/definition-id.mjs';
import {
	findFactoryFile,
	parseContextTypes,
	parseDefinitionProps,
	parseIndexSection,
	parseTestContextDetails,
	parseTreeBlock,
	parseVariableLabels,
	resolveFactoryName
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

/** @param {string} text */
function escapeMdxTableCell(text) {
	const escaped = text.replace(/\|/g, '\\|');
	if (escaped.includes('{') || escaped.includes('}')) {
		return `\`${escaped.replace(/`/g, '\\`')}\``;
	}
	return escaped;
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

	return { slug: item.id.split(':').pop() ?? item.id, body };
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
	const testContextsPath = path.join(pluginDir, 'src', 'lib', 'test-contexts.ts');
	const contextsPath = path.join(pluginDir, 'src', 'contexts.ts');
	const variableLabels = parseVariableLabels(pluginDir);
	const contextTypes = parseContextTypes(contextsPath);

	return leaves.map((leaf) => {
		const factoryFile = findFactoryFile(pluginDir, leaf.factory ?? '');
		let props = { name: undefined, explicitId: undefined, fields: [], conditions: [], testFactory: null };

		if (factoryFile) {
			props = parseDefinitionProps(fs.readFileSync(factoryFile, 'utf8'), leaf.factory);
		}

		const resolvedName =
			resolveFactoryName(leaf.factory ?? '', leaf.factoryArg) ?? props.name ?? leaf.factory ?? 'Unknown';
		const id = resolveDefinitionId(props.explicitId, resolvedName, leaf.parentScope);
		const category = leaf.path[leaf.path.length - 1] ?? pluginName;
		const testDetails = parseTestContextDetails(testContextsPath, props.testFactory);
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
				: [...contextFields.keys()].slice(0, 24);

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

function writePluginSection(kind, pluginKey, items) {
	const pluginDir = path.join(docsApiDir, kind, pluginKey);
	fs.mkdirSync(pluginDir, { recursive: true });

	/** @type {string[]} */
	const pages = ['index'];

	const indexBody = `---
title: ${JSON.stringify(pluginKey.charAt(0).toUpperCase() + pluginKey.slice(1))}
description: ${JSON.stringify(`All ${kind} for the ${pluginKey} plugin.`)}
---

# ${pluginKey.charAt(0).toUpperCase() + pluginKey.slice(1)} ${kind}

| Name | ID |
| --- | --- |
${items.map((item) => {
	const slug = item.id.split(':').pop();
	return `| [${item.name}](/docs/api/${kind}/${pluginKey}/${slug}/) | \`${item.id}\` |`;
}).join('\n')}
`;

	fs.writeFileSync(path.join(pluginDir, 'index.mdx'), indexBody, 'utf8');

	for (const item of items) {
		const { slug, body } = renderReferencePage(item);
		fs.writeFileSync(path.join(pluginDir, `${slug}.mdx`), body, 'utf8');
		pages.push(slug);
	}

	fs.writeFileSync(
		path.join(pluginDir, 'meta.json'),
		JSON.stringify({ title: pluginKey.charAt(0).toUpperCase() + pluginKey.slice(1), pages }, null, 2) + '\n',
		'utf8'
	);
}

function main() {
	cleanApiDir();

	const pluginKeys = fs
		.readdirSync(pluginsDir, { withFileTypes: true })
		.filter((d) => d.isDirectory())
		.map((d) => d.name);

	/** @type {Record<string, { triggers: unknown[], handlers: unknown[] }>} */
	const all = {};

	for (const pluginKey of pluginKeys) {
		const manifestPath = path.join(pluginsDir, pluginKey, 'manifest.json');
		if (!fs.existsSync(manifestPath)) continue;

		const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
		const pluginDir = path.join(pluginsDir, pluginKey);
		const pluginName = manifest.name ?? pluginKey;

		const triggers = collectPluginDefinitions(pluginDir, pluginKey, pluginName, 'trigger');
		const handlers = collectPluginDefinitions(pluginDir, pluginKey, pluginName, 'handler');

		all[pluginKey] = { triggers, handlers };

		if (triggers.length) writePluginSection('triggers', pluginKey, triggers);
		if (handlers.length) writePluginSection('handlers', pluginKey, handlers);
	}

	// Overlay handlers (app-level, not a plugin manifest)
	const overlayHandlers = collectOverlayHandlers();
	writePluginSection('handlers', 'overlay', overlayHandlers);

	const overlayTriggers = collectOverlayTriggers();
	writePluginSection('triggers', 'overlay', overlayTriggers);

	// WebSocket has no handlers in manifest tree sometimes - check
	const wsHandlers = all.websocket?.handlers ?? [];
	if (wsHandlers.length === 0) {
		// websocket only triggers
	}

	// API root meta
	const triggerPlugins = Object.keys(all).filter((k) => all[k].triggers.length > 0);

	const handlerPlugins = [
		...Object.keys(all).filter((k) => all[k].handlers.length > 0),
		'overlay'
	];

	const uniqueHandlerPlugins = [...new Set(handlerPlugins)];
	const uniqueTriggerPlugins = [
		...new Set([...triggerPlugins.filter((k) => all[k]?.triggers?.length), 'overlay'])
	];

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

	fs.writeFileSync(
		path.join(docsApiDir, 'index.mdx'),
		`---
title: API Reference
description: Complete reference of Stream Kit triggers and handlers with stable IDs and variables.
---

# API Reference

Browse triggers and handlers (sub-actions) by plugin. Each page lists the stable **definition ID**, configuration fields, and trigger variables.

## Triggers

${uniqueTriggerPlugins.map((k) => `- [${k}](/docs/api/triggers/${k}/)`).join('\n')}

## Handlers

${uniqueHandlerPlugins.map((k) => `- [${k}](/docs/api/handlers/${k}/)`).join('\n')}
`,
		'utf8'
	);

	console.log(
		`Generated API reference: ${uniqueTriggerPlugins.length} trigger plugins, ${uniqueHandlerPlugins.length} handler plugins`
	);

	const manualRunScript = path.join(
		root,
		'scripts/templates/docs/api-handlers-core-run-script.mdx'
	);
	const runScriptTarget = path.join(docsApiDir, 'handlers/core/run-script.mdx');

	if (fs.existsSync(manualRunScript)) {
		fs.mkdirSync(path.dirname(runScriptTarget), { recursive: true });
		fs.copyFileSync(manualRunScript, runScriptTarget);
	}
}

main();
