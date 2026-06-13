import type { PluginAppApi } from '@stream-kit/plugin';

import type { ChatModerationContext } from './moderation-engine';
import { subscribeChatMessages } from './subscribe-chat-messages';

type ChatHandler = (context: ChatModerationContext) => void;

const handlers = new Set<ChatHandler>();
let hubCleanup: (() => void) | undefined;
let hubApp: PluginAppApi | undefined;

function ensureHub(app: PluginAppApi): void {
	if (hubCleanup && hubApp === app) {
		return;
	}

	hubCleanup?.();
	hubApp = app;
	hubCleanup = subscribeChatMessages(app, (context) => {
		for (const handler of handlers) {
			handler(context);
		}
	});
}

export function subscribeBotChatMessages(app: PluginAppApi, handler: ChatHandler): () => void {
	ensureHub(app);
	handlers.add(handler);

	return () => {
		handlers.delete(handler);

		if (handlers.size === 0) {
			hubCleanup?.();
			hubCleanup = undefined;
			hubApp = undefined;
		}
	};
}
