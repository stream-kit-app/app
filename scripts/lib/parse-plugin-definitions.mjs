import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { flattenDefinitionTree, resolveDefinitionId } from './definition-id.mjs';

const QUEUE_EVENT_NAMES = {
	paused: 'Queue Paused',
	resumed: 'Queue Resumed',
	idle: 'Queue Became Idle',
	job_enqueued: 'Queue Job Enqueued',
	job_started: 'Queue Job Started',
	job_completed: 'Queue Job Completed'
};

const PROCESS_EVENT_NAMES = {
	started: 'Process Started',
	stopped: 'Process Stopped'
};

const APP_LIFECYCLE_NAMES = {
	started: 'App Started',
	exit: 'App Exit'
};

/**
 * @param {string} source
 * @param {number} openIndex index of `[`
 */
export function extractBalanced(source, openIndex, openChar = '[', closeChar = ']') {
	let depth = 0;
	for (let i = openIndex; i < source.length; i++) {
		if (source[i] === openChar) depth++;
		if (source[i] === closeChar) {
			depth--;
			if (depth === 0) return source.slice(openIndex + 1, i);
		}
	}
	return '';
}

/**
 * @param {string} source
 * @param {number} openIndex index of `{`
 */
export function extractBalancedBraces(source, openIndex) {
	let depth = 0;
	for (let i = openIndex; i < source.length; i++) {
		if (source[i] === '{') depth++;
		if (source[i] === '}') {
			depth--;
			if (depth === 0) return { content: source.slice(openIndex + 1, i), end: i + 1 };
		}
	}
	return { content: '', end: openIndex + 1 };
}

/**
 * @param {string} block
 * @param {string[]} path
 */
export function parseTreeBlock(block, path = []) {
	/** @type {unknown[]} */
	const nodes = [];
	let i = 0;

	while (i < block.length) {
		const slice = block.slice(i).trimStart();
		const skip = block.slice(i).length - slice.length;
		i += skip;
		if (!slice) break;

		if (slice.startsWith('{')) {
			const { content: obj, end } = extractBalancedBraces(slice, 0);
			const nameMatch = obj.match(/name:\s*['"]([^'"]+)['"]/);
			const childrenIndex = obj.indexOf('children:');
			if (nameMatch && childrenIndex !== -1) {
				const bracketStart = obj.indexOf('[', childrenIndex);
				const childrenBlock = extractBalanced(obj, bracketStart);
				nodes.push({
					type: 'group',
					name: nameMatch[1],
					children: parseTreeBlock(childrenBlock, [...path, nameMatch[1]])
				});
				i += end;
				continue;
			}
		}

		const factoryMatch = slice.match(/^create([A-Za-z]+)\(\s*[^)]*?(?:,\s*['"]([^'"]+)['"])?\s*\)/);
		if (factoryMatch) {
			const factory = `create${factoryMatch[1]}`;
			const factoryArg = factoryMatch[2];
			nodes.push({
				type: 'factory',
				factory,
				factoryArg,
				path: [...path]
			});
			i += skip + factoryMatch[0].length;
			const next = block.slice(i).trimStart();
			if (next.startsWith(',')) i += block.slice(i).length - next.length + 1;
			continue;
		}

		const bareMatch = slice.match(/^create([A-Za-z]+)\(\s*\)/);
		if (bareMatch) {
			nodes.push({
				type: 'factory',
				factory: `create${bareMatch[1]}`,
				path: [...path]
			});
			i += skip + bareMatch[0].length;
			const next = block.slice(i).trimStart();
			if (next.startsWith(',')) i += block.slice(i).length - next.length + 1;
			continue;
		}

		i += 1;
	}

	return nodes;
}

/**
 * @param {string} indexContent
 * @param {'triggers' | 'handlers'} section
 */
export function parseIndexSection(indexContent, section) {
	const marker = `${section}:`;
	const start = indexContent.indexOf(marker);
	if (start === -1) return [];
	const bracketStart = indexContent.indexOf('[', start);
	const block = extractBalanced(indexContent, bracketStart);
	return parseTreeBlock(block);
}

/**
 * @param {string} factoryName
 * @param {string | undefined} factoryArg
 * @param {Record<string, Record<string, string>>} maps
 */
