import type { PluginAppApi } from '@stream-kit/plugin';

import type { ActionLogService } from './logs/action-log';
import type { CollectionStore } from './collections/collection-store';
import type { VariableStore } from './variables/variable-store';

export type CorePluginContext = {
	app: PluginAppApi;
	variables: VariableStore;
	logs: ActionLogService;
	collections: CollectionStore;
};
