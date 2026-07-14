<script lang="ts">
	import DashboardAddWidgetForm from '$lib/components/core/dashboard/dashboard-add-widget-form.svelte';
	import DashboardGrid from '$lib/components/core/dashboard/dashboard-grid.svelte';
	import DashboardToolbar from '$lib/components/core/dashboard/dashboard-toolbar.svelte';
	import { Container } from '@stream-kit/ui/container';
	import { app } from '$lib/core';
	import { useI18n } from '$lib/i18n';

	const { t } = useI18n();

	let editMode = $state(false);

	function openAddWidgetModal(): void {
		app
			.createModal({
				id: 'dashboard-add-widget',
				title: t('Add widget'),
				description: t('Choose a widget to add to your dashboard.'),
				content: DashboardAddWidgetForm,
				props: { modalId: 'dashboard-add-widget' },
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

<Container class="px-6 py-6" size="md">
	<DashboardGrid {editMode} onAddWidget={openAddWidgetModal} />
</Container>
