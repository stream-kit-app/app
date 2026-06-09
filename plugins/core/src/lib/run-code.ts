import type { HandlerTriggerContext } from '@stream-kit/core';
import type { PluginAppApi } from '@stream-kit/app/api';

export const SCRIPT_TEMPLATE = `export default (context: HandlerTriggerContext[]) => {
\tconst [{ trigger, data }] = context;
\t// trigger: name of the trigger that fired
\t// data: full payload from that trigger (e.g. chat message object)
}`;

type ScriptRunner = (context: HandlerTriggerContext[]) => void | Promise<void>;

function normalizeScriptSource(source: string): string {
	return source
		.trim()
		.replace(/^\s*export\s+default\s+/, '')
		.replace(/(\w+)\s*:\s*[\w.<>,\s\[\]|&]+/g, '$1');
}

function compileScript(source: string): ScriptRunner {
	const normalized = normalizeScriptSource(source);

	return new Function('context', `const fn = ${normalized}; return fn(context);`) as ScriptRunner;
}

export async function runUserScript(
	app: PluginAppApi,
	source: string,
	context: HandlerTriggerContext[]
): Promise<void> {
	try {
		const runner = compileScript(source);
		await runner(context);
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
