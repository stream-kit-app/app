import type { PluginAppApi } from '@stream-kit/plugin';

import type { MediaContext } from '../contexts';
import { OBS_EVENTS } from './event-hub';
import { callObsWithResponse } from './obs-call';
import { subscribeObsEvent } from './websocket-setup';

// Temporary diagnostics. Flip to false once playback waiting is confirmed.
const DEBUG = false;

const ACTIVE_MEDIA_STATES = new Set([
	'OBS_MEDIA_STATE_PLAYING',
	'OBS_MEDIA_STATE_BUFFERING',
	'OBS_MEDIA_STATE_OPENING'
]);

// Small grace period added to a known duration so the indicator does not drop a
// hair before OBS actually finishes rendering the final frame.
const DURATION_BUFFER_MS = 400;
// Hard cap so a misreported duration can never hang the handler chain forever.
const MAX_WAIT_MS = 30 * 60 * 1000;
// Fallback (unknown duration): how long to wait for playback to start before
// giving up, and how long to keep checking the live state afterwards.
const START_TIMEOUT_MS = 5_000;
const POLL_INTERVAL_MS = 200;

function log(...args: unknown[]): void {
	if (DEBUG) {
		console.log('[obs media-wait]', ...args);
	}
}

function matchesInputName(left: string, right: string): boolean {
	return left.trim().toLowerCase() === right.trim().toLowerCase();
}

function delay(ms: number): Promise<void> {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}

async function getMediaStatus(
	app: PluginAppApi,
	inputName: string
): Promise<{ mediaState?: string; mediaDuration?: number | null; mediaCursor?: number | null }> {
	const status = await callObsWithResponse<{
		mediaState?: string;
		mediaDuration?: number | null;
		mediaCursor?: number | null;
	}>(app, 'GetMediaInputStatus', { inputName: inputName.trim() }, { label: 'Wait for media playback' });

	return status ?? {};
}

/**
 * Resolve the remaining playback time (ms) for an input from OBS, or `null` when
 * OBS does not report a usable duration.
 */
async function resolveRemainingMsFromObs(
	app: PluginAppApi,
	inputName: string
): Promise<number | null> {
	const status = await getMediaStatus(app, inputName);
	const duration = status.mediaDuration;

	if (duration == null || duration <= 0) {
		return null;
	}

	const cursor = status.mediaCursor != null && status.mediaCursor > 0 ? status.mediaCursor : 0;

	return Math.max(0, duration - cursor);
}

/**
 * Wait until media playback for `inputName` should be finished.
 *
 * Strategy (deterministic first, events only as a fallback):
 *  1. If we know the clip duration (from the file or from OBS), simply keep the
 *     handler chain alive for that long. This is immune to the event-ordering
 *     races that a STOP+RESTART or an interrupted playback would otherwise
 *     cause.
 *  2. If no duration is available, fall back to waiting for the OBS
 *     `MediaInputPlaybackEnded` event (after confirming playback actually
 *     started), with a short start timeout so the chain can never hang.
 *
 * Call this AFTER the play/restart command has been sent to OBS.
 */
export async function waitForMediaPlayback(
	app: PluginAppApi,
	inputName: string,
	options: { expectedDurationMs?: number | null } = {}
): Promise<void> {
	const trimmed = inputName.trim();

	let remainingMs = options.expectedDurationMs ?? null;
	let source = 'file';

	if (remainingMs == null || remainingMs <= 0) {
		remainingMs = await resolveRemainingMsFromObs(app, trimmed);
		source = 'obs';
	}

	if (remainingMs != null && remainingMs > 0) {
		const waitMs = Math.min(remainingMs + DURATION_BUFFER_MS, MAX_WAIT_MS);
		log('duration wait', { input: trimmed, source, remainingMs, waitMs });
		await delay(waitMs);
		log('duration wait done', { input: trimmed });
		return;
	}

	log('no duration, falling back to events', { input: trimmed });
	await waitForPlaybackEndedEvent(app, trimmed);
}

function waitForPlaybackEndedEvent(app: PluginAppApi, inputName: string): Promise<void> {
	const trimmed = inputName.trim();

	return new Promise<void>((resolve) => {
		let started = false;
		let settled = false;

		const settle = (reason: string) => {
			if (settled) {
				return;
			}

			settled = true;
			unsubscribeStarted();
			unsubscribeEnded();
			log('event settle', { input: trimmed, reason });
			resolve();
		};

		const unsubscribeStarted = subscribeObsEvent<MediaContext>(
			OBS_EVENTS.MEDIA_STARTED,
			(context) => {
				if (matchesInputName(context.inputName, trimmed)) {
					started = true;
				}
			}
		);

		const unsubscribeEnded = subscribeObsEvent<MediaContext>(OBS_EVENTS.MEDIA_ENDED, (context) => {
			if (matchesInputName(context.inputName, trimmed) && started) {
				settle('ended-event');
			}
		});

		void (async () => {
			const deadline = Date.now() + START_TIMEOUT_MS;

			while (!started && !settled && Date.now() < deadline) {
				const status = await getMediaStatus(app, trimmed);

				if (status.mediaState && ACTIVE_MEDIA_STATES.has(status.mediaState)) {
					started = true;
					break;
				}

				await delay(POLL_INTERVAL_MS);
			}

			if (!started) {
				settle('start-timeout');
			}
		})();
	});
}
