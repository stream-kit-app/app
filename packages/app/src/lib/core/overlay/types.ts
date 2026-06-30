export type OverlayFrameworkId =
	| 'svelte'
	| 'react'
	| 'vue'
	| 'vanilla'
	| 'preact'
	| 'solid'
	| 'lit';

export type OverlayManifest = {
	id: string;
	name: string;
	framework: OverlayFrameworkId;
	expectedEvents: string[];
};

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

export function overlayBrowserSourceUrl(baseUrl: string, overlayId: string): string {
	const normalized = baseUrl.replace(/\/$/, '');

	return `${normalized}/o/${overlayId}/`;
}
