import { BaseDirectory, mkdir, writeTextFile } from '@tauri-apps/plugin-fs';

/**
 * TEMPORARY diagnostics for the TTS queue stall. Appends timestamped lines to
 * AppData/logs/debug-trace.log so a release build can be inspected afterwards.
 * Plugins reach it through `globalThis.__streamKitTrace` (they can't import app code).
 * Also mirrors console.warn / console.error into the file. Remove once resolved.
 */

const TRACE_FILE = 'logs/debug-trace.log';
const FLUSH_DELAY_MS = 1_000;

type TraceFn = (scope: string, message: string, data?: unknown) => void;

declare global {
	var __streamKitTrace: TraceFn | undefined;
}

let pending: string[] = [];
let flushTimer: ReturnType<typeof setTimeout> | null = null;
let flushing = false;
let dirReady = false;
let installed = false;

function stringify(data: unknown): string {
	if (data === undefined) {
		return '';
	}

	if (data instanceof Error) {
		return ` ${data.name}: ${data.message}`;
	}

	try {
		return ` ${JSON.stringify(data, (_key, value: unknown) =>
			value instanceof Error ? `${value.name}: ${value.message}` : value
		)}`;
	} catch {
		return ` ${String(data)}`;
	}
}

function stamp(): string {
	const now = new Date();
	const pad = (value: number, size = 2): string => String(value).padStart(size, '0');

	return `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}.${pad(now.getMilliseconds(), 3)}`;
}

async function flush(): Promise<void> {
	flushTimer = null;

	if (flushing || pending.length === 0) {
		return;
	}

	flushing = true;
	const chunk = pending.splice(0).join('\n') + '\n';

	try {
		if (!dirReady) {
			await mkdir('logs', { baseDir: BaseDirectory.AppData, recursive: true });
			dirReady = true;
		}

		await writeTextFile(TRACE_FILE, chunk, {
			baseDir: BaseDirectory.AppData,
			append: true,
			create: true
		});
	} catch {
		// Never let diagnostics break the app.
	} finally {
		flushing = false;

		if (pending.length > 0) {
			scheduleFlush();
		}
	}
}

function scheduleFlush(): void {
	flushTimer ??= setTimeout(() => void flush(), FLUSH_DELAY_MS);
}

export const trace: TraceFn = (scope, message, data) => {
	pending.push(`${stamp()} [${scope}] ${message}${stringify(data)}`);
	scheduleFlush();
};

export function installDebugTrace(): void {
	if (installed) {
		return;
	}

	installed = true;
	globalThis.__streamKitTrace = trace;

	for (const level of ['warn', 'error'] as const) {
		const original = console[level].bind(console);

		console[level] = (...args: unknown[]) => {
			original(...args);

			try {
				const [first, ...rest] = args;
				trace(`console.${level}`, typeof first === 'string' ? first : stringify(first).trim(), rest.length > 0 ? rest : undefined);
			} catch {
				// Ignore.
			}
		};
	}

	trace('trace', '--- app boot ---');
}
