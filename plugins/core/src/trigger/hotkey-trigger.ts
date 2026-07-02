import type { PluginAppApi } from '@stream-kit/plugin';
import type { TriggerDefinitionProps } from '@stream-kit/plugin';

import { hotkeyCondition } from '../lib/hotkey-conditions';
import { parseHotkeyConfig } from '../lib/parse-hotkey-config';
import { createOnTest } from '../lib/trigger-helpers';
import { disposeTriggerSubscription, setTriggerSubscription } from '../lib/subscription';
import { createTestHotkeyContext } from '../lib/test-contexts';

function showHotkeyActivationError(app: PluginAppApi, message: string): void {
	console.warn('Hotkey trigger activation failed:', message);
	app.toast.create({
		title: 'Hotkey could not start',
		description: message,
		variant: 'warning'
	});
}

export function createHotkeyTrigger(app: PluginAppApi): TriggerDefinitionProps {
	return {
		name: 'Hotkey',
		conditions: [hotkeyCondition()],
		activate: (action, trigger) => {
			disposeTriggerSubscription(trigger);

			const parsed = parseHotkeyConfig(trigger.conditions);

			if (!parsed.ok) {
				showHotkeyActivationError(app, parsed.error);
				return;
			}

			const unsubscribe = app.hotkeys.register(parsed.shortcut, (context) => {
				action.fire(trigger, context);
			});

			setTriggerSubscription(trigger, { dispose: unsubscribe });
		},
		deactivate: (_action, trigger) => {
			disposeTriggerSubscription(trigger);
		},
		onTest: createOnTest(() => createTestHotkeyContext())
	};
}
