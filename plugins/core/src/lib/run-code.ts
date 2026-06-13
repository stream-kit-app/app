import type { HandlerTriggerContext } from '@stream-kit/core';
import type { PluginAppApi } from '@stream-kit/plugin';

export const SCRIPT_TEMPLATE = `export default (context: HandlerTriggerContext[]) => {
\tconst [{ trigger, data }] = context;
\t// trigger: name of the trigger that fired
\t// data: full payload from that trigger (e.g. chat message object)
}`;

const SCRIPT_TIMEOUT_MS = 5_000;

// The worker runs user code in an isolated global scope with no access to the
// app, the DOM, or Tauri APIs. It only receives the (cloned) trigger context and
// returns the mutated context, so scripts can set action variables but cannot
// reach into the host application.
const WORKER_SOURCE = `
self.onmessage = async (event) => {
	const { id, source, context } = event.data;

	try {
		const fn = new Function('context', 'const f = (' + source + '); return f(context);');
		await fn(context);
		self.postMessage({ id, ok: true, context });
	} catch (error) {
		const message = error instanceof Error ? error.message : String(error);
		self.postMessage({ id, ok: false, error: message });
	}
};
`;

type WorkerResponse =
	| { id: number; ok: true; context: HandlerTriggerContext[] }
	| { id: number; ok: false; error: string };

let worker: Worker | undefined;
let workerUrl: string | undefined;
let messageId = 0;

function getWorker(): Worker {
	if (!worker) {
		const blob = new Blob([WORKER_SOURCE], { type: 'application/javascript' });
		workerUrl = URL.createObjectURL(blob);
		worker = new Worker(workerUrl);
	}

	return worker;
}

function disposeWorker(): void {
	worker?.terminate();
	worker = undefined;

	if (workerUrl) {
		URL.revokeObjectURL(workerUrl);
		workerUrl = undefined;
	}
}

function normalizeScriptSource(source: string): string {
	return source
		.trim()
		.replace(/^\s*export\s+default\s+/, '')
		.replace(/(\w+)\s*:\s*[\w.<>,\s\[\]|&]+/g, '$1');
}

function toCloneable(context: HandlerTriggerContext[]): HandlerTriggerContext[] {
	try {
		structuredClone(context);
		return context;
	} catch {
		// Fall back to a JSON-safe copy when the payload contains non-cloneable
		// values (functions, class instances, etc.).
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

function runInWorker(
	source: string,
	context: HandlerTriggerContext[]
): Promise<HandlerTriggerContext[]> {
	const activeWorker = getWorker();
	const id = ++messageId;

	return new Promise<HandlerTriggerContext[]>((resolve, reject) => {
		const cleanup = (): void => {
			clearTimeout(timeout);
			activeWorker.removeEventListener('message', onMessage);
		};

		const timeout = setTimeout(() => {
			cleanup();
			// Terminate the stuck worker so a runaway script can't hang forever; a
			// fresh worker is created on the next run.
			disposeWorker();
			reject(new Error(`Script exceeded the ${SCRIPT_TIMEOUT_MS}ms time limit`));
		}, SCRIPT_TIMEOUT_MS);

		const onMessage = (event: MessageEvent<WorkerResponse>): void => {
			if (event.data?.id !== id) {
				return;
			}

			cleanup();

			if (event.data.ok) {
				resolve(event.data.context);
			} else {
				reject(new Error(event.data.error));
			}
		};

		activeWorker.addEventListener('message', onMessage);
		activeWorker.postMessage({ id, source, context: toCloneable(context) });
	});
}

export async function runUserScript(
	app: PluginAppApi,
	source: string,
	context: HandlerTriggerContext[]
): Promise<void> {
	try {
		const normalized = normalizeScriptSource(source);
		const updated = await runInWorker(normalized, context);
		applyContextResult(context, updated);
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
