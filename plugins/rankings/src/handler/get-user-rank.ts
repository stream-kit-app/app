import type { HandlerDefinitionProps, PluginAppApi } from '@stream-kit/plugin';

import type { RankingsService } from '../app/lib/rankings.svelte';
import { getFieldValue } from '../lib/get-field-value';
import {
	createUserTargetField,
	resolveUserTarget,
	userTargetFailureDescription
} from '../lib/user-target-field';

function resolveTargetName(
	fields: Parameters<typeof getFieldValue>[0],
	key: string,
	fallback: string
): string {
	const value = getFieldValue(fields, key);

	if (typeof value === 'string' && value.trim()) {
		return value.trim();
	}

	return fallback;
}

function createOutputVarFields() {
	return [
		{
			type: 'text' as const,
			name: 'Store found as',
			key: 'foundVar',
			defaultValue: 'found'
		},
		{
			type: 'text' as const,
			name: 'Store userId as',
			key: 'userIdVar',
			defaultValue: 'userId'
		},
		{
			type: 'text' as const,
			name: 'Store username as',
			key: 'usernameVar',
			defaultValue: 'username'
		},
		{
			type: 'text' as const,
			name: 'Store points as',
			key: 'pointsVar',
			defaultValue: 'points'
		},
		{
			type: 'text' as const,
			name: 'Store rank as',
			key: 'rankVar',
			defaultValue: 'rank'
		},
		{
			type: 'text' as const,
			name: 'Store tier as',
			key: 'tierVar',
			defaultValue: 'tier'
		},
		{
			type: 'text' as const,
			name: 'Store watch time as',
			key: 'watchTimeVar',
			defaultValue: 'watchTime'
		},
		{
			type: 'text' as const,
			name: 'Store position as',
			key: 'positionVar',
			defaultValue: 'position'
		}
	];
}

export function createGetUserRankHandler(app: PluginAppApi, rankings: RankingsService) {
	return {
		name: 'Get user rank',
		fields: [createUserTargetField(rankings), ...createOutputVarFields()],
		execute: async (_action, handler, context, next) => {
			const foundVar = resolveTargetName(handler.fields, 'foundVar', 'found');
			const userIdVar = resolveTargetName(handler.fields, 'userIdVar', 'userId');
			const usernameVar = resolveTargetName(handler.fields, 'usernameVar', 'username');
			const pointsVar = resolveTargetName(handler.fields, 'pointsVar', 'points');
			const rankVar = resolveTargetName(handler.fields, 'rankVar', 'rank');
			const tierVar = resolveTargetName(handler.fields, 'tierVar', 'tier');
			const watchTimeVar = resolveTargetName(handler.fields, 'watchTimeVar', 'watchTime');
			const positionVar = resolveTargetName(handler.fields, 'positionVar', 'position');

			if (!context.actionVariables) {
				context.actionVariables = {};
			}

			const setEmpty = () => {
				context.actionVariables![foundVar] = 'false';
				context.actionVariables![userIdVar] = '';
				context.actionVariables![usernameVar] = '';
				context.actionVariables![pointsVar] = '';
				context.actionVariables![rankVar] = '';
				context.actionVariables![tierVar] = '';
				context.actionVariables![watchTimeVar] = '';
				context.actionVariables![positionVar] = '';
			};

			const identity = resolveUserTarget(handler.fields, context.data, rankings);

			if (!identity) {
				app.toast.create({
					title: 'Get user rank failed',
					description: userTargetFailureDescription(handler.fields),
					variant: 'warning'
				});
				setEmpty();
				next();
				return;
			}

			await rankings.canonicalizeUserIdentity(identity);

			const user = rankings.resolveUser(identity);

			if (!user) {
				setEmpty();
				next();
				return;
			}

			const progress = rankings.getProgressForPoints(user.totalPoints);
			const position = rankings.getUserLeaderboardPosition(user.userId);

			context.actionVariables![foundVar] = 'true';
			context.actionVariables![userIdVar] = user.userId;
			context.actionVariables![usernameVar] = user.username;
			context.actionVariables![pointsVar] = String(user.totalPoints);
			context.actionVariables![rankVar] = progress.rank?.name ?? 'None';
			context.actionVariables![tierVar] = progress.tier?.name ?? 'None';
			context.actionVariables![watchTimeVar] = String(Math.floor(user.watchTimeSeconds / 60));
			context.actionVariables![positionVar] = position != null ? String(position) : '';

			next();
		}
	} satisfies HandlerDefinitionProps;
}
