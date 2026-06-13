import type { PluginAppApi } from '@stream-kit/plugin';
import type { TriggerDefinitionProps } from '@stream-kit/plugin';

import { subscribeStreamOffline } from '../../lib/broadcast-setup';
import { createTestStreamContext } from '../../lib/test-contexts';
import { createOnTest, createSimpleActivate, createDeactivate } from '../../lib/trigger-helpers';

export const createStreamOfflineTrigger = (_app: PluginAppApi) =>
	({
		name: 'Stream Offline',
		onTest: createOnTest(() => createTestStreamContext()),
		activate: createSimpleActivate((handler) => subscribeStreamOffline(handler)),
		deactivate: createDeactivate()
	}) satisfies TriggerDefinitionProps;
