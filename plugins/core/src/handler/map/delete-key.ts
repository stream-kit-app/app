import type { HandlerDefinitionProps } from '@stream-kit/plugin';

import { getFieldValue } from '../../get-field-value';
import type { CorePluginContext } from '../../lib/core-context';

import { createExistingMapNameField, keyField, mapMutationErrorMessage, requireMapName } from './fields';

export const createDeleteMapKeyHandler = ({ app, maps }: CorePluginContext) =>
	({
		name: 'Delete key',
		fields: [createExistingMapNameField(maps), keyField],
		execute: async (_action, handler, _context, next) => {
			const mapName = getFieldValue(handler.fields, 'map-name');
			const key = getFieldValue(handler.fields, 'key');

			if (!requireMapName(app, mapName, 'Delete map key failed')) {
				next();
				return;
			}

			if (typeof key !== 'string' || !key.trim()) {
				next();
				return;
			}

			const result = await maps.deleteKey(mapName.trim(), key);

			if (!result.ok) {
				app.toast.create({
					title: 'Delete map key failed',
					description: mapMutationErrorMessage(result.reason),
					variant: 'warning'
				});
			}

			next();
		}
	}) satisfies HandlerDefinitionProps;
