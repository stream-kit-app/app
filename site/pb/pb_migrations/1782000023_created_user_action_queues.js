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
				id: 'relation8930103850',
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
				id: 'text8930103851',
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
				hidden: false,
				id: 'number8930103852',
				max: null,
				min: null,
				name: 'concurrency',
				onlyInt: true,
				presentable: false,
				required: false,
				system: false,
				type: 'number'
			},
			{
				hidden: false,
				id: 'number8930103853',
				max: null,
				min: null,
				name: 'maxLength',
				onlyInt: true,
				presentable: false,
				required: false,
				system: false,
				type: 'number'
			},
			{
				hidden: false,
				id: 'number8930103854',
				max: null,
				min: 0,
				name: 'sortOrder',
				onlyInt: true,
				presentable: false,
				required: false,
				system: false,
				type: 'number'
			},
			{
				hidden: false,
				id: 'number8930103855',
				max: null,
				min: 0,
				name: 'clientUpdatedAt',
				onlyInt: true,
				presentable: false,
				required: false,
				system: false,
				type: 'number'
			},
			{
				hidden: false,
				id: 'number8930103856',
				max: null,
				min: null,
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
		id: 'pbc_8930103850',
		indexes: [
			'CREATE INDEX `idx_user_action_queues_user` ON `user_action_queues` (`user`)'
		],
		listRule: '@request.auth.id != "" && user = @request.auth.id',
		name: 'user_action_queues',
		system: false,
		type: 'base',
		viewRule: '@request.auth.id != "" && user = @request.auth.id'
	});

	return app.save(collection);
}, (app) => {
	const collection = app.findCollectionByNameOrId('pbc_8930103850');
	return app.delete(collection);
});
