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
				id: 'relation8950203851',
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
				id: 'text8950203852',
				max: 64,
				min: 1,
				name: 'overlayId',
				pattern: '',
				presentable: true,
				required: true,
				system: false,
				type: 'text'
			},
			{
				autogeneratePattern: '',
				hidden: false,
				id: 'text8950203853',
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
				id: 'text8950203854',
				max: 200,
				min: 0,
				name: 'template',
				pattern: '',
				presentable: false,
				required: false,
				system: false,
				type: 'text'
			},
			{
				hidden: false,
				id: 'json8950203855',
				maxSize: 2000000,
				name: 'config',
				presentable: false,
				// PocketBase treats `{}` as blank when required — empty overlay configs are valid.
				required: false,
				system: false,
				type: 'json'
			},
			{
				hidden: false,
				id: 'number8950203856',
				max: null,
				min: 0,
				name: 'version',
				onlyInt: true,
				presentable: false,
				required: false,
				system: false,
				type: 'number'
			},
			{
				hidden: false,
				id: 'json8950203857',
				maxSize: 200000,
				name: 'expectedEvents',
				presentable: false,
				required: false,
				system: false,
				type: 'json'
			},
			{
				hidden: false,
				id: 'json8950203858',
				maxSize: 200000,
				name: 'requiredPlugins',
				presentable: false,
				required: false,
				system: false,
				type: 'json'
			},
			{
				hidden: false,
				id: 'json8950203859',
				maxSize: 200000,
				name: 'installedActionKeys',
				presentable: false,
				required: false,
				system: false,
				type: 'json'
			},
			{
				hidden: false,
				id: 'file8950203860',
				maxSelect: 1,
				maxSize: 52428800,
				mimeTypes: ['application/zip', 'application/x-zip-compressed'],
				name: 'source',
				presentable: false,
				protected: true,
				required: false,
				system: false,
				thumbs: null,
				type: 'file'
			},
			{
				autogeneratePattern: '',
				hidden: false,
				id: 'text8950203861',
				max: 128,
				min: 0,
				name: 'sourceHash',
				pattern: '',
				presentable: false,
				required: false,
				system: false,
				type: 'text'
			},
			{
				hidden: false,
				id: 'number8950203862',
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
				id: 'number8950203863',
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
				id: 'number8950203864',
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
				id: 'autodate8950203865',
				name: 'created',
				onCreate: true,
				onUpdate: false,
				presentable: false,
				system: false,
				type: 'autodate'
			},
			{
				hidden: false,
				id: 'autodate8950203866',
				name: 'updated',
				onCreate: true,
				onUpdate: true,
				presentable: false,
				system: false,
				type: 'autodate'
			}
		],
		id: 'pbc_8950203850',
		indexes: [
			'CREATE UNIQUE INDEX idx_user_overlay_projects_overlay ON user_overlay_projects (overlayId)',
			'CREATE INDEX idx_user_overlay_projects_user ON user_overlay_projects (user)'
		],
		name: 'user_overlay_projects',
		system: false,
		type: 'base'
	});

	return app.save(collection);
}, (app) => {
	const collection = app.findCollectionByNameOrId('user_overlay_projects');
	return app.delete(collection);
});
