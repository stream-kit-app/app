import type { HandlerTriggerContext } from '@stream-kit/core';
import { contextToVariables } from '@stream-kit/core';
import type { PluginAppApi } from '@stream-kit/plugin';
import { transform } from 'sucrase';

export const SCRIPT_TEMPLATE = `export default defineScript(async ({ app, context }) => {
\tconst [{ trigger, data, actionVariables }] = context;
\t// app: full Stream Kit API (toast, fs, plugins, actions, …)
\t// trigger: ID of the trigger that fired
\t// data: trigger payload (typed in the editor when triggers are configured)
\t// actionVariables: mutable action-scoped variables for this run
\t// return { key: value } to expose values as {key} for later handlers
});`;

const SCRIPT_TIMEOUT_MS = 5_000;
const TRIPLE_SLASH_REFERENCE = /^\/\/\/\s*<reference\s+path=(["'])[^"']+\1\s*\/>\s*\r?\n?/gm;

function stripTripleSlashReferences(source: string): string {
	return source.replace(TRIPLE_SLASH_REFERENCE, '');
}

function toRunnableJavaScript(source: string): string {
	const { code } = transform(stripTripleSlashReferences(source), {
		transforms: ['typescript', 'imports']
	});

	return code;
}

type ScriptHandler = (ctx: {
	app: PluginAppApi;
	context: HandlerTriggerContext[];
}) => unknown;

// Identity helper so `defineScript(...)` works at runtime; it only exists to
// provide contextual typing for `app`/`context` in the editor.
const defineScript = (handler: ScriptHandler): ScriptHandler => handler;

function compileScript(
	source: string
): (app: PluginAppApi, context: HandlerTriggerContext[]) => Promise<unknown> {
	const body = toRunnableJavaScript(source);

	// Use Function + Promise.resolve so async user scripts work without AsyncFunction,
	// which is unavailable in some plugin execution contexts. Sucrase's `imports`
	// transform emits `exports.default = …`, so we provide a local `exports` object.
	const runner = new Function(
		'app',
		'context',
		'defineScript',
		`const exports = {};
const module = { exports };
${body};
const __script = exports.default ?? module.exports.default ?? module.exports;
if (typeof __script !== 'function') {
	throw new Error('Script must export a default function');
}
return Promise.resolve(__script({ app, context }));`
	) as (
		app: PluginAppApi,
		context: HandlerTriggerContext[],
		define: typeof defineScript
	) => Promise<unknown>;

	return (app, context) => runner(app, context, defineScript);
}

function ensureActionVariables(context: HandlerTriggerContext): Record<string, string> {
	if (!context.actionVariables) {
		context.actionVariables = {};
	}

	return context.actionVariables;
}

function applyScriptReturn(context: HandlerTriggerContext[], result: unknown): void {
	if (!result || typeof result !== 'object' || Array.isArray(result)) {
		return;
	}

	const variables = contextToVariables(result);

	if (Object.keys(variables).length === 0) {
		return;
	}

	for (const entry of context) {
		Object.assign(ensureActionVariables(entry), variables);
	}
}

function diffVariables(
	before: Record<string, string>,
	after: Record<string, string>
): string[] {
	const changes: string[] = [];

	for (const [key, value] of Object.entries(after)) {
		if (before[key] !== value) {
			changes.push(`{${key}} = ${JSON.stringify(value)}`);
		}
	}

	for (const key of Object.keys(before)) {
		if (!(key in after)) {
			changes.push(`{${key}} removed`);
		}
	}

	return changes;
}

function timeoutAfter(ms: number): Promise<never> {
	return new Promise((_, reject) => {
		setTimeout(() => {
			reject(new Error(`Script exceeded the ${ms}ms time limit`));
		}, ms);
	});
}

/**
 * Run a user script against the live handler context. Scripts mutate `actionVariables`
 * in place (the same object later handlers read), or return `{ key: value }`.
 *
 * @returns Human-readable action variable changes, for the action log.
 */
export async function runUserScript(
	app: PluginAppApi,
	source: string,
	context: HandlerTriggerContext[]
): Promise<string[]> {
	for (const entry of context) {
		ensureActionVariables(entry);
	}

	const before = { ...context[0]?.actionVariables };

	try {
		const runnable = compileScript(source);
		const result = await Promise.race([runnable(app, context), timeoutAfter(SCRIPT_TIMEOUT_MS)]);
		applyScriptReturn(context, result);

		return diffVariables(before, context[0]?.actionVariables ?? {});
	} catch (error) {
		const message = error instanceof Error ? error.message : String(error);
		console.error('Script execution failed', error);
		app.toast.create({
			title: 'Script execution failed',
			description: message,
			variant: 'error'
		});

		return [];
	}
}
