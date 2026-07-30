import type { PluginAppApi } from '@stream-kit/plugin';
import type { EventSubWsListener } from '@twurple/eventsub-ws';

import { getTwitch } from './plugin-api';

type SimpleHandler<T> = (context: T) => void;

type EventSubEntry = {
	listener: EventSubWsListener;
	handlers: Set<SimpleHandler<never>>;
	dispose: () => void;
	pendingStop: ReturnType<typeof setTimeout> | undefined;
};

/**
 * Twitch answers with 409 Conflict when an identical subscription is created while the delete of
 * the previous one is still in flight, so keep it around briefly after the last handler leaves.
 * Reactivating actions removes and re-adds handlers within the same tick.
 */
const STOP_GRACE_MS = 5000;

const entries = new Map<string, EventSubEntry>();

function cancelPendingStop(entry: EventSubEntry): void {
	if (entry.pendingStop !== undefined) {
		clearTimeout(entry.pendingStop);
		entry.pendingStop = undefined;
	}
}

/**
 * Drops all tracked subscriptions without deleting them at Twitch. Call this when the listener
 * itself is stopped — its subscriptions die with the websocket session.
 */
export function resetEventSubSubscriptions(): void {
	for (const entry of entries.values()) {
		cancelPendingStop(entry);
	}

	entries.clear();
}

function subscribeEventSub<T>(
	app: PluginAppApi,
	key: string,
	register: (userId: string, emit: (context: T) => void) => () => void,
	handler: SimpleHandler<T>
): () => void {
	const userId = getTwitch(app).userId;
	const eventSub = getTwitch(app).eventSub;

	if (!userId || !eventSub) {
		return () => {};
	}

	let entry = entries.get(key);

	if (entry && entry.listener !== eventSub) {
		cancelPendingStop(entry);
		entries.delete(key);
		entry = undefined;
	}

	if (entry) {
		cancelPendingStop(entry);
	} else {
		const handlers = new Set<SimpleHandler<T>>();
		const dispose = register(userId, (context) => {
			for (const fn of [...handlers]) {
				fn(context);
			}
		});

		entry = {
			listener: eventSub,
			handlers: handlers as Set<SimpleHandler<never>>,
			dispose,
			pendingStop: undefined
		};
		entries.set(key, entry);
	}

	const target = entry;
	const handlers = target.handlers as unknown as Set<SimpleHandler<T>>;

	handlers.add(handler);

	return () => {
		handlers.delete(handler);

		if (handlers.size > 0 || entries.get(key) !== target) {
			return;
		}

		target.pendingStop = setTimeout(() => {
			target.pendingStop = undefined;

			if (handlers.size > 0 || entries.get(key) !== target) {
				return;
			}

			entries.delete(key);
			target.dispose();
		}, STOP_GRACE_MS);
	};
}

export function subscribeStreamOnline(
	app: PluginAppApi,
	handler: SimpleHandler<{ broadcasterId: string; channel: string; streamId: string }>
): () => void {
	return subscribeEventSub(app, 'stream-online', (userId, emit) => {
		const sub = getTwitch(app).eventSub!.onStreamOnline(userId, (event) => {
			emit({
				broadcasterId: userId,
				channel: event.broadcasterDisplayName,
				streamId: event.id
			});
		});

		return () => sub.stop();
	}, handler);
}

export function subscribeStreamOffline(
	app: PluginAppApi,
	handler: SimpleHandler<{ broadcasterId: string; channel: string }>
): () => void {
	return subscribeEventSub(app, 'stream-offline', (userId, emit) => {
		const sub = getTwitch(app).eventSub!.onStreamOffline(userId, () => {
			emit({
				broadcasterId: userId,
				channel: getTwitch(app).token?.userName ?? ''
			});
		});

		return () => sub.stop();
	}, handler);
}

