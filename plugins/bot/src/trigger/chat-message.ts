import type { PluginAppApi } from '@stream-kit/plugin';
import type { ActionTrigger, TriggerDefinitionProps } from '@stream-kit/plugin';
import type { ConditionGroupNode } from '@stream-kit/plugin';

import type { ChatModerationContext } from '../lib/moderation-engine';
import {
	createModerationEvaluators,
	moderationConditionDefinitions
} from '../lib/moderation-conditions';
import {
	createBotChatTriggerLifecycle,
	createTestChatModerationContext,
	hashTriggerId
} from '../lib/bot-trigger-helpers';
import { evaluateWith } from '../lib/evaluate-conditions';

export function createChatMessageTrigger(app: PluginAppApi) {
	const lifecycle = createBotChatTriggerLifecycle(app, (conditions, context, trigger) => {
		return evaluateWith(
			conditions,
			createModerationEvaluators(context, hashTriggerId(trigger.id))
		);
	});

	return {
		name: 'Chat message',
		conditions: [...moderationConditionDefinitions],
		validate: (conditions: ConditionGroupNode, context, trigger?: ActionTrigger) => {
			const stateKey = trigger ? hashTriggerId(trigger.id) : 'default';

			return evaluateWith(
				conditions,
				createModerationEvaluators(context as ChatModerationContext, stateKey)
			);
		},
		...lifecycle,
		onTest: () => createTestChatModerationContext()
	} satisfies TriggerDefinitionProps<ChatModerationContext>;
}
