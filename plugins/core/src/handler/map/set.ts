import type { HandlerDefinitionProps } from '@stream-kit/plugin';

import { interpolateVariables } from '@stream-kit/core';

import { getFieldValue, resolveFieldText } from '../../get-field-value';
import type { CorePluginContext } from '../../lib/core-context';

import {
	createExistingMapNameField,
	keyFieldWithContextVariables,
	mapMutationErrorMessage,
	requireMapName,
	valueFieldWithContextVariables
} from './fields';

export const createSetMapValueHandler = ({ app, variables, maps }: CorePluginContext) =>
	({
		name: 'Set value',
		fields: [
			createExistingMapNameField(maps),
			keyFieldWithContextVariables,
			valueFieldWithContextVariables
		],
		execute: async (_action, handler, context, next) => {
			const mapName = getFieldValue(handler.fields, 'map-name');
			const key = resolveFieldText(variables, handler.fields, 'key', context);
			const valueTemplate = getFieldValue(handler.fields, 'value');

			if (!requireMapName(app, mapName, 'Set map value failed')) {
				next();
				return;
			}

			if (typeof key !== 'string' || !key.trim()) {
				next();
				return;
			}

			const value = interpolateVariables(
				typeof valueTemplate === 'string' ? valueTemplate : '',
				variables.resolve(context)
			);

			const result = await maps.set(mapName.trim(), key, value);

			if (!result.ok) {
				app.toast.create({
					title: 'Set map value failed',
					description: mapMutationErrorMessage(result.reason),
					variant: 'warning'
				});
			}

			next();
		}
	}) satisfies HandlerDefinitionProps;
