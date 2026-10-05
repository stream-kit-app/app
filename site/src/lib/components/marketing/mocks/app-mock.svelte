<script lang="ts">
	import Icon from '@iconify/svelte';

	import { Badge } from '@stream-kit/ui/badge';
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

<!-- Dummy screenshot of the app, rebuilt in HTML/CSS. Mirrors the app shell (packages/app/src/routes/+layout.svelte); update both together. -->
<div
	class="pointer-events-none mx-auto max-w-5xl overflow-hidden rounded-xl border border-rule bg-background text-left shadow-2xl shadow-black/40 select-none"
	aria-hidden="true"
>
	<!-- Window title bar -->
	<div class="flex h-8 items-center border-b border-rule bg-sidebar px-4">
		<span class="font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
			Stream Kit
		</span>
		<span class="ms-auto flex items-center gap-4 text-muted-foreground">
			<Icon icon="mdi:window-minimize" class="size-3.5" />
			<Icon icon="mdi:window-maximize" class="size-3.5" />
			<Icon icon="mdi:close" class="size-3.5" />
		</span>
	</div>

	<div class="flex">
		<!-- Sidebar -->
		<aside class="hidden w-52 shrink-0 flex-col border-r border-rule bg-sidebar sm:flex">
			<div class="flex h-14 shrink-0 items-center border-b border-rule px-4">
				<span
					class="[&_svg]:h-7 [&_svg]:w-7 [&>span]:grid-cols-[28px_auto] [&>span]:gap-1.5 [&>span>span]:text-sm"
				>
					<Logo />
				</span>
			</div>

			<nav class="flex flex-col gap-0.5 px-2.5 py-2">
				{#each navItems as item (item.label)}
					<span
						class="flex items-center gap-2.5 rounded-md px-3 py-1.5 text-sm font-medium text-dark-200"
					>
						<Icon icon={item.icon} class="size-4" />
						{item.label}
					</span>
				{/each}

				<p
					class="px-3 pt-3 pb-1 font-mono text-[11px] font-medium tracking-[0.14em] text-muted-foreground uppercase"
				>
					Plugins
				</p>
				{#each pluginItems as item (item.label)}
					<span
						class={[
							'flex items-center gap-2.5 rounded-md px-3 py-1.5 text-sm font-medium',
							item.active
								? 'bg-item-active text-item-active-foreground'
								: 'text-dark-200'
						]}
					>
						<Icon icon={item.icon} class="size-4" />
						{item.label}
					</span>
				{/each}
			</nav>
		</aside>

		<!-- Main panel -->
		<div class="min-w-0 flex-1">
			<div class="flex h-14 items-center gap-4 border-b border-rule px-6">
				<p class="flex min-w-0 items-center gap-2 text-sm">
					<span class="truncate text-muted-foreground">Bot</span>
					<span class="font-mono text-rule-strong">/</span>
					<span class="truncate font-medium text-foreground">Timers</span>
				</p>
				<span
					class="ms-auto inline-flex h-8 items-center gap-2 rounded-lg bg-primary/15 px-3 text-sm font-semibold text-primary"
				>
					<Icon icon="mdi:plus" class="size-4" />
					New timer
				</span>
			</div>

			<div class="flex flex-col gap-3 p-5">
				{#each timers as timer (timer.name)}
					<div
						class="flex items-center gap-4 rounded-xl border border-rule bg-surface p-4"
					>
						<div
							class="flex size-10 shrink-0 items-center justify-center rounded-md border border-rule bg-dark-800 text-primary"
						>
							<Icon icon="mdi:timer-outline" class="size-5" />
						</div>
						<div class="min-w-0 flex-1">
							<p class="truncate text-sm font-semibold">{timer.name}</p>
							<p class="mt-0.5 truncate text-xs text-muted-foreground">
								{timer.detail}
							</p>
						</div>
						<Badge variant="secondary" size="sm" class="hidden md:inline-flex">
							{timer.handlers}
							{timer.handlers === 1 ? 'handler' : 'handlers'}
						</Badge>
						<span
							class={[
								'inline-flex h-5 w-10 shrink-0 items-center rounded-full border p-[2px]',
								timer.enabled
									? 'justify-end border-primary bg-primary/15'
									: 'justify-start border-border'
							]}
						>
							<span
								class={[
									'size-4 rounded-full',
									timer.enabled ? 'bg-primary' : 'bg-dark-400'
								]}
							></span>
						</span>
					</div>
				{/each}

				<div
					class="flex items-center gap-2 rounded-xl border border-rule bg-surface px-4 py-3"
				>
					<span class="size-1.5 rounded-full bg-success-400"></span>
					<p class="text-xs text-muted-foreground">
						Bot connected · Twitch & YouTube chat active
					</p>
				</div>
			</div>
		</div>
	</div>
</div>
