/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
	try {
		const collection = app.findCollectionByNameOrId('pbc_8929103851');
		return app.delete(collection);
	} catch {
		// Collection never existed or already removed (e.g. fresh install after 1782000011 was dropped).
		return;
	}
}, (app) => {
	// Irreversible simplification — do not recreate the join table.
	return;
});
