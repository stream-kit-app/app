import type { PluginAppApi } from '@stream-kit/app/api';
import type { SelectItem } from '@stream-kit/core';

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
