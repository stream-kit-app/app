import type { PluginAppApi } from '@stream-kit/plugin';
import type { TriggerDefinitionProps } from '@stream-kit/plugin';

import { subscribeCharityCampaignStop } from '../../lib/eventsub-setup';
import { disposeTriggerSubscription, setTriggerSubscription } from '../../lib/subscription';
import { createTestCharityContext } from '../../lib/test-contexts';
import { createOnTest } from '../../lib/trigger-helpers';

export const createCharityCampaignStopTrigger = (app: PluginAppApi) =>
	({
		name: 'Charity Campaign Stop',
		activate: (action, trigger) => {
			const unsubscribe = subscribeCharityCampaignStop(app, (context) => {
				action.fire(trigger, context);
			});

			setTriggerSubscription(trigger, { dispose: unsubscribe });
		},
		onTest: createOnTest(() => createTestCharityContext(app)),
		deactivate: (_action, trigger) => {
			disposeTriggerSubscription(trigger);
		}
	}) satisfies TriggerDefinitionProps;
