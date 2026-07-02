import type { PluginAppApi } from '@stream-kit/plugin';
import type { HandlerDefinitionProps } from '@stream-kit/plugin';

import { getFieldValue } from '../../get-field-value';
import { parseQueueId, queueSelectField } from '../../lib/queue-conditions';

export function createResumeQueueHandler(app: PluginAppApi): HandlerDefinitionProps {
	return {
		name: 'Resume Queue',
		fields: [queueSelectField(app)],
		execute: async (_action, handler, _context, next) => {
			const queueId = parseQueueId(getFieldValue(handler.fields, 'queue'));

			if (queueId == null) {
				return;
			}

			app.actionQueues.resume(queueId);
			next();
		}
	};
}
