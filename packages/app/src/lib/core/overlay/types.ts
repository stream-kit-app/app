export type OverlayTemplateId = 'blank' | 'chat' | 'alert';

export type OverlayManifest = {
	id: string;
	name: string;
	width: number;
	height: number;
	entry: string;
	expectedEvents: string[];
	template: OverlayTemplateId;
};

export type OverlayServerStatus = {
	running: boolean;
	port: number;
	baseUrl: string;
};

export type OverlayBuildResult = {
	success: boolean;
	error?: string;
	files?: OverlayProjectFile[];
};

export type OverlayProjectFile = {
	path: string;
	content: string;
};

export type OverlayBuildInput = {
	overlayId: string;
	files: OverlayProjectFile[];
};

export const DEFAULT_OVERLAY_PORT = 7891;

export function overlayBrowserSourceUrl(baseUrl: string, overlayId: string): string {
	const normalized = baseUrl.replace(/\/$/, '');

	return `${normalized}/o/${overlayId}/`;
}
