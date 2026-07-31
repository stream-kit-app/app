import { sequence } from '@sveltejs/kit/hooks';

import { boot } from './lib/server/hooks/boot';
import { overlayWs } from './lib/server/hooks/overlay-ws';

export const handle = sequence(overlayWs, boot);
