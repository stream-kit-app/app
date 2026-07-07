import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { flattenDefinitionTree, resolveDefinitionId } from './lib/definition-id.mjs';
import {
	findFactoryFile,
	parseDefinitionProps,
	parseIndexSection,
	parseTestContextDetails,
	parseTreeBlock,
	resolveFactoryName
} from './lib/parse-plugin-definitions.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const scriptApiDir = path.join(root, 'packages', 'script-api', 'src');
const pluginsDir = path.join(root, 'plugins');
const appOverlayTrigger = path.join(
	root,
	'packages/app/src/lib/core/overlay/triggers/message-received.ts'
);
const appOverlayContexts = path.join(root, 'packages/app/src/lib/core/overlay/contexts.ts');
const pluginAppApiTypesPath = path.join(
	root,
	'packages/app/src/lib/core/plugins/plugin-app-api.types.ts'
);
const twitchChatMessagePath = path.join(root, 'packages/core/src/twitch-chat-message.ts');

const EXTERNAL_TYPE_STUBS = `/** Stubs for types referenced by plugin trigger contexts. */
type TwitchChatMessage = {
	channelId: string | null;
	id: string;
	message: string;
	date: string;
	isCheer: boolean;
	isRedemption: boolean;
	isHypeChat: boolean;
	isFirst: boolean;
	isReturningChatter: boolean;
	isHighlight: boolean;
	isReply: boolean;
	bits: number;
	rewardId: string | null;
	hypeChatLocalizedAmount: number | null;
	hypeChatLevel: number | null;
	parentMessageUserName: string | null;
	parentMessageText: string | null;
	parentMessageUserDisplayName: string | null;
	badges: { id: string; version: string; url: string }[];
	badgeInfo: Record<string, string>;
	emotes: { id: string; positions: string[]; url: string }[];
	userInfo: {
		userId: string | undefined;
		userName: string;
		displayName: string;
		color: string | undefined;
		userType: string | undefined;
		isMod: boolean;
		isBroadcaster: boolean;
		isVip: boolean;
		isSubscriber: boolean;
		isArtist: boolean;
		isFounder: boolean;
	};
};

type ProcessEventContext = {
	executable?: string;
	fullPath?: string;
	name?: string;
	parentProcessId?: number;
	path?: string;
	processId?: number;
};

type AppLifecycleEvent = 'started' | 'exit';

type AppLifecycleContext = {
	event: AppLifecycleEvent;
};
`;

function extractExportTypes(content) {
	const blocks = [];

	for (const match of content.matchAll(/export type (\w+)\s*=\s*/g)) {
		const typeName = match[1];
		const bodyStart = match.index + match[0].length;
		let depth = 0;
		let end = bodyStart;

		for (let i = bodyStart; i < content.length; i++) {
			const char = content[i];
			if (char === '{' || char === '(') depth++;
			if (char === '}' || char === ')') depth--;
			if (char === ';' && depth === 0) {
				end = i;
				break;
			}
		}

		blocks.push(`type ${typeName} = ${content.slice(bodyStart, end).trim()};`);
	}

	return blocks;
}

function stripImports(content) {
	const lines = content.split('\n');
	const out = [];
	let inMultilineImport = false;

	for (const line of lines) {
		if (inMultilineImport) {
			// Skip continuation lines until the import statement closes with `from '...'`.
			if (/\bfrom\s+['"][^'"]+['"];?\s*$/.test(line) || /^\s*['"][^'"]+['"];?\s*$/.test(line)) {
				inMultilineImport = false;
			}
			continue;
		}

		if (/^\s*import\b/.test(line)) {
			const isSingleLine =
				/\bfrom\s+['"][^'"]+['"];?\s*$/.test(line) ||
				/^\s*import\s+['"][^'"]+['"];?\s*$/.test(line);

			if (!isSingleLine) {
				inMultilineImport = true;
			}

			continue;
		}

		out.push(line);
	}

	return out.join('\n').trim();
}

function collectPluginTriggers(pluginDir, pluginKey, pluginName) {
	const indexPath = path.join(pluginDir, 'src', 'index.ts');
	if (!fs.existsSync(indexPath)) return [];

	const indexContent = fs.readFileSync(indexPath, 'utf8');
	const tree = parseIndexSection(indexContent, 'triggers');
	const leaves = flattenDefinitionTree(tree, pluginKey, pluginKey, 'trigger');
	const testContextsPath = path.join(pluginDir, 'src', 'lib', 'test-contexts.ts');

	return leaves.map((leaf) => {
		const factoryFile = findFactoryFile(pluginDir, leaf.factory ?? '');
		let props = { name: undefined, explicitId: undefined, testFactory: null };

		if (factoryFile) {
			props = parseDefinitionProps(fs.readFileSync(factoryFile, 'utf8'));
		}

		const resolvedName =
			resolveFactoryName(leaf.factory ?? '', leaf.factoryArg) ??
			props.name ??
			leaf.factory ??
			'Unknown';
		const id = resolveDefinitionId(props.explicitId, resolvedName, leaf.parentScope);
		const testDetails = parseTestContextDetails(testContextsPath, props.testFactory);

		return {
			id,
			name: resolvedName,
			pluginKey,
			pluginName,
			contextType: testDetails.contextType
		};
	});
}

