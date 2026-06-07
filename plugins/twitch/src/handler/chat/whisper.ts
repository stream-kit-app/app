import type { PluginAppApi } from '@stream-kit/app/api';
import type { HandlerDefinitionProps } from '@stream-kit/core';

import { resolveFieldText } from '../../get-field-value';
import { resolveUserFromContext } from '../../lib/handler-helpers';
import { MESSAGE_TEXT_VARIABLES, TARGET_USER_VARIABLES } from '../../lib/variables';
import { getTwitch } from '../../lib/plugin-api';

export const createWhisperHandler = (app: PluginAppApi) =>
	({
		id: 'twitch-chat-whisper',
		name: 'Send Whisper',
		fields: [
			{
				type: 'text',
				key: 'user',
				name: 'Username',
				placeholder: 'Leave empty or use {username}',
				variables: TARGET_USER_VARIABLES
			},
			{
				type: 'text',
				key: 'message',
				name: 'Message',
				required: true,
				placeholder: 'Whisper message',
				variables: MESSAGE_TEXT_VARIABLES
			}
		],
		execute: (_action, handler, context) => {
			const message = resolveFieldText(handler.fields, 'message', context);
			const fieldUser = resolveFieldText(handler.fields, 'user', context);
			const fromUserId = getTwitch(app).userId;

			if (typeof message !== 'string' || !message.trim() || !fromUserId) {
				return;
			}

			const { userName } = resolveUserFromContext(
				context as { user?: string },
				typeof fieldUser === 'string' ? fieldUser : undefined
			);

			if (!userName) {
				return;
			}

			void getTwitch(app).client?.whispers.sendWhisper(fromUserId, userName, message.trim());
		}
	}) satisfies HandlerDefinitionProps;
