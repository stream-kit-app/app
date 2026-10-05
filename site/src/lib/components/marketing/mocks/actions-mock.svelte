<script lang="ts">
	import Icon from '@iconify/svelte';

	import { Badge } from '@stream-kit/ui/badge';

	import MockFrame from '../mock-frame.svelte';

	const actions = [
		{ name: 'Welcome new followers', triggers: ['Twitch follow'], steps: 3, enabled: true },
		{ name: 'Hydration reminder', triggers: ['Every 20 min'], steps: 2, enabled: true },
		{ name: 'BRB scene', triggers: ['!brb', 'F9'], steps: 4, enabled: true },
		{
			name: 'Read super chats aloud',
			triggers: ['YouTube Super Chat'],
			steps: 2,
			enabled: false
		}
	];
</script>

<MockFrame>
	<div class="flex h-12 items-center gap-2 border-b border-rule px-5 text-sm">
		<span class="text-muted-foreground">Actions</span>
		<span
			class="ms-auto inline-flex h-7 items-center gap-1.5 rounded-lg bg-primary/15 px-2.5 text-xs font-semibold text-primary"
		>
			<Icon icon="ri:add-line" class="size-3.5" />
			New action
		</span>
	</div>
	<ul class="divide-y divide-rule">
		{#each actions as action (action.name)}
			<li class="flex items-center gap-4 px-5 py-3.5">
				<span
					class="flex size-9 shrink-0 items-center justify-center rounded-md border border-rule bg-dark-800 text-primary"
				>
					<Icon icon="ri:flashlight-line" class="size-4" />
				</span>
				<div class="min-w-0 flex-1">
					<p class="truncate text-sm font-semibold text-foreground">{action.name}</p>
					<div class="mt-1.5 flex flex-wrap gap-1">
						{#each action.triggers as trigger (trigger)}
							<Badge
								variant="outline"
								size="sm"
								class="font-medium text-muted-foreground"
							>
								{trigger}
							</Badge>
						{/each}
					</div>
				</div>
				<span class="hidden text-xs text-muted-foreground sm:inline"
					>{action.steps} steps</span
				>
				<span
					class={[
						'inline-flex h-5 w-10 shrink-0 items-center rounded-full border p-[2px]',
						action.enabled
							? 'justify-end border-primary bg-primary/15'
							: 'justify-start border-border'
					]}
				>
					<span
						class={[
							'size-4 rounded-full',
							action.enabled ? 'bg-primary' : 'bg-dark-400'
						]}
					></span>
				</span>
			</li>
		{/each}
	</ul>
</MockFrame>
