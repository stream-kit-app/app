import type { PluginAppApi } from '@stream-kit/app/api';
import type { TriggerDefinitionProps } from '@stream-kit/core';

import type { GiftMembershipReceivedContext } from '../../contexts';
import { subscribeYouTubeEvent } from '../../lib/chat-setup';
import { evaluateUserMatch, userMatchCondition } from '../../lib/conditions';
import { YOUTUBE_EVENTS } from '../../lib/event-hub';
import { createActivate, createDeactivate, evaluateWith } from '../../lib/trigger-helpers';

export const createGiftMembershipReceivedTrigger = (app: PluginAppApi) =>
	({
		name: 'Gift Membership Received',
		conditions: [userMatchCondition()],
		validate: (conditions, context) => {
			const { user } = context as GiftMembershipReceivedContext;
			return evaluateWith(conditions, context, {
				user: (value) => evaluateUserMatch(user, value)
			});
		},
		activate: createActivate(
			app,
			(handler) =>
				subscribeYouTubeEvent<GiftMembershipReceivedContext>(
					YOUTUBE_EVENTS.GIFT_MEMBERSHIP_RECEIVED,
					handler
				),
			(conditions, context) => {
				const { user } = context as GiftMembershipReceivedContext;
				return evaluateWith(conditions, context, {
					user: (value) => evaluateUserMatch(user, value)
				});
			}
		),
		deactivate: createDeactivate()
	}) satisfies TriggerDefinitionProps;
