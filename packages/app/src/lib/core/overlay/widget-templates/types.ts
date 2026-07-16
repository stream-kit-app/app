import type { OverlayManifest, OverlayProjectFile } from '../types';

export type OverlayWidgetId =
	| 'alerts'
	| 'chatbox'
	| 'timer'
	| 'counter'
	| 'goal'
	| 'leaderboard';

export type OverlayWidgetTemplate = {
	id: OverlayWidgetId;
	name: string;
	description: string;
	icon: string;
	defaultName: string;
	buildFiles: (overlayId: string) => OverlayProjectFile[];
	createManifest: (overlayId: string, name: string) => OverlayManifest;
};
