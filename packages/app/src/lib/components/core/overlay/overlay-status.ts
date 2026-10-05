import type { SaveOverlayInput } from '#db/repositories/overlays.js';
import type { TranslationKey } from '#lib/i18n.js';

import { getApp } from '#lib/core/registry.js';

export type OverlayStatus = 'unavailable' | 'not-built' | 'building' | 'ready';

export const overlayStatusLabels: Record<OverlayStatus, TranslationKey> = {
	unavailable: 'Unavailable',
	'not-built': 'Not built',
	building: 'Building…',
	ready: 'Ready'
};

export const overlayStatusDotClasses: Record<OverlayStatus, string> = {
	unavailable: 'bg-destructive-200',
	'not-built': 'bg-warning-200',
	building: 'bg-primary',
	ready: 'bg-success-200'
};

export function overlayNeedsBuild(overlay: SaveOverlayInput): boolean {
	return overlay.template !== 'vanilla';
}

export function resolveOverlayStatus(overlay: SaveOverlayInput): OverlayStatus {
	const app = getApp();

	void app.overlay.dependenciesRevision;

	if (app.overlay.getOverlayUnavailableReason(overlay.requiredPlugins ?? []) !== null) {
		return 'unavailable';
	}

	if (app.overlay.buildingId === overlay.id) {
		return 'building';
	}

	if (overlayNeedsBuild(overlay) && !app.overlay.isBuilt(overlay.id)) {
		return 'not-built';
	}

	return 'ready';
}

/** Overlays that need action (unavailable or not built) — shown first in the grid. */
export function overlayNeedsAttention(status: OverlayStatus): boolean {
	return status === 'unavailable' || status === 'not-built';
}
