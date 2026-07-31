import {
	isRegistered as isShortcutRegistered,
	register as registerGlobalShortcut,
	unregister as unregisterGlobalShortcut
} from '@tauri-apps/plugin-global-shortcut';

import { getApp } from '../registry';
import { translate } from '$lib/i18n';

import { formatShortcutLabel, normalizeShortcut, parseShortcut } from './shortcut';
import type { HotkeyEventContext } from './types';

export type { HotkeyEventContext } from './types';

type HotkeyHandler = (context: HotkeyEventContext) => void;

type ShortcutEntry = {
	handlers: Set<HotkeyHandler>;
	registered: boolean;
};

function buildContext(shortcut: string): HotkeyEventContext {
	const { modifiers, key } = parseShortcut(shortcut);

	return {
		shortcut,
		modifiers,
		key
	};
}

function isAlreadyRegisteredError(error: unknown): boolean {
	const message = error instanceof Error ? error.message : String(error);
	return /already registered/i.test(message);
}

export class HotkeyManager {
	private readonly registry = new Map<string, ShortcutEntry>();
	/** Serializes register/unregister per shortcut so activate↔deactivate races cannot fight Tauri. */
	private readonly chains = new Map<string, Promise<unknown>>();

	register(shortcut: string, handler: HotkeyHandler): () => void {
		const normalized = normalizeShortcut(shortcut);

		if (!normalized) {
			return () => {};
		}

		let entry = this.registry.get(normalized);

		if (!entry) {
			entry = { handlers: new Set(), registered: false };
			this.registry.set(normalized, entry);
		}

		entry.handlers.add(handler);
		void this.enqueue(normalized, () => this.syncRegistration(normalized, entry));

		return () => {
			const current = this.registry.get(normalized);

			if (!current) {
				return;
			}

			current.handlers.delete(handler);
			void this.enqueue(normalized, () => this.syncRegistration(normalized, current));
		};
	}

	async isRegistered(shortcut: string): Promise<boolean> {
		const normalized = normalizeShortcut(shortcut);

		if (!normalized) {
			return false;
		}

		try {
			return await isShortcutRegistered(normalized);
		} catch {
			return false;
		}
	}

	/** Invoke registered hotkey listeners as if the shortcut was pressed. */
	trigger(shortcut: string): boolean {
		const normalized = normalizeShortcut(shortcut);

		if (!normalized) {
			return false;
		}

		const entry = this.registry.get(normalized);

		if (!entry || entry.handlers.size === 0) {
			return false;
		}

		this.emitHandlers(normalized, entry);
		return true;
	}

	private enqueue(shortcut: string, op: () => Promise<void>): Promise<void> {
		const previous = this.chains.get(shortcut) ?? Promise.resolve();
		const next = previous.catch(() => {}).then(op);
		this.chains.set(shortcut, next);

		void next.finally(() => {
			if (this.chains.get(shortcut) === next) {
				this.chains.delete(shortcut);
			}
		});

		return next;
	}

	private emitHandlers(shortcut: string, entry: ShortcutEntry): void {
		const context = buildContext(shortcut);

		for (const handler of entry.handlers) {
			handler(context);
		}
	}

	private async syncRegistration(shortcut: string, entry: ShortcutEntry): Promise<void> {
		if (entry.handlers.size > 0) {
			if (entry.registered) {
				return;
			}

			await this.registerWithTauri(shortcut, entry);
			return;
		}

		if (!entry.registered) {
			if (this.registry.get(shortcut) === entry) {
				this.registry.delete(shortcut);
			}
			return;
		}

		await this.unregisterWithTauri(shortcut, entry);

		if (entry.handlers.size === 0 && this.registry.get(shortcut) === entry) {
			this.registry.delete(shortcut);
		}
	}

	private async registerWithTauri(shortcut: string, entry: ShortcutEntry): Promise<void> {
		try {
			await this.bindShortcut(shortcut, entry);
			entry.registered = true;
		} catch (error) {
			if (isAlreadyRegisteredError(error)) {
				try {
					await unregisterGlobalShortcut(shortcut);
					await this.bindShortcut(shortcut, entry);
					entry.registered = true;
					return;
				} catch (retryError) {
					this.reportRegistrationFailure(shortcut, retryError);
					return;
				}
			}

			this.reportRegistrationFailure(shortcut, error);
		}
	}

	private async bindShortcut(shortcut: string, entry: ShortcutEntry): Promise<void> {
		await registerGlobalShortcut(shortcut, (event) => {
			if (event.state !== 'Pressed') {
				return;
			}

			this.emitHandlers(shortcut, entry);
		});
	}

	private reportRegistrationFailure(shortcut: string, error: unknown): void {
		console.warn(`Failed to register global shortcut "${shortcut}":`, error);

		try {
			getApp().toast.create({
				id: `hotkey-register-failed:${shortcut}`,
				title: translate('Hotkey could not be registered'),
				description: translate(
					'"{shortcut}" may already be in use by another application.',
					{ shortcut: formatShortcutLabel(shortcut) }
				),
				variant: 'warning'
			});
		} catch {
			// App may not be booted yet during tests.
		}
	}

	private async unregisterWithTauri(shortcut: string, entry: ShortcutEntry): Promise<void> {
		try {
			await unregisterGlobalShortcut(shortcut);
		} catch (error) {
			console.warn(`Failed to unregister global shortcut "${shortcut}":`, error);
		} finally {
			entry.registered = false;
		}
	}
}
