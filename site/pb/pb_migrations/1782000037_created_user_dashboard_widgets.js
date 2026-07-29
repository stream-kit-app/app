/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
	const collection = new Collection({
		createRule: '@request.auth.id != ""',
		deleteRule: '@request.auth.id != "" && user = @request.auth.id',
		listRule: '@request.auth.id != "" && user = @request.auth.id',
		viewRule: '@request.auth.id != "" && user = @request.auth.id',
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
				id: 'relation8960203851',
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
				id: 'text8960203852',
				max: 500,
				min: 1,
				name: 'definitionId',
				pattern: '',
				presentable: true,
				required: true,
				system: false,
				type: 'text'
			},
			{
				hidden: false,
				id: 'number8960203853',
				max: null,
				min: 1,
				name: 'columns',
				onlyInt: true,
				presentable: false,
				required: false,
				system: false,
				type: 'number'
			},
			{
				hidden: false,
				id: 'number8960203854',
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
				id: 'number8960203855',
				max: null,
				min: 0,
				name: 'revision',
				onlyInt: true,
				presentable: false,
				required: false,
				system: false,
				type: 'number'
			},
			{
				hidden: false,
				id: 'number8960203856',
				max: null,
				min: null,
				name: 'clientUpdatedAt',
				onlyInt: false,
				presentable: false,
				required: false,
				system: false,
				type: 'number'
			},
			{
				hidden: false,
				id: 'number8960203857',
				max: null,
				min: null,
				name: 'deletedAt',
				onlyInt: false,
				presentable: false,
				required: false,
				system: false,
				type: 'number'
			},
			{
				hidden: false,
				id: 'autodate8960203858',
				name: 'created',
				onCreate: true,
				onUpdate: false,
				presentable: false,
				system: false,
				type: 'autodate'
			},
			{
				hidden: false,
				id: 'autodate8960203859',
				name: 'updated',
				onCreate: true,
				onUpdate: true,
				presentable: false,
				system: false,
				type: 'autodate'
			}
		],
		id: 'pbc_8960203850',
		indexes: ['CREATE INDEX idx_user_dashboard_widgets_user ON user_dashboard_widgets (user)'],
		name: 'user_dashboard_widgets',
		system: false,
		type: 'base'
	});

	return app.save(collection);
}, (app) => {
	const collection = app.findCollectionByNameOrId('user_dashboard_widgets');
	return app.delete(collection);
});
