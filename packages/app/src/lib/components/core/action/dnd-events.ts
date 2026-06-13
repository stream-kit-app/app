import type { ComponentProps } from 'svelte';

import { move } from '@dnd-kit/helpers';
import { DragDropProvider } from '@dnd-kit-svelte/svelte';

type DragDropProviderProps = ComponentProps<typeof DragDropProvider>;

export type DndDragEvent = Parameters<NonNullable<DragDropProviderProps['onDragOver']>>[0];

type MoveItems = Parameters<typeof move>[0];
type MoveEvent = Parameters<typeof move>[1];

/** Bridges drag events from @dnd-kit-svelte into @dnd-kit/helpers `move`. */
export function applyDndMove<T extends MoveItems>(items: T, event: DndDragEvent): T {
	return move(items, event as unknown as MoveEvent) as T;
}
