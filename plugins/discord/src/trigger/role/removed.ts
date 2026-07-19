import type { PluginAppApi, TriggerDefinitionProps } from '@stream-kit/plugin';

import type { RoleChangedContext } from '../../contexts';
import {
	evaluateOptionalEquals,
	evaluateUserMatch,
	textEqualsCondition,
	userMatchCondition
} from '../../lib/conditions';
import { DISCORD_EVENTS, onDiscordEvent } from '../../lib/event-hub';
import { createTestRoleChangedContext } from '../../lib/test-contexts';
import { createActivate, createDeactivate, createOnTest, evaluateWith } from '../../lib/trigger-helpers';

function validateRoleChanged(
	conditions: Parameters<NonNullable<TriggerDefinitionProps['validate']>>[0],
	context: RoleChangedContext
): boolean {
	return evaluateWith(conditions, context, {
		user: (value) =>
			evaluateUserMatch(context.username, value) || evaluateUserMatch(context.user, value),
		'guild-id': (value) => evaluateOptionalEquals(context.guildId, value),
		'role-id': (value) => evaluateOptionalEquals(context.roleId, value)
	});
}

export const createRoleRemovedTrigger = (app: PluginAppApi) =>
	({
		name: 'Role Removed',
		conditions: [
			userMatchCondition(),
			textEqualsCondition('guild-id', 'Server ID', 'Guild ID (optional)'),
			textEqualsCondition('role-id', 'Role ID', 'Role ID (optional)')
		],
		validate: (conditions, context) =>
			validateRoleChanged(conditions, context as RoleChangedContext),
		onTest: createOnTest(() => createTestRoleChangedContext()),
		activate: createActivate<RoleChangedContext>(
			app,
			(handler) => onDiscordEvent(DISCORD_EVENTS.ROLE_REMOVED, handler),
			validateRoleChanged
		),
		deactivate: createDeactivate()
	}) satisfies TriggerDefinitionProps;
