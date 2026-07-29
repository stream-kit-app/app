/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
	const collection = new Collection({
		createRule: '@request.auth.id != "" && user = @request.auth.id',
		deleteRule: '@request.auth.id != "" && user = @request.auth.id',
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
				id: 'relation8929103880',
				maxSelect: 1,
				minSelect: 0,
				name: 'user',
				presentable: false,
				required: true,
				system: false,
				type: 'relation'
			},
			{
				hidden: false,
				id: 'file8929103881',
				maxSelect: 1,
				maxSize: 104857600,
				mimeTypes: [
					'audio/mpeg',
					'audio/mp3',
					'audio/wav',
					'audio/x-wav',
					'audio/ogg',
					'audio/webm',
					'audio/flac',
					'audio/aac',
					'audio/mp4',
					'image/png',
					'image/jpeg',
					'image/webp',
					'image/gif',
					'image/svg+xml',
					'video/mp4',
					'video/webm',
					'video/quicktime',
					'application/octet-stream'
				],
				name: 'file',
				presentable: false,
				protected: false,
				required: true,
				system: false,
				thumbs: null,
				type: 'file'
			},
			{
				autogeneratePattern: '',
				hidden: false,
				id: 'text8929103882',
				max: 0,
				min: 0,
				name: 'mimeType',
				pattern: '',
				presentable: false,
				required: false,
				system: false,
				type: 'text'
			},
			{
				hidden: false,
				id: 'number8929103883',
				max: null,
				min: 0,
				name: 'size',
				onlyInt: true,
				presentable: false,
				required: false,
				system: false,
				type: 'number'
			},
			{
				autogeneratePattern: '',
				hidden: false,
				id: 'text8929103884',
				max: 0,
				min: 0,
				name: 'originalName',
				pattern: '',
				presentable: true,
				required: false,
				system: false,
				type: 'text'
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
		id: 'pbc_9929103852',
		indexes: ['CREATE INDEX `idx_user_files_user` ON `user_files` (`user`)'],
		listRule: '@request.auth.id != "" && user = @request.auth.id',
		name: 'user_files',
		system: false,
		type: 'base',
		updateRule: null,
		viewRule: '@request.auth.id != "" && user = @request.auth.id'
	});

	return app.save(collection);
}, (app) => {
	const collection = app.findCollectionByNameOrId('pbc_9929103852');
	return app.delete(collection);
});
