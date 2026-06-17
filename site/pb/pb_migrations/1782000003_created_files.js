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
				hidden: false,
				id: 'file4829103848',
				maxSelect: 1,
				maxSize: 52428800,
				mimeTypes: ['application/zip', 'application/octet-stream'],
				name: 'file',
				presentable: false,
				protected: false,
				required: true,
				system: false,
				thumbs: [],
				type: 'file'
			},
			{
				autogeneratePattern: '',
				hidden: false,
				id: 'text5829103849',
				max: 255,
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
				id: 'number6829103850',
				max: null,
				min: 0,
				name: 'size',
				onlyInt: false,
				presentable: false,
				required: false,
				system: false,
				type: 'number'
			},
			{
				autogeneratePattern: '',
				hidden: false,
				id: 'text7829103851',
				max: 64,
				min: 64,
				name: 'sha256',
				pattern: '^[a-f0-9]{64}$',
				presentable: false,
				required: false,
				system: false,
				type: 'text'
			},
			{
				autogeneratePattern: '',
				hidden: false,
				id: 'text8829103852',
				max: 5000,
				min: 0,
				name: 'originalName',
				pattern: '',
				presentable: false,
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
		id: 'pbc_5829103848',
		indexes: [],
		listRule: '',
		name: 'files',
		system: false,
		type: 'base',
		updateRule: null,
		viewRule: ''
	});

	return app.save(collection);
}, (app) => {
	const collection = app.findCollectionByNameOrId('pbc_5829103848');

	return app.delete(collection);
});
