/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
	const collection = new Collection({
		createRule: null,
		deleteRule: null,
		listRule: '@request.auth.id != "" && user = @request.auth.id',
		viewRule: '@request.auth.id != "" && user = @request.auth.id',
		updateRule: null,
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
				id: 'relation9120400001',
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
				id: 'text9120400002',
				max: 10,
				min: 10,
				name: 'day',
				pattern: '^\\d{4}-\\d{2}-\\d{2}$',
				presentable: true,
				required: true,
				system: false,
				type: 'text'
			},
			{
				hidden: false,
				id: 'number9120400003',
				max: null,
				min: 0,
				name: 'count',
				onlyInt: true,
				presentable: false,
				required: false,
				system: false,
				type: 'number'
			},
			{
				hidden: false,
				id: 'number9120400004',
				max: null,
				min: 0,
				name: 'inputTokens',
				onlyInt: true,
				presentable: false,
				required: false,
				system: false,
				type: 'number'
			},
			{
				hidden: false,
				id: 'number9120400005',
				max: null,
				min: 0,
				name: 'outputTokens',
				onlyInt: true,
				presentable: false,
				required: false,
				system: false,
				type: 'number'
			},
			{
				hidden: false,
				id: 'autodate9120400006',
				name: 'created',
				onCreate: true,
				onUpdate: false,
				presentable: false,
				system: false,
				type: 'autodate'
			},
			{
				hidden: false,
				id: 'autodate9120400007',
				name: 'updated',
				onCreate: true,
				onUpdate: true,
				presentable: false,
				system: false,
				type: 'autodate'
			}
		],
		id: 'pbc_9120400000',
		indexes: ['CREATE UNIQUE INDEX idx_ai_usage_user_day ON ai_usage (user, day)'],
		name: 'ai_usage',
		system: false,
		type: 'base'
	});

	return app.save(collection);
}, (app) => {
	const collection = app.findCollectionByNameOrId('ai_usage');
	return app.delete(collection);
});
