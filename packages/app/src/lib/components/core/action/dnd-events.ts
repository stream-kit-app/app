import { move } from '@dnd-kit/helpers';

import type { DndActionLayout } from '$lib/core/action/action-layout';

export type DndDragEvent = Parameters<typeof move<DndActionLayout>>[1];
