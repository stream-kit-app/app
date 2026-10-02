import type { HandlerDefinitionProps } from '@stream-kit/plugin';

import type { CorePluginContext } from '../../lib/core-context';
import { getFieldValue } from '../../get-field-value';
import { runUserScript, SCRIPT_TEMPLATE } from '../../lib/run-code';

export const createRunScriptHandler = ({ app, logs }: CorePluginContext) => {
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
		execute: async (action, handler, context, next) => {
			const source = getFieldValue(handler.fields, 'script');

			if (typeof source !== 'string' || !source.trim()) {
				next();
				return;
			}

			// Await so any context/variable mutations are visible to later handlers.
			const changes = await runUserScript(app, source, [context]);

			if (changes.length > 0) {
				await logs.append(app.fs, {
					level: 'debug',
					message: `Script set ${changes.join(', ')}`,
					actionId: action.id,
					actionName: action.name,
					trigger: context.trigger
				});
			}

			next();
		}
	} satisfies HandlerDefinitionProps;
};
