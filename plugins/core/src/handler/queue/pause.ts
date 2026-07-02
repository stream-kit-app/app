import type { PluginAppApi } from '@stream-kit/plugin';
import type { HandlerDefinitionProps } from '@stream-kit/plugin';

import { getFieldValue } from '../../get-field-value';
import { parseQueueId, queueSelectField } from '../../lib/queue-conditions';

export function createPauseQueueHandler(app: PluginAppApi): HandlerDefinitionProps {
	return {
		name: 'Pause Queue',
		fields: [queueSelectField(app)],
		execute: async (_action, handler, _context, next) => {
			const queueId = parseQueueId(getFieldValue(handler.fields, 'queue'));

			if (queueId == null) {
				return;
			}

			app.actionQueues.pause(queueId);
			next();
		}
	};
}
