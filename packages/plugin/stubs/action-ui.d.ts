declare module '@stream-kit/plugin/action-ui/*.svelte' {
	import type { Component } from 'svelte';
	const component: Component;
	export default component;
}

declare module '@stream-kit/plugin/action-ui/definition-picker-dropdown.svelte' {
	import type { Component } from 'svelte';
	const component: Component;
	export default component;
}

declare module '@stream-kit/plugin/action-ui/handler-field-group.svelte' {
	import type { Component } from 'svelte';
	const component: Component;
	export default component;
}

declare module '@stream-kit/plugin/action-ui/condition-group.svelte' {
	import type { Component } from 'svelte';
	const component: Component;
	export default component;
}

declare module '@stream-kit/plugin/action-ui/handler-chain-editor.svelte' {
	import type { Component } from 'svelte';
	const component: Component;
	export default component;
}

declare module '@stream-kit/plugin/action-ui/dnd-kit' {
	export const DragDropProvider: unknown;
	export const DragOverlay: unknown;
	export const KeyboardSensor: unknown;
	export const PointerSensor: unknown;
}

declare module '@stream-kit/plugin/action-ui/dnd-events' {
	export type DndDragEvent = unknown;
	export function applyDndMove<T>(items: T, event: unknown): T;
}
