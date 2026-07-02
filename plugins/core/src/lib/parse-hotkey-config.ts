import type { ConditionGroupNode } from '@stream-kit/plugin';

import { findConditionTextValue } from './trigger-condition';

export type ParsedHotkeyConfig =
	| { ok: true; shortcut: string }
	| { ok: false; error: string };

export function parseHotkeyConfig(conditions: ConditionGroupNode): ParsedHotkeyConfig {
	const shortcut = findConditionTextValue(conditions, 'hotkey');

	if (!shortcut) {
		return { ok: false, error: 'Hotkey is required' };
	}

	return { ok: true, shortcut };
}