export function resolveFactoryName(factoryName, factoryArg, maps) {
	if (factoryName === 'createQueueStatusTrigger' && factoryArg) {
		return QUEUE_EVENT_NAMES[factoryArg] ?? factoryArg;
	}
	if (factoryName === 'createProcessTrigger' && factoryArg) {
		return PROCESS_EVENT_NAMES[factoryArg] ?? factoryArg;
	}
	if (factoryName === 'createAppLifecycleTrigger' && factoryArg) {
		return APP_LIFECYCLE_NAMES[factoryArg] ?? factoryArg;
	}
	return undefined;
}

/**
 * @param {string} pluginDir
 * @param {string} factoryName
 */
export function findFactoryFile(pluginDir, factoryName) {
	/** @param {string} dir */
	function walk(dir) {
		for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
			const full = path.join(dir, entry.name);
			if (entry.isDirectory()) {
				const found = walk(full);
				if (found) return found;
			} else if (entry.name.endsWith('.ts') && !entry.name.endsWith('.test.ts')) {
				const content = fs.readFileSync(full, 'utf8');
				if (
					content.includes(`export function ${factoryName}`) ||
					content.includes(`export const ${factoryName}`)
				) {
					return full;
				}
			}
		}
		return null;
	}

	return walk(path.join(pluginDir, 'src'));
}

/**
 * @param {string} source
 * @param {number} openIndex index of `(`
 */
export function extractBalancedParens(source, openIndex) {
	let depth = 0;
	for (let i = openIndex; i < source.length; i++) {
		if (source[i] === '(') depth++;
		if (source[i] === ')') {
			depth--;
			if (depth === 0) return { content: source.slice(openIndex + 1, i), end: i + 1 };
		}
	}
	return { content: '', end: openIndex + 1 };
}

/**
 * @param {string} fnName
 * @param {string} args
 */
function parseConditionCall(fnName, args) {
	const strings = [...args.matchAll(/['"]([^'"]+)['"]/g)].map((match) => match[1]);

	let key = strings[0];
	let name = strings[0];

	if (fnName === 'userMatchCondition' || fnName === 'messageMatchCondition' || fnName === 'minNumberCondition') {
		if (strings.length >= 2) {
			key = strings[0];
			name = strings[1];
		} else if (strings.length === 1) {
			key = strings[0];
			name = strings[0];
		} else if (fnName === 'userMatchCondition') {
			key = 'user';
			name = 'Username';
		} else if (fnName === 'messageMatchCondition') {
			key = 'match';
			name = 'Message';
		} else {
			key = 'min';
			name = 'Minimum value';
		}
	} else if (fnName === 'flagCondition') {
		key = strings[0] ?? 'flag';
		name = strings[1] ?? strings[0] ?? 'Flag';
	} else if (fnName === 'roleCondition') {
		key = 'role';
		name = 'Role';
	} else if (fnName === 'rewardSelectCondition') {
		key = 'rewardId';
		name = 'Reward';
	} else if (fnName === 'connectionSelectCondition') {
		key = 'connection';
		name = 'Connection';
	} else if (fnName === 'subTierCondition') {
		key = 'tier';
		name = 'Sub tier';
	} else if (fnName === 'jsonFieldCondition') {
		key = 'json-field';
		name = 'JSON field';
	} else if (fnName === 'hotkeyCondition') {
		key = 'hotkey';
		name = 'Hotkey';
	} else if (fnName === 'queueFilterCondition') {
		key = 'queue';
		name = 'Queue';
	} else if (fnName === 'sceneMatchCondition') {
		key = 'scene';
		name = 'Scene';
	} else if (fnName === 'inputMatchCondition') {
		key = 'input-name';
		name = strings[0] ?? 'Input name';
	} else if (fnName === 'filterMatchCondition') {
		key = 'filter-name';
		name = strings[0] ?? 'Filter name';
	} else if (fnName === 'transitionMatchCondition') {
		key = 'transition';
		name = 'Transition';
	} else if (fnName === 'mediaActionMatchCondition') {
		key = 'mediaAction';
		name = strings[0] ?? 'Media action';
	} else if (fnName === 'collectionNameCondition') {
		key = 'collectionName';
		name = 'Collection name';
	} else if (fnName === 'collectionLifetimeCondition') {
		key = 'lifetime';
		name = 'Collection lifetime';
	} else if (fnName === 'cronExpressionCondition') {
		key = 'cron';
		name = 'Cron expression';
	} else if (strings.length > 0) {
		name = strings[strings.length - 1];
	} else {
		name = fnName
			.replace(/Condition$/, '')
			.replace(/MatchCondition$/, '')
			.replace(/([A-Z])/g, ' $1')
			.trim();
	}

	return { name, fnName, key };
}

