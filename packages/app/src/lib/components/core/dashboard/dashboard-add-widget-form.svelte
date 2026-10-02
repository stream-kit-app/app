<script lang="ts">
	import type { DashboardWidgetDefinition } from '$lib/core/dashboard/types';

	import Icon from '@iconify/svelte';

	import { panelVariants } from '@stream-kit/ui/blueprint';
	import { EmptyState } from '@stream-kit/ui/empty-state';
	import { InputText } from '@stream-kit/ui/input';

	import { app } from '$lib/core';
	import { isWideWidget } from '$lib/core/dashboard/dashboard-layout';
	import { useI18n } from '$lib/i18n';
	import { cn } from '$lib/utils';

	type Props = {
		modalId?: string;
	};

	const SEARCH_THRESHOLD = 6;

	let { modalId = 'dashboard-add-widget' }: Props = $props();

	const { t } = useI18n();

	let query = $state('');
	let addingId = $state<string | null>(null);

	const definitions = $derived(app.dashboard.getAddableDefinitions(app));

	const filtered = $derived.by(() => {
		const needle = query.trim().toLowerCase();

		if (!needle) {
			return definitions;
		}

		return definitions.filter((definition) =>
			[definition.title, definition.description ?? '']
				.map((text) => t(text).toLowerCase())
				.some((text) => text.includes(needle))
		);
	});

	function closeModal(): void {
		app.modals.get(modalId)?.close();
	}

	async function handleAdd(definition: DashboardWidgetDefinition): Promise<void> {
		if (addingId) {
			return;
		}

		addingId = definition.definitionId;

		try {
			await app.dashboard.addInstance(definition.definitionId);
			closeModal();
		} finally {
			addingId = null;
		}
	}
</script>

{#if definitions.length === 0}
	<EmptyState
		class="p-0"
		icon="ri:layout-grid-line"
		title={t('No widgets available')}
		description={t(
			'All available widgets are already on your dashboard, or their plugins are disabled.'
		)}
	/>
{:else}
	<div class="flex flex-col gap-4">
		{#if definitions.length > SEARCH_THRESHOLD}
			<InputText
				prependIcon="ri:search-line"
				placeholder={t('Search widgets')}
				value={query}
				oninput={(event) => (query = event.currentTarget.value)}
			/>
		{/if}

		{#if filtered.length === 0}
			<EmptyState compact icon="ri:search-line" title={t('No widgets found')} />
		{:else}
			<div class="grid gap-3 md:grid-cols-2">
				{#each filtered as definition (definition.definitionId)}
					<button
						type="button"
						class={cn(
							panelVariants({ tone: 'solid' }),
							'group/card flex cursor-pointer items-start gap-3 p-4 text-left transition-colors hover:bg-dark-700/40 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none disabled:cursor-wait disabled:opacity-60'
						)}
						disabled={addingId !== null}
						onclick={() => void handleAdd(definition)}
					>
						<span
							class="flex size-9 shrink-0 items-center justify-center rounded-md border border-rule bg-dark-900/60 text-primary"
							aria-hidden="true"
						>
							<Icon icon={definition.icon ?? 'ri:layout-grid-line'} class="size-5" />
						</span>
						<span class="flex min-w-0 flex-1 flex-col gap-1">
							<span class="font-semibold text-dark-50">{t(definition.title)}</span>
							{#if definition.description}
								<span class="line-clamp-2 text-sm text-dark-300">
									{t(definition.description)}
								</span>
							{/if}
							<!-- Eyebrow styling inline: <p> is not allowed inside <button>. -->
							<span
								class="mt-1.5 font-mono text-[11px] leading-none font-medium tracking-[0.14em] text-muted-foreground uppercase"
							>
								{isWideWidget(definition.defaultColumns) ? t('Wide') : t('Narrow')}
							</span>
						</span>
						<Icon
							icon={addingId === definition.definitionId
								? 'ri:loader-4-line'
								: 'ri:add-line'}
							class={cn(
								'mt-0.5 size-4 shrink-0 text-dark-400 transition-colors group-hover/card:text-primary',
								addingId === definition.definitionId && 'animate-spin text-primary'
							)}
							aria-hidden="true"
						/>
					</button>
				{/each}
			</div>
		{/if}
	</div>
{/if}
