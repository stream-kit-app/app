import type { HandlerTriggerContext } from '@stream-kit/core';
import type { PluginAppApi } from '@stream-kit/plugin';
import { transform } from 'sucrase';

export const SCRIPT_TEMPLATE = `export default defineScript(async ({ app, context }) => {
\tconst [{ trigger, data, actionVariables }] = context;
\t// app: full Stream Kit API (toast, fs, plugins, actions, …)
\t// trigger: ID of the trigger that fired
\t// data: trigger payload (typed in the editor when triggers are configured)
\t// actionVariables: mutable action-scoped variables for this run
});`;

const SCRIPT_TIMEOUT_MS = 5_000;

function toRunnableJavaScript(source: string): string {
	const { code } = transform(source, {
		transforms: ['typescript']
	});

	return code.trim().replace(/^\s*export\s+default\s+/, 'const __script = ');
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
	// which is unavailable in some plugin execution contexts.
	const runner = new Function(
		'app',
		'context',
		'defineScript',
		`${body};\nreturn Promise.resolve(__script({ app, context }));`
	) as (
		app: PluginAppApi,
		context: HandlerTriggerContext[],
		define: typeof defineScript
	) => Promise<unknown>;

	return (app, context) => runner(app, context, defineScript);
}

function toCloneable(context: HandlerTriggerContext[]): HandlerTriggerContext[] {
	try {
		structuredClone(context);
		return context;
	} catch {
		return JSON.parse(JSON.stringify(context)) as HandlerTriggerContext[];
	}
}

function applyContextResult(
	original: HandlerTriggerContext[],
	updated: HandlerTriggerContext[]
): void {
	if (!Array.isArray(updated)) {
		return;
	}

	original.forEach((context, index) => {
		const next = updated[index];

		if (next?.actionVariables && context.actionVariables) {
			Object.assign(context.actionVariables, next.actionVariables);
		}
	});
}

function timeoutAfter(ms: number): Promise<never> {
	return new Promise((_, reject) => {
		setTimeout(() => {
			reject(new Error(`Script exceeded the ${ms}ms time limit`));
		}, ms);
	});
}

export async function runUserScript(
	app: PluginAppApi,
	source: string,
	context: HandlerTriggerContext[]
): Promise<void> {
	try {
		const runnable = compileScript(source);
		const clone = toCloneable(context);
		await Promise.race([runnable(app, clone), timeoutAfter(SCRIPT_TIMEOUT_MS)]);
		applyContextResult(context, clone);
	} catch (error) {
		const message = error instanceof Error ? error.message : String(error);
		console.error('Script execution failed', error);
		app.toast.create({
			title: 'Script execution failed',
			description: message,
			variant: 'error'
		});
	}
}
