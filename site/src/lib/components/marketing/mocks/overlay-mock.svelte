<script lang="ts">
	import Icon from '@iconify/svelte';

	import MockFrame from '../mock-frame.svelte';

	const chat = [
		{ user: 'pixelpanda', message: 'that clutch was insane' },
		{ user: 'moonlit', message: 'GG!' },
		{ user: 'kiwi_dev', message: 'hydrate check 💧' }
	];
</script>

<!-- A 16:9 "stream" with three overlay widgets on top. -->
<MockFrame>
	<div class="relative aspect-video bg-dark-900">
		<div class="absolute inset-0 flex items-center justify-center">
			<Icon icon="ri:gamepad-line" class="size-16 text-dark-700" />
		</div>

		<!-- Alert -->
		<div
			class="absolute top-[8%] left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-xl border border-rule bg-background/90 px-4 py-2.5 shadow-lg backdrop-blur"
		>
			<span
				class="flex size-8 items-center justify-center rounded-md bg-brand text-brand-foreground"
			>
				<Icon icon="ri:heart-3-fill" class="size-4" />
			</span>
			<div>
				<p class="text-sm font-semibold text-foreground">pixelpanda</p>
				<p class="text-xs text-muted-foreground">just followed!</p>
			</div>
		</div>

		<!-- Chatbox -->
		<div
			class="absolute bottom-[8%] left-[4%] hidden w-[38%] flex-col gap-1.5 rounded-xl border border-rule bg-background/80 p-3 backdrop-blur sm:flex"
		>
			{#each chat as line (line.user)}
				<p class="truncate text-xs">
					<span class="font-semibold text-primary">{line.user}</span>
					<span class="text-dark-100">{line.message}</span>
				</p>
			{/each}
		</div>

		<!-- Goal -->
		<div
			class="absolute right-[4%] bottom-[8%] w-[40%] rounded-xl border border-rule bg-background/80 p-3 backdrop-blur"
		>
			<div class="flex items-center justify-between text-xs">
				<span class="font-semibold text-foreground">Follower goal</span>
				<span class="font-mono text-muted-foreground">72 / 100</span>
			</div>
			<div class="mt-2 h-1.5 overflow-hidden rounded-full bg-dark-700">
				<div class="h-full w-[72%] rounded-full bg-primary"></div>
			</div>
		</div>
	</div>
</MockFrame>
