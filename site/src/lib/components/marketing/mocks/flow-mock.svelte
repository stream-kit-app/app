<script lang="ts">
	import Icon from '@iconify/svelte';

	import MockFrame from '../mock-frame.svelte';

	const handlers = [
		{
			icon: 'ri:layout-masonry-line',
			label: 'Send to Overlay',
			detail: 'Alerts · "{user} just followed!"'
		},
		{ icon: 'ri:volume-up-line', label: 'Play audio file', detail: 'sounds/follow.mp3' },
		{ icon: 'ri:chat-1-line', label: 'Send chat message', detail: 'Welcome aboard, {user}!' }
	];
</script>

<!-- Example action: one trigger, one condition, three handlers. Styled after the app's action editor. -->
<MockFrame class="mx-auto max-w-xl">
	<div class="flex items-center gap-2 border-b border-rule px-5 py-3">
		<span class="text-sm font-semibold text-foreground">Welcome new followers</span>
		<span
			class="ms-auto inline-flex h-5 w-10 items-center justify-end rounded-full border border-primary bg-primary/15 p-[2px]"
		>
			<span class="size-4 rounded-full bg-primary"></span>
		</span>
	</div>

	<div class="flex flex-col gap-3 p-5">
		<div class="flex items-center gap-3 rounded-lg border border-rule bg-background px-4 py-3">
			<span
				class="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary/15 text-primary"
			>
				<Icon icon="ri:twitch-fill" class="size-4" />
			</span>
			<div class="min-w-0">
				<p class="text-xs text-muted-foreground">Trigger</p>
				<p class="text-sm font-medium text-foreground">Twitch · New follower</p>
			</div>
		</div>

		<div class="flex items-center gap-3 rounded-lg border border-rule bg-background px-4 py-3">
			<span
				class="flex size-8 shrink-0 items-center justify-center rounded-md bg-secondary/15 text-secondary"
			>
				<Icon icon="ri:filter-3-line" class="size-4" />
			</span>
			<div class="min-w-0">
				<p class="text-xs text-muted-foreground">Condition</p>
				<p class="text-sm font-medium text-foreground">User is not a known bot</p>
			</div>
		</div>

		<div class="relative flex flex-col gap-2 ps-6">
			<span class="absolute top-0 bottom-4 left-2 w-px bg-rule-strong"></span>
			{#each handlers as handler (handler.label)}
				<div
					class="relative flex items-center gap-3 rounded-lg border border-rule bg-background px-4 py-2.5"
				>
					<span class="absolute top-1/2 -left-4 h-px w-4 bg-rule-strong"></span>
					<Icon icon={handler.icon} class="size-4 shrink-0 text-muted-foreground" />
					<p class="truncate text-sm text-foreground">{handler.label}</p>
					<p
						class="ms-auto hidden truncate font-mono text-xs text-muted-foreground sm:block"
					>
						{handler.detail}
					</p>
				</div>
			{/each}
		</div>
	</div>
</MockFrame>
