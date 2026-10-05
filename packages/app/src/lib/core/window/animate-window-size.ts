import type { WindowBounds } from './window-bounds';
import type { Window } from '@tauri-apps/api/window';

import { isTauri } from '@tauri-apps/api/core';
import { PhysicalPosition, PhysicalSize } from '@tauri-apps/api/dpi';
import { getCurrentWindow } from '@tauri-apps/api/window';
import { dev } from '$app/env';

import { getRestorableWindowBounds, trackWindowBounds } from './window-bounds';

export const MAIN_WINDOW_SIZE = {
	width: 1680,
	height: 800
} as const;

export const MAIN_WINDOW_CORNER_RADIUS_PX = 6;

export function usesBootWindowPresentation(): boolean {
	return isTauri() && !dev;
}

async function prepareDevWindow(): Promise<void> {
	const window = getCurrentWindow();
	const bounds = await getRestorableWindowBounds();

	await window.setDecorations(true);

	if (bounds) {
		await setWindowBounds(window, bounds);
	} else {
		await window.setSize(new PhysicalSize(MAIN_WINDOW_SIZE.width, MAIN_WINDOW_SIZE.height));
	}

	await restoreMaximized(window, bounds);
}

async function setWindowBounds(window: Window, bounds: WindowBounds): Promise<void> {
	await Promise.all([
		window.setSize(new PhysicalSize(bounds.width, bounds.height)),
		window.setPosition(new PhysicalPosition(bounds.x, bounds.y))
	]);
}

async function restoreMaximized(window: Window, bounds: WindowBounds | undefined): Promise<void> {
	if (bounds?.maximized) {
		await window.maximize();
	}
}

type AnimateWindowSizeOptions = {
	width: number;
	height: number;
	durationMs?: number;
};

function easeOutCubic(progress: number): number {
	return 1 - (1 - progress) ** 3;
}

function prefersReducedMotion(): boolean {
	return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

type WindowCenterAnchor = {
	centerX: number;
	centerY: number;
	frameWidth: number;
	frameHeight: number;
};

async function getWindowCenterAnchor(window: Window): Promise<WindowCenterAnchor> {
	const [innerSize, outerSize, outerPosition] = await Promise.all([
		window.innerSize(),
		window.outerSize(),
		window.outerPosition()
	]);

	return {
		centerX: outerPosition.x + outerSize.width / 2,
		centerY: outerPosition.y + outerSize.height / 2,
		frameWidth: outerSize.width - innerSize.width,
		frameHeight: outerSize.height - innerSize.height
	};
}

function getOuterPositionForCenteredSize(
	anchor: WindowCenterAnchor,
	width: number,
	height: number
): PhysicalPosition {
	const outerWidth = width + anchor.frameWidth;
	const outerHeight = height + anchor.frameHeight;

	return new PhysicalPosition(
		Math.round(anchor.centerX - outerWidth / 2),
		Math.round(anchor.centerY - outerHeight / 2)
	);
}

async function setCenteredSize(
	window: Window,
	anchor: WindowCenterAnchor,
	width: number,
	height: number
): Promise<void> {
	await Promise.all([
		window.setSize(new PhysicalSize(width, height)),
		window.setPosition(getOuterPositionForCenteredSize(anchor, width, height))
	]);
}

export async function animateWindowSize({
	width,
	height,
	durationMs = 75
}: AnimateWindowSizeOptions): Promise<void> {
	const window = getCurrentWindow();
	const startSize = await window.innerSize();
	const startWidth = startSize.width;
	const startHeight = startSize.height;

	if (startWidth === width && startHeight === height) {
		return;
	}

	const anchor = await getWindowCenterAnchor(window);

	if (prefersReducedMotion()) {
		await setCenteredSize(window, anchor, width, height);
		return;
	}

	const startTime = performance.now();

	await new Promise<void>((resolve) => {
		const step = (now: number) => {
			const progress = Math.min((now - startTime) / durationMs, 1);
			const eased = easeOutCubic(progress);
			const currentWidth = Math.round(startWidth + (width - startWidth) * eased);
			const currentHeight = Math.round(startHeight + (height - startHeight) * eased);

			void setCenteredSize(window, anchor, currentWidth, currentHeight);

			if (progress < 1) {
				requestAnimationFrame(step);
			} else {
				void setCenteredSize(window, anchor, width, height).then(resolve);
			}
		};

		requestAnimationFrame(step);
	});
}

/** Animates outer position and inner size from the current window rect to `target`. */
async function animateWindowBounds(target: WindowBounds, durationMs = 75): Promise<void> {
	const window = getCurrentWindow();
	const [startPosition, startSize] = await Promise.all([
		window.outerPosition(),
		window.innerSize()
	]);

	if (prefersReducedMotion()) {
		await setWindowBounds(window, target);
		return;
	}

	const lerp = (from: number, to: number, eased: number) =>
		Math.round(from + (to - from) * eased);
	const startTime = performance.now();

	await new Promise<void>((resolve) => {
		const step = (now: number) => {
			const progress = Math.min((now - startTime) / durationMs, 1);
			const eased = easeOutCubic(progress);

			if (progress < 1) {
				void setWindowBounds(window, {
					...target,
					x: lerp(startPosition.x, target.x, eased),
					y: lerp(startPosition.y, target.y, eased),
					width: lerp(startSize.width, target.width, eased),
					height: lerp(startSize.height, target.height, eased)
				});
				requestAnimationFrame(step);
			} else {
				void setWindowBounds(window, target).then(resolve);
			}
		};

		requestAnimationFrame(step);
	});
}

export async function centerBootWindow(): Promise<void> {
	if (!usesBootWindowPresentation()) {
		return;
	}

	const window = getCurrentWindow();

	// Native shadow on an undecorated window also gives rounded corners on Windows 11.
	await Promise.all([window.center(), window.setShadow(true)]);
}

export async function enableMainWindowPresentation(): Promise<void> {
	if (!usesBootWindowPresentation()) {
		return;
	}

	await getCurrentWindow().setShadow(true);
}

export async function revealMainWindow(): Promise<void> {
	if (!isTauri()) {
		return;
	}

	const window = getCurrentWindow();

	if (dev) {
		await prepareDevWindow();
		await trackWindowBounds(window);
		return;
	}

	const bounds = await getRestorableWindowBounds();

	await window.setDecorations(true);
	await window.setShadow(false);

	if (bounds) {
		await animateWindowBounds(bounds);
	} else {
		await window.center();
		await animateWindowSize(MAIN_WINDOW_SIZE);
	}

	await restoreMaximized(window, bounds);
	await enableMainWindowPresentation();
	await trackWindowBounds(window);
}
