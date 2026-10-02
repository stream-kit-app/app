<script lang="ts">
	import { goto } from '$app/navigation';

	import { Button } from '@stream-kit/ui/button';
	import { Cell, CellGrid } from '@stream-kit/ui/blueprint';
	import { Container } from '@stream-kit/ui/container';
	import { EmptyState } from '@stream-kit/ui/empty-state';

	import { OverlayCard, OverlayInstallButton } from '$lib/components/core/overlay';
	import { app } from '$lib/core';
	import {
		overlayNeedsAttention,
		resolveOverlayStatus
	} from '$lib/components/core/overlay/overlay-status';
	import { useI18n } from '$lib/i18n';

	const { t } = useI18n();

	const attentionIds = $derived(
		new Set(
			app.overlay.items
				.filter((overlay) => overlayNeedsAttention(resolveOverlayStatus(overlay)))
				.map((overlay) => overlay.id)
		)
	);
	// Overlays that need a build or are missing plugins come first; the rest keep their order.
	const sortedOverlays = $derived(
		[...app.overlay.items].sort(
			(a, b) => Number(attentionIds.has(b.id)) - Number(attentionIds.has(a.id))
		)
	);

	$effect(() => {
		app.toolbar.set({
			meta:
				app.overlay.items.length > 0
					? [
							{
								icon: 'ri:layout-masonry-line',
								label: t('{count} overlays', { count: app.overlay.items.length })
							},
							...(attentionIds.size > 0
								? [
										{
											icon: 'ri:error-warning-line',
											label: t('{count} need attention', { count: attentionIds.size })
										}
									]
								: [])
						]
					: [],
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
			{#each sortedOverlays as overlay (overlay.id)}
				<Cell class="p-0">
					<OverlayCard {overlay} />
				</Cell>
			{/each}
		</CellGrid>
	</Container>
{/if}
