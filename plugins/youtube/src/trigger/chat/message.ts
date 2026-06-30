import type { PluginAppApi } from '@stream-kit/plugin';
import type { TriggerDefinitionProps } from '@stream-kit/plugin';

import type { ChatMessageContext } from '../../contexts';
import {
	evaluateCommandMessageMatch,
	evaluateMessageMatch,
	evaluateRole,
	evaluateUserMatch,
	messageMatchCondition,
	roleCondition,
	userMatchCondition
} from '../../lib/conditions';
import { subscribeChatMessages } from '../../lib/chat-setup';
import { createActivateWithCommandContext } from '../../lib/command-trigger';
import { createTestChatMessageContext } from '../../lib/test-contexts';
import { createDeactivate, createOnTest, evaluateWith } from '../../lib/trigger-helpers';
import { CHAT_TEXT_VARIABLES } from '../../lib/variables';

export const createChatMessageTrigger = (_app: PluginAppApi) =>
	({
		name: 'Chat Message',
		conditions: [
			messageMatchCondition('match', 'Message', { variables: CHAT_TEXT_VARIABLES }),
			userMatchCondition(),
			roleCondition(),
			messageMatchCondition('command', 'Command', { variables: [] })
		],
		validate: (conditions, context) => {
			const ctx = context as ChatMessageContext;
			const { message, role, user } = ctx;

			return evaluateWith(conditions, context, {
				match: (value) => evaluateMessageMatch(message, value),
				user: (value) => evaluateUserMatch(user, value),
				role: (value) => evaluateRole(role, value),
				command: (value) => evaluateCommandMessageMatch(message, '!', value)
			});
		},
		onTest: createOnTest(() => createTestChatMessageContext()),
		activate: createActivateWithCommandContext(_app, (handler) =>
			subscribeChatMessages(() => true, handler)
		),
		deactivate: createDeactivate()
	}) satisfies TriggerDefinitionProps;
