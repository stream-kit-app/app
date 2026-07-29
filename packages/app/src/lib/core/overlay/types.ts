export type OverlayFrameworkId =
	| 'svelte'
	| 'react'
	| 'vue'
	| 'vanilla'
	| 'preact'
	| 'solid'
	| 'lit';

export type {
	OverlayManifest,
	OverlaySettingsFieldJson,
	OverlaySettingsItemJson,
	OverlaySettingsSectionJson,
	OverlayTestHandlerDefinition
} from './overlay-manifest';
export { OVERLAY_SETTINGS_EVENT } from './overlay-manifest';

export type OverlayServerStatus = {
	running: boolean;
	port: number;
	baseUrl: string;
};

export type OverlayProjectFile = {
	path: string;
	content: string;
};

export const DEFAULT_OVERLAY_PORT = 7891;

export function createOverlayId(): string {
	return crypto.randomUUID();
}

export function overlayBrowserSourceUrl(baseUrl: string, overlayId: string): string {
	const normalized = baseUrl.replace(/\/$/, '');

	return `${normalized}/o/${overlayId}/`;
}

export function overlayCloudBrowserSourceUrl(siteUrl: string, overlayId: string): string {
	const normalized = siteUrl.replace(/\/$/, '');

	return `${normalized}/app/overlays/${overlayId}/`;
}
