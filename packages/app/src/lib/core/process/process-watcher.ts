import { invoke } from '@tauri-apps/api/core';
import { listen, type UnlistenFn } from '@tauri-apps/api/event';

import { runProgram, type RunProgramOptions, type RunProgramResult } from './run-program';
import type { ProcessEventContext } from './types';

type ProcessEventHandler = (context: ProcessEventContext) => void;

const PROCESS_EVENT_DEDUPE_MS = 2_000;

export class ProcessWatcher {
	private isRunning = false;
	private startedUnlisten: UnlistenFn | undefined;
	private stoppedUnlisten: UnlistenFn | undefined;
	private listenersReady: Promise<void> | undefined;
	private readonly startedHandlers = new Set<ProcessEventHandler>();
	private readonly stoppedHandlers = new Set<ProcessEventHandler>();
	private readonly recentStarts = new Map<string, number>();
	private readonly recentStops = new Map<string, number>();

	get running(): boolean {
		return this.isRunning;
	}

	onStarted(handler: ProcessEventHandler): () => void {
		void this.ensureListeners();
		this.startedHandlers.add(handler);

		return () => {
			this.startedHandlers.delete(handler);
		};
	}

	onStopped(handler: ProcessEventHandler): () => void {
		void this.ensureListeners();
		this.stoppedHandlers.add(handler);

		return () => {
			this.stoppedHandlers.delete(handler);
		};
	}

	run(options: RunProgramOptions): Promise<RunProgramResult> {
		return runProgram(options);
	}

	async sync(enabled: boolean): Promise<void> {
		if (!enabled) {
			await this.stop();
			return;
		}

		await this.ensureListeners();

		if (this.isRunning) {
			return;
		}

		await invoke('start_process_watcher');
		this.isRunning = true;
	}

	async stop(): Promise<void> {
		if (!this.isRunning) {
			return;
		}

		await invoke('stop_process_watcher');
		this.isRunning = false;
		this.recentStarts.clear();
		this.recentStops.clear();

		// Tear down the Tauri event listeners so they don't keep receiving events
		// while stopped; `sync(true)` re-registers them via `ensureListeners`.
		this.startedUnlisten?.();
		this.stoppedUnlisten?.();
		this.startedUnlisten = undefined;
		this.stoppedUnlisten = undefined;
		this.listenersReady = undefined;
	}

	private emitStarted(context: ProcessEventContext): void {
		if (!this.shouldEmitStarted(context)) {
			return;
		}

		for (const handler of this.startedHandlers) {
			handler(context);
		}
	}

	private emitStopped(context: ProcessEventContext): void {
		if (!this.shouldEmitStopped(context)) {
			return;
		}

		for (const handler of this.stoppedHandlers) {
			handler(context);
		}
	}

	private shouldEmitProcessEvent(
		context: ProcessEventContext,
		recent: Map<string, number>
	): boolean {
		const executable = context.executable.trim().toLowerCase();

		if (!executable) {
			return true;
		}

		const now = Date.now();
		const lastEmittedAt = recent.get(executable);

		if (lastEmittedAt !== undefined && now - lastEmittedAt < PROCESS_EVENT_DEDUPE_MS) {
			return false;
		}

		recent.set(executable, now);
		return true;
	}

	private shouldEmitStarted(context: ProcessEventContext): boolean {
		return this.shouldEmitProcessEvent(context, this.recentStarts);
	}

	private shouldEmitStopped(context: ProcessEventContext): boolean {
		return this.shouldEmitProcessEvent(context, this.recentStops);
	}

	private async ensureListeners(): Promise<void> {
		if (this.startedUnlisten && this.stoppedUnlisten) {
			return;
		}

		if (!this.listenersReady) {
			this.listenersReady = this.registerListeners();
		}

		await this.listenersReady;
	}

	private async registerListeners(): Promise<void> {
		this.startedUnlisten = await listen<ProcessEventContext>('process-started', (event) => {
			this.emitStarted(event.payload);
		});

		this.stoppedUnlisten = await listen<ProcessEventContext>('process-stopped', (event) => {
			this.emitStopped(event.payload);
		});
	}
}
