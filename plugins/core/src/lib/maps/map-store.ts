import type { PluginStore } from '@stream-kit/app/api';

import type {
	MapChangedContext,
	MapCreateResult,
	MapCreatedContext,
	MapData,
	MapEntry,
	MapLifetime,
	MapMutationResult,
	MapStoreEvent,
	MapSummary
} from './types';

const PERSISTENT_MAPS_KEY = 'maps';

type MapRegistry = Record<string, MapData>;

type ResolvedMap = {
	lifetime: MapLifetime;
	map: MapData;
};

type CreatedListener = (context: MapCreatedContext) => void;
type ChangedListener = (context: MapChangedContext) => void;

export class MapStore {
	private store?: PluginStore;
	private sessionMaps: MapRegistry = {};
	private persistentMaps: MapRegistry = {};
	private loaded = false;
	private createdListeners = new Set<CreatedListener>();
	private changedListeners = new Set<ChangedListener>();

	bindStore(store: PluginStore): void {
		this.store = store;
	}

	private getStore(): PluginStore {
		if (!this.store) {
			throw new Error('MapStore is not initialized');
		}

		return this.store;
	}

	async load(): Promise<void> {
		if (this.loaded) {
			return;
		}

		const store = this.getStore();
		this.persistentMaps = (await store.get<MapRegistry>(PERSISTENT_MAPS_KEY)) ?? {};
		this.loaded = true;
	}

	subscribe(event: 'created', listener: CreatedListener): () => void;
	subscribe(event: 'changed', listener: ChangedListener): () => void;
	subscribe(
		event: MapStoreEvent,
		listener: CreatedListener | ChangedListener
	): () => void {
		const listeners = event === 'created' ? this.createdListeners : this.changedListeners;

		listeners.add(listener as CreatedListener & ChangedListener);

		return () => {
			listeners.delete(listener as CreatedListener & ChangedListener);
		};
	}

	private normalizeName(name: string): string {
		return name.trim();
	}

	private normalizeKey(key: string): string {
		return key.trim();
	}

	private resolveMap(mapName: string): ResolvedMap | undefined {
		const normalizedName = this.normalizeName(mapName);

		if (!normalizedName) {
			return undefined;
		}

		if (Object.hasOwn(this.sessionMaps, normalizedName)) {
			return { lifetime: 'session', map: this.sessionMaps[normalizedName] };
		}

		if (Object.hasOwn(this.persistentMaps, normalizedName)) {
			return { lifetime: 'persistent', map: this.persistentMaps[normalizedName] };
		}

		return undefined;
	}

	mapExists(mapName: string): boolean {
		return this.resolveMap(mapName) !== undefined;
	}

	getLifetime(mapName: string): MapLifetime | undefined {
		return this.resolveMap(mapName)?.lifetime;
	}

	listMaps(): MapSummary[] {
		const summaries: MapSummary[] = [];

		for (const mapName of Object.keys(this.sessionMaps)) {
			summaries.push({ mapName, lifetime: 'session' });
		}

		for (const mapName of Object.keys(this.persistentMaps)) {
			summaries.push({ mapName, lifetime: 'persistent' });
		}

		return summaries.sort((left, right) => left.mapName.localeCompare(right.mapName));
	}

	listMapNames(): string[] {
		return this.listMaps().map((entry) => entry.mapName);
	}

	listEntries(mapName: string): MapEntry[] {
		const resolved = this.resolveMap(mapName);

		if (!resolved) {
			return [];
		}

		return Object.entries(resolved.map)
			.map(([key, value]) => ({ key, value }))
			.sort((left, right) => left.key.localeCompare(right.key));
	}

	get(mapName: string, key: string): string | undefined {
		const normalizedKey = this.normalizeKey(key);

		if (!normalizedKey) {
			return undefined;
		}

		return this.resolveMap(mapName)?.map[normalizedKey];
	}

	has(mapName: string, key: string): boolean {
		return this.get(mapName, key) !== undefined;
	}

	private async persist(lifetime: MapLifetime): Promise<void> {
		if (lifetime !== 'persistent') {
			return;
		}

		const store = this.getStore();
		await store.set(PERSISTENT_MAPS_KEY, this.persistentMaps);
	}

	private emitCreated(context: MapCreatedContext): void {
		for (const listener of this.createdListeners) {
			listener(context);
		}
	}