function collectOverlayTriggers() {
	if (!fs.existsSync(appOverlayTrigger)) return [];

	const content = fs.readFileSync(appOverlayTrigger, 'utf8');
	const props = parseDefinitionProps(content);

	return [
		{
			id: 'overlay:overlay:message:message-received',
			name: props.name ?? 'Message received',
			pluginKey: 'overlay',
			pluginName: 'Overlay',
			contextType: 'OverlayMessageContext'
		}
	];
}

function buildTriggerDataDts() {
	const parts = [EXTERNAL_TYPE_STUBS, ''];

	const contextFiles = [
		path.join(root, 'packages/core/src/twitch-chat-message.ts'),
		path.join(pluginsDir, 'twitch/src/contexts.ts'),
		path.join(pluginsDir, 'youtube/src/lib/types.ts'),
		path.join(pluginsDir, 'youtube/src/contexts.ts'),
		path.join(pluginsDir, 'obs/src/contexts.ts'),
		path.join(pluginsDir, 'core/src/contexts.ts'),
		path.join(pluginsDir, 'websocket/src/contexts.ts'),
		appOverlayContexts
	];

	const seenTypes = new Set();

	// Pre-seed with the stub names so extracted duplicates (for example
	// `TwitchChatMessage`, defined both as a stub and in its source) are skipped.
	for (const match of EXTERNAL_TYPE_STUBS.matchAll(/^type (\w+)/gm)) {
		seenTypes.add(match[1]);
	}

	for (const filePath of contextFiles) {
		if (!fs.existsSync(filePath)) continue;

		const content = stripImports(fs.readFileSync(filePath, 'utf8'));
		const types = extractExportTypes(content);

		for (const typeBlock of types) {
			const nameMatch = typeBlock.match(/^type (\w+)/);
			if (!nameMatch || seenTypes.has(nameMatch[1])) continue;
			seenTypes.add(nameMatch[1]);
			parts.push(typeBlock);
		}
	}

	const unionTypes = [...seenTypes].filter(
		(name) => name.endsWith('Context') && name !== 'TriggerDataUnion'
	);

	parts.push('');
	parts.push(`type TriggerDataUnion = ${unionTypes.join(' | ') || 'unknown'};`);

	return `${parts.join('\n')}\n`;
}

// Ambient value+type declarations for enum-like objects that scripts use both as
// a value (e.g. `BaseDirectory.AppData`) and as a type (e.g. `baseDir?: BaseDirectory`).
const PLUGIN_APP_API_PRELUDE = `declare const BaseDirectory: {
	readonly Audio: 1;
	readonly Cache: 2;
	readonly Config: 3;
	readonly Data: 4;
	readonly LocalData: 5;
	readonly Document: 6;
	readonly Download: 7;
	readonly Picture: 8;
	readonly Public: 9;
	readonly Video: 10;
	readonly Resource: 11;
	readonly Temp: 12;
	readonly AppConfig: 13;
	readonly AppData: 14;
	readonly AppLocalData: 15;
	readonly AppCache: 16;
	readonly AppLog: 17;
	readonly Desktop: 18;
	readonly Executable: 19;
	readonly Font: 20;
	readonly Home: 21;
	readonly Runtime: 22;
	readonly Template: 23;
};
type BaseDirectory = (typeof BaseDirectory)[keyof typeof BaseDirectory];

declare const SeekMode: { readonly Start: 0; readonly Current: 1; readonly End: 2 };
type SeekMode = (typeof SeekMode)[keyof typeof SeekMode];
`;

