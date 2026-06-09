import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => ({
	pluginKey: decodeURIComponent(params.pluginKey),
	itemKey: decodeURIComponent(params.itemKey)
});
