/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
	const collection = new Collection({
		createRule: '@request.auth.id != "" && user = @request.auth.id',
		deleteRule: '@request.auth.id != "" && user = @request.auth.id',
		fields: [
			{
				autogeneratePattern: '[a-z0-9]{15}',
				hidden: false,
				id: 'text3208210256',
				max: 15,
				min: 15,
				name: 'id',
				pattern: '^[a-z0-9]+$',
				presentable: false,
				primaryKey: true,
				required: true,
				system: true,
				type: 'text'
			},
			{
				cascadeDelete: true,
				collectionId: 'pbc_2111211931',
				hidden: false,
				id: 'relation6929103858',
				maxSelect: 1,
				minSelect: 0,
				name: 'plugin',
				presentable: false,
				required: true,
				system: false,
				type: 'relation'
			},
			{
				cascadeDelete: false,
				collectionId: '_pb_users_auth_',
				hidden: false,
				id: 'relation7929103859',
				maxSelect: 1,
				minSelect: 0,
				name: 'user',
				presentable: false,
				required: true,
				system: false,
				type: 'relation'
			},
			{
				hidden: false,
				id: 'number8929103860',
				max: 5,
				min: 1,
				name: 'rating',
				onlyInt: true,
				presentable: true,
				required: true,
				system: false,
				type: 'number'
			},
			{
				autogeneratePattern: '',
				hidden: false,
				id: 'text9929103861',
				max: 0,
				min: 0,
				name: 'body',
				pattern: '',
				presentable: false,
				required: false,
				system: false,
				type: 'text'
			},
			{
				hidden: false,
				id: 'autodate2261412156',
				name: 'createdAt',
				onCreate: true,
				onUpdate: false,
				presentable: false,
				system: false,
				type: 'autodate'
			},
			{
				hidden: false,
				id: 'autodate3175243278',
				name: 'updatedAt',
				onCreate: true,
				onUpdate: true,
				presentable: false,
				system: false,
				type: 'autodate'
			}
		],
		id: 'pbc_6929103849',
		indexes: [
			'CREATE UNIQUE INDEX `idx_plugin_reviews_plugin_user` ON `plugin_reviews` (`plugin`, `user`)'
		],
		listRule: '',
		name: 'plugin_reviews',
		system: false,
		type: 'base',
		updateRule: '@request.auth.id != "" && user = @request.auth.id',
		viewRule: ''
	});

	return app.save(collection);
}, (app) => {
	const collection = app.findCollectionByNameOrId('pbc_6929103849');

	return app.delete(collection);
});
