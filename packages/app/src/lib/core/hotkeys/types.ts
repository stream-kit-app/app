import { formatShortcutLabel, normalizeShortcut, parseShortcut } from './shortcut';

export type HotkeyEventContext = {
	shortcut: string;
	modifiers: string[];
	key: string;
};

export { formatShortcutLabel, normalizeShortcut, parseShortcut };
