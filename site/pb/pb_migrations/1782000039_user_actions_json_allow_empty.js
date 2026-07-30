/// <reference path="../pb_data/types.d.ts" />

/**
 * PocketBase required JSON fields reject `[]` as blank. Actions often have empty
 * triggers/handlers arrays (valid locally), so allow empty JSON on user_actions.
 */
migrate(
	(app) => {
		const actions = app.findCollectionByNameOrId('user_actions');
		const triggers = actions.fields.getByName('triggers');
		const handlers = actions.fields.getByName('handlers');
		let changed = false;
		if (triggers) {
			triggers.required = false;
			changed = true;
		}
		if (handlers) {
			handlers.required = false;
			changed = true;
		}
		if (changed) {
			app.save(actions);
		}
	},
	(app) => {
		const actions = app.findCollectionByNameOrId('user_actions');
		const triggers = actions.fields.getByName('triggers');
		const handlers = actions.fields.getByName('handlers');
		let changed = false;
		if (triggers) {
			triggers.required = true;
			changed = true;
		}
		if (handlers) {
			handlers.required = true;
			changed = true;
		}
		if (changed) {
			app.save(actions);
		}
	}
);