export function subscribeChannelFollow(
	app: PluginAppApi,
	handler: SimpleHandler<{ broadcasterId: string; channel: string; user: string; userId: string }>
): () => void {
	return subscribeEventSub(app, 'channel-follow', (userId, emit) => {
		const sub = getTwitch(app).eventSub!.onChannelFollow(userId, userId, (event) => {
			emit({
				broadcasterId: userId,
				channel: event.broadcasterDisplayName,
				user: event.userDisplayName,
				userId: event.userId
			});
		});

		return () => sub.stop();
	}, handler);
}

export function subscribeChannelUpdate(
	app: PluginAppApi,
	handler: SimpleHandler<{ broadcasterId: string; channel: string; title: string; game: string }>
): () => void {
	return subscribeEventSub(app, 'channel-update', (userId, emit) => {
		const sub = getTwitch(app).eventSub!.onChannelUpdate(userId, (event) => {
			emit({
				broadcasterId: userId,
				channel: event.broadcasterDisplayName,
				title: event.streamTitle,
				game: event.categoryName
			});
		});

		return () => sub.stop();
	}, handler);
}

export function subscribeRedemptionAdd(
	app: PluginAppApi,
	handler: SimpleHandler<{
		broadcasterId: string;
		channel: string;
		user: string;
		userId: string;
		rewardId: string;
		rewardTitle: string;
		redemptionId: string;
		input: string;
	}>
): () => void {
	return subscribeEventSub(app, 'redemption-add', (userId, emit) => {
		const sub = getTwitch(app).eventSub!.onChannelRedemptionAdd(userId, (event) => {
			emit({
				broadcasterId: userId,
				channel: event.broadcasterDisplayName,
				user: event.userDisplayName,
				userId: event.userId,
				rewardId: event.rewardId,
				rewardTitle: event.rewardTitle,
				redemptionId: event.id,
				input: event.input
			});
		});

		return () => sub.stop();
	}, handler);
}

export function subscribeHypeTrainBegin(
	app: PluginAppApi,
	handler: SimpleHandler<{
		broadcasterId: string;
		channel: string;
		level: number;
		total: number;
		progress: number;
		goal: number;
	}>
): () => void {
	return subscribeEventSub(app, 'hype-begin', (userId, emit) => {
		const sub = getTwitch(app).eventSub!.onChannelHypeTrainBeginV2(userId, (event) => {
			emit({
				broadcasterId: userId,
				channel: event.broadcasterDisplayName,
				level: event.level,
				total: event.total,
				progress: event.progress,
				goal: event.goal
			});
		});

		return () => sub.stop();
	}, handler);
}

export function subscribeHypeTrainProgress(
	app: PluginAppApi,
	handler: SimpleHandler<{
		broadcasterId: string;
		channel: string;
		level: number;
		total: number;
		progress: number;
		goal: number;
	}>
): () => void {
	return subscribeEventSub(app, 'hype-progress', (userId, emit) => {
		const sub = getTwitch(app).eventSub!.onChannelHypeTrainProgressV2(userId, (event) => {
			emit({
				broadcasterId: userId,
				channel: event.broadcasterDisplayName,
				level: event.level,
				total: event.total,
				progress: event.progress,
				goal: event.goal
			});
		});

		return () => sub.stop();
	}, handler);
}

export function subscribeHypeTrainEnd(
	app: PluginAppApi,
	handler: SimpleHandler<{
		broadcasterId: string;
		channel: string;
		level: number;
		total: number;
	}>
): () => void {
	return subscribeEventSub(app, 'hype-end', (userId, emit) => {
		const sub = getTwitch(app).eventSub!.onChannelHypeTrainEndV2(userId, (event) => {
			emit({
				broadcasterId: userId,
				channel: event.broadcasterDisplayName,
				level: event.level,
				total: event.total
			});
		});

		return () => sub.stop();
	}, handler);
}