	private emitChanged(context: MapChangedContext): void {
		for (const listener of this.changedListeners) {
			listener(context);
		}
	}

	async create(mapName: string, lifetime: MapLifetime): Promise<MapCreateResult> {
		const normalizedName = this.normalizeName(mapName);

		if (!normalizedName) {
			return { ok: false, reason: 'invalid-name' };
		}

		if (this.mapExists(normalizedName)) {
			return { ok: false, reason: 'already-exists' };
		}

		const registry = lifetime === 'session' ? this.sessionMaps : this.persistentMaps;
		registry[normalizedName] = {};
		await this.persist(lifetime);

		this.emitCreated({ mapName: normalizedName, lifetime });

		return { ok: true };
	}

	async set(mapName: string, key: string, value: string): Promise<MapMutationResult> {
		const normalizedKey = this.normalizeKey(key);
		const resolved = this.resolveMap(mapName);

		if (!normalizedKey) {
			return { ok: false, reason: 'invalid-input' };
		}

		if (!resolved) {
			return { ok: false, reason: 'map-not-found' };
		}

		const { lifetime, map } = resolved;
		const normalizedName = this.normalizeName(mapName);
		const previousValue = map[normalizedKey];
		const changeType = previousValue === undefined ? 'set' : 'update';

		map[normalizedKey] = value;
		await this.persist(lifetime);

		this.emitChanged({
			mapName: normalizedName,
			lifetime,
			key: normalizedKey,
			value,
			previousValue,
			changeType
		});

		return { ok: true };
	}

	async update(mapName: string, key: string, value: string): Promise<MapMutationResult> {
		const normalizedKey = this.normalizeKey(key);
		const resolved = this.resolveMap(mapName);

		if (!normalizedKey) {
			return { ok: false, reason: 'invalid-input' };
		}

		if (!resolved) {
			return { ok: false, reason: 'map-not-found' };
		}

		const { lifetime, map } = resolved;
		const normalizedName = this.normalizeName(mapName);

		if (!Object.hasOwn(map, normalizedKey)) {
			return { ok: false, reason: 'key-not-found' };
		}

		const previousValue = map[normalizedKey];
		map[normalizedKey] = value;
		await this.persist(lifetime);

		this.emitChanged({
			mapName: normalizedName,
			lifetime,
			key: normalizedKey,
			value,
			previousValue,
			changeType: 'update'
		});

		return { ok: true };
	}

	async deleteKey(mapName: string, key: string): Promise<MapMutationResult> {
		const normalizedKey = this.normalizeKey(key);
		const resolved = this.resolveMap(mapName);

		if (!normalizedKey) {
			return { ok: false, reason: 'invalid-input' };
		}

		if (!resolved) {
			return { ok: false, reason: 'map-not-found' };
		}

		const { lifetime, map } = resolved;
		const normalizedName = this.normalizeName(mapName);

		if (!Object.hasOwn(map, normalizedKey)) {
			return { ok: false, reason: 'key-not-found' };
		}

		const previousValue = map[normalizedKey];
		delete map[normalizedKey];
		await this.persist(lifetime);

		this.emitChanged({
			mapName: normalizedName,
			lifetime,
			key: normalizedKey,
			value: '',
			previousValue,
			changeType: 'delete'
		});

		return { ok: true };
	}

	async clear(mapName: string): Promise<MapMutationResult> {
		const resolved = this.resolveMap(mapName);

		if (!resolved) {
			return { ok: false, reason: 'map-not-found' };
		}

		const { lifetime, map } = resolved;
		const normalizedName = this.normalizeName(mapName);
		const hadKeys = Object.keys(map).length > 0;

		for (const key of Object.keys(map)) {
			delete map[key];
		}

		await this.persist(lifetime);

		if (hadKeys) {
			this.emitChanged({
				mapName: normalizedName,
				lifetime,
				key: '',
				value: '',
				changeType: 'clear'
			});
		}

		return { ok: true };
	}

	async delete(mapName: string): Promise<MapMutationResult> {
		const resolved = this.resolveMap(mapName);

		if (!resolved) {
			return { ok: false, reason: 'map-not-found' };
		}

		const { lifetime } = resolved;
		const normalizedName = this.normalizeName(mapName);
		const registry = lifetime === 'session' ? this.sessionMaps : this.persistentMaps;

		delete registry[normalizedName];
		await this.persist(lifetime);

		return { ok: true };
	}
}
