/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
	const plugins = app.findCollectionByNameOrId("plugins");
	plugins.listRule = "";
	plugins.viewRule = "";
	app.save(plugins);

	const versions = app.findCollectionByNameOrId("plugin_versions");
	versions.listRule = "";
	versions.viewRule = "";

	return app.save(versions);
}, (app) => {
	const plugins = app.findCollectionByNameOrId("plugins");
	plugins.listRule = null;
	plugins.viewRule = null;
	app.save(plugins);

	const versions = app.findCollectionByNameOrId("plugin_versions");
	versions.listRule = null;
	versions.viewRule = null;

	return app.save(versions);
});
