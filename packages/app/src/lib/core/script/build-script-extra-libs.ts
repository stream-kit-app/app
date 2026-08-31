import type { MonacoExtraLib } from '@stream-kit/ui/monaco';

import {
	pluginApisDts,
	pluginAppApiDts,
	triggerDataDts,
	triggerMap
} from '@stream-kit/script-api/runtime';

/** Virtual project root — model URI and extra libs must share this prefix for Monaco IntelliSense. */
export const SCRIPT_PROJECT_ROOT = 'file:///project';

export const SCRIPT_HANDLER_URI = `${SCRIPT_PROJECT_ROOT}/src/handler.ts`;

export const SCRIPT_API_ROOT = `${SCRIPT_PROJECT_ROOT}/node_modules/@stream-kit/script-api`;

function projectLibPath(relativePath: string): string {
	return `${SCRIPT_PROJECT_ROOT}/${relativePath}`;
}

function scriptApiLibPath(relativePath: string): string {
	return `${SCRIPT_API_ROOT}/${relativePath}`;
}

const SCRIPT_TSCONFIG = {
	compilerOptions: {
		target: 'ESNext',
		module: 'ESNext',
		moduleResolution: 'node',
		strict: true,
		skipLibCheck: true,
		allowJs: true,
		isolatedModules: true,
		noEmit: true,
		allowNonTsExtensions: true,
		esModuleInterop: true,
		baseUrl: '.'
	},
	include: ['src/**/*.ts', 'node_modules/@stream-kit/script-api/**/*.d.ts']
} as const;

export type BuildScriptExtraLibsOptions = {
	source?: string;
	actionTriggers?: { id: string }[];
	/** Unique handler ID — gives each script editor its own Monaco model URI. */
	handlerId?: string;
};

function stripTripleSlashReferences(content: string): string {
	return content.replace(/^\/\/\/ <reference path="[^"]+" \/>\r?\n/gm, '');
}

function resolveTriggerDataType(triggerIds: string[]): string {
	const contextTypes = [
		...new Set(
			triggerIds
				.map((trigger) => triggerMap[trigger as keyof typeof triggerMap])
				.filter((type): type is string => Boolean(type))
		)
	];

	return contextTypes.length > 0 ? contextTypes.join(' | ') : 'TriggerDataUnion';
}

function buildHandlerContextDts(triggerIds: string[]): string {
	const dataType = resolveTriggerDataType(triggerIds);

	return `/** One trigger payload passed to script handlers. */
type HandlerTriggerContext = {
	/** Stable trigger definition ID (for example \`twitch:twitch:chat:chat-message\`). */
	trigger: string;
	/** Trigger-specific payload narrowed to triggers configured on this action. */
	data: ${dataType};
	/** Mutable action-scoped variables for the current handler chain run. */
	actionVariables?: Record<string, string>;
};
`;
}

function buildScriptIndexDts(): string {
	return `/** Arguments passed to Run script handler user code. */
type ScriptContext = {
	/** Full Stream Kit application API (same as plugin handlers). */
	app: PluginAppApi;
	/** Trigger contexts for this action run (usually one entry). */
	context: HandlerTriggerContext[];
};

/**
 * Return value of a Run script handler body.
 * A plain object is merged into action-scoped variables (values stringified) so
 * later handlers can use \`{key}\` placeholders.
 */
type ScriptResult =
	| void
	| Record<string, unknown>
	| Promise<void | Record<string, unknown>>;

/** A Run script handler body with fully typed \`app\` and \`context\`. */
type ScriptHandler = (ctx: ScriptContext) => ScriptResult;

/** Entry point for a Run script action. */
declare function defineScript(handler: ScriptHandler): ScriptHandler;
`;
}

export function buildScriptTypeDefinitionFiles(triggerIds: string[] = []): {
	triggerDataDts: string;
	handlerContextDts: string;
	pluginAppApiDts: string;
	pluginApisDts: string;
	indexDts: string;
} {
	const handlerContextBody = buildHandlerContextDts(triggerIds);
	const handlerContextDts = `/// <reference path="./trigger-data.d.ts" />\n\n${handlerContextBody}`;

	const indexDtsContent = `/// <reference path="./plugin-app-api.d.ts" />
/// <reference path="./plugin-apis.d.ts" />
/// <reference path="./trigger-data.d.ts" />
/// <reference path="./handler-context.d.ts" />

${buildScriptIndexDts()}`;

	const pluginAppApiContent = pluginAppApiDts.replace(
		/^\/\/\/ <reference path="\.\/index\.d\.ts" \/>\r?\n/m,
		''
	);

	return {
		triggerDataDts: stripTripleSlashReferences(triggerDataDts),
		handlerContextDts,
		pluginAppApiDts: pluginAppApiContent,
		pluginApisDts: stripTripleSlashReferences(pluginApisDts),
		indexDts: indexDtsContent
	};
}

/** Relative /// <reference /> from a handler model URI to the script API index. */
export function buildScriptReferenceDirective(modelUri: string): string {
	const prefix = `${SCRIPT_PROJECT_ROOT}/`;

	if (!modelUri.startsWith(prefix)) {
		return '';
	}

	const relativePath = modelUri.slice(prefix.length);
	const depth = relativePath.split('/').length - 1;

	return `/// <reference path="${'../'.repeat(depth)}node_modules/@stream-kit/script-api/index.d.ts" />\n`;
}

export function withScriptReferenceDirective(source: string, modelUri: string): string {
	const directive = buildScriptReferenceDirective(modelUri);

	if (!directive || source.includes('/// <reference path=')) {
		return source;
	}

	return `${directive}${source}`;
}

export function buildScriptHandlerUri(handlerId?: string): string {
	if (!handlerId) {
		return SCRIPT_HANDLER_URI;
	}

	const safeId = handlerId.replace(/[^a-zA-Z0-9:_-]/g, '_');
	return `${SCRIPT_PROJECT_ROOT}/src/handlers/${safeId}/handler.ts`;
}

export function buildScriptProjectTypeFiles(triggerIds: string[] = []) {
	return buildScriptTypeDefinitionFiles(triggerIds);
}

export function buildScriptExtraLibs(options: BuildScriptExtraLibsOptions = {}): MonacoExtraLib[] {
	const triggerIds = options.actionTriggers?.map((trigger) => trigger.id) ?? [];
	const types = buildScriptTypeDefinitionFiles(triggerIds);

	return [
		{
			content: JSON.stringify(SCRIPT_TSCONFIG, null, 2),
			filePath: projectLibPath('tsconfig.json')
		},
		{
			content: types.triggerDataDts,
			filePath: scriptApiLibPath('trigger-data.d.ts')
		},
		{
			content: types.handlerContextDts,
			filePath: scriptApiLibPath('handler-context.d.ts')
		},
		{
			content: types.pluginAppApiDts,
			filePath: scriptApiLibPath('plugin-app-api.d.ts')
		},
		{
			content: types.pluginApisDts,
			filePath: scriptApiLibPath('plugin-apis.d.ts')
		},
		{
			content: types.indexDts,
			filePath: scriptApiLibPath('index.d.ts')
		}
	];
}
