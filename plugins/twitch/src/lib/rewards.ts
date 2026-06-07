import type { App } from '@stream-kit/app/api';
import type { ConditionDefinition, HandlerFieldDefinition, SelectItem } from '@stream-kit/core';

export async function loadCustomRewardItems(app: App): Promise<SelectItem[]> {
	const broadcasterId = app.twitch.userId;
	const client = app.twitch.client;

	if (!broadcasterId || !client || !app.twitch.isConnected) {
		return [];
	}

	try {
		const rewards = await client.channelPoints.getCustomRewards(broadcasterId);

		return rewards.map((reward) => ({
			value: reward.id,
			label: reward.title
		}));
	} catch {
		return [];
	}
}

export function rewardSelectItems(
	app: App,
	emptyOption: SelectItem
): () => Promise<SelectItem[]> {
	return async () => [emptyOption, ...(await loadCustomRewardItems(app))];
}

export function rewardSelectCondition(app: App): ConditionDefinition {
	return {
		type: 'select',
		key: 'rewardId',
		name: 'Reward',
		placeholder: 'Any reward',
		loadingPlaceholder: 'Loading rewards…',
		items: rewardSelectItems(app, { value: '', label: 'Any reward' })
	};
}

export function rewardSelectField(
	app: App,
	options: { name?: string; emptyLabel?: string; required?: boolean } = {}
): HandlerFieldDefinition {
	return {
		type: 'select',
		key: 'rewardId',
		name: options.name ?? 'Reward',
		placeholder: options.emptyLabel ?? 'Use trigger reward',
		loadingPlaceholder: 'Loading rewards…',
		required: options.required,
		items: rewardSelectItems(app, {
			value: '',
			label: options.emptyLabel ?? 'Use trigger reward'
		})
	};
}
