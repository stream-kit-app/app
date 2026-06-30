import type { OverlayFrameworkId } from './types';

export const OVERLAY_FRAMEWORK_ICONS: Record<OverlayFrameworkId, string> = {
	svelte: 'ri:svelte-line',
	react: 'ri:reactjs-line',
	vue: 'ri:vuejs-line',
	vanilla: 'ri:html5-line',
	preact: 'ri:reactjs-line',
	solid: 'ri:code-box-line',
	lit: 'ri:code-box-line'
};

export function getOverlayFrameworkIcon(id: OverlayFrameworkId): string {
	return OVERLAY_FRAMEWORK_ICONS[id] ?? 'ri:apps-2-line';
}

/** @deprecated Use getOverlayFrameworkIcon */
export const OVERLAY_TEMPLATE_ICONS = OVERLAY_FRAMEWORK_ICONS;

/** @deprecated Use getOverlayFrameworkIcon */
export function getOverlayTemplateIcon(id: OverlayFrameworkId): string {
	return getOverlayFrameworkIcon(id);
}
