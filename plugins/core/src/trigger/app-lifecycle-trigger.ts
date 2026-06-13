import type { PluginAppApi } from '@stream-kit/plugin';
import type { TriggerDefinitionProps } from '@stream-kit/plugin';

import type { AppLifecycleEvent } from '../contexts';
import { createDeactivate, createOnTest } from '../lib/trigger-helpers';
import { createTestAppLifecycleContext } from '../lib/test-contexts';
import { disposeTriggerSubscription, setTriggerSubscription } from '../lib/subscription';

export function createAppLifecycleTrigger(
	app: PluginAppApi,
	event: AppLifecycleEvent
): TriggerDefinitionProps {
	const name = event === 'started' ? 'App Started' : 'App Exit';
	const subscribe = event === 'started' ? app.lifecycle.onStarted : app.lifecycle.onExit;

	return {
		name,
		activate: (action, trigger) => {
			disposeTriggerSubscription(trigger);

			const unsubscribe = subscribe((context) => {
				action.fire(trigger, context);
			});

			setTriggerSubscription(trigger, { dispose: unsubscribe });

			if (event === 'started' && app.lifecycle.started) {
				action.fire(trigger, app.lifecycle.getContext('started'));
			}
		},
		deactivate: createDeactivate(),
		onTest: createOnTest(() => createTestAppLifecycleContext(event))
	};
}
