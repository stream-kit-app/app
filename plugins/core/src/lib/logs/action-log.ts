import type { PluginAppApi } from '@stream-kit/plugin';
import { BaseDirectory } from '@stream-kit/plugin';

import type { ActionLogAppendInput, ActionLogEntry } from './types';

type PluginAppFsApi = PluginAppApi['fs'];

const MAX_MEMORY_ENTRIES = 500;
const MAX_DISK_ENTRIES = MAX_MEMORY_ENTRIES * 2;
const FLUSH_DELAY_MS = 250;
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
	private dirReady = false;
	private pendingLines: string[] = [];
	private diskLineCount = 0;
	private flushTimer: ReturnType<typeof setTimeout> | null = null;
	private flushFs: PluginAppFsApi | null = null;
	revision = 0;

	async load(fs: PluginAppFsApi): Promise<void> {
		if (this.loaded) {
			return;
		}

		try {
			const exists = await fs.exists(LOG_FILE, { baseDir: BaseDirectory.AppData });

			if (!exists) {
				this.loaded = true;
				this.dirReady = true;
				return;
			}

			const lines = await fs.readTextFileLines(LOG_FILE, { baseDir: BaseDirectory.AppData });
			const parsed: ActionLogEntry[] = [];
			const seenIds = new Set<string>();
			let diskLineCount = 0;

			for await (const line of lines) {
				const trimmed = line.trim();

				if (!trimmed) {
					continue;
				}

				diskLineCount += 1;

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
			this.diskLineCount = diskLineCount;
			this.dirReady = true;

			if (this.diskLineCount > MAX_DISK_ENTRIES) {
				await this.rewriteFromMemory(fs);
			}
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

		this.pendingLines.push(JSON.stringify(entry));
		this.scheduleFlush(fs);
		this.notify();

		return entry;
	}

	private scheduleFlush(fs: PluginAppFsApi): void {
		this.flushFs = fs;

		if (this.flushTimer != null) {
			return;
		}

		this.flushTimer = setTimeout(() => {
			this.flushTimer = null;
			const target = this.flushFs;
			if (target) {
				void this.flush(target);
			}
		}, FLUSH_DELAY_MS);
	}

	private async ensureDir(fs: PluginAppFsApi): Promise<void> {
		if (this.dirReady) {
			return;
		}

		await fs.mkdir(LOG_DIR, { baseDir: BaseDirectory.AppData, recursive: true });
		this.dirReady = true;
	}

	private async flush(fs: PluginAppFsApi): Promise<void> {
		if (this.pendingLines.length === 0) {
			return;
		}

		const chunk = this.pendingLines.splice(0).join('\n') + '\n';

		try {
			await this.ensureDir(fs);
			await fs.writeTextFile(LOG_FILE, chunk, {
				baseDir: BaseDirectory.AppData,
				append: true,
				create: true
			});
			this.diskLineCount += chunk.split('\n').filter(Boolean).length;

			if (this.diskLineCount > MAX_DISK_ENTRIES) {
				await this.rewriteFromMemory(fs);
			}
		} catch (error) {
			console.error('Failed to persist action log entry', error);
		}
	}

	private async rewriteFromMemory(fs: PluginAppFsApi): Promise<void> {
		const lines = this.entries.map((entry) => JSON.stringify(entry));
		await this.ensureDir(fs);
		await fs.writeTextFile(LOG_FILE, lines.length > 0 ? `${lines.join('\n')}\n` : '', {
			baseDir: BaseDirectory.AppData,
			append: false,
			create: true
		});
		this.diskLineCount = lines.length;
	}

	async clear(fs: PluginAppFsApi): Promise<void> {
		if (this.flushTimer != null) {
			clearTimeout(this.flushTimer);
			this.flushTimer = null;
		}

		this.pendingLines = [];
		this.entries = [];
		this.diskLineCount = 0;

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
