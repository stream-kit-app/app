import type { HandlerDefinitionProps } from '@stream-kit/core';

import { getFieldValue } from '../../get-field-value';
import type { CorePluginContext } from '../../lib/core-context';

import { createExistingMapNameField, mapMutationErrorMessage, requireMapName } from './fields';

export const createClearMapHandler = ({ app, maps }: CorePluginContext) =>
	({
		name: 'Clear map',
		fields: [createExistingMapNameField(maps)],
		execute: async (_action, handler, _context, next) => {
			const mapName = getFieldValue(handler.fields, 'map-name');

			if (!requireMapName(app, mapName, 'Clear map failed')) {
				next();
				return;
			}

			const result = await maps.clear(mapName.trim());

			if (!result.ok) {
				app.toast.create({
					title: 'Clear map failed',
					description: mapMutationErrorMessage(result.reason),
					variant: 'warning'
				});
			}

			next();
		}
	}) satisfies HandlerDefinitionProps;
