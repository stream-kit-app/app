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
				id: 'relation8940203851',
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
				id: 'text8940203852',
				max: 200,
				min: 1,
				name: 'pluginKey',
				pattern: '',
				presentable: true,
				required: true,
				system: false,
				type: 'text'
			},
			{
				autogeneratePattern: '',
				hidden: false,
				id: 'text8940203853',
				max: 200,
				min: 1,
				name: 'collection',
				pattern: '',
				presentable: true,
				required: true,
				system: false,
				type: 'text'
			},
			{
				hidden: false,
				id: 'json8940203854',
				maxSize: 2000000,
				name: 'payload',
				presentable: false,
				// PocketBase treats `{}` as blank when required — empty payloads are valid.
				required: false,
				system: false,
				type: 'json'
			},
			{
				hidden: false,
				id: 'number8940203855',
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
				id: 'number8940203856',
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
				id: 'number8940203857',
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
				id: 'number8940203858',
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
				id: 'autodate8940203859',
				name: 'created',
				onCreate: true,
				onUpdate: false,
				presentable: false,
				system: false,
				type: 'autodate'
			},
			{
				hidden: false,
				id: 'autodate8940203860',
				name: 'updated',
				onCreate: true,
				onUpdate: true,
				presentable: false,
				system: false,
				type: 'autodate'
			}
		],
		id: 'pbc_8940203850',
		indexes: [
			'CREATE INDEX idx_user_plugin_records_user ON user_plugin_records (user)',
			'CREATE INDEX idx_user_plugin_records_plugin ON user_plugin_records (pluginKey, collection)'
		],
		name: 'user_plugin_records',
		system: false,
		type: 'base'
	});

	return app.save(collection);
}, (app) => {
	const collection = app.findCollectionByNameOrId('user_plugin_records');
	return app.delete(collection);
});
