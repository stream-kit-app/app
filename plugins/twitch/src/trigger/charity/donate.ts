import type { PluginAppApi } from '@stream-kit/plugin';
import type { TriggerDefinitionProps } from '@stream-kit/plugin';

import { subscribeCharityDonation } from '../../lib/eventsub-setup';
import { disposeTriggerSubscription, setTriggerSubscription } from '../../lib/subscription';
import { createTestCharityDonationContext } from '../../lib/test-contexts';
import { createOnTest } from '../../lib/trigger-helpers';

export const createCharityDonationTrigger = (app: PluginAppApi) =>
	({
		name: 'Charity Donation',
		activate: (action, trigger) => {
			const unsubscribe = subscribeCharityDonation(app, (context) => {
				action.fire(trigger, context);
			});

			setTriggerSubscription(trigger, { dispose: unsubscribe });
		},
		onTest: createOnTest(() => createTestCharityDonationContext(app)),
		deactivate: (_action, trigger) => {
			disposeTriggerSubscription(trigger);
		}
	}) satisfies TriggerDefinitionProps;
