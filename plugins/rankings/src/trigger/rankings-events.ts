import type { ConditionGroupNode, TriggerDefinitionProps } from '@stream-kit/plugin';

import type { RankingsService } from '../app/lib/rankings.svelte';
import type { RankingsEventContext } from '../lib/contexts';
import {
	createActivate,
	createDeactivate,
	createOnTest,
	evaluateWith
} from '../lib/trigger-helpers';
import { resolveTwitchChatTarget } from '../lib/twitch-chat-target';

function sourceCondition() {
	return {
		key: 'source',
		name: 'Source',
		type: 'text' as const,
		placeholder: 'watch-time'
	};
}

function minimumAmountCondition() {
	return {
		key: 'minimum-amount',
		name: 'Minimum amount',
		type: 'text' as const,
		placeholder: '1'
	};
}

function validateRankingsEvent(conditions: ConditionGroupNode, context: unknown): boolean {
	const event = context as RankingsEventContext;

	return evaluateWith(conditions, context, {
		source: (value) => {
			if (typeof value !== 'string' || !value.trim()) {
				return true;
			}

			return event.source.toLowerCase() === value.trim().toLowerCase();
		},
		'minimum-amount': (value) => {
			if (value == null || value === '') {
				return true;
			}

			const minimum = Number(value);

			if (!Number.isFinite(minimum)) {
				return true;
			}

			return event.amount >= minimum;
		}
	});
}

function createTestContext(rankings: RankingsService): RankingsEventContext {
	const user = rankings.getLeaderboard(1)[0];
	const currentPoints = user?.totalPoints ?? 100;
	const previousProgress = rankings.getProgressForPoints(Math.max(0, currentPoints - 50));
	const currentProgress = rankings.getProgressForPoints(currentPoints);
	const chat = rankings.isReady
		? resolveTwitchChatTarget(rankings.requireApp())
		: {};

	return {
		userId: user?.userId ?? 'twitch:testviewer',
		username: user?.username ?? 'TestViewer',
		platform: user?.platform ?? 'twitch',
		totalPoints: currentPoints,
		points: currentPoints,
		watchTimeSeconds: user?.watchTimeSeconds ?? 600,
		source: 'manual',
		amount: 50,
		rank: currentProgress.rank?.name ?? 'None',
		tier: currentProgress.tier?.name ?? 'None',
		previousRank: previousProgress.rank?.name ?? 'None',
		currentRank: currentProgress.rank?.name ?? 'None',
		previousTier: previousProgress.tier?.name ?? 'None',
		currentTier: currentProgress.tier?.name ?? 'None',
		channel: chat.channel,
		broadcasterId: chat.broadcasterId
	};
}

export function createPointsEarnedTrigger(rankings: RankingsService): TriggerDefinitionProps {
	return {
		name: 'Points earned',
		conditions: [sourceCondition(), minimumAmountCondition()],
		validate: (conditions, context) => validateRankingsEvent(conditions, context),
		activate: createActivate<RankingsEventContext>(
			(listener) => rankings.subscribe('points-earned', listener),
			(conditions, context) => validateRankingsEvent(conditions, context)
		),
		deactivate: createDeactivate(),
		onTest: createOnTest(() => createTestContext(rankings))
	};
}

export function createRankChangedTrigger(rankings: RankingsService): TriggerDefinitionProps {
	return {
		name: 'Rank changed',
		conditions: [sourceCondition()],
		validate: (conditions, context) => validateRankingsEvent(conditions, context),
		activate: createActivate<RankingsEventContext>(
			(listener) => rankings.subscribe('rank-changed', listener),
			(conditions, context) => validateRankingsEvent(conditions, context)
		),
		deactivate: createDeactivate(),
		onTest: createOnTest(() => createTestContext(rankings))
	};
}

export function createTierAdvancedTrigger(rankings: RankingsService): TriggerDefinitionProps {
	return {
		name: 'Tier advanced',
		conditions: [sourceCondition()],
		validate: (conditions, context) => validateRankingsEvent(conditions, context),
		activate: createActivate<RankingsEventContext>(
			(listener) => rankings.subscribe('tier-advanced', listener),
			(conditions, context) => validateRankingsEvent(conditions, context)
		),
		deactivate: createDeactivate(),
		onTest: createOnTest(() => createTestContext(rankings))
	};
}
