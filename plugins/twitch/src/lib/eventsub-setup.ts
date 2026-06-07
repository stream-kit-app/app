import type { App } from '@stream-kit/app/api';

type SimpleHandler<T> = (context: T) => void;

const handlerMaps = new Map<string, Set<SimpleHandler<unknown>>>();

function subscribeEventSub<T>(
	app: App,
	key: string,
	register: (userId: string, emit: (context: T) => void) => () => void,
	handler: SimpleHandler<T>
): () => void {
	const userId = app.twitch.userId;
	const eventSub = app.twitch.eventSub;

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
	app: App,
	handler: SimpleHandler<{ broadcasterId: string; channel: string; streamId: string }>
): () => void {
	return subscribeEventSub(app, 'stream-online', (userId, emit) => {
		const sub = app.twitch.eventSub!.onStreamOnline(userId, (event) => {
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
	app: App,
	handler: SimpleHandler<{ broadcasterId: string; channel: string }>
): () => void {
	return subscribeEventSub(app, 'stream-offline', (userId, emit) => {
		const sub = app.twitch.eventSub!.onStreamOffline(userId, () => {
			emit({
				broadcasterId: userId,
				channel: app.twitch.token?.userName ?? ''
			});
		});

		return () => sub.stop();
	}, handler);
}

export function subscribeChannelFollow(
	app: App,
	handler: SimpleHandler<{ broadcasterId: string; channel: string; user: string; userId: string }>
): () => void {
	return subscribeEventSub(app, 'channel-follow', (userId, emit) => {
		const sub = app.twitch.eventSub!.onChannelFollow(userId, userId, (event) => {
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
	app: App,
	handler: SimpleHandler<{ broadcasterId: string; channel: string; title: string; game: string }>
): () => void {
	return subscribeEventSub(app, 'channel-update', (userId, emit) => {
		const sub = app.twitch.eventSub!.onChannelUpdate(userId, (event) => {
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
	app: App,
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
		const sub = app.twitch.eventSub!.onChannelRedemptionAdd(userId, (event) => {
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
	app: App,
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
		const sub = app.twitch.eventSub!.onChannelHypeTrainBeginV2(userId, (event) => {
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
	app: App,
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
		const sub = app.twitch.eventSub!.onChannelHypeTrainProgressV2(userId, (event) => {
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
	app: App,
	handler: SimpleHandler<{
		broadcasterId: string;
		channel: string;
		level: number;
		total: number;
	}>
): () => void {
	return subscribeEventSub(app, 'hype-end', (userId, emit) => {
		const sub = app.twitch.eventSub!.onChannelHypeTrainEndV2(userId, (event) => {
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
	app: App,
	handler: SimpleHandler<{ broadcasterId: string; channel: string; pollId: string; title: string }>
): () => void {
	return subscribeEventSub(app, 'poll-begin', (userId, emit) => {
		const sub = app.twitch.eventSub!.onChannelPollBegin(userId, (event) => {
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
	app: App,
	handler: SimpleHandler<{ broadcasterId: string; channel: string; pollId: string; title: string }>
): () => void {
	return subscribeEventSub(app, 'poll-end', (userId, emit) => {
		const sub = app.twitch.eventSub!.onChannelPollEnd(userId, (event) => {
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
	app: App,
	handler: SimpleHandler<{
		broadcasterId: string;
		channel: string;
		predictionId: string;
		title: string;
	}>
): () => void {
	return subscribeEventSub(app, 'prediction-begin', (userId, emit) => {
		const sub = app.twitch.eventSub!.onChannelPredictionBegin(userId, (event) => {
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
	app: App,
	handler: SimpleHandler<{
		broadcasterId: string;
		channel: string;
		predictionId: string;
		title: string;
	}>
): () => void {
	return subscribeEventSub(app, 'prediction-lock', (userId, emit) => {
		const sub = app.twitch.eventSub!.onChannelPredictionLock(userId, (event) => {
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
	app: App,
	handler: SimpleHandler<{
		broadcasterId: string;
		channel: string;
		predictionId: string;
		title: string;
	}>
): () => void {
	return subscribeEventSub(app, 'prediction-end', (userId, emit) => {
		const sub = app.twitch.eventSub!.onChannelPredictionEnd(userId, (event) => {
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
	app: App,
	handler: SimpleHandler<{
		broadcasterId: string;
		channel: string;
		user: string;
		userId: string;
		reason?: string;
	}>
): () => void {
	return subscribeEventSub(app, 'channel-ban', (userId, emit) => {
		const sub = app.twitch.eventSub!.onChannelBan(userId, (event) => {
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
	app: App,
	handler: SimpleHandler<{ broadcasterId: string; channel: string; user: string; userId: string }>
): () => void {
	return subscribeEventSub(app, 'channel-unban', (userId, emit) => {
		const sub = app.twitch.eventSub!.onChannelUnban(userId, (event) => {
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
	app: App,
	handler: SimpleHandler<{ broadcasterId: string; channel: string }>
): () => void {
	return subscribeEventSub(app, 'shield-begin', (userId, emit) => {
		const sub = app.twitch.eventSub!.onChannelShieldModeBegin(userId, userId, (event) => {
			emit({
				broadcasterId: userId,
				channel: event.broadcasterDisplayName
			});
		});

		return () => sub.stop();
	}, handler);
}

export function subscribeShieldModeEnd(
	app: App,
	handler: SimpleHandler<{ broadcasterId: string; channel: string }>
): () => void {
	return subscribeEventSub(app, 'shield-end', (userId, emit) => {
		const sub = app.twitch.eventSub!.onChannelShieldModeEnd(userId, userId, (event) => {
			emit({
				broadcasterId: userId,
				channel: event.broadcasterDisplayName
			});
		});

		return () => sub.stop();
	}, handler);
}
