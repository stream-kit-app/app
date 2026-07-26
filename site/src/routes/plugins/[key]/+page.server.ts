import type { Actions, PageServerLoad } from './$types';

import { error, fail } from '@sveltejs/kit';

import { renderPluginMarkdown } from '$lib/server/markdown';
import { pocketbaseFileUrl } from '$lib/server/pocketbase/file-url';

export const load: PageServerLoad = async ({ locals, params, url }) => {
	const tabParam = url.searchParams.get('tab');
	const tab = tabParam === 'reviews' ? 'reviews' : 'overview';

	const result = await locals.services.plugins().getByKey(params.key);

	if (result.isErr()) {
		error(500, result.error.message);
	}

	const record = result.value;
	if (!record) {
		error(404, 'Plugin not found');
	}

	const { plugin, file, ...version } = record;

	const reviewsResult = await locals.services.reviews().listByPlugin(plugin.id!);
	const reviews = reviewsResult.isOk()
		? reviewsResult.value.map((review) => ({
				id: review.id!,
				rating: review.rating,
				body: review.body ?? '',
				createdAt: review.createdAt,
				authorName: review.user?.name?.trim() || review.user?.email || 'Anonymous'
			}))
		: [];

	return {
		tab,
		isAuthenticated: Boolean(locals.user),
		plugin: {
			id: plugin.id!,
			key: plugin.key,
			name: plugin.name,
			description: plugin.description ?? '',
			icon: plugin.icon ?? 'mdi:puzzle-outline',
			contentHtml: renderPluginMarkdown(plugin.content),
			category: plugin.category ?? null,
			tags: plugin.tags ?? [],
			averageRating: plugin.averageRating ?? 0,
			ratingCount: plugin.ratingCount ?? 0,
			version: version.version,
			streamKitVersion: version.streamKitVersion,
			downloadUrl: file?.id && file.file ? pocketbaseFileUrl(file) : undefined
		},
		reviews,
		reviewsError: reviewsResult.isErr() ? reviewsResult.error.message : null
	};
};

export const actions: Actions = {
	upsertReview: async ({ locals, request, params }) => {
		if (!locals.user) {
			return fail(401, {
				message: 'Authentication required. Sign in to leave a review.'
			});
		}

		const formData = await request.formData();
		const rating = Number(formData.get('rating'));
		const body = String(formData.get('body') ?? '');

		if (!Number.isFinite(rating) || rating < 1 || rating > 5) {
			return fail(400, { message: 'Rating must be between 1 and 5.' });
		}

		const pluginResult = await locals.services.plugins().getByKey(params.key);
		if (pluginResult.isErr() || !pluginResult.value) {
			return fail(404, { message: 'Plugin not found.' });
		}

		const upsertResult = await locals.services.reviews().upsert(
			pluginResult.value.plugin.id!,
			locals.user.id,
			{ rating, body }
		);

		if (upsertResult.isErr()) {
			return fail(500, { message: upsertResult.error.message });
		}

		return { success: true };
	}
};
