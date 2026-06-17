import type { PluginAppApi } from '@stream-kit/plugin';
import type { SelectItem } from '@stream-kit/plugin';

import { getObsClient } from './obs-call';

const CACHE_TTL_MS = 30_000;

type CacheEntry<T> = {
	expiresAt: number;
	value: T;
};

const cache = new Map<string, CacheEntry<SelectItem[]>>();

export function invalidateObsCatalog(): void {
	cache.clear();
}

function getCached(key: string): SelectItem[] | undefined {
	const entry = cache.get(key);

	if (!entry) {
		return undefined;
	}

	if (Date.now() > entry.expiresAt) {
		cache.delete(key);
		return undefined;
	}

	return entry.value;
}

function setCached(key: string, value: SelectItem[]): SelectItem[] {
	cache.set(key, {
		value,
		expiresAt: Date.now() + CACHE_TTL_MS
	});
	return value;
}

async function fetchSceneItems(app: PluginAppApi): Promise<SelectItem[]> {
	const client = getObsClient(app);

	if (!client) {
		return [];
	}

	const response = await client.call('GetSceneList');
	const scenes = (response.scenes ?? []) as Array<{ sceneName: string }>;

	return scenes.map((scene) => ({
		value: scene.sceneName,
		label: scene.sceneName
	}));
}

async function fetchInputItems(app: PluginAppApi, inputKind?: string): Promise<SelectItem[]> {
	const client = getObsClient(app);

	if (!client) {
		return [];
	}

	const response = await client.call('GetInputList', {
		inputKind
	});
	const inputs = (response.inputs ?? []) as Array<{ inputName: string; inputKind?: string }>;

	return inputs.map((input) => ({
		value: input.inputName,
		label: input.inputKind ? `${input.inputName} (${input.inputKind})` : input.inputName
	}));
}

async function fetchTransitionItems(app: PluginAppApi): Promise<SelectItem[]> {
	const client = getObsClient(app);

	if (!client) {
		return [];
	}

	const response = await client.call('GetSceneTransitionList');
	const transitions = (response.transitions ?? []) as Array<{ transitionName: string }>;

	return transitions.map((transition) => ({
		value: transition.transitionName,
		label: transition.transitionName
	}));
}

async function fetchFilterItems(app: PluginAppApi, sourceName: string): Promise<SelectItem[]> {
	const client = getObsClient(app);

	if (!client || !sourceName.trim()) {
		return [];
	}

	const response = await client.call('GetSourceFilterList', {
		sourceName: sourceName.trim()
	});
	const filters = (response.filters ?? []) as Array<{ filterName: string; filterEnabled?: boolean }>;

	return filters.map((filter) => ({
		value: filter.filterName,
		label: filter.filterEnabled === false ? `${filter.filterName} (disabled)` : filter.filterName
	}));
}

async function fetchFilterKindItems(app: PluginAppApi): Promise<SelectItem[]> {
	const client = getObsClient(app);

	if (!client) {
		return [];
	}

	const response = await client.call('GetSourceFilterKindList');
	const filterKinds = (response.sourceFilterKinds ?? []) as string[];

	return filterKinds.map((filterKind) => ({
		value: filterKind,
		label: filterKind
	}));
}

const MEDIA_INPUT_KINDS = ['ffmpeg_source', 'vlc_source', 'media_source'] as const;

async function fetchMediaInputItems(app: PluginAppApi): Promise<SelectItem[]> {
	const client = getObsClient(app);

	if (!client) {
		return [];
	}

	const items: SelectItem[] = [];
	const seen = new Set<string>();

	for (const inputKind of MEDIA_INPUT_KINDS) {
		const response = await client.call('GetInputList', { inputKind });
		const inputs = (response.inputs ?? []) as Array<{ inputName: string; inputKind?: string }>;

		for (const input of inputs) {
			if (seen.has(input.inputName)) {
				continue;
			}

			seen.add(input.inputName);
			items.push({
				value: input.inputName,
				label: input.inputKind ? `${input.inputName} (${input.inputKind})` : input.inputName
			});
		}
	}

	return items.sort((left, right) => left.label.localeCompare(right.label));
}

async function fetchHotkeyItems(app: PluginAppApi): Promise<SelectItem[]> {
	const client = getObsClient(app);

	if (!client) {
		return [];
	}

	const response = await client.call('GetHotkeyList');
	const hotkeys = (response.hotkeys ?? []) as string[];

	return hotkeys.map((hotkeyName) => ({
		value: hotkeyName,
		label: hotkeyName
	}));
}

export async function loadSceneItems(app: PluginAppApi): Promise<SelectItem[]> {
	const cached = getCached('scenes');

	if (cached) {
		return cached;
	}

	try {
		return setCached('scenes', await fetchSceneItems(app));
	} catch {
		return [];
	}
}

export async function loadInputItems(
	app: PluginAppApi,
	inputKind?: string
): Promise<SelectItem[]> {
	const cacheKey = inputKind ? `inputs:${inputKind}` : 'inputs';
	const cached = getCached(cacheKey);

	if (cached) {
		return cached;
	}

	try {
		return setCached(cacheKey, await fetchInputItems(app, inputKind));
	} catch {
		return [];
	}
}

export async function loadTransitionItems(app: PluginAppApi): Promise<SelectItem[]> {
	const cached = getCached('transitions');

	if (cached) {
		return cached;
	}

	try {
		return setCached('transitions', await fetchTransitionItems(app));
	} catch {
		return [];
	}
}

export async function loadHotkeyItems(app: PluginAppApi): Promise<SelectItem[]> {
	const cached = getCached('hotkeys');

	if (cached) {
		return cached;
	}

	try {
		return setCached('hotkeys', await fetchHotkeyItems(app));
	} catch {
		return [];
	}
}

export async function loadFilterItems(
	app: PluginAppApi,
	sourceName: string
): Promise<SelectItem[]> {
	const cacheKey = `filters:${sourceName.trim()}`;

	if (!sourceName.trim()) {
		return [];
	}

	const cached = getCached(cacheKey);

	if (cached) {
		return cached;
	}

	try {
		return setCached(cacheKey, await fetchFilterItems(app, sourceName));
	} catch {
		return [];
	}
}

export async function loadFilterKindItems(app: PluginAppApi): Promise<SelectItem[]> {
	const cached = getCached('filter-kinds');

	if (cached) {
		return cached;
	}

	try {
		return setCached('filter-kinds', await fetchFilterKindItems(app));
	} catch {
		return [];
	}
}

export async function loadMediaInputItems(app: PluginAppApi): Promise<SelectItem[]> {
	const cached = getCached('media-inputs');

	if (cached) {
		return cached;
	}

	try {
		return setCached('media-inputs', await fetchMediaInputItems(app));
	} catch {
		return [];
	}
}

export async function getSceneItemId(
	app: PluginAppApi,
	sceneName: string,
	sourceName: string
): Promise<number | undefined> {
	const client = getObsClient(app);

	if (!client) {
		return undefined;
	}

	try {
		const response = await client.call('GetSceneItemId', {
			sceneName,
			sourceName
		});

		return response.sceneItemId;
	} catch {
		return undefined;
	}
}
