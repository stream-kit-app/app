import {
	action,
	type DialDownEvent,
	type DialRotateEvent,
	type DialUpEvent,
	type DidReceiveSettingsEvent,
	SingletonAction,
	type TouchTapEvent,
	type WillAppearEvent,
	type WillDisappearEvent
} from '@elgato/streamdeck';
import streamDeck from '@elgato/streamdeck';

import {
	handleDidReceiveSettings,
	handleWillAppear,
	handleWillDisappear,
	reportDialDown,
	reportDialRotate,
	reportDialUp,
	reportTouchTap
} from '../action-helpers';
import { streamKitClient } from '../stream-kit-client';
import type { ActionSettings } from '../types';

@action({ UUID: 'app.stream-kit.streamdeck.dial-control' })
export class DialControl extends SingletonAction<ActionSettings> {
	override async onWillAppear(ev: WillAppearEvent<ActionSettings>): Promise<void> {
		await handleWillAppear(ev);
	}

	override async onWillDisappear(ev: WillDisappearEvent<ActionSettings>): Promise<void> {
		await handleWillDisappear(ev);
	}

	override async onDidReceiveSettings(ev: DidReceiveSettingsEvent<ActionSettings>): Promise<void> {
		await handleDidReceiveSettings(ev);
	}

	override async onDialRotate(ev: DialRotateEvent<ActionSettings>): Promise<void> {
		const settings = ev.payload.settings ?? {};

		try {
			await reportDialRotate(ev).catch((error) => {
				streamDeck.logger.warn(`Dial rotate report failed: ${String(error)}`);
			});

			if (settings.runActionOnRotate && settings.actionId !== undefined && settings.actionId !== '') {
				await streamKitClient.runAction(settings.actionId, {
					alias: settings.alias,
					context: ev.action.id,
					ticks: ev.payload.ticks,
					pressed: ev.payload.pressed,
					source: 'stream-deck'
				});
			}
		} catch (error) {
			streamDeck.logger.error(`Dial rotate failed: ${String(error)}`);
			if ('showAlert' in ev.action) {
				await ev.action.showAlert();
			}
		}
	}

	override async onDialDown(ev: DialDownEvent<ActionSettings>): Promise<void> {
		const settings = ev.payload.settings ?? {};

		try {
			await reportDialDown(ev);

			if (settings.actionId !== undefined && settings.actionId !== '') {
				await streamKitClient.runAction(settings.actionId, {
					alias: settings.alias,
					context: ev.action.id,
					source: 'stream-deck',
					dial: 'down'
				});
			}
		} catch (error) {
			streamDeck.logger.error(`Dial down failed: ${String(error)}`);
		}
	}

	override async onDialUp(ev: DialUpEvent<ActionSettings>): Promise<void> {
		try {
			await reportDialUp(ev);
		} catch (error) {
			streamDeck.logger.warn(`Dial up report failed: ${String(error)}`);
		}
	}

	override async onTouchTap(ev: TouchTapEvent<ActionSettings>): Promise<void> {
		const settings = ev.payload.settings ?? {};

		try {
			await reportTouchTap(ev);

			if (settings.actionId !== undefined && settings.actionId !== '') {
				await streamKitClient.runAction(settings.actionId, {
					alias: settings.alias,
					context: ev.action.id,
					source: 'stream-deck',
					touch: true
				});
			}
		} catch (error) {
			streamDeck.logger.error(`Touch tap failed: ${String(error)}`);
		}
	}
}
