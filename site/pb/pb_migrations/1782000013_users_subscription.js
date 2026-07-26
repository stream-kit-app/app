/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
	const users = app.findCollectionByNameOrId('_pb_users_auth_');

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

	// Users may update their own profile but must not self-assign a plan.
	users.updateRule =
		'id = @request.auth.id && (@request.body.subscription:isset = false || @request.body.subscription = subscription)';

	return app.save(users);
}, (app) => {
	const users = app.findCollectionByNameOrId('_pb_users_auth_');
	users.fields.removeById('relation8929103860');
	users.updateRule = 'id = @request.auth.id';
	return app.save(users);
});
