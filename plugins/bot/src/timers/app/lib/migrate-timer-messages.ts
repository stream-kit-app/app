import type { StoredActionHandler } from '$lib/core/action/stored-action';
import type { HandlerFieldInstance } from '$lib/core/action/handler/field';

import type { TimerPlatform } from './stored-timer';

/** Matches Twitch plugin handler registration IDs. */
export const TWITCH_SEND_MESSAGE_HANDLER_ID = 'twitch:twitch-1:chat-1:send-message-1';

/** Matches YouTube plugin handler registration IDs. */
export const YOUTUBE_SEND_MESSAGE_HANDLER_ID = 'youtube:youtube-1:chat-1:send-message-1';

function createTextField(key: string, value: string): HandlerFieldInstance {
	return {
		id: crypto.randomUUID(),
		key,
		value
	};
}

function createSwitchField(key: string, value: boolean): HandlerFieldInstance {
	return {
		id: crypto.randomUUID(),
		key,
		value
	};
}

function createSendMessageHandler(
	handlerTypeId: string,
	message: string,
	asBot = false
): StoredActionHandler {
	const fields: HandlerFieldInstance[] = [createTextField('message', message)];

	if (asBot) {
		fields.push(createSwitchField('as-bot', true));
	}

	return {
		id: crypto.randomUUID(),
		handlerTypeId,
		fields
	};
}

export function normalizeLegacyTimerMessages(values: unknown): string[] {
	if (!Array.isArray(values)) {
		return [];
	}

	return values
		.filter((value): value is string => typeof value === 'string')
		.map((value) => value.trim())
		.filter(Boolean);
}

export function convertTimerMessagesToHandlers(
	messages: string[],
	platforms: TimerPlatform[]
): StoredActionHandler[] {
	const handlers: StoredActionHandler[] = [];

	for (const message of messages) {
		for (const platform of platforms) {
			if (platform === 'twitch') {
				handlers.push(
					createSendMessageHandler(TWITCH_SEND_MESSAGE_HANDLER_ID, message, true)
				);
			}

			if (platform === 'youtube') {
				handlers.push(createSendMessageHandler(YOUTUBE_SEND_MESSAGE_HANDLER_ID, message));
			}
		}
	}

	return handlers;
}
