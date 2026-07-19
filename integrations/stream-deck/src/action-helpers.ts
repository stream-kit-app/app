import type {
	DialAction,
	DialDownEvent,
	DialRotateEvent,
	DialUpEvent,
	DidReceiveSettingsEvent,
	KeyAction,
	KeyDownEvent,
	KeyUpEvent,
	TouchTapEvent,
	WillAppearEvent,
	WillDisappearEvent
} from '@elgato/streamdeck';
import streamDeck from '@elgato/streamdeck';

import { trackAction, untrackAction } from './feedback';
import { streamKitClient } from './stream-kit-client';
import type { ActionSettings } from './types';

type AppearEvent = WillAppearEvent<ActionSettings>;
type DisappearEvent = WillDisappearEvent<ActionSettings>;
type TrackedAction = KeyAction<ActionSettings> | DialAction<ActionSettings>;

function readCoordinates(
	payload: unknown
): { column?: number; row?: number } | undefined {
	if (!payload || typeof payload !== 'object' || !('coordinates' in payload)) {
		return undefined;
	}

	const coordinates = (payload as { coordinates?: { column?: number; row?: number } }).coordinates;
	if (!coordinates || typeof coordinates !== 'object') {
		return undefined;
	}

	return coordinates;
}

function readIsInMultiAction(payload: unknown): boolean | undefined {
	if (!payload || typeof payload !== 'object' || !('isInMultiAction' in payload)) {
		return undefined;
	}

	const value = (payload as { isInMultiAction?: boolean }).isInMultiAction;
	return typeof value === 'boolean' ? value : undefined;
}

export async function handleWillAppear(ev: AppearEvent): Promise<void> {
	const settings = ev.payload.settings ?? {};
	const coordinates = readCoordinates(ev.payload);
	trackAction(ev.action as TrackedAction, settings.alias);

	try {
		await streamKitClient.registerButton({
			context: ev.action.id,
			device: ev.action.device.id,
			actionUUID: ev.action.manifestId,
			alias: settings.alias,
			coordinates,
			settings: settings as Record<string, unknown>
		});
		await streamKitClient.reportEvent({
			type: 'willAppear',
			context: ev.action.id,
			device: ev.action.device.id,
			action: ev.action.manifestId,
			alias: settings.alias,
			coordinates,
			settings: settings as Record<string, unknown>,
			isInMultiAction: readIsInMultiAction(ev.payload)
		});
	} catch (error) {
		streamDeck.logger.warn(`registerButton failed: ${String(error)}`);
	}
}

export async function handleWillDisappear(ev: DisappearEvent): Promise<void> {
	const settings = ev.payload.settings ?? {};
	untrackAction(ev.action.id);

	try {
		await streamKitClient.reportEvent({
			type: 'willDisappear',
			context: ev.action.id,
			device: ev.action.device.id,
			action: ev.action.manifestId,
			alias: settings.alias,
			coordinates: readCoordinates(ev.payload),
			settings: settings as Record<string, unknown>
		});
		await streamKitClient.unregisterButton(ev.action.id);
	} catch (error) {
		streamDeck.logger.warn(`unregisterButton failed: ${String(error)}`);
	}
}

export async function handleDidReceiveSettings(
	ev: DidReceiveSettingsEvent<ActionSettings>
): Promise<void> {
	const settings = ev.payload.settings ?? {};
	trackAction(ev.action as TrackedAction, settings.alias);

	try {
		await streamKitClient.registerButton({
			context: ev.action.id,
			device: ev.action.device.id,
			actionUUID: ev.action.manifestId,
			alias: settings.alias,
			coordinates: readCoordinates(ev.payload),
			settings: settings as Record<string, unknown>
		});
	} catch (error) {
		streamDeck.logger.warn(`registerButton (settings) failed: ${String(error)}`);
	}
}

function baseEvent(
	ev:
		| KeyDownEvent<ActionSettings>
		| KeyUpEvent<ActionSettings>
		| DialRotateEvent<ActionSettings>
		| DialDownEvent<ActionSettings>
		| DialUpEvent<ActionSettings>
		| TouchTapEvent<ActionSettings>,
	type: string,
	extra: Record<string, unknown> = {}
) {
	const settings = ev.payload.settings ?? {};

	return {
		type,
		context: ev.action.id,
		device: ev.action.device.id,
		action: ev.action.manifestId,
		alias: settings.alias,
		coordinates: readCoordinates(ev.payload),
		settings: settings as Record<string, unknown>,
		isInMultiAction: readIsInMultiAction(ev.payload),
		...extra
	};
}

export async function reportKeyDown(ev: KeyDownEvent<ActionSettings>): Promise<void> {
	await streamKitClient.reportEvent(baseEvent(ev, 'keyDown'));
}

export async function reportKeyUp(ev: KeyUpEvent<ActionSettings>): Promise<void> {
	await streamKitClient.reportEvent(baseEvent(ev, 'keyUp'));
}

export async function reportDialRotate(ev: DialRotateEvent<ActionSettings>): Promise<void> {
	await streamKitClient.reportEvent(
		baseEvent(ev, 'dialRotate', {
			ticks: ev.payload.ticks,
			pressed: ev.payload.pressed
		})
	);
}

export async function reportDialDown(ev: DialDownEvent<ActionSettings>): Promise<void> {
	await streamKitClient.reportEvent(baseEvent(ev, 'dialDown'));
}

export async function reportDialUp(ev: DialUpEvent<ActionSettings>): Promise<void> {
	await streamKitClient.reportEvent(baseEvent(ev, 'dialUp'));
}

export async function reportTouchTap(ev: TouchTapEvent<ActionSettings>): Promise<void> {
	await streamKitClient.reportEvent(baseEvent(ev, 'touchTap'));
}
