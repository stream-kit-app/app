import type { ExpandedRecord } from '../pocketbase/expand-relations';
import type { ServiceError } from './base.service';
import type { ResultAsync } from 'neverthrow';

import { errAsync, fromPromise, okAsync } from 'neverthrow';
import { z } from 'zod';

import { pluginReviewsSchema } from '$lib/pocketbase/schema';

import { expand } from '../pocketbase/expand-relations';
import { Service } from './base.service';

const reviewUserSchema = z.object({
	id: z.string(),
	name: z.string().optional(),
	email: z.string().optional()
});

const reviewRelations = {
	user: reviewUserSchema
} as const;

export type PluginReviewWithUser = ExpandedRecord<
	typeof pluginReviewsSchema,
	typeof reviewRelations
>;

export type UpsertReviewInput = {
	rating: number;
	body?: string;
};

export class ReviewsService extends Service {
	listByPlugin(
		pluginId: string
	): ResultAsync<PluginReviewWithUser[], ServiceError<2000, 'LIST_REVIEWS_FAILED'>> {
		return fromPromise(
			this.pocketbase.collection('plugin_reviews').getFullList({
				filter: `plugin="${pluginId}"`,
				expand: 'user',
				sort: '-createdAt'
			}),
			(error) => this.error(2000, 'LIST_REVIEWS_FAILED', error)
		).map((records) =>
			records.map((record) => expand(pluginReviewsSchema, reviewRelations).parse(record))
		);
	}

	upsert(
		pluginId: string,
		userId: string,
		input: UpsertReviewInput
	): ResultAsync<PluginReviewWithUser, ServiceError<2001, 'UPSERT_REVIEW_FAILED'>> {
		const rating = Math.round(input.rating);
		if (rating < 1 || rating > 5) {
			return errAsync(this.error(2001, 'UPSERT_REVIEW_FAILED', new Error('Invalid rating')));
		}

		const body = input.body?.trim() ?? '';

		return fromPromise(
			(async () => {
				try {
					const existing = await this.pocketbase
						.collection('plugin_reviews')
						.getFirstListItem(`plugin="${pluginId}" && user="${userId}"`);

					return this.pocketbase.collection('plugin_reviews').update(
						existing.id,
						{ rating, body },
						{ expand: 'user' }
					);
				} catch {
					return this.pocketbase.collection('plugin_reviews').create(
						{
							plugin: pluginId,
							user: userId,
							rating,
							body
						},
						{ expand: 'user' }
					);
				}
			})(),
			(error) => this.error(2001, 'UPSERT_REVIEW_FAILED', error)
		).andThen((record) => {
			try {
				return okAsync(expand(pluginReviewsSchema, reviewRelations).parse(record));
			} catch (error) {
				return errAsync(this.error(2001, 'UPSERT_REVIEW_FAILED', error));
			}
		});
	}
}
