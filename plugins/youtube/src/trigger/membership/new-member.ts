import type { PluginAppApi } from '@stream-kit/plugin';
import type { TriggerDefinitionProps } from '@stream-kit/plugin';

import type { NewMemberContext } from '../../contexts';
import { subscribeYouTubeEvent } from '../../lib/chat-setup';
import { evaluateUserMatch, userMatchCondition } from '../../lib/conditions';
import { YOUTUBE_EVENTS } from '../../lib/event-hub';
import { createTestNewMemberContext } from '../../lib/test-contexts';
import { createActivate, createDeactivate, createOnTest, evaluateWith } from '../../lib/trigger-helpers';

export const createNewMemberTrigger = (app: PluginAppApi) =>
	({
		name: 'New Member',
		conditions: [userMatchCondition()],
		validate: (conditions, context) => {
			const { user } = context as NewMemberContext;
			return evaluateWith(conditions, context, {
				user: (value) => evaluateUserMatch(user, value)
			});
		},
		onTest: createOnTest(() => createTestNewMemberContext()),
		activate: createActivate(
			app,
			(handler) => subscribeYouTubeEvent<NewMemberContext>(YOUTUBE_EVENTS.NEW_MEMBER, handler),
			(conditions, context) => {
				const { user } = context as NewMemberContext;
				return evaluateWith(conditions, context, {
					user: (value) => evaluateUserMatch(user, value)
				});
			}
		),
		deactivate: createDeactivate()
	}) satisfies TriggerDefinitionProps;
