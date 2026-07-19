import type { PluginAppApi, TriggerDefinitionProps } from '@stream-kit/plugin';

import type { VoiceStateChangedContext } from '../../contexts';
import {
	evaluateOptionalEquals,
	evaluateUserMatch,
	textEqualsCondition,
	userMatchCondition
} from '../../lib/conditions';
import { DISCORD_EVENTS, onDiscordEvent } from '../../lib/event-hub';
import { createTestVoiceLeaveContext } from '../../lib/test-contexts';
import { createActivate, createDeactivate, createOnTest, evaluateWith } from '../../lib/trigger-helpers';

function validateVoice(
	conditions: Parameters<NonNullable<TriggerDefinitionProps['validate']>>[0],
	context: VoiceStateChangedContext
): boolean {
	return evaluateWith(conditions, context, {
		user: (value) =>
			evaluateUserMatch(context.username, value) || evaluateUserMatch(context.user, value),
		'guild-id': (value) => evaluateOptionalEquals(context.guildId, value),
		'channel-id': (value) =>
			evaluateOptionalEquals(context.previousChannelId, value)
	});
}

export const createVoiceLeaveTrigger = (app: PluginAppApi) =>
	({
		name: 'Voice Leave',
		conditions: [
			userMatchCondition(),
			textEqualsCondition('guild-id', 'Server ID', 'Guild ID (optional)'),
			textEqualsCondition('channel-id', 'Channel ID', 'Left voice channel ID (optional)')
		],
		validate: (conditions, context) =>
			validateVoice(conditions, context as VoiceStateChangedContext),
		onTest: createOnTest(() => createTestVoiceLeaveContext()),
		activate: createActivate<VoiceStateChangedContext>(
			app,
			(handler) => onDiscordEvent(DISCORD_EVENTS.VOICE_LEAVE, handler),
			validateVoice
		),
		deactivate: createDeactivate()
	}) satisfies TriggerDefinitionProps;
