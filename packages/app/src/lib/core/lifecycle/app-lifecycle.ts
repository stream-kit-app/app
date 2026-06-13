import { getCurrentWindow } from '@tauri-apps/api/window';

import type { AppLifecycleContext, AppLifecycleEvent } from './types';

type AppLifecycleHandler = (context: AppLifecycleContext) => void | Promise<void>;

// Hard cap on how long exit handlers may delay window close. A misbehaving
// handler that never resolves must not prevent the app from closing.
const EXIT_TIMEOUT_MS = 5_000;

export class AppLifecycle {
	private hasStarted = false;
	private isExiting = false;
	private closeListenerReady: Promise<void> | undefined;
	private closeUnlisten: (() => void) | undefined;
	private readonly startedHandlers = new Set<AppLifecycleHandler>();
	private readonly exitHandlers = new Set<AppLifecycleHandler>();

	get started(): boolean {
		return this.hasStarted;
	}

	onStarted(handler: AppLifecycleHandler): () => void {
		this.startedHandlers.add(handler);

		return () => {
			this.startedHandlers.delete(handler);
		};
	}

	onExit(handler: AppLifecycleHandler): () => void {
		void this.ensureCloseListener();
		this.exitHandlers.add(handler);

		return () => {
			this.exitHandlers.delete(handler);
		};
	}

	emitStarted(): void {
		if (this.hasStarted) {
			return;
		}

		this.hasStarted = true;
		const context = this.getContext('started');

		for (const handler of this.startedHandlers) {
			handler(context);
		}
	}

	async emitExit(): Promise<void> {
		const context = this.getContext('exit');

		await Promise.all(
			[...this.exitHandlers].map(async (handler) => {
				try {
					await handler(context);
				} catch (error) {
					console.error('App exit handler failed', error);
				}
			})
		);
	}

	getContext(event: AppLifecycleEvent): AppLifecycleContext {
		return {
			event,
			timestamp: new Date().toISOString()
		};
	}

	private async ensureCloseListener(): Promise<void> {
		if (this.closeUnlisten) {
			return;
		}

		if (!this.closeListenerReady) {
			this.closeListenerReady = this.registerCloseListener();
		}

		await this.closeListenerReady;
	}

	private async registerCloseListener(): Promise<void> {
		const window = getCurrentWindow();

		this.closeUnlisten = await window.onCloseRequested(async (event) => {
			if (this.isExiting) {
				return;
			}

			// Hold the window open until async cleanup (flush stores, disconnect,
			// etc.) finishes, then force-close to avoid re-triggering this handler.
			this.isExiting = true;
			event.preventDefault();

			try {
				// Don't let a hanging exit handler block close forever.
				await Promise.race([
					this.emitExit(),
					new Promise<void>((resolve) => setTimeout(resolve, EXIT_TIMEOUT_MS))
				]);
			} finally {
				await window.destroy();
			}
		});
	}
}
