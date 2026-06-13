import type { PluginAppApi } from '@stream-kit/plugin';
import type { TriggerDefinitionProps } from '@stream-kit/plugin';

import type { ChannelUpdateContext } from '../../contexts';
import { evaluateMessageMatch, messageMatchCondition } from '../../lib/conditions';
import { subscribeChannelUpdate } from '../../lib/eventsub-setup';
import { disposeTriggerSubscription, setTriggerSubscription } from '../../lib/subscription';
import { createOnTest, evaluateWith } from '../../lib/trigger-helpers';
import { createTestChannelUpdateContext } from '../../lib/test-contexts';

export const createChannelUpdateTrigger = (app: PluginAppApi) =>
	({
		name: 'Channel Update',
		conditions: [
			messageMatchCondition('title', 'Title', { variables: [] }),
			messageMatchCondition('game', 'Game', { variables: [] })
		],
		validate: (conditions, context) => {
			const { title, game } = context as ChannelUpdateContext;

			return evaluateWith(conditions, context, {
				title: (value) => evaluateMessageMatch(title, value),
				game: (value) => evaluateMessageMatch(game, value)
			});
		},
		activate: (action, trigger) => {
			const unsubscribe = subscribeChannelUpdate(app, (context) => {
				action.fire(trigger, context);
			});

			setTriggerSubscription(trigger, { dispose: unsubscribe });
		},
		onTest: createOnTest(() => createTestChannelUpdateContext(app)),
		deactivate: (_action, trigger) => {
			disposeTriggerSubscription(trigger);
		}
	}) satisfies TriggerDefinitionProps;
