import type { App } from '@stream-kit/app/api';
import type { TriggerDefinitionProps } from '@stream-kit/core';

import type { ChannelUpdateContext } from '../../contexts';
import { evaluateMessageMatch, messageMatchCondition } from '../../lib/conditions';
import { subscribeChannelUpdate } from '../../lib/eventsub-setup';
import { disposeTriggerSubscription, setTriggerSubscription } from '../../lib/subscription';
import { evaluateWith } from '../../lib/trigger-helpers';

export const createChannelUpdateTrigger = (app: App) =>
	({
		id: 'twitch-channel-update',
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
		deactivate: (_action, trigger) => {
			disposeTriggerSubscription(trigger);
		}
	}) satisfies TriggerDefinitionProps;
