<script lang="ts">
	import { enhance } from '$app/forms';

	import { Panel } from '@stream-kit/ui/blueprint';
	import { Button } from '@stream-kit/ui/button';
	import { InputTextarea } from '@stream-kit/ui/input';

	import StarRating from './star-rating.svelte';

	type Props = {
		isAuthenticated: boolean;
		action?: string;
	};

	let { isAuthenticated, action = '?/upsertReview' }: Props = $props();

	let rating = $state(5);
	let body = $state('');
</script>

<Panel tone="solid">
	{#snippet header()}
		<h3 class="text-sm font-semibold text-foreground">Leave a review</h3>
	{/snippet}

	<div class="p-5">
		{#if !isAuthenticated}
			<p class="text-sm text-muted-foreground">
				Sign in to rate this plugin and leave a comment. Reviews from other users are still
				visible below.
			</p>
			<div class="mt-4 flex flex-col gap-3 opacity-60">
				<div class="flex items-center gap-2">
					<span class="text-sm text-muted-foreground">Your rating</span>
					<StarRating value={5} interactive disabled size="md" />
				</div>
				<InputTextarea placeholder="Share your experience…" disabled />
				<Button type="button" variant="outline" size="sm" disabled class="w-fit">
					Sign in to review
				</Button>
			</div>
		{:else}
			<form method="POST" {action} class="flex flex-col gap-3" use:enhance>
				<input type="hidden" name="rating" value={rating} />
				<div class="flex items-center gap-2">
					<span class="text-sm text-muted-foreground">Your rating</span>
					<StarRating
						value={rating}
						interactive
						size="md"
						onChange={(value) => {
							rating = value;
						}}
					/>
				</div>
				<InputTextarea name="body" bind:value={body} placeholder="Share your experience…" />
				<Button type="submit" variant="outline" size="sm" class="w-fit"
					>Submit review</Button
				>
			</form>
		{/if}
	</div>
</Panel>
