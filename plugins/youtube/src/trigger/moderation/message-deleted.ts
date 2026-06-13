import type { PluginAppApi } from '@stream-kit/plugin';
import type { TriggerDefinitionProps } from '@stream-kit/plugin';

import type { MessageDeletedContext } from '../../contexts';
import { subscribeYouTubeEvent } from '../../lib/chat-setup';
import { YOUTUBE_EVENTS } from '../../lib/event-hub';
import { createTestMessageDeletedContext } from '../../lib/test-contexts';
import { createOnTest, createSimpleActivate, createDeactivate } from '../../lib/trigger-helpers';

export const createMessageDeletedTrigger = (app: PluginAppApi) =>
	({
		name: 'Message Deleted',
		onTest: createOnTest(() => createTestMessageDeletedContext()),
		activate: createSimpleActivate((handler) =>
			subscribeYouTubeEvent<MessageDeletedContext>(YOUTUBE_EVENTS.MESSAGE_DELETED, handler)
		),
		deactivate: createDeactivate()
	}) satisfies TriggerDefinitionProps;
