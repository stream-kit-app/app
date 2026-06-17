/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
	const collection = app.findCollectionByNameOrId("plugins");

	collection.fields.add(
		new Field({
			autogeneratePattern: "",
			hidden: false,
			id: "text4829103848",
			max: 0,
			min: 0,
			name: "key",
			pattern: "^[a-z0-9-]+$",
			presentable: false,
			required: true,
			system: false,
			type: "text"
		})
	);

	collection.fields.add(
		new Field({
			autogeneratePattern: "",
			hidden: false,
			id: "text5729103849",
			max: 0,
			min: 0,
			name: "description",
			pattern: "",
			presentable: false,
			required: false,
			system: false,
			type: "text"
		})
	);

	collection.fields.add(
		new Field({
			autogeneratePattern: "",
			hidden: false,
			id: "text6729103850",
			max: 0,
			min: 0,
			name: "icon",
			pattern: "",
			presentable: false,
			required: false,
			system: false,
			type: "text"
		})
	);

	collection.addIndex("idx_plugins_key", true, "key", "");

	return app.save(collection);
}, (app) => {
	const collection = app.findCollectionByNameOrId("plugins");

	collection.fields.removeByName("key");
	collection.fields.removeByName("description");
	collection.fields.removeByName("icon");
	collection.removeIndex("idx_plugins_key");

	return app.save(collection);
});
