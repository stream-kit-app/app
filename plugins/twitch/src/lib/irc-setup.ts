import type { PluginAppApi } from '@stream-kit/plugin';
import type { ChatMessage } from '@twurple/chat';

import type { ChatMessageContext } from '../contexts';
import { getBroadcasterId } from './broadcaster';
import { resolveUserRole } from './role';
import { getTwitch } from './plugin-api';

type RawMessageHandler = (context: ChatMessageContext) => void;

const messageHandlers = new Set<RawMessageHandler>();
let messageListener: { unbind(): void } | undefined;

export function resetChatListener(): void {
	messageListener?.unbind();
	messageListener = undefined;
}

function buildMessageContext(
	app: PluginAppApi,
	channel: string,
	user: string,
	text: string,
	msg: ChatMessage
): ChatMessageContext {
	return {
		broadcasterId: msg.channelId ?? getBroadcasterId(app) ?? '',
		channel,
		user,
		userId: msg.userInfo.userId ?? '',
		message: text,
		role: resolveUserRole(msg),
		msg
	};
}

function ensureMessageListener(app: PluginAppApi): void {
	const chat = getTwitch(app).chat;

	if (!chat) {
		resetChatListener();
		return;
	}

	if (messageListener) {
		return;
	}

	messageListener = chat.onMessage((channel, user, text, msg) => {
		const context = buildMessageContext(app, channel, user, text, msg);

		for (const handler of messageHandlers) {
			handler(context);
		}
	});
}

export function rebindExistingMessageHandlers(app: PluginAppApi): void {
	if (messageHandlers.size === 0) {
		return;
	}

	resetChatListener();
	ensureMessageListener(app);
}

export function subscribeMessages(
	app: PluginAppApi,
	filter: (context: ChatMessageContext) => boolean,
	handler: RawMessageHandler
): () => void {
	ensureMessageListener(app);

	const wrapped: RawMessageHandler = (context) => {
		if (filter(context)) {
			handler(context);
		}
	};

	messageHandlers.add(wrapped);

	return () => {
		messageHandlers.delete(wrapped);
	};
}

type SimpleHandler<T> = (context: T) => void;

const handlerMaps = new Map<string, Set<SimpleHandler<unknown>>>();

function subscribeSimple<T>(
	app: PluginAppApi,
	key: string,
	register: (emit: (context: T) => void) => () => void,
	handler: SimpleHandler<T>
): () => void {
	let handlers = handlerMaps.get(key) as Set<SimpleHandler<T>> | undefined;
	let dispose: (() => void) | undefined;

	if (!handlers) {
		handlers = new Set();
		handlerMaps.set(key, handlers as Set<SimpleHandler<unknown>>);

		dispose = register((context) => {
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

export function subscribeWhispers(
	app: PluginAppApi,
	handler: SimpleHandler<{ user: string; message: string }>
): () => void {
	const chat = getTwitch(app).chat;

	if (!chat) {
		return () => {};
	}

	return subscribeSimple(app, 'whisper', (emit) => {
		const listener = chat.onWhisper((user, text) => {
			emit({ user, message: text });
		});

		return () => listener.unbind();
	}, handler);
}

export function subscribeSubs(app: PluginAppApi, handler: SimpleHandler<unknown>): () => void {
	const chat = getTwitch(app).chat;

	if (!chat) {
		return () => {};
	}

	return subscribeSimple(app, 'sub', (emit) => {
		const disposers = [
			chat.onSub((channel, user, subInfo) => {
				emit({
					type: 'new',
					channel,
					user,
					tier: subInfo.plan,
					months: subInfo.months
				});
			}),
			chat.onResub((channel, user, subInfo) => {
				emit({
					type: 'resub',
					channel,
					user,
					tier: subInfo.plan,
					months: subInfo.months
				});
			}),
			chat.onSubGift((channel, user, subInfo) => {
				emit({
					type: 'gift',
					channel,
					user,
					tier: subInfo.plan,
					giftCount: 1
				});
			}),
			chat.onCommunitySub((channel, user, subInfo) => {
				emit({
					type: 'community',
					channel,
					user,
					giftCount: subInfo.count
				});
			})
		];

		return () => {
			for (const listener of disposers) {
				listener.unbind();
			}
		};
	}, handler);
}

export function subscribeRaids(
	app: PluginAppApi,
	handler: SimpleHandler<{ channel: string; user: string; viewers: number }>
): () => void {
	const chat = getTwitch(app).chat;

	if (!chat) {
		return () => {};
	}

	return subscribeSimple(app, 'raid', (emit) => {
		const listener = chat.onRaid((channel, user, raidInfo) => {
			emit({ channel, user, viewers: raidInfo.viewerCount });
		});

		return () => listener.unbind();
	}, handler);
}

export function subscribeModeration(
	app: PluginAppApi,
	handler: SimpleHandler<{ type: string; channel: string; user: string; duration?: number }>
): () => void {
	const chat = getTwitch(app).chat;

	if (!chat) {
		return () => {};
	}

	return subscribeSimple(app, 'moderation', (emit) => {
		const disposers = [
			chat.onBan((channel, user) => {
				emit({ type: 'ban', channel, user });
			}),
			chat.onTimeout((channel, user, duration) => {
				emit({ type: 'timeout', channel, user, duration });
			})
		];

		return () => {
			for (const listener of disposers) {
				listener.unbind();
			}
		};
	}, handler);
}

export function subscribeJoinPart(
	app: PluginAppApi,
	handler: SimpleHandler<{ type: string; channel: string; user: string }>
): () => void {
	const chat = getTwitch(app).chat;

	if (!chat) {
		return () => {};
	}

	return subscribeSimple(app, 'joinpart', (emit) => {
		const disposers = [
			chat.onJoin((channel, user) => {
				emit({ type: 'join', channel, user });
			}),
			chat.onPart((channel, user) => {
				emit({ type: 'part', channel, user });
			})
		];

		return () => {
			for (const listener of disposers) {
				listener.unbind();
			}
		};
	}, handler);
}
