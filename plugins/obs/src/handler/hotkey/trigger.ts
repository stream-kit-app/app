import type { PluginAppApi } from '@stream-kit/app/api';
import type { HandlerDefinitionProps } from '@stream-kit/core';

import { resolveFieldText } from '../../get-field-value';
import { hotkeySelectField } from '../../lib/field-builders';
import { callObs } from '../../lib/obs-call';

export const createTriggerHotkeyHandler = (app: PluginAppApi) =>
	({
		name: 'Trigger Hotkey',
		fields: [hotkeySelectField(app, { name: 'Hotkey' })],
		execute: (_action, handler, context, next) => {
			const hotkeyName = resolveFieldText(handler.fields, 'hotkey', context);

			if (typeof hotkeyName !== 'string' || !hotkeyName.trim()) {
				return;
			}

			void callObs(
				app,
				'TriggerHotkeyByName',
				{ hotkeyName: hotkeyName.trim() },
				{ label: 'Trigger Hotkey' }
			);
			next();
		}
	}) satisfies HandlerDefinitionProps;
