/// <reference path="../pb_data/types.d.ts" />

/**
 * Rebuild user_overlays with PB-default ids + stable `overlayId` (local UUID).
 * Custom UUID primary keys are brittle with multipart uploads / file storage.
 */
migrate((app) => {
	try {
		const existing = app.findCollectionByNameOrId('pbc_8940103850');
		app.delete(existing);
	} catch (_err) {
		// Collection may not exist yet on fresh installs that skip 0033 somehow.
	}

	const collection = new Collection({
		createRule: '@request.auth.id != ""',
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
				id: 'text8940103857',
				max: 36,
				min: 36,
				name: 'overlayId',
				pattern:
					'^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
				presentable: true,
				required: true,
				system: false,
				type: 'text'
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
			'CREATE INDEX `idx_user_overlays_published` ON `user_overlays` (`published`)',
			'CREATE UNIQUE INDEX `idx_user_overlays_overlayId` ON `user_overlays` (`overlayId`)'
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
