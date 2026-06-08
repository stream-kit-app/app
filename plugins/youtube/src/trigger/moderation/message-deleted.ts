import type { PluginAppApi } from '@stream-kit/app/api';
import type { TriggerDefinitionProps } from '@stream-kit/core';

import type { MessageDeletedContext } from '../../contexts';
import { subscribeYouTubeEvent } from '../../lib/chat-setup';
import { YOUTUBE_EVENTS } from '../../lib/event-hub';
import { createSimpleActivate, createDeactivate } from '../../lib/trigger-helpers';

export const createMessageDeletedTrigger = (app: PluginAppApi) =>
	({
		id: 'youtube-mod-message-deleted',
		name: 'Message Deleted',
		activate: createSimpleActivate((handler) =>
			subscribeYouTubeEvent<MessageDeletedContext>(YOUTUBE_EVENTS.MESSAGE_DELETED, handler)
		),
		deactivate: createDeactivate()
	}) satisfies TriggerDefinitionProps;
