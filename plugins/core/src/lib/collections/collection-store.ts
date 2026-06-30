import type { PluginStore } from '@stream-kit/plugin';

import type {
	CollectionChangedContext,
	CollectionCreateResult,
	CollectionCreatedContext,
	CollectionData,
	CollectionDeletedContext,
	CollectionEntry,
	CollectionLifetime,
	CollectionMutationResult,
	CollectionStoreEvent,
	CollectionSummary
} from './types';

const PERSISTENT_COLLECTIONS_KEY = 'collections';
const LEGACY_PERSISTENT_MAPS_KEY = 'maps';

type CollectionRegistry = Record<string, CollectionData>;

type ResolvedCollection = {
	lifetime: CollectionLifetime;
	data: CollectionData;
};

type CreatedListener = (context: CollectionCreatedContext) => void;
type ChangedListener = (context: CollectionChangedContext) => void;
type DeletedListener = (context: CollectionDeletedContext) => void;

export class CollectionStore {
	private store?: PluginStore;
	private sessionCollections: CollectionRegistry = {};
	private persistentCollections: CollectionRegistry = {};
	private loaded = false;
	private createdListeners = new Set<CreatedListener>();
	private changedListeners = new Set<ChangedListener>();
	private deletedListeners = new Set<DeletedListener>();

	bindStore(store: PluginStore): void {
		this.store = store;
	}

	private getStore(): PluginStore {
		if (!this.store) {
			throw new Error('CollectionStore is not initialized');
		}

		return this.store;
	}

	async load(): Promise<void> {
		if (this.loaded) {
			return;
		}

		const store = this.getStore();
		const existing = await store.get<CollectionRegistry>(PERSISTENT_COLLECTIONS_KEY);

		if (existing) {
			this.persistentCollections = existing;
		} else {
			const legacy = await store.get<CollectionRegistry>(LEGACY_PERSISTENT_MAPS_KEY);

			if (legacy) {
				this.persistentCollections = legacy;
				await store.set(PERSISTENT_COLLECTIONS_KEY, legacy);
				await store.delete(LEGACY_PERSISTENT_MAPS_KEY);
			}
		}

		this.loaded = true;
	}

	subscribe(event: 'created', listener: CreatedListener): () => void;
	subscribe(event: 'changed', listener: ChangedListener): () => void;
	subscribe(event: 'deleted', listener: DeletedListener): () => void;
	subscribe(
		event: CollectionStoreEvent,
		listener: CreatedListener | ChangedListener | DeletedListener
	): () => void {
		const listeners =
			event === 'created'
				? this.createdListeners
				: event === 'changed'
					? this.changedListeners
					: this.deletedListeners;

		listeners.add(listener as CreatedListener & ChangedListener & DeletedListener);

		return () => {
			listeners.delete(listener as CreatedListener & ChangedListener & DeletedListener);
		};
	}

	private normalizeName(name: string): string {
		return name.trim();
	}

	private normalizeKey(key: string): string {
		return key.trim();
	}

	private resolveCollection(collectionName: string): ResolvedCollection | undefined {
		const normalizedName = this.normalizeName(collectionName);

		if (!normalizedName) {
			return undefined;
		}

		if (Object.hasOwn(this.sessionCollections, normalizedName)) {
			return { lifetime: 'session', data: this.sessionCollections[normalizedName] };
		}

		if (Object.hasOwn(this.persistentCollections, normalizedName)) {
			return { lifetime: 'persistent', data: this.persistentCollections[normalizedName] };
		}

		return undefined;
	}

	collectionExists(collectionName: string): boolean {
		return this.resolveCollection(collectionName) !== undefined;
	}

	getLifetime(collectionName: string): CollectionLifetime | undefined {
		return this.resolveCollection(collectionName)?.lifetime;
	}

	listCollections(): CollectionSummary[] {
		const summaries: CollectionSummary[] = [];

		for (const collectionName of Object.keys(this.sessionCollections)) {
			summaries.push({ collectionName, lifetime: 'session' });
		}

		for (const collectionName of Object.keys(this.persistentCollections)) {
			summaries.push({ collectionName, lifetime: 'persistent' });
		}

		return summaries.sort((left, right) =>
			left.collectionName.localeCompare(right.collectionName)
		);
	}

	listCollectionNames(): string[] {
		return this.listCollections().map((entry) => entry.collectionName);
	}

	listEntries(collectionName: string): CollectionEntry[] {
		const resolved = this.resolveCollection(collectionName);

		if (!resolved) {
			return [];
		}

		return Object.entries(resolved.data)
			.map(([key, value]) => ({ key, value }))
			.sort((left, right) => left.key.localeCompare(right.key));
	}

	get(collectionName: string, key: string): string | undefined {
		const normalizedKey = this.normalizeKey(key);

		if (!normalizedKey) {
			return undefined;
		}

		return this.resolveCollection(collectionName)?.data[normalizedKey];
	}

	has(collectionName: string, key: string): boolean {
		return this.get(collectionName, key) !== undefined;
	}

