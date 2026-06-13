import type { HandlerDefinitionProps } from '@stream-kit/plugin';

import { getFieldValue, resolveFieldText } from '../../get-field-value';
import type { CorePluginContext } from '../../lib/core-context';

import {
	createExistingMapNameField,
	keyFieldWithContextVariables,
	mapMutationErrorMessage,
	requireMapName,
	targetNameField
} from './fields';

export const createGetMapValueHandler = ({ app, maps, variables }: CorePluginContext) =>
	({
		name: 'Get value',
		fields: [createExistingMapNameField(maps), keyFieldWithContextVariables, targetNameField],
		execute: async (_action, handler, context, next) => {
			const mapName = getFieldValue(handler.fields, 'map-name');
			const key = resolveFieldText(variables, handler.fields, 'key', context);
			const targetName = getFieldValue(handler.fields, 'target-name');

			if (!requireMapName(app, mapName, 'Get map value failed')) {
				next();
				return;
			}

			if (
				typeof key !== 'string' ||
				!key.trim() ||
				typeof targetName !== 'string' ||
				!targetName.trim()
			) {
				next();
				return;
			}

			if (!maps.mapExists(mapName.trim())) {
				app.toast.create({
					title: 'Get map value failed',
					description: mapMutationErrorMessage('map-not-found'),
					variant: 'warning'
				});
				next();
				return;
			}

			const value = maps.get(mapName.trim(), key);

			if (!context.actionVariables) {
				context.actionVariables = {};
			}

			context.actionVariables[targetName.trim()] = value ?? '';

			next();
		}
	}) satisfies HandlerDefinitionProps;
