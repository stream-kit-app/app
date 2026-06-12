<script lang="ts">
	import Icon from '@iconify/svelte';

	import { Logo } from '@stream-kit/ui/logo';

	const navItems = [
		{ icon: 'mdi:lightning-bolt-outline', label: 'Actions' },
		{ icon: 'mdi:puzzle-outline', label: 'Plugins' },
		{ icon: 'mdi:text-box-outline', label: 'Logs' },
		{ icon: 'mdi:cog-outline', label: 'Settings' }
	];

	const pluginItems = [
		{ icon: 'mdi:robot-outline', label: 'Bot', active: true },
		{ icon: 'mdi:video-wireless-outline', label: 'OBS' },
		{ icon: 'mdi:twitch', label: 'Twitch' },
		{ icon: 'mdi:youtube', label: 'YouTube' }
	];

	const timers = [
		{
			name: 'Hydration reminder',
			detail: 'Every 15–20 min · Twitch + YouTube',
			handlers: 1,
			enabled: true
		},
		{
			name: 'Discord shoutout',
			detail: 'Every 30–45 min · Online only',
			handlers: 2,
			enabled: true
		},
		{
			name: 'Scene rotation',
			detail: 'Every 10 min · OBS handler chain',
			handlers: 3,
			enabled: false
		}
	];
</script>

<!-- Dummy screenshot of the app, rebuilt in HTML/CSS. Replace with a real screenshot later. -->
<div
	class="pointer-events-none mx-auto max-w-4xl overflow-hidden rounded-2xl border border-dark-500/60 bg-dark-950 text-left shadow-2xl shadow-dark-950/80 select-none"
	aria-hidden="true"
>
	<!-- Title bar -->
	<div class="flex items-center gap-2 border-b border-dark-700 bg-dark-900 px-4 py-2.5">
		<span class="size-3 rounded-full bg-destructive-300/80"></span>
		<span class="size-3 rounded-full bg-warning-300/80"></span>
		<span class="size-3 rounded-full bg-success-300/80"></span>
		<span class="ms-3 text-xs text-muted-foreground">Stream Kit</span>
	</div>

	<div class="flex">
		<!-- Sidebar -->
		<aside class="hidden w-52 shrink-0 flex-col gap-4 border-e border-dark-700 bg-dark-900/60 p-3 sm:flex">
			<div class="origin-left scale-75 p-1">
				<Logo />
			</div>

			<nav class="flex flex-col gap-1">
				{#each navItems as item (item.label)}
					<span
						class="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-dark-100"
					>
						<Icon icon={item.icon} class="size-4" />
						{item.label}
					</span>
				{/each}
			</nav>

			<div>
				<p class="px-3 pb-2 text-[10px] font-semibold tracking-widest text-dark-300 uppercase">
					Plugins
				</p>
				<nav class="flex flex-col gap-1">
					{#each pluginItems as item (item.label)}
						<span
							class={[
								'flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm',
								item.active
									? 'bg-primary/15 font-semibold text-primary'
									: 'text-dark-100'
							]}
						>
							<Icon icon={item.icon} class="size-4" />
							{item.label}
						</span>
					{/each}
				</nav>
			</div>
		</aside>

		<!-- Main panel -->
		<div class="min-w-0 flex-1 p-5">
			<div class="mb-5 flex items-center justify-between gap-4">
				<div>
					<h3 class="font-outfit text-lg font-semibold">Timers</h3>
					<p class="mt-1 text-xs text-muted-foreground">
						Scheduled actions that run while you stream
					</p>
				</div>
				<span
					class="inline-flex items-center gap-2 rounded-xl bg-primary/15 px-4 py-2.5 text-sm font-semibold text-primary"
				>
					<Icon icon="mdi:plus" class="size-4" />
					New timer
				</span>
			</div>

			<div class="flex flex-col gap-3">
				{#each timers as timer (timer.name)}
					<div
						class="flex items-center gap-4 rounded-xl border border-dark-600 bg-dark-800 p-4"
					>
						<div
							class="flex size-10 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary"
						>
							<Icon icon="mdi:timer-outline" class="size-5" />
						</div>
						<div class="min-w-0 flex-1">
							<p class="truncate text-sm font-semibold">{timer.name}</p>
							<p class="mt-0.5 truncate text-xs text-muted-foreground">
								{timer.detail}
							</p>
						</div>
						<span
							class="hidden rounded-lg border border-secondary/20 bg-secondary/15 px-2.5 py-1 text-xs font-semibold text-secondary md:inline"
						>
							{timer.handlers}
							{timer.handlers === 1 ? 'handler' : 'handlers'}
						</span>
						<span
							class={[
								'flex h-5 w-9 shrink-0 items-center rounded-full px-0.5',
								timer.enabled
									? 'justify-end bg-primary-300'
									: 'justify-start bg-dark-600'
							]}
						>
							<span class="size-4 rounded-full bg-foreground"></span>
						</span>
					</div>
				{/each}
			</div>

			<div class="mt-5 flex items-center gap-2 rounded-xl border border-dark-600 bg-dark-900/60 p-4">
				<span class="size-2 rounded-full bg-success-300"></span>
				<p class="text-xs text-muted-foreground">
					Bot connected · Twitch & YouTube chat active
				</p>
			</div>
		</div>
	</div>
</div>
