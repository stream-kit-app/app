import type { PluginAppApi } from '@stream-kit/plugin';
import type { ConditionDefinition, HandlerFieldDefinition, SelectItem } from '@stream-kit/plugin';
import { getTwitch } from './plugin-api';

export async function loadCustomRewardItems(app: PluginAppApi): Promise<SelectItem[]> {
	const broadcasterId = getTwitch(app).userId;
	const client = getTwitch(app).client;

	if (!broadcasterId || !client || !getTwitch(app).isConnected) {
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
	app: PluginAppApi,
	emptyOption: SelectItem
): () => Promise<SelectItem[]> {
	return async () => [emptyOption, ...(await loadCustomRewardItems(app))];
}

export function rewardSelectCondition(app: PluginAppApi): ConditionDefinition {
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
	app: PluginAppApi,
	options: { name?: string; emptyLabel?: string; required?: boolean } = {}
): HandlerFieldDefinition {
	return {
		type: 'select',
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
