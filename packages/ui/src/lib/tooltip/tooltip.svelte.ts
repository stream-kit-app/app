import { Tooltip } from 'bits-ui';

import type { TooltipPayload } from '../attachments/tooltip-content';

export const tether = Tooltip.createTether<TooltipPayload>();