	private async persist(lifetime: CollectionLifetime): Promise<void> {
		if (lifetime !== 'persistent') {
			return;
		}

		const store = this.getStore();
		await store.set(PERSISTENT_COLLECTIONS_KEY, this.persistentCollections);
	}

	private emitCreated(context: CollectionCreatedContext): void {
		for (const listener of this.createdListeners) {
			listener(context);
		}
	}

	private emitChanged(context: CollectionChangedContext): void {
		for (const listener of this.changedListeners) {
			listener(context);
		}
	}

	private emitDeleted(context: CollectionDeletedContext): void {
		for (const listener of this.deletedListeners) {
			listener(context);
		}
	}

	async create(
		collectionName: string,
		lifetime: CollectionLifetime
	): Promise<CollectionCreateResult> {
		const normalizedName = this.normalizeName(collectionName);

		if (!normalizedName) {
			return { ok: false, reason: 'invalid-name' };
		}

		if (this.collectionExists(normalizedName)) {
			return { ok: false, reason: 'already-exists' };
		}

		const registry =
			lifetime === 'session' ? this.sessionCollections : this.persistentCollections;
		registry[normalizedName] = {};
		await this.persist(lifetime);

		this.emitCreated({ collectionName: normalizedName, lifetime });

		return { ok: true };
	}

	async set(collectionName: string, key: string, value: string): Promise<CollectionMutationResult> {
		const normalizedKey = this.normalizeKey(key);
		const resolved = this.resolveCollection(collectionName);

		if (!normalizedKey) {
			return { ok: false, reason: 'invalid-input' };
		}

		if (!resolved) {
			return { ok: false, reason: 'collection-not-found' };
		}

		const { lifetime, data } = resolved;
		const normalizedName = this.normalizeName(collectionName);
		const previousValue = data[normalizedKey];
		const changeType = previousValue === undefined ? 'set' : 'update';

		data[normalizedKey] = value;
		await this.persist(lifetime);

		this.emitChanged({
			collectionName: normalizedName,
			lifetime,
			key: normalizedKey,
			value,
			previousValue,
			changeType
		});

		return { ok: true };
	}

	async update(
		collectionName: string,
		key: string,
		value: string
	): Promise<CollectionMutationResult> {
		const normalizedKey = this.normalizeKey(key);
		const resolved = this.resolveCollection(collectionName);

		if (!normalizedKey) {
			return { ok: false, reason: 'invalid-input' };
		}

		if (!resolved) {
			return { ok: false, reason: 'collection-not-found' };
		}

		const { lifetime, data } = resolved;
		const normalizedName = this.normalizeName(collectionName);

		if (!Object.hasOwn(data, normalizedKey)) {
			return { ok: false, reason: 'key-not-found' };
		}

		const previousValue = data[normalizedKey];
		data[normalizedKey] = value;
		await this.persist(lifetime);

		this.emitChanged({
			collectionName: normalizedName,
			lifetime,
			key: normalizedKey,
			value,
			previousValue,
			changeType: 'update'
		});

		return { ok: true };
	}

	async deleteKey(collectionName: string, key: string): Promise<CollectionMutationResult> {
		const normalizedKey = this.normalizeKey(key);
		const resolved = this.resolveCollection(collectionName);

		if (!normalizedKey) {
			return { ok: false, reason: 'invalid-input' };
		}

		if (!resolved) {
			return { ok: false, reason: 'collection-not-found' };
		}

		const { lifetime, data } = resolved;
		const normalizedName = this.normalizeName(collectionName);

		if (!Object.hasOwn(data, normalizedKey)) {
			return { ok: false, reason: 'key-not-found' };
		}

		const previousValue = data[normalizedKey];
		delete data[normalizedKey];
		await this.persist(lifetime);

		this.emitChanged({
			collectionName: normalizedName,
			lifetime,
			key: normalizedKey,
			value: '',
			previousValue,
			changeType: 'delete'
		});

		return { ok: true };
	}

	async clear(collectionName: string): Promise<CollectionMutationResult> {
		const resolved = this.resolveCollection(collectionName);

		if (!resolved) {
			return { ok: false, reason: 'collection-not-found' };
		}

		const { lifetime, data } = resolved;
		const normalizedName = this.normalizeName(collectionName);
		const hadKeys = Object.keys(data).length > 0;

		for (const key of Object.keys(data)) {
			delete data[key];
		}

		await this.persist(lifetime);

		if (hadKeys) {
			this.emitChanged({
				collectionName: normalizedName,
				lifetime,
				key: '',
				value: '',
				changeType: 'clear'
			});
		}

		return { ok: true };
	}

	async delete(collectionName: string): Promise<CollectionMutationResult> {
		const resolved = this.resolveCollection(collectionName);

		if (!resolved) {
			return { ok: false, reason: 'collection-not-found' };
		}

		const { lifetime } = resolved;
		const normalizedName = this.normalizeName(collectionName);
		const registry =
			lifetime === 'session' ? this.sessionCollections : this.persistentCollections;

		delete registry[normalizedName];
		await this.persist(lifetime);

		this.emitDeleted({ collectionName: normalizedName, lifetime });

		return { ok: true };
	}
}
