import type { MonacoExtraLib } from '@stream-kit/ui/monaco';

import { indexDts, pluginAppApiDts, triggerDataDts, triggerMap } from '@stream-kit/script-api/runtime';

const SCRIPT_HANDLER_URI = 'file:///src/handler.ts';

export type BuildScriptExtraLibsOptions = {
	source?: string;
	actionTriggers?: { id: string }[];
};

function buildActionAwareIndex(triggerIds: string[]): string {
	const contextTypes = [
		...new Set(
			triggerIds
				.map((trigger) => triggerMap[trigger as keyof typeof triggerMap])
				.filter((type): type is string => Boolean(type))
		)
	];

	const dataType = contextTypes.length > 0 ? contextTypes.join(' | ') : 'TriggerDataUnion';

	return `/// <reference path="./plugin-app-api.d.ts" />
/// <reference path="./trigger-data.d.ts" />

/** One trigger payload passed to script handlers. */
type HandlerTriggerContext = {
	/** Stable trigger definition ID (for example \`twitch:twitch:chat:chat-message\`). */
	trigger: string;
	/** Trigger-specific payload narrowed to triggers configured on this action. */
	data: ${dataType};
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
 * 	const [{ data }] = context;
 * 	app.toast.create({ title: \`Hello \${data.user}\`, variant: 'success' });
 * });
 */
declare function defineScript(handler: ScriptHandler): ScriptHandler;
`;
}

export function buildScriptExtraLibs(options: BuildScriptExtraLibsOptions = {}): MonacoExtraLib[] {
	const triggerIds = options.actionTriggers?.map((trigger) => trigger.id) ?? [];
	const indexContent =
		triggerIds.length > 0 ? buildActionAwareIndex(triggerIds) : indexDts;

	// Only the ambient type definitions are returned as extra libs. The live
	// handler source is NOT included here: it is edited directly in the Monaco
	// model, and re-registering it on every keystroke would reset the TypeScript
	// language service and cancel in-progress completions (e.g. after typing `.`).
	return [
		{
			content: pluginAppApiDts,
			filePath: 'file:///node_modules/@stream-kit/script-api/plugin-app-api.d.ts'
		},
		{
			content: triggerDataDts,
			filePath: 'file:///node_modules/@stream-kit/script-api/trigger-data.d.ts'
		},
		{
			content: indexContent,
			filePath: 'file:///node_modules/@stream-kit/script-api/index.d.ts'
		}
	];
}
