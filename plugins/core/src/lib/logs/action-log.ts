import type { PluginAppApi } from '@stream-kit/plugin';
import { BaseDirectory } from '@stream-kit/plugin';

import type { ActionLogAppendInput, ActionLogEntry } from './types';

type PluginAppFsApi = PluginAppApi['fs'];

const MAX_MEMORY_ENTRIES = 500;
const LOG_DIR = 'logs';
const LOG_FILE = 'logs/actions.ndjson';

type LogListener = () => void;

function dedupeEntriesById(entries: ActionLogEntry[]): ActionLogEntry[] {
	const seen = new Set<string>();
	const deduped: ActionLogEntry[] = [];

	for (const entry of entries) {
		if (!entry.id || seen.has(entry.id)) {
			continue;
		}

		seen.add(entry.id);
		deduped.push(entry);
	}

	return deduped;
}

export class ActionLogService {
	private entries: ActionLogEntry[] = [];
	private listeners = new Set<LogListener>();
	private loaded = false;
	revision = 0;

	async load(fs: PluginAppFsApi): Promise<void> {
		if (this.loaded) {
			return;
		}

		try {
			const exists = await fs.exists(LOG_FILE, { baseDir: BaseDirectory.AppData });

			if (!exists) {
				this.loaded = true;
				return;
			}

			const lines = await fs.readTextFileLines(LOG_FILE, { baseDir: BaseDirectory.AppData });
			const parsed: ActionLogEntry[] = [];
			const seenIds = new Set<string>();

			for await (const line of lines) {
				const trimmed = line.trim();

				if (!trimmed) {
					continue;
				}

				try {
					const entry = JSON.parse(trimmed) as ActionLogEntry;

					if (!entry.id || seenIds.has(entry.id)) {
						continue;
					}

					seenIds.add(entry.id);
					parsed.push(entry);
				} catch {
					// Skip malformed lines.
				}
			}

			this.entries = dedupeEntriesById(parsed).slice(-MAX_MEMORY_ENTRIES);
		} catch (error) {
			console.error('Failed to load action logs', error);
		}

		this.loaded = true;
	}

	getEntries(): ActionLogEntry[] {
		return dedupeEntriesById(this.entries);
	}

	subscribe(listener: LogListener): () => void {
		this.listeners.add(listener);

		return () => {
			this.listeners.delete(listener);
		};
	}

	private notify(): void {
		this.revision += 1;

		for (const listener of this.listeners) {
			listener();
		}
	}

	async append(fs: PluginAppFsApi, input: ActionLogAppendInput): Promise<ActionLogEntry> {
		const entry: ActionLogEntry = {
			id: crypto.randomUUID(),
			timestamp: Date.now(),
			level: input.level ?? 'info',
			message: input.message,
			actionId: input.actionId,
			actionName: input.actionName,
			trigger: input.trigger
		};

		if (!this.entries.some((existing) => existing.id === entry.id)) {
			this.entries.push(entry);
		}

		if (this.entries.length > MAX_MEMORY_ENTRIES) {
			this.entries.splice(0, this.entries.length - MAX_MEMORY_ENTRIES);
		}

		try {
			await fs.mkdir(LOG_DIR, { baseDir: BaseDirectory.AppData, recursive: true });

			await fs.writeTextFile(LOG_FILE, `${JSON.stringify(entry)}\n`, {
				baseDir: BaseDirectory.AppData,
				append: true,
				create: true
			});
		} catch (error) {
			console.error('Failed to persist action log entry', error);
		}

		this.notify();

		return entry;
	}

	async clear(fs: PluginAppFsApi): Promise<void> {
		this.entries = [];

		try {
			const exists = await fs.exists(LOG_FILE, { baseDir: BaseDirectory.AppData });

			if (exists) {
				await fs.remove(LOG_FILE, { baseDir: BaseDirectory.AppData });
			}
		} catch (error) {
			console.error('Failed to clear action logs on disk', error);
		}

		this.notify();
	}
}
