import type { PluginAppApi } from '@stream-kit/plugin';
import type { TriggerDefinitionProps } from '@stream-kit/plugin';

import { subscribeStreamOnline } from '../../lib/broadcast-setup';
import { createTestStreamContext } from '../../lib/test-contexts';
import { createOnTest, createSimpleActivate, createDeactivate } from '../../lib/trigger-helpers';

export const createStreamOnlineTrigger = (_app: PluginAppApi) =>
	({
		name: 'Stream Online',
		onTest: createOnTest(() => createTestStreamContext()),
		activate: createSimpleActivate((handler) => subscribeStreamOnline(handler)),
		deactivate: createDeactivate()
	}) satisfies TriggerDefinitionProps;
