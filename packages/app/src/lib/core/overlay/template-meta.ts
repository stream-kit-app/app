import type { OverlayTemplateId } from './types';

export const OVERLAY_TEMPLATE_ICONS: Record<OverlayTemplateId, string> = {
	blank: 'ri:layout-line',
	chat: 'ri:chat-3-line',
	alert: 'ri:notification-3-line'
};

export function getOverlayTemplateIcon(id: OverlayTemplateId): string {
	return OVERLAY_TEMPLATE_ICONS[id] ?? 'ri:apps-2-line';
}
