import type { PluginAppApi } from '@stream-kit/app/api';
import type { TriggerDefinitionProps } from '@stream-kit/core';

import type { GiftContext } from '../../contexts';
import { subscribeYouTubeEvent } from '../../lib/chat-setup';
import {
	evaluateMinNumber,
	evaluateUserMatch,
	minNumberCondition,
	userMatchCondition
} from '../../lib/conditions';
import { YOUTUBE_EVENTS } from '../../lib/event-hub';
import { createTestGiftContext } from '../../lib/test-contexts';
import { createActivate, createDeactivate, createOnTest, evaluateWith } from '../../lib/trigger-helpers';

export const createGiftTrigger = (app: PluginAppApi) =>
	({
		name: 'Gift (Jewels)',
		conditions: [userMatchCondition(), minNumberCondition('minJewels', 'Minimum Jewels')],
		validate: (conditions, context) => {
			const ctx = context as GiftContext;

			return evaluateWith(conditions, context, {
				user: (value) => evaluateUserMatch(ctx.user, value),
				minJewels: (value) => evaluateMinNumber(ctx.jewelsAmount, value)
			});
		},
		onTest: createOnTest(() => createTestGiftContext()),
		activate: createActivate(
			app,
			(handler) => subscribeYouTubeEvent<GiftContext>(YOUTUBE_EVENTS.GIFT, handler),
			(conditions, context) => {
				const ctx = context as GiftContext;
				return evaluateWith(conditions, context, {
					user: (value) => evaluateUserMatch(ctx.user, value),
					minJewels: (value) => evaluateMinNumber(ctx.jewelsAmount, value)
				});
			}
		),
		deactivate: createDeactivate()
	}) satisfies TriggerDefinitionProps;