// Real definitions for external types imported by the source but not defined in it.
// These keep the ambient d.ts self-contained and give proper autocomplete.
// `HandlerTriggerContext` is intentionally omitted because index.d.ts declares the
// real one globally, and `ProcessEventContext`/`AppLifecycle*` come from trigger-data.d.ts.
const PLUGIN_APP_API_STUBS = [
	['UnlistenFn', '() => void'],
	['UnwatchFn', '() => void'],
	['TranslationKey', 'string'],
	['HandlerDefinition', 'unknown'],
	['PluginSettingsContext', 'unknown'],
	['PluginMigration', 'unknown'],
	['SettingsFieldValue', 'string | number | boolean'],
	[
		'ConfirmOptions',
		'{ title?: string; description?: string; confirmLabel?: string; cancelLabel?: string; variant?: string }'
	],
	['FileSystemFilter', '{ name: string; extensions: string[] }'],
	['FileSystemSelectOptions', "{ type: 'file' | 'folder'; filters?: FileSystemFilter[] }"],
	['CreateOptions', '{ baseDir?: BaseDirectory }'],
	[
		'OpenOptions',
		'{ read?: boolean; write?: boolean; append?: boolean; truncate?: boolean; create?: boolean; createNew?: boolean; mode?: number; baseDir?: BaseDirectory }'
	],
	['CopyFileOptions', '{ fromPathBaseDir?: BaseDirectory; toPathBaseDir?: BaseDirectory }'],
	['MkdirOptions', '{ mode?: number; recursive?: boolean; baseDir?: BaseDirectory }'],
	['ReadDirOptions', '{ baseDir?: BaseDirectory }'],
	['ReadFileOptions', '{ baseDir?: BaseDirectory; encoding?: string }'],
	['RemoveOptions', '{ recursive?: boolean; baseDir?: BaseDirectory }'],
	['RenameOptions', '{ oldPathBaseDir?: BaseDirectory; newPathBaseDir?: BaseDirectory }'],
	['StatOptions', '{ baseDir?: BaseDirectory }'],
	['TruncateOptions', '{ baseDir?: BaseDirectory }'],
	[
		'WriteFileOptions',
		'{ append?: boolean; create?: boolean; createNew?: boolean; mode?: number; baseDir?: BaseDirectory }'
	],
	['WatchOptions', '{ recursive?: boolean; baseDir?: BaseDirectory }'],
	['DebouncedWatchOptions', 'WatchOptions & { delayMs?: number }'],
	['ExistsOptions', '{ baseDir?: BaseDirectory }'],
	[
		'WatchEventKindAccess',
		"{ kind: 'any' } | { kind: 'close'; mode: 'any' | 'execute' | 'read' | 'write' | 'other' } | { kind: 'open'; mode: 'any' | 'execute' | 'read' | 'write' | 'other' } | { kind: 'other' }"
	],
	[
		'WatchEventKindCreate',
		"{ kind: 'any' } | { kind: 'file' } | { kind: 'folder' } | { kind: 'other' }"
	],
	[
		'WatchEventKindModify',
		"{ kind: 'any' } | { kind: 'data'; mode: 'any' | 'size' | 'content' | 'other' } | { kind: 'metadata'; mode: 'any' | 'access-time' | 'write-time' | 'permissions' | 'ownership' | 'extended' | 'other' } | { kind: 'rename'; mode: 'any' | 'to' | 'from' | 'both' | 'other' } | { kind: 'other' }"
	],
	[
		'WatchEventKindRemove',
		"{ kind: 'any' } | { kind: 'file' } | { kind: 'folder' } | { kind: 'other' }"
	],
	[
		'WatchEventKind',
		"'any' | { access: WatchEventKindAccess } | { create: WatchEventKindCreate } | { modify: WatchEventKindModify } | { remove: WatchEventKindRemove } | 'other'"
	],
	['WatchEvent', '{ type: WatchEventKind; paths: string[]; attrs: unknown }'],
	[
		'DirEntry',
		'{ name: string; isDirectory: boolean; isFile: boolean; isSymlink: boolean }'
	],
	[
		'FileInfo',
		'{ isFile: boolean; isDirectory: boolean; isSymlink: boolean; size: number; mtime: Date | null; atime: Date | null; birthtime: Date | null; readonly: boolean; fileAttributes: number | null; dev: number | null; ino: number | null; mode: number | null; nlink: number | null; uid: number | null; gid: number | null; rdev: number | null; blksize: number | null; blocks: number | null }'
	],
	[
		'FileHandle',
		'{ read(buffer: Uint8Array): Promise<number | null>; seek(offset: number, whence: SeekMode): Promise<number>; stat(): Promise<FileInfo>; truncate(len?: number): Promise<void>; write(data: Uint8Array): Promise<number>; close(): Promise<void> }'
	],
	[
		'MenuItemChild',
		'{ path: string; title?: TranslationKey | string; isDisabled?: boolean | (() => boolean); onClick?: () => void }'
	],
	[
		'MenuItem',
		'{ path: string; title?: TranslationKey | string; icon: string; children?: MenuItemChild[]; isGroupOnly?: boolean; isDisabled?: boolean | (() => boolean); onClick?: () => void; fromPlugin?: boolean }'
	],
	[
		'Modal',
		'{ id: string; title: string; size: "sm" | "md" | "lg" | "full"; description?: string; content: unknown; props: Record<string, unknown>; contentHost: "app" | "plugin"; onClose?: () => void; isOpen: boolean; open(): void; close(): void }'
	],
	[
		'ModalProps',
		'{ id: string; title: string; description?: string; size?: "sm" | "md" | "lg" | "full"; content: unknown; props?: Record<string, unknown>; contentHost?: "app" | "plugin"; onClose?: () => void }'
	],
	['OAuthStartOptions', '{ ports?: number[]; response?: unknown }'],
	['ToastVariant', "'default' | 'success' | 'error' | 'warning'"],
	[
		'ToastCreateProps',
		'{ id?: string; title: string; description?: string; variant?: ToastVariant; duration?: number; content?: unknown; props?: Record<string, unknown> }'
	],
	[
		'ToastItem',
		'{ id: string; title: string; description?: string; variant: ToastVariant; duration?: number }'
	],
	[
		'CommandRecord',
		'{ id: string; name: string; group: string; groupSortOrder: number; sortOrder: number; commandNames: string[]; handlers: unknown[]; sources: unknown[]; permissions: unknown; cooldownGlobalMs: number | null; cooldownUserMs: number | null; enabled: boolean }'
	],
	[
		'RunProgramOptions',
		'{ command: string; workingDirectory?: string; arguments?: string; waitSeconds?: number; environment?: Record<string, string>; hideWindow?: boolean; useShell?: boolean }'
	],
	[
		'RunProgramResult',
		'{ exitCode: number | null; stdout: string; stderr: string; outputLines: string[] }'
	],
	['LocalTtsRuntimeInfo', '{ installed: boolean }'],
	[
		'LocalTtsVoiceInfo',
		'{ id: string; name: string; language: string; quality: string; installed: boolean }'
	],
	[
		'ActionQueueDefinition',
		'{ id: number; name: string; concurrency: number; maxLength: number | null; sortOrder: number }'
	],
	[
		'ActionQueueEvent',
		"'paused' | 'resumed' | 'idle' | 'job_enqueued' | 'job_started' | 'job_completed'"
	],
	['ActionQueueJobContext', '{ jobId: string; actionId: number | null; actionName: string }'],
	[
		'ActionQueueEventContext',
		'{ queueId: number; queueName: string; pending: number; active: number; paused: boolean; job?: ActionQueueJobContext }'
	],
	['QueuedActionEntry', '{ jobId: string; actionId: number | null; actionName: string }'],
	[
		'ActionQueueStats',
		'{ pending: number; active: number; paused: boolean; pendingActions: QueuedActionEntry[]; activeActions: QueuedActionEntry[] }'
	],
	['HotkeyEventContext', '{ shortcut: string; modifiers: string[]; key: string }']
];

