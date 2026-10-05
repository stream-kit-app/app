<script lang="ts">
	import Icon from '@iconify/svelte';

	import MockFrame from '../mock-frame.svelte';

	const running = [
		{ name: 'Read super chats aloud', progress: 60 },
		{ name: 'BRB scene', progress: 25 }
	];

	const logs = [
		{ time: '21:04', text: 'Welcome new followers · completed' },
		{ time: '21:03', text: 'OBS · switched to "Gameplay"' },
		{ time: '21:01', text: 'Hydration reminder · sent to chat' }
	];
</script>

<!-- Masonry-like dashboard with widget panels, as in the app. -->
<MockFrame class="bg-background">
	<div class="grid gap-3 p-4 sm:grid-cols-2">
		<div class="rounded-xl border border-rule bg-surface p-4">
			<p class="flex items-center gap-2 text-xs font-semibold text-foreground">
				<Icon icon="ri:play-circle-line" class="size-4 text-primary" />
				Running actions
			</p>
			<ul class="mt-3 flex flex-col gap-3">
				{#each running as action (action.name)}
					<li>
						<p class="truncate text-xs text-dark-100">{action.name}</p>
						<div class="mt-1.5 h-1 overflow-hidden rounded-full bg-dark-700">
							<div
								class="h-full rounded-full bg-primary"
								style:width="{action.progress}%"
							></div>
						</div>
					</li>
				{/each}
			</ul>
		</div>

		<div class="rounded-xl border border-rule bg-surface p-4">
			<p class="flex items-center gap-2 text-xs font-semibold text-foreground">
				<Icon icon="ri:database-2-line" class="size-4 text-primary" />
				Collections
			</p>
			<dl class="mt-3 grid grid-cols-2 gap-2 text-xs">
				<div class="rounded-md bg-dark-800 px-2.5 py-2">
					<dt class="text-muted-foreground">deaths</dt>
					<dd class="font-mono text-foreground">17</dd>
				</div>
				<div class="rounded-md bg-dark-800 px-2.5 py-2">
					<dt class="text-muted-foreground">wins</dt>
					<dd class="font-mono text-foreground">4</dd>
				</div>
			</dl>
		</div>

		<div class="rounded-xl border border-rule bg-surface p-4 sm:col-span-2">
			<p class="flex items-center gap-2 text-xs font-semibold text-foreground">
				<Icon icon="ri:file-list-3-line" class="size-4 text-primary" />
				Log entries
			</p>
			<ul class="mt-3 flex flex-col gap-2">
				{#each logs as log (log.time)}
					<li class="flex gap-3 text-xs">
						<span class="font-mono text-muted-foreground">{log.time}</span>
						<span class="truncate text-dark-100">{log.text}</span>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</MockFrame>
