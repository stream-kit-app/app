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

export const createHasMapKeyHandler = ({ app, maps, variables }: CorePluginContext) =>
	({
		name: 'Has key',
		fields: [createExistingMapNameField(maps), keyFieldWithContextVariables, targetNameField],
		execute: async (_action, handler, context, next) => {
			const mapName = getFieldValue(handler.fields, 'map-name');
			const key = resolveFieldText(variables, handler.fields, 'key', context);
			const targetName = getFieldValue(handler.fields, 'target-name');

			if (!requireMapName(app, mapName, 'Has key failed')) {
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
					title: 'Has key failed',
					description: mapMutationErrorMessage('map-not-found'),
					variant: 'warning'
				});
				next();
				return;
			}

			const exists = maps.has(mapName.trim(), key);

			if (!context.actionVariables) {
				context.actionVariables = {};
			}

			context.actionVariables[targetName.trim()] = exists ? 'true' : 'false';

			next();
		}
	}) satisfies HandlerDefinitionProps;
