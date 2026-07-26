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
				autogeneratePattern: '',
				hidden: false,
				id: 'text7929103851',
				max: 0,
				min: 0,
				name: 'key',
				pattern: '^[a-z0-9-]+$',
				presentable: false,
				required: true,
				system: false,
				type: 'text'
			},
			{
				autogeneratePattern: '',
				hidden: false,
				id: 'text7929103852',
				max: 0,
				min: 0,
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
				id: 'text7929103853',
				max: 0,
				min: 0,
				name: 'description',
				pattern: '',
				presentable: false,
				required: true,
				system: false,
				type: 'text'
			},
			{
				autogeneratePattern: '',
				hidden: false,
				id: 'text7929103854',
				max: 0,
				min: 0,
				name: 'icon',
				pattern: '',
				presentable: false,
				required: true,
				system: false,
				type: 'text'
			},
			{
				hidden: false,
				id: 'bool7929103855',
				name: 'enabled',
				presentable: false,
				required: false,
				system: false,
				type: 'bool'
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
		id: 'pbc_7929103850',
		indexes: ['CREATE UNIQUE INDEX `idx_subscriptions_key` ON `subscriptions` (`key`)'],
		listRule: 'enabled = true',
		name: 'subscriptions',
		system: false,
		type: 'base',
		updateRule: null,
		viewRule: 'enabled = true'
	});

	return app.save(collection);
}, (app) => {
	const collection = app.findCollectionByNameOrId('pbc_7929103850');

	return app.delete(collection);
});
