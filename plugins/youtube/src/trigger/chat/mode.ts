import type { PluginAppApi } from '@stream-kit/app/api';
import type { TriggerDefinitionProps } from '@stream-kit/core';

import { subscribeYouTubeEvent } from '../../lib/chat-setup';
import { YOUTUBE_EVENTS } from '../../lib/event-hub';
import { createSimpleActivate, createDeactivate } from '../../lib/trigger-helpers';

export const createSponsorsOnlyStartedTrigger = (_app: PluginAppApi) =>
	({
		id: 'youtube-chat-sponsors-only-started',
		name: 'Members-Only Mode Started',
		activate: createSimpleActivate((handler) =>
			subscribeYouTubeEvent(YOUTUBE_EVENTS.SPONSORS_ONLY_STARTED, handler)
		),
		deactivate: createDeactivate()
	}) satisfies TriggerDefinitionProps;

export const createSponsorsOnlyEndedTrigger = (_app: PluginAppApi) =>
	({
		id: 'youtube-chat-sponsors-only-ended',
		name: 'Members-Only Mode Ended',
		activate: createSimpleActivate((handler) =>
			subscribeYouTubeEvent(YOUTUBE_EVENTS.SPONSORS_ONLY_ENDED, handler)
		),
		deactivate: createDeactivate()
	}) satisfies TriggerDefinitionProps;

export const createChatEndedTrigger = (_app: PluginAppApi) =>
	({
		id: 'youtube-chat-ended',
		name: 'Chat Ended',
		activate: createSimpleActivate((handler) =>
			subscribeYouTubeEvent(YOUTUBE_EVENTS.CHAT_ENDED, handler)
		),
		deactivate: createDeactivate()
	}) satisfies TriggerDefinitionProps;
