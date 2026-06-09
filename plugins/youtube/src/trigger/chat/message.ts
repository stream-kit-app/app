import type { PluginAppApi } from '@stream-kit/app/api';
import type { TriggerDefinitionProps } from '@stream-kit/core';

import type { ChatMessageContext } from '../../contexts';
import {
	evaluateMessageMatch,
	evaluateRole,
	evaluateUserMatch,
	messageMatchCondition,
	roleCondition,
	userMatchCondition
} from '../../lib/conditions';
import { subscribeChatMessages } from '../../lib/chat-setup';
import { createActivate, createDeactivate, evaluateWith } from '../../lib/trigger-helpers';

export const createChatMessageTrigger = (_app: PluginAppApi) =>
	({
		name: 'Chat Message',
		conditions: [messageMatchCondition(), userMatchCondition(), roleCondition()],
		validate: (conditions, context) => {
			const ctx = context as ChatMessageContext;
			const { message, role, user } = ctx;

			return evaluateWith(conditions, context, {
				match: (value) => evaluateMessageMatch(message, value),
				user: (value) => evaluateUserMatch(user, value),
				role: (value) => evaluateRole(role, value)
			});
		},
		activate: createActivate(
			_app,
			(handler) => subscribeChatMessages(() => true, handler),
			(conditions, context) => {
				const ctx = context as ChatMessageContext;
				return evaluateWith(conditions, context, {
					match: (value) => evaluateMessageMatch(ctx.message, value),
					user: (value) => evaluateUserMatch(ctx.user, value),
					role: (value) => evaluateRole(ctx.role, value)
				});
			}
		),
		deactivate: createDeactivate()
	}) satisfies TriggerDefinitionProps;
