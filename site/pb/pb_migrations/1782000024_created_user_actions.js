/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
	const collection = new Collection({
		createRule: '@request.auth.id != "" && user = @request.auth.id',
		deleteRule: '@request.auth.id != "" && user = @request.auth.id',
		updateRule: '@request.auth.id != "" && user = @request.auth.id',
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
				collectionId: '_pb_users_auth_',
				hidden: false,
				id: 'relation8930103860',
				maxSelect: 1,
				minSelect: 0,
				name: 'user',
				presentable: false,
				required: true,
				system: false,
				type: 'relation'
			},
			{
				autogeneratePattern: '',
				hidden: false,
				id: 'text8930103861',
				max: 5000,
				min: 1,
				name: 'name',
				pattern: '',
				presentable: true,
				required: true,
				system: false,
				type: 'text'
			},
			{
				autogeneratePattern: '',
				hidden: false,
				id: 'text8930103862',
				max: 5000,
				min: 1,
				name: 'group',
				pattern: '',
				presentable: false,
				required: true,
				system: false,
				type: 'text'
			},
			{
				hidden: false,
				id: 'number8930103863',
				max: null,
				min: 0,
				name: 'groupSortOrder',
				onlyInt: true,
				presentable: false,
				required: true,
				system: false,
				type: 'number'
			},
			{
				hidden: false,
				id: 'number8930103864',
				max: null,
				min: 0,
				name: 'sortOrder',
				onlyInt: true,
				presentable: false,
				required: true,
				system: false,
				type: 'number'
			},
			{
				hidden: false,
				id: 'json8930103865',
				maxSize: 2000000,
				name: 'triggers',
				presentable: false,
				required: true,
				system: false,
				type: 'json'
			},
			{
				hidden: false,
				id: 'json8930103866',
				maxSize: 2000000,
				name: 'handlers',
				presentable: false,
				required: true,
				system: false,
				type: 'json'
			},
			{
				hidden: false,
				id: 'bool8930103867',
				name: 'enabled',
				presentable: false,
				required: false,
				system: false,
				type: 'bool'
			},
			{
				autogeneratePattern: '',
				hidden: false,
				id: 'text8930103868',
				max: 15,
				min: 0,
				name: 'queueSyncId',
				pattern: '^[a-z0-9]*$',
				presentable: false,
				required: false,
				system: false,
				type: 'text'
			},
			{
				autogeneratePattern: '',
				hidden: false,
				id: 'text8930103869',
				max: 5000,
				min: 0,
				name: 'ownerPluginKey',
				pattern: '',
				presentable: false,
				required: false,
				system: false,
				type: 'text'
			},
			{
				hidden: false,
				id: 'number8930103870',
				max: null,
				min: 0,
				name: 'clientUpdatedAt',
				onlyInt: true,
				presentable: false,
				required: true,
				system: false,
				type: 'number'
			},
			{
				hidden: false,
				id: 'number8930103871',
				max: null,
				min: 0,
				name: 'deletedAt',
				onlyInt: true,
				presentable: false,
				required: false,
				system: false,
				type: 'number'
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
		id: 'pbc_8930103860',
		indexes: ['CREATE INDEX `idx_user_actions_user` ON `user_actions` (`user`)'],
		listRule: '@request.auth.id != "" && user = @request.auth.id',
		name: 'user_actions',
		system: false,
		type: 'base',
		viewRule: '@request.auth.id != "" && user = @request.auth.id'
	});

	return app.save(collection);
}, (app) => {
	const collection = app.findCollectionByNameOrId('pbc_8930103860');
	return app.delete(collection);
});
