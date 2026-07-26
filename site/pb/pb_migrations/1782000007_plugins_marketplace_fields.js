/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
	const collection = app.findCollectionByNameOrId('pbc_2111211931');

	collection.fields.add(
		new Field({
			autogeneratePattern: '',
			hidden: false,
			id: 'text7929103853',
			max: 0,
			min: 0,
			name: 'content',
			pattern: '',
			presentable: false,
			required: false,
			system: false,
			type: 'text'
		})
	);

	collection.fields.add(
		new Field({
			hidden: false,
			id: 'select8929103854',
			maxSelect: 1,
			name: 'category',
			presentable: true,
			required: false,
			system: false,
			type: 'select',
			values: ['core', 'platform', 'streaming', 'chat', 'audio', 'hardware', 'utility']
		})
	);

	collection.fields.add(
		new Field({
			hidden: false,
			id: 'select9929103855',
			maxSelect: 9,
			name: 'tags',
			presentable: false,
			required: false,
			system: false,
			type: 'select',
			values: [
				'twitch',
				'youtube',
				'discord',
				'obs',
				'bot',
				'tts',
				'overlay',
				'moderation',
				'automation'
			]
		})
	);

	collection.fields.add(
		new Field({
			hidden: false,
			id: 'number1029103856',
			max: 5,
			min: 0,
			name: 'averageRating',
			onlyInt: false,
			presentable: false,
			required: false,
			system: false,
			type: 'number'
		})
	);

	collection.fields.add(
		new Field({
			hidden: false,
			id: 'number1129103857',
			max: null,
			min: 0,
			name: 'ratingCount',
			onlyInt: true,
			presentable: false,
			required: false,
			system: false,
			type: 'number'
		})
	);

	return app.save(collection);
}, (app) => {
	const collection = app.findCollectionByNameOrId('pbc_2111211931');

	collection.fields.removeByName('content');
	collection.fields.removeByName('category');
	collection.fields.removeByName('tags');
	collection.fields.removeByName('averageRating');
	collection.fields.removeByName('ratingCount');

	return app.save(collection);
});
