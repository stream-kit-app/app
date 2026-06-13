import type { PluginAppApi } from '@stream-kit/plugin';
import type { ConditionGroupNode, TriggerDefinitionProps } from '@stream-kit/plugin';
import type { ResolvedConditionDefinition } from '@stream-kit/plugin/action';

import type { ModerationRules } from '../moderation/app/lib/moderation-rules.svelte';
import type { ChatModerationContext } from '../lib/moderation-engine';
import { evaluateModRuleMatch } from '../lib/moderation-engine';
import {
	createBotChatTriggerLifecycle,
	createTestChatModerationContext,
	findConditionValue
} from '../lib/bot-trigger-helpers';
function resolveModRule(moderation: ModerationRules, conditions: ConditionGroupNode) {
	const ruleIdValue = findConditionValue(conditions, 'mod-rule');
	const ruleId = typeof ruleIdValue === 'string' ? ruleIdValue : String(ruleIdValue ?? '');

	if (!ruleId) {
		return undefined;
	}

	return moderation.getSnapshot().find((item) => item.id === ruleId);
}

export function createModerationRuleTrigger(app: PluginAppApi, moderation: ModerationRules) {
	const lifecycle = createBotChatTriggerLifecycle(app, (conditions, context) => {
		const rule = resolveModRule(moderation, conditions);

		if (!rule) {
			return false;
		}

		return evaluateModRuleMatch(context, rule, {
			checkEnabled: true,
			checkPlatform: true,
			checkExempt: false
		});
	});

	return {
		name: 'Moderation rule',
		conditions: [
			{
				key: 'mod-rule',
				type: 'select',
				name: 'Rule',
				required: true,
				placeholder: 'Select a rule',
				loadingPlaceholder: 'Loading rules…',
				items: async () => {
					await moderation.load();

					return moderation.getSnapshot().map((rule) => ({
						value: String(rule.id),
						label: rule.name
					}));
				}
			} as ResolvedConditionDefinition
		],
		validate: (conditions, context) => {
			const rule = resolveModRule(moderation, conditions);

			if (!rule) {
				return false;
			}

			return evaluateModRuleMatch(context as ChatModerationContext, rule, {
				checkEnabled: true,
				checkPlatform: true,
				checkExempt: false
			});
		},
		...lifecycle,
		onTest: () => createTestChatModerationContext()
	} satisfies TriggerDefinitionProps<ChatModerationContext>;
}
