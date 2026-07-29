import type { RequestHandler } from './$types';

import { error } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params, locals }) => {
	const uuid = params.uuid?.trim();
	if (!uuid) {
		error(404, 'Overlay not found');
	}

	const pathSegments = params.path;
	const assetPath = Array.isArray(pathSegments)
		? pathSegments.join('/')
		: typeof pathSegments === 'string'
			? pathSegments
			: '';

	const result = await locals.services.overlays().getPublishedAsset(uuid, assetPath || undefined);

	if (result.isErr()) {
		if (result.error.code === 2000) {
			error(404, 'Overlay not found');
		}
		error(500, 'Failed to load overlay');
	}

	const asset = result.value;
	return new Response(asset.bytes, {
		headers: {
			'content-type': asset.contentType,
			'cache-control': 'public, max-age=60'
		}
	});
};
