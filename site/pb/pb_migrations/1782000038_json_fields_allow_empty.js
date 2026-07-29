/// <reference path="../pb_data/types.d.ts" />

/**
 * PocketBase required JSON fields reject `{}` / `[]` as blank. Overlay configs and
 * plugin-record payloads are often empty objects, so allow them.
 */
migrate(
	(app) => {
		const overlays = app.findCollectionByNameOrId('user_overlay_projects');
		const config = overlays.fields.getByName('config');
		if (config) {
			config.required = false;
			app.save(overlays);
		}

		const records = app.findCollectionByNameOrId('user_plugin_records');
		const payload = records.fields.getByName('payload');
		if (payload) {
			payload.required = false;
			app.save(records);
		}
	},
	(app) => {
		const overlays = app.findCollectionByNameOrId('user_overlay_projects');
		const config = overlays.fields.getByName('config');
		if (config) {
			config.required = true;
			app.save(overlays);
		}

		const records = app.findCollectionByNameOrId('user_plugin_records');
		const payload = records.fields.getByName('payload');
		if (payload) {
			payload.required = true;
			app.save(records);
		}
	}
);
