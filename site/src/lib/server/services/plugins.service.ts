import type { ExpandedRecord } from '../pocketbase/expand-relations';
import type { ListPluginsFilters, PluginSort } from '$lib/plugins/marketplace';
import type { ServiceError } from './base.service';
import type { ResultAsync } from 'neverthrow';

import { fromPromise } from 'neverthrow';

import { filesSchema, pluginsSchema, pluginVersionsSchema } from '$lib/pocketbase/schema';

import { expand } from '../pocketbase/expand-relations';
import { Service } from './base.service';

const versionRelations = {
	plugin: pluginsSchema,
	file: filesSchema
} as const;

export type PluginVersionWithRelations = ExpandedRecord<
	typeof pluginVersionsSchema,
	typeof versionRelations
>;

function escapeFilterValue(value: string): string {
	return value.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

function sortExpression(sort: PluginSort): string {
	switch (sort) {
		case 'name':
			return 'plugin.name';
		case 'rating':
			return '-plugin.averageRating,-publishedAt';
		case 'newest':
		default:
			return '-publishedAt';
	}
}

function buildListFilter(filters: ListPluginsFilters): string {
	const parts = ['isLatest = true'];

	const search = filters.search?.trim();
	if (search) {
		const q = escapeFilterValue(search);
		parts.push(`(plugin.name ~ "${q}" || plugin.description ~ "${q}")`);
	}

	const categories = Array.isArray(filters.category)
		? filters.category
		: filters.category
			? [filters.category]
			: [];

	if (categories.length === 1) {
		parts.push(`plugin.category = "${categories[0]}"`);
	} else if (categories.length > 1) {
		const categoryFilter = categories
			.map((category) => `plugin.category = "${category}"`)
			.join(' || ');
		parts.push(`(${categoryFilter})`);
	}

	if (filters.tags?.length) {
		for (const tag of filters.tags) {
			parts.push(`plugin.tags ?= "${tag}"`);
		}
	}

	return parts.join(' && ');
}

export class PluginsService extends Service {
	listLatest(
		filters: ListPluginsFilters = {}
	): ResultAsync<PluginVersionWithRelations[], ServiceError<1000, 'LIST_LATEST_FAILED'>> {
		const sort = filters.sort ?? 'newest';

		return fromPromise(
			this.pocketbase.collection('plugin_versions').getFullList({
				filter: buildListFilter(filters),
				expand: 'plugin,file',
				sort: sortExpression(sort)
			}),
			(error) => this.error(1000, 'LIST_LATEST_FAILED', error)
		).map((records) =>
			records.map((record) => expand(pluginVersionsSchema, versionRelations).parse(record))
		);
	}

	getLatestByKey(
		key: string
	): ResultAsync<
		PluginVersionWithRelations | null,
		ServiceError<1001, 'GET_LATEST_BY_KEY_FAILED'>
	> {
		return this.fetchLatestByKey(key, 1001, 'GET_LATEST_BY_KEY_FAILED');
	}

	getByKey(
		key: string
	): ResultAsync<
		PluginVersionWithRelations | null,
		ServiceError<1002, 'GET_BY_KEY_FAILED'>
	> {
		return this.fetchLatestByKey(key, 1002, 'GET_BY_KEY_FAILED');
	}

	private fetchLatestByKey<Code extends 1001 | 1002, Message extends string>(
		key: string,
		code: Code,
		message: Message
	): ResultAsync<PluginVersionWithRelations | null, ServiceError<Code, Message>> {
		return fromPromise(
			(async () => {
				const plugin = await this.pocketbase
					.collection('plugins')
					.getFirstListItem(`key="${escapeFilterValue(key)}"`);

				return this.pocketbase.collection('plugin_versions').getList(1, 1, {
					filter: `isLatest = true && plugin="${plugin.id}"`,
					expand: 'plugin,file'
				});
			})(),
			(error) => this.error(code, message, error)
		).map((result) => {
			const record = result.items[0];

			if (!record) {
				return null;
			}

			return expand(pluginVersionsSchema, versionRelations).parse(record);
		});
	}
}
