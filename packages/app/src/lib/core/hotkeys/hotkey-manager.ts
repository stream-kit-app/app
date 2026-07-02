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
	registering: Promise<void> | null;
};

function buildContext(shortcut: string): HotkeyEventContext {
	const { modifiers, key } = parseShortcut(shortcut);

	return {
		shortcut,
		modifiers,
		key
	};
}

export class HotkeyManager {
	private readonly registry = new Map<string, ShortcutEntry>();

	register(shortcut: string, handler: HotkeyHandler): () => void {
		const normalized = normalizeShortcut(shortcut);

		if (!normalized) {
			return () => {};
		}

		let entry = this.registry.get(normalized);

		if (!entry) {
			entry = { handlers: new Set(), registered: false, registering: null };
			this.registry.set(normalized, entry);
		}

		entry.handlers.add(handler);

		if (!entry.registered && !entry.registering) {
			entry.registering = this.registerWithTauri(normalized, entry).finally(() => {
				entry.registering = null;
			});
		}

		return () => {
			const current = this.registry.get(normalized);

			if (!current) {
				return;
			}

			current.handlers.delete(handler);

			if (current.handlers.size === 0) {
				void this.unregisterWithTauri(normalized, current);
				this.registry.delete(normalized);
			}
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

	private async registerWithTauri(shortcut: string, entry: ShortcutEntry): Promise<void> {
		try {
			await registerGlobalShortcut(shortcut, (event) => {
				if (event.state !== 'Pressed') {
					return;
				}

				const context = buildContext(shortcut);

				for (const handler of entry.handlers) {
					handler(context);
				}
			});

			entry.registered = true;
		} catch (error) {
			console.warn(`Failed to register global shortcut "${shortcut}":`, error);

			try {
				getApp().toast.create({
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
	}

	private async unregisterWithTauri(shortcut: string, entry: ShortcutEntry): Promise<void> {
		if (!entry.registered) {
			return;
		}

		try {
			await unregisterGlobalShortcut(shortcut);
		} catch (error) {
			console.warn(`Failed to unregister global shortcut "${shortcut}":`, error);
		} finally {
			entry.registered = false;
		}
	}
}
