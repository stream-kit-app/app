import type { HandlerDefinitionProps } from '@stream-kit/plugin';

import { getFieldValue } from '../../get-field-value';
import type { CorePluginContext } from '../../lib/core-context';

import { createExistingMapNameField, mapMutationErrorMessage, requireMapName } from './fields';

export const createDeleteMapHandler = ({ app, maps }: CorePluginContext) =>
	({
		name: 'Delete map',
		fields: [createExistingMapNameField(maps)],
		execute: async (_action, handler, _context, next) => {
			const mapName = getFieldValue(handler.fields, 'map-name');

			if (!requireMapName(app, mapName, 'Delete map failed')) {
				next();
				return;
			}

			const result = await maps.delete(mapName.trim());

			if (!result.ok) {
				app.toast.create({
					title: 'Delete map failed',
					description: mapMutationErrorMessage(result.reason),
					variant: 'warning'
				});
			}

			next();
		}
	}) satisfies HandlerDefinitionProps;
