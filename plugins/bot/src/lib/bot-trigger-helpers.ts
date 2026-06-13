import type { PluginAppApi } from '@stream-kit/plugin';
import type { Action, ActionTrigger, ConditionGroupNode, FieldValue } from '@stream-kit/plugin';

import type { ChatModerationContext } from './moderation-engine';
import { subscribeBotChatMessages } from './chat-message-hub';
import { disposeTriggerSubscription, setTriggerSubscription } from './subscription';

export function findConditionValue(	conditions: ConditionGroupNode,
	key: string
): FieldValue | undefined {
	for (const child of conditions.children) {
		if (child.kind === 'condition' && child.key === key) {
			return child.value;
		}

		if (child.kind === 'group') {
			const nested = findConditionValue(child, key);

			if (nested !== undefined) {
				return nested;
			}
		}
	}

	return undefined;
}

export function createTestChatModerationContext(): ChatModerationContext {
	return {
		source: 'twitch',
		user: 'TestUser',
		userId: '123456',
		message: 'Test message for chat trigger',
		role: 'user',
		channel: '#testchannel',
		broadcasterId: '654321',
		messageId: 'test-message-id'
	};
}

export function hashTriggerId(triggerId: string): string {
	let hash = 0;

	for (let index = 0; index < triggerId.length; index++) {
		hash = (hash * 31 + triggerId.charCodeAt(index)) | 0;
	}

	return String(Math.abs(hash) || 1);
}

export function createBotChatTriggerLifecycle(
	app: PluginAppApi,
	validate: (
		conditions: ActionTrigger['conditions'],
		context: ChatModerationContext,
		trigger: ActionTrigger
	) => boolean
) {
	return {
		activate: (action: Action, trigger: ActionTrigger) => {
			const unsubscribe = subscribeBotChatMessages(app, (context) => {
				if (validate(trigger.conditions, context, trigger)) {
					action.fire(trigger, context);
				}
			});

			setTriggerSubscription(trigger, { dispose: unsubscribe });
		},
		deactivate: (_action: Action, trigger: ActionTrigger) => {
			disposeTriggerSubscription(trigger);
		},
		onTest: () => createTestChatModerationContext()
	};
}
