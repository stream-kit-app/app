import type { PageServerLoad } from './$types';

import {
	parsePluginCategories,
	parsePluginSort,
	parsePluginTags
} from '$lib/plugins/marketplace';
import { pocketbaseFileUrl } from '$lib/server/pocketbase/file-url';

export const load: PageServerLoad = async ({ locals, url }) => {
	const search = url.searchParams.get('q')?.trim() ?? '';
	const categories = parsePluginCategories(url.searchParams.get('category'));
	const tags = parsePluginTags(url.searchParams.get('tags'));
	const sort = parsePluginSort(url.searchParams.get('sort'));

	const result = await locals.services.plugins().listLatest({
		search: search || undefined,
		category: categories,
		tags,
		sort
	});

	if (result.isErr()) {
		return {
			plugins: [],
			filters: { search, categories, tags, sort },
			error: result.error.message
		};
	}

	return {
		filters: { search, categories, tags, sort },
		plugins: result.value.map(({ plugin, file, ...version }) => ({
			key: plugin.key,
			name: plugin.name,
			description: plugin.description,
			icon: plugin.icon,
			version: version.version,
			streamKitVersion: version.streamKitVersion,
			downloadUrl: file?.id && file.file ? pocketbaseFileUrl(file) : undefined,
			sha256: file?.sha256,
			category: plugin.category ?? null,
			tags: plugin.tags ?? [],
			averageRating: plugin.averageRating ?? 0,
			ratingCount: plugin.ratingCount ?? 0
		}))
	};
};
