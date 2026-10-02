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

/** Accepts any stored framework id; unknown ids fall back to a generic icon. */
export function getOverlayFrameworkIcon(id: OverlayFrameworkId | (string & {})): string {
	return OVERLAY_FRAMEWORK_ICONS[id as OverlayFrameworkId] ?? 'ri:apps-2-line';
}
