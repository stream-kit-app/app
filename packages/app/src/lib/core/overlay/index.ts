export { OverlayService } from './overlay-service.svelte';
export { registerOverlayHandlers } from './register-handlers';
export { OVERLAY_TEMPLATES, getOverlayTemplate } from './templates';
export type {
	OverlayBuildResult,
	OverlayManifest,
	OverlayServerStatus,
	OverlayTemplateId
} from './types';
export { DEFAULT_OVERLAY_PORT, overlayBrowserSourceUrl } from './types';
