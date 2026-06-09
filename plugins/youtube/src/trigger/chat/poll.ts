import type { PluginAppApi } from '@stream-kit/app/api';
import type { TriggerDefinitionProps } from '@stream-kit/core';

import type { PollContext } from '../../contexts';
import { subscribeYouTubeEvent } from '../../lib/chat-setup';
import { YOUTUBE_EVENTS } from '../../lib/event-hub';
import { createSimpleActivate, createDeactivate } from '../../lib/trigger-helpers';

export const createPollTrigger = (_app: PluginAppApi) =>
	({
		name: 'Live Poll',
		activate: createSimpleActivate((handler) =>
			subscribeYouTubeEvent<PollContext>(YOUTUBE_EVENTS.POLL, handler)
		),
		deactivate: createDeactivate()
	}) satisfies TriggerDefinitionProps;
