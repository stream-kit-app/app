export const OVERLAY_PREVIEW_CONSOLE_MESSAGE_TYPE = 'stream-kit-overlay-console';

export const OVERLAY_PREVIEW_CONSOLE_MAX_ENTRIES = 200;

export type OverlayPreviewConsoleLevel = 'log' | 'info' | 'warn' | 'error' | 'debug';

export type OverlayPreviewConsoleEntry = {
	id: string;
	level: OverlayPreviewConsoleLevel;
	message: string;
	timestamp: number;
};

export type OverlayPreviewConsoleMessage = {
	type: typeof OVERLAY_PREVIEW_CONSOLE_MESSAGE_TYPE;
	level: OverlayPreviewConsoleLevel;
	message: string;
	timestamp: number;
};

export function parseOverlayPreviewConsoleMessage(
	data: unknown
): OverlayPreviewConsoleMessage | null {
	if (!data || typeof data !== 'object') {
		return null;
	}

	const record = data as Record<string, unknown>;

	if (record.type !== OVERLAY_PREVIEW_CONSOLE_MESSAGE_TYPE) {
		return null;
	}

	if (typeof record.message !== 'string') {
		return null;
	}

	const level = record.level;

	if (
		level !== 'log' &&
		level !== 'info' &&
		level !== 'warn' &&
		level !== 'error' &&
		level !== 'debug'
	) {
		return null;
	}

	return {
		type: OVERLAY_PREVIEW_CONSOLE_MESSAGE_TYPE,
		level,
		message: record.message,
		timestamp: typeof record.timestamp === 'number' ? record.timestamp : Date.now()
	};
}

export function isOverlayPreviewConsoleOrigin(
	event: MessageEvent,
	overlayUrl: string
): boolean {
	try {
		return event.origin === new URL(overlayUrl).origin;
	} catch {
		return false;
	}
}

export function overlayPreviewConsoleLevelClass(level: OverlayPreviewConsoleLevel): string {
	switch (level) {
		case 'info':
			return 'text-sky-300';
		case 'warn':
			return 'text-amber-300';
		case 'error':
			return 'text-red-300';
		case 'debug':
			return 'text-dark-400';
		default:
			return 'text-dark-200';
	}
}

export function formatOverlayPreviewConsoleTime(timestamp: number): string {
	return new Date(timestamp).toLocaleTimeString(undefined, {
		hour12: false,
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit'
	});
}

export function appendOverlayPreviewConsoleEntry(
	entries: OverlayPreviewConsoleEntry[],
	message: OverlayPreviewConsoleMessage
): OverlayPreviewConsoleEntry[] {
	const entry: OverlayPreviewConsoleEntry = {
		id: `${message.timestamp}-${entries.length}-${message.message.slice(0, 24)}`,
		level: message.level,
		message: message.message,
		timestamp: message.timestamp
	};

	return [...entries, entry].slice(-OVERLAY_PREVIEW_CONSOLE_MAX_ENTRIES);
}
