<script lang="ts">
	import Icon from '@iconify/svelte';
	import { goto } from '$app/navigation';

	import { Button } from '@stream-kit/ui/button';
	import { Container } from '@stream-kit/ui/container';

	import { OverlayCard, OverlayInstallButton } from '$lib/components/core/overlay';
	import { app } from '$lib/core';
	import { useI18n } from '$lib/i18n';

	const { t } = useI18n();

	$effect(() => {
		app.toolbar.set({
			primaryComponents: [
				{
					id: 'overlay-install',
					component: OverlayInstallButton,
					props: { size: 'default' }
				}
			],
			primaryActions: [
				{
					id: 'new-overlay',
					label: t('New overlay'),
					icon: 'ri:add-line',
					onClick: () => {
						void goto('/overlays/new');
					}
				}
			]
		});
	});
</script>

<Container class="px-6 py-6" size="md">
	{#if app.overlay.items.length === 0}
		<div
			class="relative flex flex-col items-center gap-4 overflow-hidden rounded-2xl border border-dashed border-dark-600 bg-dark-900 px-6 py-16 text-center"
		>
			<div
				class="relative flex size-16 items-center justify-center rounded-2xl bg-dark-800 text-primary"
			>
				<Icon icon="ri:layout-masonry-line" class="size-7" aria-hidden="true" />
			</div>
			<div class="relative flex flex-col gap-1.5">
				<p class="text-lg font-semibold text-dark-50">{t('No overlays yet')}</p>
				<p class="text-sm text-dark-300">
					{t('Create one to get a browser source URL for OBS.')}
				</p>
			</div>
			<div class="relative flex flex-wrap items-center justify-center gap-2">
				<OverlayInstallButton />
				<Button class="relative" icon="ri:add-line" onclick={() => goto('/overlays/new')}>
					{t('New overlay')}
				</Button>
			</div>
		</div>
	{:else}
		<div class="grid gap-5 md:grid-cols-2">
			{#each app.overlay.items as overlay (overlay.id)}
				<OverlayCard {overlay} />
			{/each}
		</div>
	{/if}
</Container>