function collectDeclaredTypeNames(content) {
	const names = new Set();
	const pattern = /^(?:declare\s+)?(?:export\s+)?(?:type|interface|enum|class|const|function)\s+(\w+)/gm;

	for (const match of content.matchAll(pattern)) {
		names.add(match[1]);
	}

	return names;
}

function buildPluginAppApiDts() {
	const content = fs.readFileSync(pluginAppApiTypesPath, 'utf8');
	const withoutImports = stripImports(content);
	// Drop `export` so all declarations become global ambient types, matching the
	// unqualified `PluginAppApi` reference used from index.d.ts.
	const ambient = withoutImports.replace(/^export\s+/gm, '');
	const declaredNames = collectDeclaredTypeNames(ambient);

	const stubs = PLUGIN_APP_API_STUBS.filter(([name]) => !declaredNames.has(name))
		.map(([name, value]) => `type ${name} = ${value};`)
		.join('\n');

	// Reference sibling ambient files so this file is self-contained: trigger-data
	// provides AppLifecycle*/ProcessEventContext, index provides HandlerTriggerContext.
	const references = `/// <reference path="./trigger-data.d.ts" />
/// <reference path="./index.d.ts" />
`;

	return `${references}\n${PLUGIN_APP_API_PRELUDE}\n${stubs}\n\n${ambient}\n`;
}

