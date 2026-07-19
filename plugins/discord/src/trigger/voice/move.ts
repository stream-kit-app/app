import type { PluginAppApi, TriggerDefinitionProps } from '@stream-kit/plugin';

import type { VoiceStateChangedContext } from '../../contexts';
import {
	evaluateOptionalEquals,
	evaluateUserMatch,
	textEqualsCondition,
	userMatchCondition
} from '../../lib/conditions';
import { DISCORD_EVENTS, onDiscordEvent } from '../../lib/event-hub';
import { createTestVoiceMoveContext } from '../../lib/test-contexts';
import { createActivate, createDeactivate, createOnTest, evaluateWith } from '../../lib/trigger-helpers';

function validateVoice(
	conditions: Parameters<NonNullable<TriggerDefinitionProps['validate']>>[0],
	context: VoiceStateChangedContext
): boolean {
	return evaluateWith(conditions, context, {
		user: (value) =>
			evaluateUserMatch(context.username, value) || evaluateUserMatch(context.user, value),
		'guild-id': (value) => evaluateOptionalEquals(context.guildId, value),
		'channel-id': (value) => evaluateOptionalEquals(context.channelId, value),
		'previous-channel-id': (value) =>
			evaluateOptionalEquals(context.previousChannelId, value)
	});
}

export const createVoiceMoveTrigger = (app: PluginAppApi) =>
	({
		name: 'Voice Move',
		conditions: [
			userMatchCondition(),
			textEqualsCondition('guild-id', 'Server ID', 'Guild ID (optional)'),
			textEqualsCondition('channel-id', 'Channel ID', 'New voice channel ID (optional)'),
			textEqualsCondition(
				'previous-channel-id',
				'Previous channel ID',
				'Previous voice channel ID (optional)'
			)
		],
		validate: (conditions, context) =>
			validateVoice(conditions, context as VoiceStateChangedContext),
		onTest: createOnTest(() => createTestVoiceMoveContext()),
		activate: createActivate<VoiceStateChangedContext>(
			app,
			(handler) => onDiscordEvent(DISCORD_EVENTS.VOICE_MOVE, handler),
			validateVoice
		),
		deactivate: createDeactivate()
	}) satisfies TriggerDefinitionProps;
