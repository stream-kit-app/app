<script lang="ts">
	import type { OverlayTemplateId } from '$lib/core/overlay';

	import Icon from '@iconify/svelte';

	import { goto } from '$app/navigation';

	import { Badge } from '@stream-kit/ui/badge';
	import { Button } from '@stream-kit/ui/button';
	import { Container } from '@stream-kit/ui/container';
	import { Heading } from '@stream-kit/ui/heading';
	import { InputText } from '@stream-kit/ui/input';

	import { app } from '$lib/core';
	import { getOverlayTemplateIcon, OVERLAY_TEMPLATES } from '$lib/core/overlay';
	import { useI18n } from '$lib/i18n';
	import { cn, slugify } from '$lib/utils';

	const { t } = useI18n();

	let name = $state('My Overlay');
	let template = $state<OverlayTemplateId>('blank');
	let isCreating = $state(false);

	const selectedTemplate = $derived(
		OVERLAY_TEMPLATES.find((item) => item.id === template) ?? OVERLAY_TEMPLATES[0]
	);

	async function createOverlay(): Promise<void> {
		const trimmed = name.trim();

		if (!trimmed) {
			return;
		}

		isCreating = true;

		try {
			const id = slugify(trimmed);
			const record = await app.overlay.create({ id, name: trimmed, template });
			await goto(`/overlays/${record.id}`);
		} finally {
			isCreating = false;
		}
	}
</script>

<Container class="px-6 py-6" size="md">
	<div class="flex flex-col gap-6">
		<div class="flex flex-col gap-3">
			<Button
				class="w-fit"
				size="sm"
				variant="ghost"
				icon="ri:arrow-left-line"
				onclick={() => goto('/overlays')}
			>
				{t('Back to overlays')}
			</Button>
			<Heading
				level="1"
				subTitle={t('Create an OBS browser source overlay from a starter template.')}
			>
				{t('New overlay')}
			</Heading>
		</div>

		<section class="grid gap-6 rounded-xl border border-dark-600 bg-dark-800 p-6">
			<InputText
				label={t('Name')}
				value={name}
				required
				prependIcon="ri:price-tag-3-line"
				oninput={(event) => {
					name = event.currentTarget.value;
				}}
			/>

			<div class="grid gap-3">
				<p class="text-sm font-semibold text-dark-50">{t('Template')}</p>
				<div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
					{#each OVERLAY_TEMPLATES as item (item.id)}
						{@const isSelected = template === item.id}
						<button
							type="button"
							aria-pressed={isSelected}
							class={cn(
								'group flex flex-col gap-3 rounded-xl border p-4 text-left transition-colors',
								isSelected
									? 'border-primary bg-primary/10 ring-1 ring-primary/40'
									: 'border-dark-600 bg-dark-900/40 hover:border-dark-500 hover:bg-dark-700/40'
							)}
							onclick={() => (template = item.id)}
						>
							<div class="flex items-center justify-between gap-2">
								<div
									class={cn(
										'flex h-10 w-10 items-center justify-center rounded-lg transition-colors',
										isSelected
											? 'bg-primary/20 text-primary'
											: 'bg-dark-700 text-dark-100 group-hover:text-primary'
									)}
								>
									<Icon icon={getOverlayTemplateIcon(item.id)} class="size-5" />
								</div>
								{#if isSelected}
									<Icon
										icon="ri:checkbox-circle-fill"
										class="size-5 text-primary"
									/>
								{/if}
							</div>
							<div>
								<p class="font-semibold text-white">{item.name}</p>
								<p class="mt-1 text-xs text-dark-200">{item.description}</p>
							</div>
							<div class="mt-auto flex flex-wrap items-center gap-1.5">
								<Badge variant="outline">{item.width}&times;{item.height}</Badge>
								{#each item.expectedEvents as event (event)}
									<Badge variant="ghost">{event}</Badge>
								{/each}
							</div>
						</button>
					{/each}
				</div>
			</div>

			<div class="flex flex-wrap items-center justify-between gap-3 border-t border-dark-700 pt-5">
				<p class="text-xs text-dark-300">
					{t('Canvas')}: {selectedTemplate.width}&times;{selectedTemplate.height}
				</p>
				<div class="flex flex-wrap gap-2">
					<Button variant="outline" onclick={() => goto('/overlays')}>
						{t('Cancel')}
					</Button>
					<Button
						icon="ri:add-line"
						onclick={createOverlay}
						disabled={isCreating || !name.trim()}
						isLoading={isCreating}
					>
						{t('Create overlay')}
					</Button>
				</div>
			</div>
		</section>
	</div>
</Container>
