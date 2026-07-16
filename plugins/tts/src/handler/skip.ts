import type { HandlerDefinitionProps } from '@stream-kit/plugin';

import { elevenlabs } from '../lib/elevenlabs';
import { local } from '../lib/local';
import { streamelements } from '../lib/streamelements';

export const createSkipTtsHandler = () => {
	return {
		name: 'Skip',
		execute: (_action, _handler, _context, next) => {
			local.skip();
			streamelements.skip();
			elevenlabs.skip();
			next();
		}
	} satisfies HandlerDefinitionProps;
};
