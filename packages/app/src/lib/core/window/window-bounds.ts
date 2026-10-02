import type { Window } from '@tauri-apps/api/window';

import { availableMonitors } from '@tauri-apps/api/window';

const WINDOW_BOUNDS_STORAGE_KEY = 'stream-kit:main-window-bounds';
const SAVE_DEBOUNCE_MS = 300;
// Minimum visible strip (physical px) so the title bar stays reachable.
const MIN_VISIBLE_PX = 64;

/** Outer position + inner size in physical pixels. */
export type WindowBounds = {
	x: number;
	y: number;
	width: number;
	height: number;
	maximized: boolean;
};

function isWindowBounds(value: unknown): value is WindowBounds {
	if (!value || typeof value !== 'object') {
		return false;
	}

	const bounds = value as Record<string, unknown>;

	return (
		Number.isFinite(bounds.x) &&
		Number.isFinite(bounds.y) &&
		Number.isFinite(bounds.width) &&
		Number.isFinite(bounds.height) &&
		(bounds.width as number) > 0 &&
		(bounds.height as number) > 0 &&
		typeof bounds.maximized === 'boolean'
	);
}

function readStoredBounds(): WindowBounds | undefined {
	try {
		const raw = localStorage.getItem(WINDOW_BOUNDS_STORAGE_KEY);
		const parsed: unknown = raw ? JSON.parse(raw) : undefined;
		return isWindowBounds(parsed) ? parsed : undefined;
	} catch {
		return undefined;
	}
}

function writeStoredBounds(bounds: WindowBounds): void {
	try {
		localStorage.setItem(WINDOW_BOUNDS_STORAGE_KEY, JSON.stringify(bounds));
	} catch {
		// Losing the last window position is harmless; next launch falls back to centered.
	}
}

/** Returns the last saved bounds when they still land on a connected monitor. */
export async function getRestorableWindowBounds(): Promise<WindowBounds | undefined> {
	const bounds = readStoredBounds();

	if (!bounds) {
		return undefined;
	}

	const monitors = await availableMonitors();
	const isVisible = monitors.some(({ workArea }) => {
		const overlapX =
			Math.min(bounds.x + bounds.width, workArea.position.x + workArea.size.width) -
			Math.max(bounds.x, workArea.position.x);
		const overlapY =
			Math.min(bounds.y + MIN_VISIBLE_PX, workArea.position.y + workArea.size.height) -
			Math.max(bounds.y, workArea.position.y);

		return overlapX >= MIN_VISIBLE_PX && overlapY > 0;
	});

	return isVisible ? bounds : undefined;
}

async function readWindowBounds(window: Window): Promise<WindowBounds | undefined> {
	const [isMinimized, isMaximized] = await Promise.all([
		window.isMinimized(),
		window.isMaximized()
	]);

	if (isMinimized) {
		return undefined;
	}

	// Keep the last normal bounds while maximized so un-maximizing after restore works.
	if (isMaximized) {
		const previous = readStoredBounds();
		return previous ? { ...previous, maximized: true } : undefined;
	}

	const [position, size] = await Promise.all([window.outerPosition(), window.innerSize()]);

	return {
		x: position.x,
		y: position.y,
		width: size.width,
		height: size.height,
		maximized: false
	};
}

/** Persists the main window bounds on move/resize. Returns a cleanup function. */
export async function trackWindowBounds(window: Window): Promise<() => void> {
	let timeout: ReturnType<typeof setTimeout> | undefined;

	const scheduleSave = () => {
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			void readWindowBounds(window).then((bounds) => {
				if (bounds) {
					writeStoredBounds(bounds);
				}
			});
		}, SAVE_DEBOUNCE_MS);
	};

	const [unlistenMoved, unlistenResized] = await Promise.all([
		window.onMoved(scheduleSave),
		window.onResized(scheduleSave)
	]);

	scheduleSave();

	return () => {
		clearTimeout(timeout);
		unlistenMoved();
		unlistenResized();
	};
}
