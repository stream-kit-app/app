import {
	action,
	type DidReceiveSettingsEvent,
	type KeyDownEvent,
	type KeyUpEvent,
	SingletonAction,
	type WillAppearEvent,
	type WillDisappearEvent
} from '@elgato/streamdeck';
import streamDeck from '@elgato/streamdeck';

import {
	handleDidReceiveSettings,
	handleWillAppear,
	handleWillDisappear,
	reportKeyDown,
	reportKeyUp
} from '../action-helpers';
import { streamKitClient } from '../stream-kit-client';
import type { ActionSettings } from '../types';

@action({ UUID: 'app.stream-kit.streamdeck.toggle-action' })
export class ToggleAction extends SingletonAction<ActionSettings> {
	override async onWillAppear(ev: WillAppearEvent<ActionSettings>): Promise<void> {
		await handleWillAppear(ev);
	}

	override async onWillDisappear(ev: WillDisappearEvent<ActionSettings>): Promise<void> {
		await handleWillDisappear(ev);
	}

	override async onDidReceiveSettings(ev: DidReceiveSettingsEvent<ActionSettings>): Promise<void> {
		await handleDidReceiveSettings(ev);
	}

	override async onKeyDown(ev: KeyDownEvent<ActionSettings>): Promise<void> {
		const settings = ev.payload.settings ?? {};
		const currentState = ev.payload.state ?? 0;
		const nextState = currentState === 0 ? 1 : 0;
		const actionId = nextState === 1 ? settings.actionIdOn : settings.actionIdOff;

		try {
			await reportKeyDown(ev).catch((error) => {
				streamDeck.logger.warn(`Key Down report failed: ${String(error)}`);
			});

			if (actionId !== undefined && actionId !== '') {
				await streamKitClient.runAction(actionId, {
					alias: settings.alias,
					context: ev.action.id,
					state: nextState,
					source: 'stream-deck'
				});
			}

			await ev.action.setState(nextState as 0 | 1);
		} catch (error) {
			streamDeck.logger.error(`Toggle Action failed: ${String(error)}`);
			await ev.action.showAlert();
		}
	}

	override async onKeyUp(ev: KeyUpEvent<ActionSettings>): Promise<void> {
		try {
			await reportKeyUp(ev);
		} catch (error) {
			streamDeck.logger.warn(`Toggle Key Up report failed: ${String(error)}`);
		}
	}
}
