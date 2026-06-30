<script lang="ts">
	import DashboardAddWidgetForm from '$lib/components/core/dashboard/dashboard-add-widget-form.svelte';
	import DashboardGrid from '$lib/components/core/dashboard/dashboard-grid.svelte';
	import DashboardToolbar from '$lib/components/core/dashboard/dashboard-toolbar.svelte';
	import { Container } from '@stream-kit/ui/container';
	import { Heading } from '@stream-kit/ui/heading';
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
</script>

<Container class="px-6 py-6" size="md">
	<div class="mb-8 flex flex-wrap items-end justify-between gap-4">
		<Heading level="1" subTitle={t('Your streaming automation at a glance')}>
			{t('Dashboard')}
		</Heading>

		<DashboardToolbar bind:editMode onAddWidget={openAddWidgetModal} />
	</div>

	<DashboardGrid {editMode} onAddWidget={openAddWidgetModal} />
</Container>
