export { OverlayService } from './overlay-service.svelte';
export { registerOverlayHandlers } from './register-handlers';
export { OVERLAY_TEMPLATES, getOverlayTemplate } from './templates';
export { buildOverlayProjectZip, overlayProjectSlug } from './overlay-export';
export { OVERLAY_TEMPLATE_ICONS, getOverlayTemplateIcon } from './template-meta';
export {
	OVERLAY_ENTRY_PATH,
	createTemporaryOverlayPath,
	isAllowedOverlayFileName,
	isOverlayEntryFile,
	isTemporaryOverlayPath,
	normalizeOverlayComponentFileName,
	overlayFileIcon,
	overlayFileName,
	overlaySourceLanguage,
	overlaySourcePathsMatch,
	resolveOverlayImportPath,
	sortOverlaySourceFiles,
	toOverlaySourcePath,
	validateOverlayFileName
} from './overlay-source-file';
export type {
	OverlayBuildResult,
	OverlayManifest,
	OverlayServerStatus,
	OverlayTemplateId
} from './types';
export { DEFAULT_OVERLAY_PORT, overlayBrowserSourceUrl } from './types';
