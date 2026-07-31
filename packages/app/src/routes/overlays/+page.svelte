<script lang="ts">
	import { goto } from '$app/navigation';

	import { Button } from '@stream-kit/ui/button';
	import { Cell, CellGrid } from '@stream-kit/ui/blueprint';
	import { Container } from '@stream-kit/ui/container';
	import { EmptyState } from '@stream-kit/ui/empty-state';

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

{#if app.overlay.items.length === 0}
	<EmptyState
		icon="ri:layout-masonry-line"
		title={t('No overlays yet')}
		description={t('Create one to get a browser source URL for OBS.')}
	>
		<OverlayInstallButton />
		<Button class="relative" icon="ri:add-line" onclick={() => goto('/overlays/new')}>
			{t('New overlay')}
		</Button>
	</EmptyState>
{:else}
	<Container class="px-6 py-6">
		<CellGrid cols={3}>
			{#each app.overlay.items as overlay (overlay.id)}
				<Cell class="p-0 [&>article]:border-0 [&>article]:bg-transparent">
					<OverlayCard {overlay} />
				</Cell>
			{/each}
		</CellGrid>
	</Container>
{/if}
