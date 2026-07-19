import type { PluginAppApi, TriggerDefinitionProps } from '@stream-kit/plugin';

import type { VoiceStateChangedContext } from '../../contexts';
import {
	evaluateOptionalEquals,
	evaluateUserMatch,
	textEqualsCondition,
	userMatchCondition
} from '../../lib/conditions';
import { DISCORD_EVENTS, onDiscordEvent } from '../../lib/event-hub';
import { createTestVoiceJoinContext } from '../../lib/test-contexts';
import { createActivate, createDeactivate, createOnTest, evaluateWith } from '../../lib/trigger-helpers';

function validateVoice(
	conditions: Parameters<NonNullable<TriggerDefinitionProps['validate']>>[0],
	context: VoiceStateChangedContext
): boolean {
	return evaluateWith(conditions, context, {
		user: (value) =>
			evaluateUserMatch(context.username, value) || evaluateUserMatch(context.user, value),
		'guild-id': (value) => evaluateOptionalEquals(context.guildId, value),
		'channel-id': (value) => evaluateOptionalEquals(context.channelId, value)
	});
}

export const createVoiceJoinTrigger = (app: PluginAppApi) =>
	({
		name: 'Voice Join',
		conditions: [
			userMatchCondition(),
			textEqualsCondition('guild-id', 'Server ID', 'Guild ID (optional)'),
			textEqualsCondition('channel-id', 'Channel ID', 'Voice channel ID (optional)')
		],
		validate: (conditions, context) =>
			validateVoice(conditions, context as VoiceStateChangedContext),
		onTest: createOnTest(() => createTestVoiceJoinContext()),
		activate: createActivate<VoiceStateChangedContext>(
			app,
			(handler) => onDiscordEvent(DISCORD_EVENTS.VOICE_JOIN, handler),
			validateVoice
		),
		deactivate: createDeactivate()
	}) satisfies TriggerDefinitionProps;