/**
 * @param {string} conditionsBlock
 */
function parseConditionCalls(conditionsBlock) {
	/** @type {{ name: string, fnName: string, key: string }[]} */
	const conditions = [];
	const regex = /(\w+(?:Condition|MatchCondition))\(/g;
	let match;

	while ((match = regex.exec(conditionsBlock)) !== null) {
		const fnName = match[1];
		const openParen = match.index + fnName.length;
		const { content, end } = extractBalancedParens(conditionsBlock, openParen);
		const parsed = parseConditionCall(fnName, content);

		if (parsed.name && !conditions.some((item) => item.key === parsed.key && item.name === parsed.name)) {
			conditions.push(parsed);
		}

		regex.lastIndex = end;
	}

	return conditions;
}

/**
 * Split a comma-separated list of top-level `{ ... }` object literals.
 * @param {string} source
 */
function splitTopLevelObjects(source) {
	/** @type {string[]} */
	const blocks = [];
	let i = 0;

	while (i < source.length) {
		const slice = source.slice(i).trimStart();
		const skip = source.slice(i).length - slice.length;
		i += skip;

		if (!slice || !slice.startsWith('{')) {
			break;
		}

		const { content, end } = extractBalancedBraces(slice, 0);
		blocks.push(content);
		i += skip + end;

		const after = source.slice(i).trimStart();
		if (after.startsWith(',')) {
			i += source.slice(i).length - after.length + 1;
		}
	}

	return blocks;
}

/**
 * Slice from an export declaration to the next top-level export / EOF.
 * @param {string} content
 * @param {number} startIndex
 */
function sliceUntilNextExport(content, startIndex) {
	const rest = content.slice(startIndex);
	const nextExport = rest.search(/\nexport\s+/);
	return nextExport === -1 ? rest : rest.slice(0, nextExport);
}

/**
 * Extract a function body after its parameter list (skips typed `{…}` in params).
 * @param {string} content
 * @param {number} matchIndex index of `function name` / `export function name`
 * @returns {string | null}
 */
function extractFunctionBodyAfterParams(content, matchIndex) {
	const parenStart = content.indexOf('(', matchIndex);
	if (parenStart === -1) return null;

	const { end: afterParams } = extractBalancedParens(content, parenStart);
	const after = content.slice(afterParams);
	const bodyIntro = after.match(/^\s*(?::[^=;{]+)?\s*\{/);
	if (!bodyIntro) return null;

	const openBrace = afterParams + bodyIntro[0].length - 1;
	return extractBalancedBraces(content, openBrace).content;
}

/**
 * Extract the source region for one factory so multi-export files do not
 * collapse onto the first `name:` in the file.
 *
 * Supports exported and local helpers:
 * - `export function createFoo(...) { ... }`
 * - `function createFoo(...) { ... }`
 * - `export const createFoo = (app) => ({ ... })`
 * - `export const createFoo = createHof('Name', ...)`
 *
 * @param {string} content
 * @param {string | undefined} factoryName
 * @returns {{ scoped: string, hofName?: string, hofCallee?: string }}
 */
function extractExportScope(content, factoryName) {
	if (!factoryName) {
		return { scoped: content };
	}

	const exportFn = new RegExp(`export\\s+function\\s+${factoryName}\\s*\\(`).exec(content);
	if (exportFn) {
		const body = extractFunctionBodyAfterParams(content, exportFn.index);
		if (body != null) return { scoped: body };
	}

	const localFn = new RegExp(`(?:^|\\n)\\s*function\\s+${factoryName}\\s*\\(`).exec(content);
	if (localFn) {
		const body = extractFunctionBodyAfterParams(content, localFn.index);
		if (body != null) return { scoped: body };
	}

	const constPattern = new RegExp(`export\\s+const\\s+${factoryName}\\s*=`);
	const constMatch = constPattern.exec(content);
	if (!constMatch) {
		return { scoped: content };
	}

	const rhsStart = constMatch.index + constMatch[0].length;
	const scoped = sliceUntilNextExport(content, rhsStart).trim();

	// HOF alias: createFoo = createBar('Display Name', ...)
	const hofCall = scoped.match(/^(create[A-Za-z]+)\s*\(\s*['"]([^'"]+)['"]/);
	if (hofCall && !/^\(/.test(scoped) && !/^async\s*\(/.test(scoped)) {
		return { scoped, hofName: hofCall[2], hofCallee: hofCall[1] };
	}

	return { scoped };
}

/**
 * Parse fields / conditions / onTest from a definition object body.
 * @param {string} scopedContent
 */
function parsePropsFromScopedContent(scopedContent) {
	/** @type {{ name: string, type: string, required?: boolean, description?: string, placeholder?: string }[]} */
	const fields = [];

	const fieldsMatch = /\bfields:\s*\[/.exec(scopedContent);
	if (fieldsMatch) {
		const bracketStart = fieldsMatch.index + fieldsMatch[0].length - 1;
		const fieldsBlock = extractBalanced(scopedContent, bracketStart);

		for (const block of splitTopLevelObjects(fieldsBlock)) {
			const type = block.match(/type:\s*['"]([^'"]+)['"]/)?.[1];
			const name = block.match(/name:\s*['"]([^'"]+)['"]/)?.[1];
			const placeholderMatch = block.match(/placeholder:\s*'((?:\\'|[^'])*)'/);
			const placeholder = placeholderMatch?.[1]?.replace(/\\'/g, "'");
			const required = /required:\s*true/.test(block);

			if (type && name) {
				fields.push({ name, type, required, placeholder });
			}
		}
	}

	/** @type {{ name: string, fnName: string, key: string }[]} */
	const conditions = [];
	// Require `conditions: [` so parameter names like `(conditions: …)` are ignored.
	const conditionsMatch = /\bconditions:\s*\[/.exec(scopedContent);
	if (conditionsMatch) {
		const bracketStart = conditionsMatch.index + conditionsMatch[0].length - 1;
		const conditionsBlock = extractBalanced(scopedContent, bracketStart);
		conditions.push(...parseConditionCalls(conditionsBlock));
	}

	// `onTest: createOnTest(() => createFoo(` or bare `onTest: () => createFoo(`
	const onTestMatch = scopedContent.match(
		/onTest:\s*(?:createOnTest\()?\(\)\s*=>\s*create(\w+)\(/
	);
	const testFactory = onTestMatch ? `create${onTestMatch[1]}` : null;

	const nameMatch = scopedContent.match(/name:\s*['"]([^'"]+)['"]/);

	return {
		name: nameMatch?.[1],
		fields,
		conditions,
		testFactory
	};
}

/**
 * @param {{
 *   name?: string,
 *   fields: { name: string, type: string, required?: boolean, placeholder?: string }[],
 *   conditions: { name: string, fnName: string, key: string }[],
 *   testFactory: string | null
 * }} base
 * @param {{
 *   name?: string,
 *   fields: { name: string, type: string, required?: boolean, placeholder?: string }[],
 *   conditions: { name: string, fnName: string, key: string }[],
 *   testFactory: string | null
 * }} extra
 */
function mergeDefinitionProps(base, extra) {
	return {
		name: base.name ?? extra.name,
		fields: base.fields.length ? base.fields : extra.fields,
		conditions: base.conditions.length ? base.conditions : extra.conditions,
		testFactory: base.testFactory ?? extra.testFactory
	};
}

/**
 * @param {string} content
 * @param {string | undefined} [factoryName]
 * @param {string} [pluginDir] when set, resolve delegated create* helpers for conditions/onTest
 */
export function parseDefinitionProps(content, factoryName, pluginDir) {
	const { scoped, hofName, hofCallee } = extractExportScope(content, factoryName);
	let props = parsePropsFromScopedContent(scoped);

	// HOF alias in the same file: createPaused = createRecordingStateTrigger('…', …)
	if (hofCallee && hofCallee !== factoryName) {
		const hofScope = extractExportScope(content, hofCallee);
		if (hofScope.scoped !== content) {
			props = mergeDefinitionProps(props, parsePropsFromScopedContent(hofScope.scoped));
		}
	}

	// Wrappers like: (app) => createInputMatchTrigger(app, { name: '...', ... })
	if (pluginDir && (!props.testFactory || props.conditions.length === 0)) {
		const delegateMatch = scoped.match(/\b(create[A-Za-z]+)\(\s*(?:app|_app)\s*,/);
		if (delegateMatch && delegateMatch[1] !== factoryName) {
			const delegateFile = findFactoryFile(pluginDir, delegateMatch[1]);
			if (delegateFile) {
				const delegated = parseDefinitionProps(
					fs.readFileSync(delegateFile, 'utf8'),
					delegateMatch[1]
				);
				props = mergeDefinitionProps(props, {
					name: delegated.name,
					fields: delegated.fields,
					conditions: delegated.conditions,
					testFactory: delegated.testFactory
				});
			}
		}
	}

	return {
		name: props.name ?? hofName,
		explicitId: undefined,
		fields: props.fields,
		conditions: props.conditions,
		testFactory: props.testFactory
	};
}

/**
 * @param {string} pluginDir
 */
export function parseVariableLabels(pluginDir) {
	/** @type {Record<string, string>} */
	const labels = {};

	/** @param {string} dir */
	function walk(dir) {
		for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
			const full = path.join(dir, entry.name);
			if (entry.isDirectory()) {
				walk(full);
			} else if (entry.name === 'variables.ts') {
				const content = fs.readFileSync(full, 'utf8');
				for (const match of content.matchAll(
					/key:\s*['"]([^'"]+)['"][\s\S]*?label:\s*['"]([^'"]+)['"]/g
				)) {
					labels[match[1]] = match[2];
				}
			}
		}
	}

	const srcDir = path.join(pluginDir, 'src');
	if (fs.existsSync(srcDir)) walk(srcDir);

	return labels;
}

/**
 * @param {string} content
 * @param {number} start
 */
function extractTypeBody(content, start) {
	let depth = 0;

	for (let i = start; i < content.length; i++) {
		const char = content[i];

		if (char === '{') depth++;
		if (char === '}') depth--;

		if (char === ';' && depth === 0) {
			return content.slice(start, i);
		}
	}

	return content.slice(start);
}

/**
 * @param {string} content
 * @param {Map<string, Map<string, string>>} [into]
 */
function parseContextTypesFromContent(content, into = new Map()) {
	const rawTypes = [];

	for (const match of content.matchAll(/export type (\w+)\s*=\s*/g)) {
		const typeName = match[1];
		const bodyStart = match.index + match[0].length;
		const body = extractTypeBody(content, bodyStart);
		rawTypes.push({ typeName, body });
	}

	for (const entry of rawTypes) {
		if (!into.has(entry.typeName)) {
			into.set(entry.typeName, new Map());
		}
	}

	for (const entry of rawTypes) {
		const fields = resolveTypeFields(entry.body, content, into, new Set());
		if (fields.size > 0) {
			into.set(entry.typeName, fields);
		}
	}

	return into;
}

/**
 * @param {string} contextsPath
 */
export function parseContextTypes(contextsPath) {
	/** @type {Map<string, Map<string, string>>} */
	const types = new Map();

	if (!fs.existsSync(contextsPath)) return types;

	return parseContextTypesFromContent(fs.readFileSync(contextsPath, 'utf8'), types);
}

/**
 * Collect `export type …Context` (and related) fields from the whole plugin src tree.
 * @param {string} pluginDir
 */
export function parseAllContextTypes(pluginDir) {
	/** @type {Map<string, Map<string, string>>} */
	const types = new Map();
	const srcDir = path.join(pluginDir, 'src');
	if (!fs.existsSync(srcDir)) return types;

	/** @param {string} dir */
	function walk(dir) {
		for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
			const full = path.join(dir, entry.name);
			if (entry.isDirectory()) {
				walk(full);
			} else if (entry.name.endsWith('.ts') && !entry.name.endsWith('.test.ts')) {
				const content = fs.readFileSync(full, 'utf8');
				if (content.includes('export type ')) {
					parseContextTypesFromContent(content, types);
				}
			}
		}
	}

	walk(srcDir);
	return types;
}

/**
 * Find a file that defines `functionName` (export or local).
 * @param {string} pluginDir
 * @param {string} functionName
 */
export function findFunctionFile(pluginDir, functionName) {
	if (!functionName) return null;

	const srcDir = path.join(pluginDir, 'src');
	if (!fs.existsSync(srcDir)) return null;

	/** @param {string} dir */
	function walk(dir) {
		for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
			const full = path.join(dir, entry.name);
			if (entry.isDirectory()) {
				const found = walk(full);
				if (found) return found;
			} else if (entry.name.endsWith('.ts') && !entry.name.endsWith('.test.ts')) {
				const content = fs.readFileSync(full, 'utf8');
				if (
					content.includes(`export function ${functionName}`) ||
					content.includes(`function ${functionName}(`) ||
					content.includes(`export const ${functionName}`)
				) {
					return full;
				}
			}
		}
		return null;
	}

	return walk(srcDir);
}

/**
 * @param {string} body
 * @param {string} fullContent
 * @param {Map<string, Map<string, string>>} types
 * @param {Set<string>} visited
 */
function resolveTypeFields(body, fullContent, types, visited) {
	/** @type {Map<string, string>} */
	const fields = new Map();
	const parts = body.split('&').map((part) => part.trim());

	for (const part of parts) {
		if (part.startsWith('{')) {
			const inner = part.replace(/^\{|\}$/g, '');
			for (const fieldMatch of inner.matchAll(/(\w+)\??\s*:\s*([^;\n]+)/g)) {
				fields.set(fieldMatch[1], fieldMatch[2].trim());
			}
			continue;
		}

		const refName = part.replace(/[^a-zA-Z0-9_]/g, '');
		if (!refName || visited.has(refName)) continue;
		visited.add(refName);

		if (types.has(refName)) {
			for (const [key, value] of types.get(refName)) {
				fields.set(key, value);
			}
			continue;
		}

		const refStart = fullContent.indexOf(`export type ${refName} =`);
		if (refStart !== -1) {
			const bodyStart = fullContent.indexOf('=', refStart) + 1;
			const refBody = extractTypeBody(fullContent, bodyStart).trim();
			const nested = resolveTypeFields(refBody, fullContent, types, visited);
			for (const [key, value] of nested) {
				fields.set(key, value);
			}
		}
	}

	return fields;
}

/**
 * @param {string} raw
 */
function formatSampleValue(raw) {
	const trimmed = raw.trim();
	if (/^['"`]/.test(trimmed)) {
		return trimmed.replace(/^['"`]|['"`]$/g, '');
	}
	if (trimmed === 'true' || trimmed === 'false') return trimmed;
	if (/^-?\d+(\.\d+)?$/.test(trimmed)) return trimmed;
	return '';
}

/**
 * @param {string} content
 * @param {string} testFactory
 * @returns {number} start index of the function declaration, or -1
 */
function findFunctionStart(content, testFactory) {
	const patterns = [
		new RegExp(`export\\s+function\\s+${testFactory}\\s*\\(`),
		new RegExp(`(?:^|\\n)\\s*function\\s+${testFactory}\\s*\\(`),
		new RegExp(`export\\s+const\\s+${testFactory}\\s*=`)
	];

	for (const pattern of patterns) {
		const match = pattern.exec(content);
		if (match) return match.index;
	}

	return -1;
}

/**
 * @param {string} content
 * @param {number} fnStart
 */
function parseReturnTypeAt(content, fnStart) {
	const parenStart = content.indexOf('(', fnStart);
	if (parenStart === -1) return null;

	const { end: afterParams } = extractBalancedParens(content, parenStart);
	const typeMatch = content.slice(afterParams).match(/^\s*:\s*([A-Za-z_][\w]*)/);
	return typeMatch?.[1] ?? null;
}

/**
 * @param {string} content
 * @param {string | null} testFactory
 */
export function parseTestContextDetailsFromContent(content, testFactory) {
	if (!testFactory) {
		return { contextType: null, variables: [] };
	}

	const fnStart = findFunctionStart(content, testFactory);
	if (fnStart === -1) {
		return { contextType: null, variables: [] };
	}

	const contextType = parseReturnTypeAt(content, fnStart);

	const returnIdx = content.indexOf('return {', fnStart);
	const fnSlice = content.slice(fnStart, returnIdx === -1 ? fnStart + 4000 : returnIdx);
	const localSamples = new Map();
	for (const match of fnSlice.matchAll(/const\s+([a-zA-Z_][\w]*)\s*=\s*['"`]([^'"`]+)['"`]/g)) {
		localSamples.set(match[1], match[2]);
	}

	if (returnIdx === -1) {
		return { contextType, variables: [] };
	}

	const braceStart = content.indexOf('{', returnIdx + 'return '.length);
	const { content: returnBody } = extractBalancedBraces(content, braceStart);

	/** @type {{ name: string, sample?: string }[]} */
	const variables = [];

	for (const line of returnBody.split('\n')) {
		const trimmed = line.trim().replace(/,$/, '');
		if (!trimmed || trimmed.startsWith('...')) continue;

		const explicit = trimmed.match(/^([a-zA-Z_][\w]*)\s*:\s*(.+)$/);
		if (explicit) {
			const sample = formatSampleValue(explicit[2]);
			variables.push({
				name: explicit[1],
				sample: sample || localSamples.get(explicit[1]) || undefined
			});
			continue;
		}

		const shorthand = trimmed.match(/^([a-zA-Z_][\w]*)$/);
		if (shorthand) {
			variables.push({
				name: shorthand[1],
				sample: localSamples.get(shorthand[1]) || undefined
			});
		}
	}

	return { contextType, variables };
}

/**
 * @param {string} testContextsPath
 * @param {string | null} testFactory
 */
export function parseTestContextDetails(testContextsPath, testFactory) {
	if (!testFactory || !fs.existsSync(testContextsPath)) {
		return { contextType: null, variables: [] };
	}

	return parseTestContextDetailsFromContent(fs.readFileSync(testContextsPath, 'utf8'), testFactory);
}

/**
 * Resolve test-context variables from the factory file, dedicated helpers, or any match in the plugin.
 * @param {string} pluginDir
 * @param {string | null | undefined} testFactory
 * @param {string | null} [hintFile]
 */
export function resolveTestContextDetails(pluginDir, testFactory, hintFile = null) {
	if (!testFactory) {
		return { contextType: null, variables: [] };
	}

	/** @type {string[]} */
	const candidates = [];
	if (hintFile) candidates.push(hintFile);

	const found = findFunctionFile(pluginDir, testFactory);
	if (found) candidates.push(found);

	const defaults = [
		path.join(pluginDir, 'src', 'lib', 'test-contexts.ts'),
		path.join(pluginDir, 'src', 'lib', 'test-collection-contexts.ts'),
		path.join(pluginDir, 'src', 'lib', 'schedule-service.ts'),
		path.join(pluginDir, 'src', 'lib', 'bot-trigger-helpers.ts')
	];
	for (const file of defaults) {
		if (fs.existsSync(file)) candidates.push(file);
	}

	const seen = new Set();
	for (const file of candidates) {
		if (seen.has(file) || !fs.existsSync(file)) continue;
		seen.add(file);
		const details = parseTestContextDetailsFromContent(fs.readFileSync(file, 'utf8'), testFactory);
		if (details.contextType || details.variables.length > 0) {
			return details;
		}
	}

	return { contextType: null, variables: [] };
}

/**
 * @param {string} testContextsPath
 * @param {string | null} testFactory
 * @param {string | undefined} factoryArg
 */
export function parseTestVariables(testContextsPath, testFactory, factoryArg) {
	const details = parseTestContextDetails(testContextsPath, testFactory);
	return details.variables.map((item) => item.name);
}

/**
 * @param {string} contextsPath
 */
export function parseContextInterface(contextsPath) {
	if (!fs.existsSync(contextsPath)) return [];
	const content = fs.readFileSync(contextsPath, 'utf8');
	/** @type {string[]} */
	const keys = [];
	for (const match of content.matchAll(/^\s*([a-zA-Z_][a-zA-Z0-9_]*)\??\s*:/gm)) {
		if (!['type', 'interface', 'export', 'import', 'extends'].includes(match[1])) {
			keys.push(match[1]);
		}
	}
	return [...new Set(keys)];
}
