import type { PluginAppApi } from '@stream-kit/app/api';
import type { HandlerDefinitionProps } from '@stream-kit/core';

import { getFieldValue } from '../../get-field-value';
import { resolveBroadcasterId } from '../../lib/handler-helpers';
import { getTwitch } from '../../lib/plugin-api';

export const createChatSettingsHandler = (app: PluginAppApi) =>
	({
		name: 'Update Chat Settings',
		fields: [
			{
				type: 'switch',
				name: 'Emote only'
			},
			{
				type: 'switch',
				name: 'Subscribers only'
			},
			{
				type: 'switch',
				name: 'Followers only'
			},
			{
				type: 'text',
				name: 'Slow mode (seconds, 0 to disable)',
				placeholder: '0'
			}
		],
		execute: (_action, handler, context) => {
			const broadcasterId = resolveBroadcasterId(context, app);

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

			void getTwitch(app).client?.chat.updateSettings(broadcasterId, settings);
		}
	}) satisfies HandlerDefinitionProps;
