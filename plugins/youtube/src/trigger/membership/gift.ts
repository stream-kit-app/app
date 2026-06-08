import type { PluginAppApi } from '@stream-kit/app/api';
import type { TriggerDefinitionProps } from '@stream-kit/core';

import type { MembershipGiftContext } from '../../contexts';
import { subscribeYouTubeEvent } from '../../lib/chat-setup';
import {
	evaluateMinNumber,
	evaluateUserMatch,
	minNumberCondition,
	userMatchCondition
} from '../../lib/conditions';
import { YOUTUBE_EVENTS } from '../../lib/event-hub';
import { createActivate, createDeactivate, evaluateWith } from '../../lib/trigger-helpers';

export const createMembershipGiftTrigger = (app: PluginAppApi) =>
	({
		id: 'youtube-member-gift',
		name: 'Membership Gift',
		conditions: [userMatchCondition(), minNumberCondition('minGiftCount', 'Minimum Gift Count')],
		validate: (conditions, context) => {
			const ctx = context as MembershipGiftContext;

			return evaluateWith(conditions, context, {
				user: (value) => evaluateUserMatch(ctx.user, value),
				minGiftCount: (value) => evaluateMinNumber(ctx.giftCount, value)
			});
		},
		activate: createActivate(
			app,
			(handler) =>
				subscribeYouTubeEvent<MembershipGiftContext>(YOUTUBE_EVENTS.MEMBERSHIP_GIFT, handler),
			(conditions, context) => {
				const ctx = context as MembershipGiftContext;
				return evaluateWith(conditions, context, {
					user: (value) => evaluateUserMatch(ctx.user, value),
					minGiftCount: (value) => evaluateMinNumber(ctx.giftCount, value)
				});
			}
		),
		deactivate: createDeactivate()
	}) satisfies TriggerDefinitionProps;
