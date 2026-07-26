import type { PluginsCategoryOptions, PluginsTagsOptions } from '$lib/pocketbase/types';

export const PLUGIN_CATEGORIES = [
	'core',
	'platform',
	'streaming',
	'chat',
	'audio',
	'hardware',
	'utility'
] as const satisfies readonly PluginsCategoryOptions[];

export const PLUGIN_TAGS = [
	'twitch',
	'youtube',
	'discord',
	'obs',
	'bot',
	'tts',
	'overlay',
	'moderation',
	'automation'
] as const satisfies readonly PluginsTagsOptions[];

export type PluginCategory = (typeof PLUGIN_CATEGORIES)[number];
export type PluginTag = (typeof PLUGIN_TAGS)[number];
export type PluginSort = 'newest' | 'name' | 'rating';

export const PLUGIN_CATEGORY_LABELS: Record<PluginCategory, string> = {
	core: 'Core',
	platform: 'Platform',
	streaming: 'Streaming',
	chat: 'Chat',
	audio: 'Audio',
	hardware: 'Hardware',
	utility: 'Utility'
};

export const PLUGIN_TAG_LABELS: Record<PluginTag, string> = {
	twitch: 'Twitch',
	youtube: 'YouTube',
	discord: 'Discord',
	obs: 'OBS',
	bot: 'Bot',
	tts: 'TTS',
	overlay: 'Overlay',
	moderation: 'Moderation',
	automation: 'Automation'
};

export const PLUGIN_SORT_OPTIONS: { value: PluginSort; label: string }[] = [
	{ value: 'newest', label: 'Newest' },
	{ value: 'name', label: 'Name A–Z' },
	{ value: 'rating', label: 'Highest rated' }
];

export type ListPluginsFilters = {
	search?: string;
	category?: PluginCategory | PluginCategory[];
	tags?: PluginTag[];
	sort?: PluginSort;
};

export function parsePluginSort(value: string | null | undefined): PluginSort {
	if (value === 'name' || value === 'rating' || value === 'newest') {
		return value;
	}
	return 'newest';
}

export function parsePluginCategories(
	value: string | null | undefined
): PluginCategory[] {
	if (!value) return [];
	const allowed = new Set<string>(PLUGIN_CATEGORIES);
	return value
		.split(',')
		.map((part) => part.trim())
		.filter((part): part is PluginCategory => allowed.has(part));
}

export function parsePluginTags(value: string | null | undefined): PluginTag[] {
	if (!value) return [];
	const allowed = new Set<string>(PLUGIN_TAGS);
	return value
		.split(',')
		.map((part) => part.trim())
		.filter((part): part is PluginTag => allowed.has(part));
}