export function subscribePollBegin(
	app: PluginAppApi,
	handler: SimpleHandler<{ broadcasterId: string; channel: string; pollId: string; title: string }>
): () => void {
	return subscribeEventSub(app, 'poll-begin', (userId, emit) => {
		const sub = getTwitch(app).eventSub!.onChannelPollBegin(userId, (event) => {
			emit({
				broadcasterId: userId,
				channel: event.broadcasterDisplayName,
				pollId: event.id,
				title: event.title
			});
		});

		return () => sub.stop();
	}, handler);
}

export function subscribePollEnd(
	app: PluginAppApi,
	handler: SimpleHandler<{ broadcasterId: string; channel: string; pollId: string; title: string }>
): () => void {
	return subscribeEventSub(app, 'poll-end', (userId, emit) => {
		const sub = getTwitch(app).eventSub!.onChannelPollEnd(userId, (event) => {
			emit({
				broadcasterId: userId,
				channel: event.broadcasterDisplayName,
				pollId: event.id,
				title: event.title
			});
		});

		return () => sub.stop();
	}, handler);
}

export function subscribePredictionBegin(
	app: PluginAppApi,
	handler: SimpleHandler<{
		broadcasterId: string;
		channel: string;
		predictionId: string;
		title: string;
	}>
): () => void {
	return subscribeEventSub(app, 'prediction-begin', (userId, emit) => {
		const sub = getTwitch(app).eventSub!.onChannelPredictionBegin(userId, (event) => {
			emit({
				broadcasterId: userId,
				channel: event.broadcasterDisplayName,
				predictionId: event.id,
				title: event.title
			});
		});

		return () => sub.stop();
	}, handler);
}

export function subscribePredictionLock(
	app: PluginAppApi,
	handler: SimpleHandler<{
		broadcasterId: string;
		channel: string;
		predictionId: string;
		title: string;
	}>
): () => void {
	return subscribeEventSub(app, 'prediction-lock', (userId, emit) => {
		const sub = getTwitch(app).eventSub!.onChannelPredictionLock(userId, (event) => {
			emit({
				broadcasterId: userId,
				channel: event.broadcasterDisplayName,
				predictionId: event.id,
				title: event.title
			});
		});

		return () => sub.stop();
	}, handler);
}

export function subscribePredictionEnd(
	app: PluginAppApi,
	handler: SimpleHandler<{
		broadcasterId: string;
		channel: string;
		predictionId: string;
		title: string;
	}>
): () => void {
	return subscribeEventSub(app, 'prediction-end', (userId, emit) => {
		const sub = getTwitch(app).eventSub!.onChannelPredictionEnd(userId, (event) => {
			emit({
				broadcasterId: userId,
				channel: event.broadcasterDisplayName,
				predictionId: event.id,
				title: event.title
			});
		});

		return () => sub.stop();
	}, handler);
}

export function subscribeChannelBan(
	app: PluginAppApi,
	handler: SimpleHandler<{
		broadcasterId: string;
		channel: string;
		user: string;
		userId: string;
		reason?: string;
	}>
): () => void {
	return subscribeEventSub(app, 'channel-ban', (userId, emit) => {
		const sub = getTwitch(app).eventSub!.onChannelBan(userId, (event) => {
			emit({
				broadcasterId: userId,
				channel: event.broadcasterDisplayName,
				user: event.userDisplayName,
				userId: event.userId,
				reason: event.reason
			});
		});

		return () => sub.stop();
	}, handler);
}

export function subscribeChannelUnban(
	app: PluginAppApi,
	handler: SimpleHandler<{ broadcasterId: string; channel: string; user: string; userId: string }>
): () => void {
	return subscribeEventSub(app, 'channel-unban', (userId, emit) => {
		const sub = getTwitch(app).eventSub!.onChannelUnban(userId, (event) => {
			emit({
				broadcasterId: userId,
				channel: event.broadcasterDisplayName,
				user: event.userDisplayName,
				userId: event.userId
			});
		});

		return () => sub.stop();
	}, handler);
}

