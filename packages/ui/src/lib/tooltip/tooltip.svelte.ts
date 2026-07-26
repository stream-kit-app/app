import { Tooltip } from 'bits-ui';

import type { TooltipPayload } from '../attachments/tooltip-content';

/**
 * One tether per JS module instance. The app Vite bundle and the plugin-host
 * import map each get their own tether so tooltip snippets stay in the same
 * Svelte runtime as their Tooltip.Root (cross-runtime `{@render}` crashes).
 */
export const tether = Tooltip.createTether<TooltipPayload>();
