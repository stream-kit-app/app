import type { App } from '@stream-kit/app/api';
import type { HandlerDefinitionProps } from '@stream-kit/core';

import { getFieldValue } from '../../get-field-value';
import { resolveBroadcasterId } from '../../lib/handler-helpers';

export const createChatSettingsHandler = (app: App) =>
	({
		id: 'twitch-chat-settings',
		name: 'Update Chat Settings',
		fields: [
			{
				type: 'switch',
				key: 'emote-only',
				name: 'Emote only'
			},
			{
				type: 'switch',
				key: 'subscribers-only',
				name: 'Subscribers only'
			},
			{
				type: 'switch',
				key: 'followers-only',
				name: 'Followers only'
			},
			{
				type: 'text',
				key: 'slow-mode',
				name: 'Slow mode (seconds, 0 to disable)',
				placeholder: '0'
			}
		],
		execute: (_action, handler, context) => {
			const broadcasterId = resolveBroadcasterId(context as { broadcasterId?: string }, app);

			if (!broadcasterId) {
				return;
			}

			const settings: Record<string, boolean | number> = {};

			const emoteOnly = getFieldValue(handler.fields, 'emote-only');
			if (emoteOnly === true) settings.emoteOnlyModeEnabled = true;
			if (emoteOnly === false) settings.emoteOnlyModeEnabled = false;

			const subsOnly = getFieldValue(handler.fields, 'subscribers-only');
			if (subsOnly === true) settings.subscriberOnlyModeEnabled = true;
			if (subsOnly === false) settings.subscriberOnlyModeEnabled = false;

			const followersOnly = getFieldValue(handler.fields, 'followers-only');
			if (followersOnly === true) settings.followerOnlyModeEnabled = true;
			if (followersOnly === false) settings.followerOnlyModeEnabled = false;

			const slowMode = getFieldValue(handler.fields, 'slow-mode');
			if (typeof slowMode === 'string' && slowMode.trim()) {
				const seconds = Number.parseInt(slowMode, 10);
				if (!Number.isNaN(seconds)) {
					settings.slowModeEnabled = seconds > 0;
					settings.slowModeDelay = seconds;
				}
			}

			if (Object.keys(settings).length === 0) {
				return;
			}

			void app.twitch.client?.chat.updateSettings(broadcasterId, settings);
		}
	}) satisfies HandlerDefinitionProps;
