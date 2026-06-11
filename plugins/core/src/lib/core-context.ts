import type { PluginAppApi } from '@stream-kit/app/api';

import type { ActionLogService } from './logs/action-log';
import type { VariableStore } from './variables/variable-store';

export type CorePluginContext = {
	app: PluginAppApi;
	variables: VariableStore;
	logs: ActionLogService;
};