export function subscribeShieldModeBegin(
	app: PluginAppApi,
	handler: SimpleHandler<{ broadcasterId: string; channel: string }>
): () => void {
	return subscribeEventSub(app, 'shield-begin', (userId, emit) => {
		const sub = getTwitch(app).eventSub!.onChannelShieldModeBegin(userId, userId, (event) => {
			emit({
				broadcasterId: userId,
				channel: event.broadcasterDisplayName
			});
		});

		return () => sub.stop();
	}, handler);
}

export function subscribeShieldModeEnd(
	app: PluginAppApi,
	handler: SimpleHandler<{ broadcasterId: string; channel: string }>
): () => void {
	return subscribeEventSub(app, 'shield-end', (userId, emit) => {
		const sub = getTwitch(app).eventSub!.onChannelShieldModeEnd(userId, userId, (event) => {
			emit({
				broadcasterId: userId,
				channel: event.broadcasterDisplayName
			});
		});

		return () => sub.stop();
	}, handler);
}

export function subscribeGoalBegin(
	app: PluginAppApi,
	handler: SimpleHandler<{
		broadcasterId: string;
		channel: string;
		goalId: string;
		type: string;
		description: string;
		currentAmount: number;
		targetAmount: number;
	}>
): () => void {
	return subscribeEventSub(app, 'goal-begin', (userId, emit) => {
		const sub = getTwitch(app).eventSub!.onChannelGoalBegin(userId, (event) => {
			emit({
				broadcasterId: userId,
				channel: event.broadcasterDisplayName,
				goalId: event.id,
				type: event.type,
				description: event.description,
				currentAmount: event.currentAmount,
				targetAmount: event.targetAmount
			});
		});

		return () => sub.stop();
	}, handler);
}

export function subscribeGoalProgress(
	app: PluginAppApi,
	handler: SimpleHandler<{
		broadcasterId: string;
		channel: string;
		goalId: string;
		type: string;
		description: string;
		currentAmount: number;
		targetAmount: number;
	}>
): () => void {
	return subscribeEventSub(app, 'goal-progress', (userId, emit) => {
		const sub = getTwitch(app).eventSub!.onChannelGoalProgress(userId, (event) => {
			emit({
				broadcasterId: userId,
				channel: event.broadcasterDisplayName,
				goalId: event.id,
				type: event.type,
				description: event.description,
				currentAmount: event.currentAmount,
				targetAmount: event.targetAmount
			});
		});

		return () => sub.stop();
	}, handler);
}

export function subscribeGoalEnd(
	app: PluginAppApi,
	handler: SimpleHandler<{
		broadcasterId: string;
		channel: string;
		goalId: string;
		type: string;
		description: string;
		currentAmount: number;
		targetAmount: number;
		isAchieved: boolean;
	}>
): () => void {
	return subscribeEventSub(app, 'goal-end', (userId, emit) => {
		const sub = getTwitch(app).eventSub!.onChannelGoalEnd(userId, (event) => {
			emit({
				broadcasterId: userId,
				channel: event.broadcasterDisplayName,
				goalId: event.id,
				type: event.type,
				description: event.description,
				currentAmount: event.currentAmount,
				targetAmount: event.targetAmount,
				isAchieved: event.isAchieved
			});
		});

		return () => sub.stop();
	}, handler);
}

export function subscribeCharityCampaignStart(
	app: PluginAppApi,
	handler: SimpleHandler<{
		broadcasterId: string;
		channel: string;
		campaignId: string;
		charityName: string;
		currentAmount: number;
		targetAmount: number;
		currency: string;
	}>
): () => void {
	return subscribeEventSub(app, 'charity-start', (userId, emit) => {
		const sub = getTwitch(app).eventSub!.onChannelCharityCampaignStart(userId, (event) => {
			emit({
				broadcasterId: userId,
				channel: event.broadcasterDisplayName,
				campaignId: event.id,
				charityName: event.charityName,
				currentAmount: event.currentAmount.localizedValue,
				targetAmount: event.targetAmount.localizedValue,
				currency: event.currentAmount.currency
			});
		});

		return () => sub.stop();
	}, handler);
}

