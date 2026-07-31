<script lang="ts">
	import type { DashboardWidgetDefinition } from '$lib/core/dashboard/types';

	import Icon from '@iconify/svelte';

	import { Panel } from '@stream-kit/ui/blueprint';
	import { Badge } from '@stream-kit/ui/badge';
	import { Button } from '@stream-kit/ui/button';

	import { app } from '$lib/core';
	import { useI18n } from '$lib/i18n';

	type Props = {
		modalId?: string;
	};

	let { modalId = 'dashboard-add-widget' }: Props = $props();

	const { t } = useI18n();

	const definitions = $derived(app.dashboard.getAddableDefinitions(app));

	function closeModal(): void {
		app.modals.get(modalId)?.close();
	}

	async function handleAdd(definition: DashboardWidgetDefinition): Promise<void> {
		await app.dashboard.addInstance(definition.definitionId);
		closeModal();
	}
</script>

{#if definitions.length === 0}
	<Panel tone="solid" class="p-6 text-center text-dark-100">
		<p class="font-semibold text-dark-50">{t('No widgets available')}</p>
		<p class="mt-1 text-sm">
			{t('All available widgets are already on your dashboard, or their plugins are disabled.')}
		</p>
	</Panel>
{:else}
	<div class="grid gap-4 md:grid-cols-2">
		{#each definitions as definition (definition.definitionId)}
			<Panel tone="solid" class="flex flex-col gap-4 p-4">
				<div class="flex items-start gap-3">
					<div
						class="flex size-10 shrink-0 items-center justify-center border border-rule"
					>
						<Icon icon={definition.icon ?? 'ri:layout-grid-line'} class="h-5 w-5" />
					</div>
					<div class="min-w-0 flex-1">
						<h2 class="font-semibold text-dark-50">{t(definition.title)}</h2>
						{#if definition.description}
							<p class="mt-1 text-sm text-dark-100">{t(definition.description)}</p>
						{/if}
					</div>
				</div>

				<div class="flex flex-col gap-2 text-sm">
					<div class="flex items-center justify-between gap-3">
						<span class="text-dark-100">{t('Width')}</span>
						<Badge variant="default">
							{t('{count} columns wide', { count: definition.defaultColumns })}
						</Badge>
					</div>
				</div>

				<div class="mt-auto flex flex-wrap gap-2">
					<Button onclick={() => void handleAdd(definition)}>{t('Add')}</Button>
				</div>
			</Panel>
		{/each}
	</div>
{/if}

<div class="mt-6 flex justify-end">
	<Button variant="outline" onclick={closeModal}>{t('Cancel')}</Button>
</div>
