<script lang="ts">
	import { EmptyState } from '@stream-kit/ui/empty-state';

	import StarRating from './star-rating.svelte';

	type Review = {
		id: string;
		rating: number;
		body?: string;
		createdAt?: string;
		authorName: string;
	};

	type Props = {
		reviews: Review[];
	};

	let { reviews }: Props = $props();

	function formatDate(value?: string) {
		if (!value) return '';
		const date = new Date(value.includes('T') ? value : value.replace(' ', 'T'));
		if (Number.isNaN(date.getTime())) return value;
		return date.toLocaleDateString(undefined, {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	}
</script>

{#if reviews.length === 0}
	<EmptyState
		icon="ri:chat-3-line"
		title="No reviews yet"
		description="Be the first to leave a review for this plugin."
		class="min-h-0 p-0"
	/>
{:else}
	<ul class="flex flex-col gap-3">
		{#each reviews as review (review.id)}
			<li class="rounded-xl border border-dark-600 bg-dark-800 p-4">
				<div class="flex flex-wrap items-center justify-between gap-2">
					<div class="flex items-center gap-2">
						<span class="text-sm font-medium text-dark-50">{review.authorName}</span>
						<StarRating value={review.rating} />
					</div>
					{#if review.createdAt}
						<time class="text-xs text-dark-400" datetime={review.createdAt}>
							{formatDate(review.createdAt)}
						</time>
					{/if}
				</div>
				{#if review.body}
					<p class="mt-3 text-sm leading-relaxed whitespace-pre-wrap text-dark-300">
						{review.body}
					</p>
				{/if}
			</li>
		{/each}
	</ul>
{/if}
