import type { HandlerDefinitionProps } from '@stream-kit/plugin';
import type { PluginAppApi } from '@stream-kit/plugin';

import { getFieldValue } from '../../get-field-value';
import { runUserScript, SCRIPT_TEMPLATE } from '../../lib/run-code';

export const createRunScriptHandler = (app: PluginAppApi) => {
	return {
		name: 'Run script',
		fields: [
			{
				type: 'code',
				name: 'Script',
				language: 'typescript',
				required: true,
				placeholder: 'export default defineScript(async ({ app, context }) => { … })',
				defaultValue: SCRIPT_TEMPLATE
			}
		],
		execute: async (_action, handler, context, next) => {
			const source = getFieldValue(handler.fields, 'script');

			if (typeof source !== 'string' || !source.trim()) {
				next();
				return;
			}

			// Await so any context/variable mutations are visible to later handlers.
			await runUserScript(app, source, [context]);
			next();
		}
	} satisfies HandlerDefinitionProps;
};
