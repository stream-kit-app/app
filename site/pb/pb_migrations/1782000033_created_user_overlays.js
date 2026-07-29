/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
	const collection = new Collection({
		createRule: '@request.auth.id != ""',
		deleteRule: '@request.auth.id != "" && user = @request.auth.id',
		updateRule: '@request.auth.id != "" && user = @request.auth.id',
		fields: [
			{
				autogeneratePattern: '',
				hidden: false,
				id: 'text3208210256',
				max: 36,
				min: 36,
				name: 'id',
				pattern: '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$',
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
				id: 'relation8940103850',
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
				id: 'text8940103851',
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
				id: 'json8940103852',
				maxSize: 2000000,
				name: 'config',
				presentable: false,
				required: false,
				system: false,
				type: 'json'
			},
			{
				hidden: false,
				id: 'file8940103853',
				maxSelect: 1,
				maxSize: 26214400,
				mimeTypes: ['application/zip', 'application/octet-stream'],
				name: 'bundle',
				presentable: false,
				protected: false,
				required: true,
				system: false,
				thumbs: [],
				type: 'file'
			},
			{
				hidden: false,
				id: 'bool8940103854',
				name: 'published',
				presentable: false,
				required: false,
				system: false,
				type: 'bool'
			},
			{
				hidden: false,
				id: 'number8940103855',
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
				id: 'number8940103856',
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
		id: 'pbc_8940103850',
		indexes: [
			'CREATE INDEX `idx_user_overlays_user` ON `user_overlays` (`user`)',
			'CREATE INDEX `idx_user_overlays_published` ON `user_overlays` (`published`)'
		],
		listRule: 'published = true || (@request.auth.id != "" && user = @request.auth.id)',
		name: 'user_overlays',
		system: false,
		type: 'base',
		viewRule: 'published = true || (@request.auth.id != "" && user = @request.auth.id)'
	});

	return app.save(collection);
}, (app) => {
	const collection = app.findCollectionByNameOrId('pbc_8940103850');
	return app.delete(collection);
});
