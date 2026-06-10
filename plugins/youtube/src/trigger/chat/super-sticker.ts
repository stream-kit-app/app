import type { PluginAppApi } from '@stream-kit/app/api';
import type { TriggerDefinitionProps } from '@stream-kit/core';

import type { SuperStickerContext } from '../../contexts';
import { subscribeYouTubeEvent } from '../../lib/chat-setup';
import {
	evaluateMinTier,
	evaluateUserMatch,
	minNumberCondition,
	userMatchCondition
} from '../../lib/conditions';
import { YOUTUBE_EVENTS } from '../../lib/event-hub';
import { createTestSuperStickerContext } from '../../lib/test-contexts';
import { createActivate, createDeactivate, createOnTest, evaluateWith } from '../../lib/trigger-helpers';

export const createSuperStickerTrigger = (app: PluginAppApi) =>
	({
		name: 'Super Sticker',
		conditions: [userMatchCondition(), minNumberCondition('minTier', 'Minimum Tier')],
		validate: (conditions, context) => {
			const ctx = context as SuperStickerContext;

			return evaluateWith(conditions, context, {
				user: (value) => evaluateUserMatch(ctx.user, value),
				minTier: (value) => evaluateMinTier(ctx.tier, value)
			});
		},
		onTest: createOnTest(() => createTestSuperStickerContext()),
		activate: createActivate(
			app,
			(handler) => subscribeYouTubeEvent<SuperStickerContext>(YOUTUBE_EVENTS.SUPER_STICKER, handler),
			(conditions, context) => {
				const ctx = context as SuperStickerContext;
				return evaluateWith(conditions, context, {
					user: (value) => evaluateUserMatch(ctx.user, value),
					minTier: (value) => evaluateMinTier(ctx.tier, value)
				});
			}
		),
		deactivate: createDeactivate()
	}) satisfies TriggerDefinitionProps;
