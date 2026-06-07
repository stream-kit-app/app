import type { PluginAppApi } from '@stream-kit/app/api';
import type { TriggerDefinitionProps } from '@stream-kit/core';

import type { CommandContext } from '../../contexts';
import { parseCommand } from '../../lib/command';
import {
	evaluateCommandMatch,
	evaluateRole,
	messageMatchCondition,
	roleCondition
} from '../../lib/conditions';
import { subscribeMessages } from '../../lib/irc-setup';
import { disposeTriggerSubscription, setTriggerSubscription } from '../../lib/subscription';
import { evaluateWith } from '../../lib/trigger-helpers';

export const createCommandTrigger = (app: PluginAppApi) =>
	({
		id: 'twitch-chat-command',
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
			const unsubscribe = subscribeMessages(app, (context) => {
				return parseCommand(context.message) != null;
			}, (context) => {
				const command = parseCommand(context.message);

				if (!command) {
					return;
				}

				action.fire(trigger, { ...context, command });
			});

			setTriggerSubscription(trigger, { dispose: unsubscribe });
		},
		deactivate: (_action, trigger) => {
			disposeTriggerSubscription(trigger);
		}
	}) satisfies TriggerDefinitionProps;
