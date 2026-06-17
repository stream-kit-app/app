import type { PageServerLoad } from './$types';

import { pocketbaseFileUrl } from '$lib/server/pocketbase/file-url';

export const load: PageServerLoad = async ({ locals }) => {
	const result = await locals.services.plugins().listLatest();

	if (result.isErr()) {
		return {
			plugins: [],
			error: result.error.message
		};
	}

	return {
		plugins: result.value.map(({ plugin, file, ...version }) => ({
			key: plugin.key,
			name: plugin.name,
			description: plugin.description,
			icon: plugin.icon,
			version: version.version,
			streamKitVersion: version.streamKitVersion,
			downloadUrl: file?.id && file.file ? pocketbaseFileUrl(file) : undefined,
			sha256: file?.sha256
		}))
	};
};
