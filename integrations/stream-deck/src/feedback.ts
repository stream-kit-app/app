import type { DialAction, KeyAction } from '@elgato/streamdeck';
import streamDeck from '@elgato/streamdeck';

import {
	asFeedbackPayload,
	isFeedbackEvent,
	streamKitClient
} from './stream-kit-client';
import type { ActionSettings, FeedbackPayload } from './types';

type AnyAction = KeyAction<ActionSettings> | DialAction<ActionSettings>;

const actionsByContext = new Map<string, AnyAction>();
const aliasesByContext = new Map<string, string>();

export function trackAction(action: AnyAction, alias?: string): void {
	actionsByContext.set(action.id, action);

	const normalized = alias?.trim();
	if (normalized) {
		aliasesByContext.set(action.id, normalized);
	} else {
		aliasesByContext.delete(action.id);
	}
}

export function untrackAction(context: string): void {
	actionsByContext.delete(context);
	aliasesByContext.delete(context);
}

function resolveActions(payload: FeedbackPayload): AnyAction[] {
	if (payload.context) {
		const action = actionsByContext.get(payload.context);
		return action ? [action] : [];
	}

	if (payload.alias?.trim()) {
		const alias = payload.alias.trim().toLowerCase();
		const matched: AnyAction[] = [];

		for (const [context, storedAlias] of aliasesByContext) {
			if (storedAlias.toLowerCase() === alias) {
				const action = actionsByContext.get(context);
				if (action) {
					matched.push(action);
				}
			}
		}

		return matched;
	}

	return [];
}

async function applyFeedback(name: string, payload: FeedbackPayload): Promise<void> {
	const targets = resolveActions(payload);

	if (targets.length === 0) {
		streamDeck.logger.debug(`No Stream Deck action matched feedback ${name}`);
		return;
	}

	for (const action of targets) {
		switch (name) {
			case 'setTitle':
				if ('setTitle' in action) {
					await action.setTitle(payload.title ?? '');
				}
				break;
			case 'setImage':
				if ('setImage' in action && payload.image) {
					await action.setImage(payload.image);
				}
				break;
			case 'setState':
				if ('setState' in action && typeof payload.state === 'number') {
					await action.setState(payload.state as 0 | 1);
				}
				break;
			case 'showOk':
				if ('showOk' in action) {
					await action.showOk();
				}
				break;
			case 'showAlert':
				if ('showAlert' in action) {
					await action.showAlert();
				}
				break;
			case 'setSettings':
				if (payload.settings) {
					const current = (await action.getSettings()) ?? {};
					await action.setSettings({ ...current, ...payload.settings });
				}
				break;
			default:
				break;
		}
	}
}

export function bindFeedbackHandlers(): void {
	streamKitClient.onEvent((event, payload) => {
		if (!isFeedbackEvent(event)) {
			return;
		}

		void applyFeedback(event, asFeedbackPayload(payload));
	});
}
