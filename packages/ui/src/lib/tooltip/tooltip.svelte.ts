import { Tooltip } from 'bits-ui';

import type { TooltipPayload } from '../attachments/tooltip-content';

const TETHER_KEY = Symbol.for('stream-kit.ui.tooltip.tether');

type TooltipTether = ReturnType<typeof Tooltip.createTether<TooltipPayload>>;

function getSharedTether(): TooltipTether {
	const globalStore = globalThis as typeof globalThis & {
		[TETHER_KEY]?: TooltipTether;
	};

	if (!globalStore[TETHER_KEY]) {
		globalStore[TETHER_KEY] = Tooltip.createTether<TooltipPayload>();
	}

	return globalStore[TETHER_KEY];
}

/** Shared across the app Vite bundle and the plugin-host import map. */
export const tether = getSharedTether();