export function subscribeCharityCampaignProgress(
	app: PluginAppApi,
	handler: SimpleHandler<{
		broadcasterId: string;
		channel: string;
		campaignId: string;
		charityName: string;
		currentAmount: number;
		targetAmount: number;
		currency: string;
	}>
): () => void {
	return subscribeEventSub(app, 'charity-progress', (userId, emit) => {
		const sub = getTwitch(app).eventSub!.onChannelCharityCampaignProgress(userId, (event) => {
			emit({
				broadcasterId: userId,
				channel: event.broadcasterDisplayName,
				campaignId: event.id,
				charityName: event.charityName,
				currentAmount: event.currentAmount.localizedValue,
				targetAmount: event.targetAmount.localizedValue,
				currency: event.currentAmount.currency
			});
		});

		return () => sub.stop();
	}, handler);
}

export function subscribeCharityCampaignStop(
	app: PluginAppApi,
	handler: SimpleHandler<{
		broadcasterId: string;
		channel: string;
		campaignId: string;
		charityName: string;
		currentAmount: number;
		targetAmount: number;
		currency: string;
	}>
): () => void {
	return subscribeEventSub(app, 'charity-stop', (userId, emit) => {
		const sub = getTwitch(app).eventSub!.onChannelCharityCampaignStop(userId, (event) => {
			emit({
				broadcasterId: userId,
				channel: event.broadcasterDisplayName,
				campaignId: event.id,
				charityName: event.charityName,
				currentAmount: event.currentAmount.localizedValue,
				targetAmount: event.targetAmount.localizedValue,
				currency: event.currentAmount.currency
			});
		});

		return () => sub.stop();
	}, handler);
}

export function subscribeCharityDonation(
	app: PluginAppApi,
	handler: SimpleHandler<{
		broadcasterId: string;
		channel: string;
		campaignId: string;
		charityName: string;
		currency: string;
		user: string;
		userId: string;
		amount: number;
	}>
): () => void {
	return subscribeEventSub(app, 'charity-donate', (userId, emit) => {
		const sub = getTwitch(app).eventSub!.onChannelCharityDonation(userId, (event) => {
			emit({
				broadcasterId: userId,
				channel: event.broadcasterDisplayName,
				campaignId: event.campaignId,
				charityName: event.charityName,
				currency: event.amount.currency,
				user: event.donorDisplayName,
				userId: event.donorId,
				amount: event.amount.localizedValue
			});
		});

		return () => sub.stop();
	}, handler);
}

export function subscribeAdBreakBegin(
	app: PluginAppApi,
	handler: SimpleHandler<{
		broadcasterId: string;
		channel: string;
		durationSeconds: number;
		isAutomatic: boolean;
		requester: string;
		requesterId: string;
	}>
): () => void {
	return subscribeEventSub(app, 'ad-break-begin', (userId, emit) => {
		const sub = getTwitch(app).eventSub!.onChannelAdBreakBegin(userId, (event) => {
			emit({
				broadcasterId: userId,
				channel: event.broadcasterDisplayName,
				durationSeconds: event.durationSeconds,
				isAutomatic: event.isAutomatic,
				requester: event.requesterDisplayName,
				requesterId: event.requesterId
			});
		});

		return () => sub.stop();
	}, handler);
}

export function subscribeShoutoutReceive(
	app: PluginAppApi,
	handler: SimpleHandler<{
		broadcasterId: string;
		channel: string;
		user: string;
		userId: string;
		viewers: number;
	}>
): () => void {
	return subscribeEventSub(app, 'shoutout-receive', (userId, emit) => {
		const sub = getTwitch(app).eventSub!.onChannelShoutoutReceive(userId, userId, (event) => {
			emit({
				broadcasterId: userId,
				channel: event.broadcasterDisplayName,
				user: event.shoutingOutBroadcasterDisplayName,
				userId: event.shoutingOutBroadcasterId,
				viewers: event.viewerCount
			});
		});

		return () => sub.stop();
	}, handler);
}