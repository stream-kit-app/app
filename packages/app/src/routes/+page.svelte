<script lang="ts">
	import { Container } from '@stream-kit/ui/container';

	import DashboardAddWidgetForm from '$lib/components/core/dashboard/dashboard-add-widget-form.svelte';
	import DashboardAddWidgetFormFooter from '$lib/components/core/dashboard/dashboard-add-widget-form-footer.svelte';
	import DashboardEmptyState from '$lib/components/core/dashboard/dashboard-empty-state.svelte';
	import DashboardGrid from '$lib/components/core/dashboard/dashboard-grid.svelte';
	import DashboardToolbar from '$lib/components/core/dashboard/dashboard-toolbar.svelte';
	import { app } from '$lib/core';
	import { useI18n } from '$lib/i18n';

	const { t } = useI18n();

	let editMode = $state(false);

	const isEmpty = $derived(app.dashboard.instances.length === 0);

	function openAddWidgetModal(): void {
		const modalId = 'dashboard-add-widget';

		app
			.createModal({
				id: modalId,
				title: t('Add widget'),
				description: t('Choose a widget to add to your dashboard.'),
				content: DashboardAddWidgetForm,
				footer: DashboardAddWidgetFormFooter,
				props: { modalId },
				size: 'lg'
			})
			.open();
	}

	$effect(() => {
		app.toolbar.set({
			primaryComponents: [
				{
					id: 'dashboard-toolbar',
					component: DashboardToolbar,
					props: {
						editMode,
						onEditModeChange: (value: boolean) => {
							editMode = value;
						},
						onAddWidget: openAddWidgetModal
					}
				}
			]
		});
	});
</script>

{#if isEmpty}
	<DashboardEmptyState {editMode} onAddWidget={openAddWidgetModal} />
{:else}
	<Container class="px-6 py-6">
		<DashboardGrid {editMode} />
	</Container>
{/if}
