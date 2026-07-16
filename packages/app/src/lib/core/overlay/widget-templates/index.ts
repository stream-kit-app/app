import type { OverlayWidgetId, OverlayWidgetTemplate } from './types';

import { alertsWidget } from './alerts';
import { chatboxWidget } from './chatbox';
import { counterWidget } from './counter';
import { goalWidget } from './goal';
import { leaderboardWidget } from './leaderboard';
import { timerWidget } from './timer';

export type { OverlayWidgetId, OverlayWidgetTemplate } from './types';

export const OVERLAY_WIDGET_TEMPLATES: OverlayWidgetTemplate[] = [
	alertsWidget,
	chatboxWidget,
	timerWidget,
	counterWidget,
	goalWidget,
	leaderboardWidget
];

export function getOverlayWidgetTemplate(id: OverlayWidgetId): OverlayWidgetTemplate {
	const template = OVERLAY_WIDGET_TEMPLATES.find((item) => item.id === id);

	if (!template) {
		throw new Error(`Unknown overlay widget template: ${id}`);
	}

	return template;
}

export function isOverlayWidgetId(value: string): value is OverlayWidgetId {
	return OVERLAY_WIDGET_TEMPLATES.some((item) => item.id === value);
}
