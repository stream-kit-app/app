const MODIFIER_ALIASES: Record<string, string> = {
	shift: 'Shift',
	control: 'Control',
	ctrl: 'Control',
	alt: 'Alt',
	meta: 'CommandOrControl',
	cmd: 'CommandOrControl',
	command: 'CommandOrControl',
	commandorcontrol: 'CommandOrControl'
};

const SPECIAL_KEY_ALIASES: Record<string, string> = {
	space: 'Space',
	enter: 'Enter',
	return: 'Enter',
	escape: 'Escape',
	esc: 'Escape',
	tab: 'Tab',
	backspace: 'Backspace',
	delete: 'Delete',
	arrowup: 'ArrowUp',
	arrowdown: 'ArrowDown',
	arrowleft: 'ArrowLeft',
	arrowright: 'ArrowRight',
	home: 'Home',
	end: 'End',
	pageup: 'PageUp',
	pagedown: 'PageDown'
};

function normalizePart(part: string): string {
	const trimmed = part.trim();

	if (!trimmed) {
		return '';
	}

	const lower = trimmed.toLowerCase();
	const alias = MODIFIER_ALIASES[lower] ?? SPECIAL_KEY_ALIASES[lower];

	if (alias) {
		return alias;
	}

	if (/^f\d{1,2}$/i.test(trimmed)) {
		return trimmed.toUpperCase();
	}

	if (trimmed.length === 1) {
		return trimmed.toUpperCase();
	}

	return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
}

/** Normalize a Tauri-style shortcut string for consistent registration. */
export function normalizeShortcut(shortcut: string): string {
	const parts = shortcut
		.split('+')
		.map(normalizePart)
		.filter(Boolean);

	if (parts.length === 0) {
		return '';
	}

	const modifiers = new Set<string>();
	let key = '';

	for (const part of parts) {
		if (part === 'Shift' || part === 'Control' || part === 'Alt' || part === 'CommandOrControl') {
			modifiers.add(part);
			continue;
		}

		key = part;
	}

	if (!key) {
		return '';
	}

	const orderedModifiers = ['CommandOrControl', 'Control', 'Alt', 'Shift'].filter((modifier) =>
		modifiers.has(modifier)
	);

	return [...orderedModifiers, key].join('+');
}

export function parseShortcut(shortcut: string): { modifiers: string[]; key: string } {
	const normalized = normalizeShortcut(shortcut);
	const parts = normalized.split('+').filter(Boolean);

	if (parts.length === 0) {
		return { modifiers: [], key: '' };
	}

	const key = parts.at(-1) ?? '';
	const modifiers = parts.slice(0, -1);

	return { modifiers, key };
}

export function isValidShortcut(shortcut: string): boolean {
	const { key } = parseShortcut(shortcut);

	return key.length > 0;
}

function codeToShortcutKey(code: string): string | null {
	if (code.startsWith('Key')) {
		return code.slice(3);
	}

	if (code.startsWith('Digit')) {
		return code.slice(5);
	}

	const special: Record<string, string> = {
		Space: 'Space',
		Enter: 'Enter',
		Escape: 'Escape',
		Tab: 'Tab',
		Backspace: 'Backspace',
		Delete: 'Delete',
		ArrowUp: 'ArrowUp',
		ArrowDown: 'ArrowDown',
		ArrowLeft: 'ArrowLeft',
		ArrowRight: 'ArrowRight',
		Home: 'Home',
		End: 'End',
		PageUp: 'PageUp',
		PageDown: 'PageDown'
	};

	if (special[code]) {
		return special[code];
	}

	if (/^F\d{1,2}$/.test(code)) {
		return code;
	}

	return null;
}

/** Build a Tauri shortcut string from a keyboard event, or null for modifier-only presses. */
export function formatShortcutFromKeyboardEvent(event: KeyboardEvent): string | null {
	if (event.key === 'Control' || event.key === 'Shift' || event.key === 'Alt' || event.key === 'Meta') {
		return null;
	}

	const modifiers: string[] = [];

	if (event.ctrlKey || event.metaKey) {
		modifiers.push('CommandOrControl');
	}

	if (event.altKey) {
		modifiers.push('Alt');
	}

	if (event.shiftKey) {
		modifiers.push('Shift');
	}

	const key = codeToShortcutKey(event.code);

	if (!key) {
		return null;
	}

	return normalizeShortcut([...modifiers, key].join('+'));
}

/** Human-readable label such as `Shift + P`. */
export function formatShortcutLabel(shortcut: string): string {
	const { modifiers, key } = parseShortcut(shortcut);

	if (!key) {
		return '';
	}

	const modifierLabels = modifiers.map((modifier) => {
		if (modifier === 'CommandOrControl') {
			return 'Ctrl';
		}

		return modifier;
	});

	return [...modifierLabels, key].join(' + ');
}
