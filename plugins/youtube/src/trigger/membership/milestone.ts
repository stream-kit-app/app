import type { PluginAppApi } from '@stream-kit/app/api';
import type { TriggerDefinitionProps } from '@stream-kit/core';

import type { MemberMilestoneContext } from '../../contexts';
import { subscribeYouTubeEvent } from '../../lib/chat-setup';
import {
	evaluateMessageMatch,
	evaluateMinNumber,
	evaluateUserMatch,
	messageMatchCondition,
	minNumberCondition,
	userMatchCondition
} from '../../lib/conditions';
import { YOUTUBE_EVENTS } from '../../lib/event-hub';
import { createActivate, createDeactivate, evaluateWith } from '../../lib/trigger-helpers';

export const createMemberMilestoneTrigger = (app: PluginAppApi) =>
	({
		name: 'Member Milestone',
		conditions: [
			messageMatchCondition(),
			userMatchCondition(),
			minNumberCondition('minMemberMonth', 'Minimum Member Months')
		],
		validate: (conditions, context) => {
			const ctx = context as MemberMilestoneContext;

			return evaluateWith(conditions, context, {
				match: (value) => evaluateMessageMatch(ctx.message, value),
				user: (value) => evaluateUserMatch(ctx.user, value),
				minMemberMonth: (value) => evaluateMinNumber(ctx.memberMonth, value)
			});
		},
		activate: createActivate(
			app,
			(handler) =>
				subscribeYouTubeEvent<MemberMilestoneContext>(YOUTUBE_EVENTS.MEMBER_MILESTONE, handler),
			(conditions, context) => {
				const ctx = context as MemberMilestoneContext;
				return evaluateWith(conditions, context, {
					match: (value) => evaluateMessageMatch(ctx.message, value),
					user: (value) => evaluateUserMatch(ctx.user, value),
					minMemberMonth: (value) => evaluateMinNumber(ctx.memberMonth, value)
				});
			}
		),
		deactivate: createDeactivate()
	}) satisfies TriggerDefinitionProps;
