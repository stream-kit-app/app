import type { PluginAppApi } from '@stream-kit/app/api';
import type { TriggerDefinitionProps } from '@stream-kit/core';

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
