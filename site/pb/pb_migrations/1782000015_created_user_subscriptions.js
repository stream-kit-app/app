/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
	const collection = new Collection({
		createRule: null,
		deleteRule: null,
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
				cascadeDelete: false,
				collectionId: '_pb_users_auth_',
				hidden: false,
				id: 'relation8929103852',
				maxSelect: 1,
				minSelect: 0,
				name: 'user',
				presentable: false,
				required: true,
				system: false,
				type: 'relation'
			},
			{
				cascadeDelete: false,
				collectionId: 'pbc_7929103850',
				hidden: false,
				id: 'relation8929103853',
				maxSelect: 1,
				minSelect: 0,
				name: 'subscription',
				presentable: false,
				required: true,
				system: false,
				type: 'relation'
			},
			{
				hidden: false,
				id: 'date8929103854',
				max: '',
				min: '',
				name: 'purchasedAt',
				presentable: false,
				required: true,
				system: false,
				type: 'date'
			},
			{
				hidden: false,
				id: 'date8929103855',
				max: '',
				min: '',
				name: 'cancelledAt',
				presentable: false,
				required: false,
				system: false,
				type: 'date'
			},
			{
				hidden: false,
				id: 'select8929103856',
				maxSelect: 1,
				name: 'status',
				presentable: true,
				required: true,
				system: false,
				type: 'select',
				values: ['active', 'cancelled', 'expired']
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
		id: 'pbc_8929103851',
		indexes: [],
		listRule: '@request.auth.id != "" && user = @request.auth.id',
		name: 'user_subscriptions',
		system: false,
		type: 'base',
		updateRule: null,
		viewRule: '@request.auth.id != "" && user = @request.auth.id'
	});

	return app.save(collection);
}, (app) => {
	const collection = app.findCollectionByNameOrId('pbc_8929103851');

	return app.delete(collection);
});
