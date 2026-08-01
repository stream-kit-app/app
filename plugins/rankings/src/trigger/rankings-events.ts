import type { ConditionGroupNode, TriggerDefinitionProps } from '@stream-kit/plugin';

import type { RankingsService } from '../app/lib/rankings.svelte';
import type { RankingsEventContext } from '../lib/contexts';
import { DEFAULT_RANK_ICON, getRankIconKind } from '../lib/rank-icon';
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

function lastRankInTierCondition() {
	return {
		key: 'last-rank-in-tier',
		name: 'Last rank in tier',
		type: 'select' as const,
		items: [
			{ value: '', label: 'Any' },
			{ value: 'true', label: 'Yes' },
			{ value: 'false', label: 'No' }
		]
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
		},
		'last-rank-in-tier': (value) => {
			if (typeof value !== 'string' || !value.trim()) {
				return true;
			}

			return event.isLastRankInTier === value.trim().toLowerCase();
		}
	});
}

function resolveTestRankIcon(rankings: RankingsService, icon: string | undefined): string {
	const rawIcon = icon?.trim() || DEFAULT_RANK_ICON;

	if (getRankIconKind(rawIcon) !== 'image' || rawIcon.startsWith('data:image/')) {
		return rawIcon;
	}

	if (!rankings.isReady) {
		return rawIcon;
	}

	try {
		return rankings.requireApp().userFiles.resolveUrl(rawIcon);
	} catch {
		return rawIcon;
	}
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
		currentRankIcon: resolveTestRankIcon(rankings, currentProgress.rank?.icon),
		currentRankColor: currentProgress.rank?.color?.trim() || '',
		isLastRankInTier: 'false',
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
		conditions: [sourceCondition(), lastRankInTierCondition()],
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
