import type { PluginAppApi } from '@stream-kit/app/api';
import type { TriggerDefinitionProps } from '@stream-kit/core';

import type { PollContext } from '../../contexts';
import { subscribeYouTubeEvent } from '../../lib/chat-setup';
import { YOUTUBE_EVENTS } from '../../lib/event-hub';
import { createTestPollContext } from '../../lib/test-contexts';
import { createOnTest, createSimpleActivate, createDeactivate } from '../../lib/trigger-helpers';

export const createPollTrigger = (_app: PluginAppApi) =>
	({
		name: 'Live Poll',
		onTest: createOnTest(() => createTestPollContext()),
		activate: createSimpleActivate((handler) =>
			subscribeYouTubeEvent<PollContext>(YOUTUBE_EVENTS.POLL, handler)
		),
		deactivate: createDeactivate()
	}) satisfies TriggerDefinitionProps;
