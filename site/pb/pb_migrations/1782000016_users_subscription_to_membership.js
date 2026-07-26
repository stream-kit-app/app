/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
	const users = app.findCollectionByNameOrId('_pb_users_auth_');

	// Retarget users.subscription from catalog `subscriptions` → membership `user_subscriptions`.
	// PocketBase forbids changing collectionId on an existing relation field id, so replace the field.
	users.fields.removeById('relation8929103860');
	users.fields.add(
		new Field({
			cascadeDelete: false,
			collectionId: 'pbc_8929103851',
			hidden: false,
			id: 'relation8929103861',
			maxSelect: 1,
			minSelect: 0,
			name: 'subscription',
			presentable: false,
			required: false,
			system: false,
			type: 'relation'
		})
	);

	return app.save(users);
}, (app) => {
	const users = app.findCollectionByNameOrId('_pb_users_auth_');

	users.fields.removeById('relation8929103861');
	users.fields.add(
		new Field({
			cascadeDelete: false,
			collectionId: 'pbc_7929103850',
			hidden: false,
			id: 'relation8929103860',
			maxSelect: 1,
			minSelect: 0,
			name: 'subscription',
			presentable: false,
			required: false,
			system: false,
			type: 'relation'
		})
	);

	return app.save(users);
});
