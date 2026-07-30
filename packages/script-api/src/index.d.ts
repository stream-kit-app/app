/// <reference path="./plugin-app-api.d.ts" />
/// <reference path="./trigger-data.d.ts" />

/** One trigger payload passed to script handlers. */
type HandlerTriggerContext = {
	/** Stable trigger definition ID (for example `twitch:twitch:chat:chat-message`). */
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

/**
 * Return value of a Run script handler body.
 * A plain object is merged into action-scoped variables (values stringified) so
 * later handlers can use `{key}` placeholders.
 */
type ScriptResult =
	| void
	| Record<string, unknown>
	| Promise<void | Record<string, unknown>>;

/** A Run script handler body with fully typed `app` and `context`. */
type ScriptHandler = (ctx: ScriptContext) => ScriptResult;

/**
 * Entry point for a Run script action. Return your handler from `defineScript`
 * to get full autocomplete and type checking, then `export default` it.
 *
 * Your handler receives:
 * - `app` — the Stream Kit API: `app.toast`, `app.fs`, `app.plugins`,
 *   `app.actions`, `app.process`, and more.
 * - `context` — the triggers that fired this action. Each entry has `trigger`
 *   (the trigger ID), `data` (the trigger payload, typed to this action's
 *   triggers), and `actionVariables` (mutable variables shared with later handlers).
 *
 * Return a plain object to expose values as action variables for later handlers.
 *
 * @example
 * export default defineScript(async ({ app, context }) => {
 * 	const [{ trigger, data, actionVariables }] = context;
 * 	app.toast.create({ title: 'Hello!', variant: 'success' });
 * 	return { greeting: 'Hello from script' };
 * });
 */
declare function defineScript(handler: ScriptHandler): ScriptHandler;
