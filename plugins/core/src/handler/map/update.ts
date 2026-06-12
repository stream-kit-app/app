import type { HandlerDefinitionProps } from '@stream-kit/core';

import { interpolateVariables } from '@stream-kit/core';

import { getFieldValue } from '../../get-field-value';
import type { CorePluginContext } from '../../lib/core-context';

import {
	createExistingMapNameField,
	keyField,
	mapMutationErrorMessage,
	requireMapName,
	valueField
} from './fields';

export const createUpdateMapValueHandler = ({ app, variables, maps }: CorePluginContext) =>
	({
		name: 'Update value',
		fields: [createExistingMapNameField(maps), keyField, valueField],
		execute: async (_action, handler, context, next) => {
			const mapName = getFieldValue(handler.fields, 'map-name');
			const key = getFieldValue(handler.fields, 'key');
			const valueTemplate = getFieldValue(handler.fields, 'value');

			if (!requireMapName(app, mapName, 'Update map value failed')) {
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

			const result = await maps.update(mapName.trim(), key, value);

			if (!result.ok) {
				app.toast.create({
					title: 'Update map value failed',
					description: mapMutationErrorMessage(result.reason),
					variant: 'warning'
				});
			}

			next();
		}
	}) satisfies HandlerDefinitionProps;
