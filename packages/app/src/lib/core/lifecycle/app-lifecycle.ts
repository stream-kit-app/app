import { getCurrentWindow } from '@tauri-apps/api/window';

import type { AppLifecycleContext, AppLifecycleEvent } from './types';

type AppLifecycleHandler = (context: AppLifecycleContext) => void;

export class AppLifecycle {
	private hasStarted = false;
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

	emitExit(): void {
		const context = this.getContext('exit');

		for (const handler of this.exitHandlers) {
			handler(context);
		}
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
		this.closeUnlisten = await getCurrentWindow().onCloseRequested(() => {
			this.emitExit();
		});
	}
}
