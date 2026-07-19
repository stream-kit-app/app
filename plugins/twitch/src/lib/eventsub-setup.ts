import type { PluginAppApi } from '@stream-kit/plugin';
import { getTwitch } from './plugin-api';

type SimpleHandler<T> = (context: T) => void;

const handlerMaps = new Map<string, Set<SimpleHandler<unknown>>>();

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

	let handlers = handlerMaps.get(key) as Set<SimpleHandler<T>> | undefined;
	let dispose: (() => void) | undefined;

	if (!handlers) {
		handlers = new Set();
		handlerMaps.set(key, handlers as Set<SimpleHandler<unknown>>);

		dispose = register(userId, (context) => {
			for (const fn of handlers!) {
				fn(context);
			}
		});
	}

	handlers.add(handler);

	return () => {
		handlers!.delete(handler);

		if (handlers!.size === 0) {
			dispose?.();
			handlerMaps.delete(key);
		}
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