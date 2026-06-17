import type { PluginAppApi } from '@stream-kit/plugin';
import type { TriggerDefinitionProps } from '@stream-kit/plugin';

import type { RecordFileChangedContext } from '../../contexts';
import { OBS_EVENTS } from '../../lib/event-hub';
import { createTestRecordFileChangedContext } from '../../lib/test-contexts';
import { createOnTest, createSimpleActivate, createDeactivate } from '../../lib/trigger-helpers';
import { subscribeObsEvent } from '../../lib/websocket-setup';

export const createRecordFileChangedTrigger = (_app: PluginAppApi) =>
	({
		name: 'Record File Changed',
		activate: createSimpleActivate((handler) =>
			subscribeObsEvent<RecordFileChangedContext>(OBS_EVENTS.RECORD_FILE_CHANGED, handler)
		),
		onTest: createOnTest(() => createTestRecordFileChangedContext()),
		deactivate: createDeactivate()
	}) satisfies TriggerDefinitionProps;
