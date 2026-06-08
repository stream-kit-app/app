import type { PluginAppApi } from '@stream-kit/app/api';
import type { TriggerDefinitionProps } from '@stream-kit/core';

import type { CommandContext } from '../../contexts';
import { parseCommand } from '../../lib/command';
import { subscribeChatMessages } from '../../lib/chat-setup';
import {
	evaluateCommandMatch,
	evaluateRole,
	messageMatchCondition,
	roleCondition
} from '../../lib/conditions';
import { disposeTriggerSubscription, setTriggerSubscription } from '../../lib/subscription';
import { evaluateWith } from '../../lib/trigger-helpers';

export const createCommandTrigger = (_app: PluginAppApi) =>
	({
		id: 'youtube-chat-command',
		name: 'Chat Command',
		conditions: [
			messageMatchCondition('command', 'Command', { variables: [] }),
			roleCondition()
		],
		validate: (conditions, context) => {
			const { command, role } = context as CommandContext;

			return evaluateWith(conditions, context, {
				command: (value) => evaluateCommandMatch(command, value),
				role: (value) => evaluateRole(role, value)
			});
		},
		activate: (action, trigger) => {
			const unsubscribe = subscribeChatMessages((context) => {
				return parseCommand(context.message) != null;
			}, (context) => {
				const command = parseCommand(context.message);

				if (!command) {
					return;
				}

				const commandContext: CommandContext = { ...context, command };

				if (evaluateWith(trigger.conditions, commandContext, {
					command: (value) => evaluateCommandMatch(command, value),
					role: (value) => evaluateRole(context.role, value)
				})) {
					action.fire(trigger, commandContext);
				}
			});

			setTriggerSubscription(trigger, { dispose: unsubscribe });
		},
		deactivate: (_action, trigger) => {
			disposeTriggerSubscription(trigger);
		}
	}) satisfies TriggerDefinitionProps;
