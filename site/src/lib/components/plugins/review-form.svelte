<script lang="ts">
	import { enhance } from '$app/forms';

	import { Button } from '@stream-kit/ui/button';

	import StarRating from './star-rating.svelte';

	type Props = {
		isAuthenticated: boolean;
		action?: string;
	};

	let { isAuthenticated, action = '?/upsertReview' }: Props = $props();

	let rating = $state(5);
	let body = $state('');

	const fieldClass =
		'min-h-24 w-full rounded-lg border border-border bg-dark-700 px-3 py-2 text-sm text-dark-50 outline-none placeholder:text-dark-400 hover:border-dark-400 focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50';
</script>

<div class="rounded-xl border border-dark-600 bg-dark-800 p-4">
	<h3 class="text-base font-semibold text-dark-50">Leave a review</h3>

	{#if !isAuthenticated}
		<p class="mt-2 text-sm text-dark-300">
			Sign in to rate this plugin and leave a comment. Reviews from other users are still visible
			below.
		</p>
		<div class="mt-4 flex flex-col gap-3 opacity-60">
			<div class="flex items-center gap-2">
				<span class="text-sm text-dark-300">Your rating</span>
				<StarRating value={5} interactive disabled size="md" />
			</div>
			<textarea class={fieldClass} placeholder="Share your experience…" disabled></textarea>
			<Button type="button" variant="outline" size="sm" disabled class="w-fit">
				Sign in to review
			</Button>
		</div>
	{:else}
		<form method="POST" {action} class="mt-4 flex flex-col gap-3" use:enhance>
			<input type="hidden" name="rating" value={rating} />
			<div class="flex items-center gap-2">
				<span class="text-sm text-dark-300">Your rating</span>
				<StarRating
					value={rating}
					interactive
					size="md"
					onChange={(value) => {
						rating = value;
					}}
				/>
			</div>
			<textarea
				name="body"
				bind:value={body}
				class={fieldClass}
				placeholder="Share your experience…"
			></textarea>
			<Button type="submit" variant="outline" size="sm" class="w-fit">Submit review</Button>
		</form>
	{/if}
</div>
