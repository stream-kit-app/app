import type { PluginAppApi } from '@stream-kit/app/api';
import type { TriggerDefinitionProps } from '@stream-kit/core';

import type { SuperChatContext } from '../../contexts';
import { subscribeYouTubeEvent } from '../../lib/chat-setup';
import {
	evaluateMessageMatch,
	evaluateMinNumber,
	evaluateMinTier,
	evaluateUserMatch,
	messageMatchCondition,
	minNumberCondition,
	userMatchCondition
} from '../../lib/conditions';
import { YOUTUBE_EVENTS } from '../../lib/event-hub';
import { createTestSuperChatContext } from '../../lib/test-contexts';
import { createActivate, createDeactivate, createOnTest, evaluateWith } from '../../lib/trigger-helpers';

export const createSuperChatTrigger = (app: PluginAppApi) =>
	({
		name: 'Super Chat',
		conditions: [
			messageMatchCondition(),
			userMatchCondition(),
			minNumberCondition('minTier', 'Minimum Tier'),
			minNumberCondition('minAmountMicros', 'Minimum Amount (micros)')
		],
		validate: (conditions, context) => {
			const ctx = context as SuperChatContext;

			return evaluateWith(conditions, context, {
				match: (value) => evaluateMessageMatch(ctx.message, value),
				user: (value) => evaluateUserMatch(ctx.user, value),
				minTier: (value) => evaluateMinTier(ctx.tier, value),
				minAmountMicros: (value) => evaluateMinNumber(ctx.amountMicros, value)
			});
		},
		onTest: createOnTest(() => createTestSuperChatContext()),
		activate: createActivate(
			app,
			(handler) => subscribeYouTubeEvent<SuperChatContext>(YOUTUBE_EVENTS.SUPER_CHAT, handler),
			(conditions, context) => {
				const ctx = context as SuperChatContext;
				return evaluateWith(conditions, context, {
					match: (value) => evaluateMessageMatch(ctx.message, value),
					user: (value) => evaluateUserMatch(ctx.user, value),
					minTier: (value) => evaluateMinTier(ctx.tier, value),
					minAmountMicros: (value) => evaluateMinNumber(ctx.amountMicros, value)
				});
			}
		),
		deactivate: createDeactivate()
	}) satisfies TriggerDefinitionProps;
