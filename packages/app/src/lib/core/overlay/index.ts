export { OverlayService } from './overlay-service.svelte';
export { registerOverlayHandlers } from './register-handlers';
export { OVERLAY_FRAMEWORKS, getOverlayFramework, OVERLAY_TEMPLATES, getOverlayTemplate } from './templates';
export { buildOverlayProjectZip, overlayProjectSlug } from './overlay-export';
export { ensureOverlayScaffold, getOverlayProjectDir, isOverlayBuilt } from './overlay-project';
export { OVERLAY_FRAMEWORK_ICONS, getOverlayFrameworkIcon, OVERLAY_TEMPLATE_ICONS, getOverlayTemplateIcon } from './template-meta';
export type {
	OverlayFrameworkId,
	OverlayManifest,
	OverlayProjectFile,
	OverlayServerStatus
} from './types';
export { createOverlayId, DEFAULT_OVERLAY_PORT, overlayBrowserSourceUrl } from './types';
