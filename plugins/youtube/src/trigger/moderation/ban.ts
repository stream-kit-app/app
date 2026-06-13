import type { PluginAppApi } from '@stream-kit/plugin';
import type { TriggerDefinitionProps } from '@stream-kit/plugin';

import type { ModerationContext } from '../../contexts';
import { subscribeYouTubeEvent } from '../../lib/chat-setup';
import { evaluateUserMatch, userMatchCondition } from '../../lib/conditions';
import { YOUTUBE_EVENTS } from '../../lib/event-hub';
import { createTestModerationContext } from '../../lib/test-contexts';
import { createActivate, createDeactivate, createOnTest, evaluateWith } from '../../lib/trigger-helpers';

export const createUserBannedTrigger = (app: PluginAppApi) =>
	({
		name: 'User Banned',
		conditions: [userMatchCondition()],
		validate: (conditions, context) => {
			const { user } = context as ModerationContext;
			return evaluateWith(conditions, context, {
				user: (value) => evaluateUserMatch(user, value)
			});
		},
		onTest: createOnTest(() => createTestModerationContext()),
		activate: createActivate(
			app,
			(handler) => subscribeYouTubeEvent<ModerationContext>(YOUTUBE_EVENTS.USER_BANNED, handler),
			(conditions, context) => {
				const { user } = context as ModerationContext;
				return evaluateWith(conditions, context, {
					user: (value) => evaluateUserMatch(user, value)
				});
			}
		),
		deactivate: createDeactivate()
	}) satisfies TriggerDefinitionProps;
