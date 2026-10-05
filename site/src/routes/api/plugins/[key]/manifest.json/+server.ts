import { pocketbaseFileUrl } from '#lib/server/pocketbase/file-url.js';

import type { RequestHandler } from './$types';

const PLUGIN_DEPENDENCIES: Record<string, string[]> = {
	bot: [],
	core: [],
	obs: ['core'],
	tts: ['core'],
	twitch: ['core'],
	websocket: ['core'],
	youtube: ['core']
};

export const GET: RequestHandler = async ({ locals, params }) => {
	const result = await locals.services.plugins().getLatestByKey(params.key);

	if (result.isErr()) {
		return Response.json({ message: result.error.message }, { status: 500 });
	}

	const version = result.value;

	if (!version) {
		return Response.json({ message: 'Plugin not found' }, { status: 404 });
	}

	const { plugin, file } = version;

	if (!file?.id || !file.file) {
		return Response.json({ message: 'Plugin release file not found' }, { status: 404 });
	}

	return Response.json(
		{
			key: plugin.key,
			name: plugin.name,
			version: version.version,
			description: plugin.description,
			icon: plugin.icon,
			entry: version.entry,
			dependencies: PLUGIN_DEPENDENCIES[plugin.key] ?? [],
			streamKitVersion: version.streamKitVersion,
			downloadUrl: pocketbaseFileUrl(file),
			sha256: file.sha256
		},
		{
			headers: {
				'Cache-Control': 'no-cache'
			}
		}
	);
};
