export { OverlayService } from './overlay-service.svelte';
export { registerOverlayHandlers } from './register-handlers';
export { OVERLAY_FRAMEWORKS, getOverlayFramework, OVERLAY_TEMPLATES, getOverlayTemplate } from './templates';
export { buildOverlayProjectZip, overlayProjectSlug } from './overlay-export';
export { importOverlayProjectFromZip } from './overlay-import';
export { ensureOverlayScaffold, getOverlayProjectDir, isOverlayBuilt } from './overlay-project';
export { OVERLAY_FRAMEWORK_ICONS, getOverlayFrameworkIcon, OVERLAY_TEMPLATE_ICONS, getOverlayTemplateIcon } from './template-meta';
export type {
	OverlayManifest,
	OverlaySettingsFieldJson,
	OverlaySettingsItemJson,
	OverlaySettingsSectionJson,
	OverlayTestHandlerDefinition
} from './overlay-manifest';
export {
	collectOverlayDefaultConfig,
	mergeOverlayConfig,
	overlayManifestToSettingsItems,
	parseOverlayManifest
} from './overlay-manifest';
export {
	loadOverlaySettingsDefinition,
	OverlaySettingsDefinition,
	readOverlayManifest
} from './overlay-settings.svelte';
export type { OverlaySettingsContext } from './overlay-settings.svelte';
export { OVERLAY_SETTINGS_EVENT } from './overlay-manifest';
export type { OverlayFrameworkId, OverlayProjectFile, OverlayServerStatus } from './types';
export { createOverlayId, DEFAULT_OVERLAY_PORT, overlayBrowserSourceUrl } from './types';
export {
	OVERLAY_WIDGET_TEMPLATES,
	getOverlayWidgetTemplate,
	isOverlayWidgetId
} from './widget-templates';
export type { OverlayWidgetId, OverlayWidgetTemplate } from './widget-templates';
