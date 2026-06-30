import type { OverlayFrameworkId } from '../types';

export type OverlayFramework = {
	id: OverlayFrameworkId;
	name: string;
	description: string;
	expectedEvents: string[];
};

export const OVERLAY_FRAMEWORKS: OverlayFramework[] = [
	{
		id: 'svelte',
		name: 'Svelte',
		description: 'Vite + Svelte 5 starter with WebSocket event handling.',
		expectedEvents: ['event']
	},
	{
		id: 'react',
		name: 'React',
		description: 'Vite + React starter with WebSocket event handling.',
		expectedEvents: ['event']
	},
	{
		id: 'vue',
		name: 'Vue',
		description: 'Vite + Vue starter with WebSocket event handling.',
		expectedEvents: ['event']
	},
	{
		id: 'preact',
		name: 'Preact',
		description: 'Vite + Preact starter with WebSocket event handling.',
		expectedEvents: ['event']
	},
	{
		id: 'solid',
		name: 'Solid',
		description: 'Vite + Solid starter with WebSocket event handling.',
		expectedEvents: ['event']
	},
	{
		id: 'lit',
		name: 'Lit',
		description: 'Vite + Lit starter with WebSocket event handling.',
		expectedEvents: ['event']
	},
	{
		id: 'vanilla',
		name: 'HTML + JavaScript',
		description: 'Plain HTML and JavaScript, ready to use in OBS without a build step.',
		expectedEvents: ['event']
	}
];

export function getOverlayFramework(id: OverlayFrameworkId): OverlayFramework {
	const framework = OVERLAY_FRAMEWORKS.find((item) => item.id === id);

	if (!framework) {
		throw new Error(`Unknown overlay framework: ${id}`);
	}

	return framework;
}

/** @deprecated Use OVERLAY_FRAMEWORKS */
export const OVERLAY_TEMPLATES = OVERLAY_FRAMEWORKS;

/** @deprecated Use getOverlayFramework */
export function getOverlayTemplate(id: OverlayFrameworkId): OverlayFramework {
	return getOverlayFramework(id);
}
