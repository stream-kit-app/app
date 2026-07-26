/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
	/** @type {Record<string, { category: string; tags: string[] }>} */
	const meta = {
		core: { category: 'core', tags: ['automation'] },
		bot: { category: 'chat', tags: ['bot', 'moderation', 'automation'] },
		twitch: { category: 'platform', tags: ['twitch'] },
		youtube: { category: 'platform', tags: ['youtube'] },
		discord: { category: 'platform', tags: ['discord'] },
		obs: { category: 'streaming', tags: ['obs', 'overlay'] },
		tts: { category: 'audio', tags: ['tts'] },
		websocket: { category: 'utility', tags: ['automation'] },
		rankings: { category: 'chat', tags: ['bot', 'automation'] },
		quotes: { category: 'chat', tags: ['bot'] },
		'stream-deck': { category: 'hardware', tags: ['automation'] }
	};

	const plugins = app.findAllRecords('plugins');

	for (const plugin of plugins) {
		const key = plugin.getString('key');
		const info = meta[key] ?? { category: 'utility', tags: [] };
		const name = plugin.getString('name') || key;
		const description = plugin.getString('description');
		const streamKitHint = 'Download the latest release from the Stream Kit marketplace.';

		if (!plugin.get('category')) {
			plugin.set('category', info.category);
		}

		const tags = plugin.get('tags');
		if (!tags || (Array.isArray(tags) && tags.length === 0)) {
			plugin.set('tags', info.tags);
		}

		if (!plugin.getString('content')) {
			const lines = [`# ${name}`, ''];
			if (description) {
				lines.push(description, '');
			}
			lines.push('## Install', '', streamKitHint);
			plugin.set('content', lines.join('\n'));
		}

		if (plugin.get('averageRating') == null) {
			plugin.set('averageRating', 0);
		}

		if (plugin.get('ratingCount') == null) {
			plugin.set('ratingCount', 0);
		}

		app.save(plugin);
	}
}, (app) => {
	// Non-destructive down: leave marketplace fields in place.
});
