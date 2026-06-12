import type { HandlerDefinitionProps } from '@stream-kit/core';

import { getFieldValue } from '../../get-field-value';
import type { CorePluginContext } from '../../lib/core-context';

import {
	lifetimeField,
	mapMutationErrorMessage,
	mapNameField,
	parseLifetime,
	requireMapName
} from './fields';

export const createCreateMapHandler = ({ app, maps }: CorePluginContext) =>
	({
		name: 'Create map',
		fields: [mapNameField, lifetimeField],
		execute: async (_action, handler, _context, next) => {
			const mapName = getFieldValue(handler.fields, 'map-name');
			const lifetime = parseLifetime(getFieldValue(handler.fields, 'lifetime'));

			if (!requireMapName(app, mapName, 'Create map failed')) {
				next();
				return;
			}

			const result = await maps.create(mapName, lifetime);

			if (!result.ok) {
				app.toast.create({
					title: 'Create map failed',
					description: mapMutationErrorMessage(result.reason),
					variant: 'warning'
				});
			}

			next();
		}
	}) satisfies HandlerDefinitionProps;
