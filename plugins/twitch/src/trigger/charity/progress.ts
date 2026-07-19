import type { PluginAppApi } from '@stream-kit/plugin';
import type { TriggerDefinitionProps } from '@stream-kit/plugin';

import { subscribeCharityCampaignProgress } from '../../lib/eventsub-setup';
import { disposeTriggerSubscription, setTriggerSubscription } from '../../lib/subscription';
import { createTestCharityContext } from '../../lib/test-contexts';
import { createOnTest } from '../../lib/trigger-helpers';

export const createCharityCampaignProgressTrigger = (app: PluginAppApi) =>
	({
		name: 'Charity Campaign Progress',
		activate: (action, trigger) => {
			const unsubscribe = subscribeCharityCampaignProgress(app, (context) => {
				action.fire(trigger, context);
			});

			setTriggerSubscription(trigger, { dispose: unsubscribe });
		},
		onTest: createOnTest(() => createTestCharityContext(app)),
		deactivate: (_action, trigger) => {
			disposeTriggerSubscription(trigger);
		}
	}) satisfies TriggerDefinitionProps;
