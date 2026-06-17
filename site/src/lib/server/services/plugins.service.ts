import type { ExpandedRecord } from '../pocketbase/expand-relations';
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

export class PluginsService extends Service {
	listLatest(
		page: number = 1,
		pageSize: number = 10
	): ResultAsync<
		PluginVersionWithRelations[],
		ServiceError<1000, 'LIST_LATEST_FAILED'>
	> {
		return fromPromise(
			this.pocketbase.collection('plugin_versions').getFullList({
				filter: 'isLatest = true',
				expand: 'plugin,file',
				sort: '-publishedAt',
				page,
				perPage: pageSize
			}),
			(error) => this.error(1000, 'LIST_LATEST_FAILED', error)
		).map((records) =>
			records.map((record) =>
				expand(pluginVersionsSchema, versionRelations).parse(record)
			)
		);
	}

	getLatestByKey(
		key: string
	): ResultAsync<
		PluginVersionWithRelations | null,
		ServiceError<1001, 'GET_LATEST_BY_KEY_FAILED'>
	> {
		return fromPromise(
			(async () => {
				const plugin = await this.pocketbase
					.collection('plugins')
					.getFirstListItem(`key="${key}"`);

				return this.pocketbase.collection('plugin_versions').getList(1, 1, {
					filter: `isLatest = true && plugin="${plugin.id}"`,
					expand: 'plugin,file'
				});
			})(),
			(error) => this.error(1001, 'GET_LATEST_BY_KEY_FAILED', error)
		).map((result) => {
			const record = result.items[0];

			if (!record) {
				return null;
			}

			return expand(pluginVersionsSchema, versionRelations).parse(record);
		});
	}
}
