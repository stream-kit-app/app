import type { PluginAppApi } from '@stream-kit/plugin';
import type { HandlerDefinitionProps } from '@stream-kit/plugin';

import { getFieldValue } from '../../get-field-value';
import { hotkeyHandlerField } from '../../lib/hotkey-conditions';

export function createFireHotkeyHandler(app: PluginAppApi): HandlerDefinitionProps {
	return {
		name: 'Fire Hotkey',
		fields: [hotkeyHandlerField()],
		execute: async (_action, handler, _context, next) => {
			const shortcut = getFieldValue(handler.fields, 'hotkey');

			if (typeof shortcut !== 'string' || !shortcut.trim()) {
				return;
			}

			app.hotkeys.trigger(shortcut.trim());
			next();
		}
	};
}