function buildIndexDts() {
	return `/// <reference path="./plugin-app-api.d.ts" />
/// <reference path="./trigger-data.d.ts" />

/** One trigger payload passed to script handlers. */
type HandlerTriggerContext = {
	/** Stable trigger definition ID (for example \`twitch:twitch:chat:chat-message\`). */
	trigger: string;
	/** Trigger-specific payload. Narrowed in the editor when action triggers are known. */
	data: TriggerDataUnion;
	/** Mutable action-scoped variables for the current handler chain run. */
	actionVariables?: Record<string, string>;
};

/** Arguments passed to Run script handler user code. */
type ScriptContext = {
	/** Full Stream Kit application API (same as plugin handlers). */
	app: PluginAppApi;
	/** Trigger contexts for this action run (usually one entry). */
	context: HandlerTriggerContext[];
};

/** Return value of a Run script handler body. */
type ScriptResult = void | Promise<void>;

/** A Run script handler body with fully typed \`app\` and \`context\`. */
type ScriptHandler = (ctx: ScriptContext) => ScriptResult;

/**
 * Entry point for a Run script action. Return your handler from \`defineScript\`
 * to get full autocomplete and type checking, then \`export default\` it.
 *
 * Your handler receives:
 * - \`app\` — the Stream Kit API: \`app.toast\`, \`app.fs\`, \`app.plugins\`,
 *   \`app.actions\`, \`app.process\`, and more.
 * - \`context\` — the triggers that fired this action. Each entry has \`trigger\`
 *   (the trigger ID), \`data\` (the trigger payload, typed to this action's
 *   triggers), and \`actionVariables\` (mutable variables shared with later handlers).
 *
 * @example
 * export default defineScript(async ({ app, context }) => {
 * 	const [{ trigger, data, actionVariables }] = context;
 * 	app.toast.create({ title: 'Hello!', variant: 'success' });
 * });
 */
declare function defineScript(handler: ScriptHandler): ScriptHandler;
`;
}

/** @param {string} content */
function toTemplateLiteral(content) {
	return `\`${content.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${')}\``;
}

/** @param {{ indexDts: string, pluginAppApiDts: string, triggerDataDts: string, triggerMap: Record<string, string> }} payload */
function buildRuntimeGeneratedTs(payload) {
	return `// Auto-generated by scripts/generate-script-api-types.mjs — do not edit.

export const indexDts = ${toTemplateLiteral(payload.indexDts)};
export const pluginAppApiDts = ${toTemplateLiteral(payload.pluginAppApiDts)};
export const triggerDataDts = ${toTemplateLiteral(payload.triggerDataDts)};
export const triggerMap = ${JSON.stringify(payload.triggerMap, null, '\t')} as const;
`;
}

function main() {
	fs.mkdirSync(scriptApiDir, { recursive: true });

	/** @type {Record<string, string>} */
	const triggerMap = {};

	const pluginKeys = fs
		.readdirSync(pluginsDir, { withFileTypes: true })
		.filter((entry) => entry.isDirectory())
		.map((entry) => entry.name);

	for (const pluginKey of pluginKeys) {
		const manifestPath = path.join(pluginsDir, pluginKey, 'manifest.json');
		if (!fs.existsSync(manifestPath)) continue;

		const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
		const pluginDir = path.join(pluginsDir, pluginKey);
		const pluginName = manifest.name ?? pluginKey;
		const triggers = collectPluginTriggers(pluginDir, pluginKey, pluginName);

		for (const trigger of triggers) {
			if (trigger.contextType) {
				triggerMap[trigger.id] = trigger.contextType;
			}
		}
	}

	for (const trigger of collectOverlayTriggers()) {
		if (trigger.contextType) {
			triggerMap[trigger.id] = trigger.contextType;
		}
	}

	const triggerDataDts = buildTriggerDataDts();

	fs.writeFileSync(path.join(scriptApiDir, 'trigger-data.d.ts'), triggerDataDts, 'utf8');
	const pluginAppApiDts = buildPluginAppApiDts();
	const indexDts = buildIndexDts();
	fs.writeFileSync(path.join(scriptApiDir, 'plugin-app-api.d.ts'), pluginAppApiDts, 'utf8');
	fs.writeFileSync(path.join(scriptApiDir, 'index.d.ts'), indexDts, 'utf8');
	fs.writeFileSync(
		path.join(scriptApiDir, 'trigger-map.json'),
		`${JSON.stringify(triggerMap, null, 2)}\n`,
		'utf8'
	);
	fs.writeFileSync(
		path.join(scriptApiDir, 'runtime.generated.ts'),
		buildRuntimeGeneratedTs({
			indexDts,
			pluginAppApiDts,
			triggerDataDts,
			triggerMap
		}),
		'utf8'
	);

	console.log(
		`Generated @stream-kit/script-api (${Object.keys(triggerMap).length} trigger mappings)`
	);
}

main();
