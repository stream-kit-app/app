<script lang="ts">
	import type { OverlayFrameworkId, OverlayWidgetId } from '$lib/core/overlay';

	import Icon from '@iconify/svelte';

	import { goto } from '$app/navigation';

	import { Panel } from '@stream-kit/ui/blueprint';
	import { Button } from '@stream-kit/ui/button';
	import { Container } from '@stream-kit/ui/container';
	import { InputText } from '@stream-kit/ui/input';
	import { ToggleGroup } from '@stream-kit/ui/toggle-group';

	import { app } from '$lib/core';
	import {
		getOverlayFrameworkIcon,
		OVERLAY_FRAMEWORKS,
		OVERLAY_WIDGET_TEMPLATES
	} from '$lib/core/overlay';
	import { useI18n } from '$lib/i18n';
	import { cn } from '$lib/utils';

	const { t } = useI18n();

	type CreateMode = 'choose' | 'build';

	let name = $state('Alerts');
	let mode = $state<CreateMode>('choose');
	let widgetTemplate = $state<OverlayWidgetId>('alerts');
	let framework = $state<OverlayFrameworkId>('svelte');
	let isCreating = $state(false);

	const modeItems = $derived([
		{
			value: 'choose' as const,
			label: t('Choose an overlay'),
			icon: 'ri:layout-grid-line'
		},
		{
			value: 'build' as const,
			label: t('Build an overlay'),
			icon: 'ri:code-s-slash-line'
		}
	]);

	function selectMode(next: CreateMode): void {
		mode = next;

		if (next === 'choose') {
			const selected = OVERLAY_WIDGET_TEMPLATES.find((item) => item.id === widgetTemplate);
			name = selected?.defaultName ?? 'Alerts';
			return;
		}

		if (name === 'Alerts' || OVERLAY_WIDGET_TEMPLATES.some((item) => item.defaultName === name)) {
			name = 'My Overlay';
		}
	}

	function selectWidget(id: OverlayWidgetId): void {
		widgetTemplate = id;
		const selected = OVERLAY_WIDGET_TEMPLATES.find((item) => item.id === id);
		name = selected?.defaultName ?? name;
	}

	async function createOverlay(): Promise<void> {
		const trimmed = name.trim();

		if (!trimmed) {
			return;
		}

		isCreating = true;

		try {
			if (mode === 'choose') {
				await app.overlay.create({ name: trimmed, widgetTemplate });
				app.toast.create({
					title: t('Overlay created'),
					description: t(
						'Your overlay is ready for OBS. Copy the browser source URL and install recommended actions from the configure page.'
					),
					variant: 'success'
				});
			} else {
				await app.overlay.create({ name: trimmed, framework });
				app.toast.create({
					title: t('Overlay created'),
					description: t(
						'Open the project in your editor and follow the README to install, build, and connect to Stream Kit.'
					),
					variant: 'success'
				});
			}

			await goto('/overlays');
		} finally {
			isCreating = false;
		}
	}
</script>

<Container class="px-6 py-6" size="md">
	<div class="flex flex-col gap-6">
		<Button
			class="w-fit"
			size="sm"
			variant="ghost"
			icon="ri:arrow-left-line"
			onclick={() => goto('/overlays')}
		>
			{t('Back to overlays')}
		</Button>

		<Panel tone="solid" class="grid gap-6 p-6">
			<ToggleGroup
				value={mode}
				ariaLabel={t('Overlay create mode')}
				items={modeItems}
				onValueChange={selectMode}
			/>

			<InputText
				label={t('Name')}
				value={name}
				required
				prependIcon="ri:price-tag-3-line"
				oninput={(event) => {
					name = event.currentTarget.value;
				}}
			/>

			{#if mode === 'choose'}
				<div class="grid gap-3">
					<p class="text-sm font-semibold text-dark-50">{t('Overlay')}</p>
					<p class="text-sm text-dark-200">
						{t('Pick a ready-made widget with configurable options. No build step required.')}
					</p>
					<div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
						{#each OVERLAY_WIDGET_TEMPLATES as item (item.id)}
							{@const isSelected = widgetTemplate === item.id}
							<button
								type="button"
								aria-pressed={isSelected}
								class={cn(
									'group flex cursor-pointer flex-col gap-3 rounded-none border p-4 text-left transition-colors',
									isSelected
										? 'border-primary bg-primary/10 ring-1 ring-primary/40'
										: 'border-rule bg-dark-900/40 hover:bg-dark-700/40'
								)}
								onclick={() => selectWidget(item.id)}
							>
								<div class="flex items-center justify-between gap-2">
									<div
										class={cn(
											'flex size-10 items-center justify-center border border-rule transition-colors',
											isSelected
												? 'bg-primary/20 text-primary'
												: 'bg-dark-800 text-dark-100 group-hover:text-primary'
										)}
									>
										<Icon icon={item.icon} class="size-5" />
									</div>
									{#if isSelected}
										<Icon
											icon="ri:checkbox-circle-fill"
											class="size-5 text-primary"
										/>
									{/if}
								</div>
								<div>
									<p class="font-semibold text-white">{t(item.name)}</p>
									<p class="mt-1 text-xs text-dark-200">{t(item.description)}</p>
								</div>
							</button>
						{/each}
					</div>
				</div>
			{:else}
				<div class="grid gap-3">
					<p class="text-sm font-semibold text-dark-50">{t('Framework')}</p>
					<p class="text-sm text-dark-200">
						{t('Start from a framework scaffold and customize the project yourself.')}
					</p>
					<div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
						{#each OVERLAY_FRAMEWORKS as item (item.id)}
							{@const isSelected = framework === item.id}
							<button
								type="button"
								aria-pressed={isSelected}
								class={cn(
									'group flex cursor-pointer flex-col gap-3 rounded-none border p-4 text-left transition-colors',
									isSelected
										? 'border-primary bg-primary/10 ring-1 ring-primary/40'
										: 'border-rule bg-dark-900/40 hover:bg-dark-700/40'
								)}
								onclick={() => (framework = item.id)}
							>
								<div class="flex items-center justify-between gap-2">
									<div
										class={cn(
											'flex size-10 items-center justify-center border border-rule transition-colors',
											isSelected
												? 'bg-primary/20 text-primary'
												: 'bg-dark-800 text-dark-100 group-hover:text-primary'
										)}
									>
										<Icon icon={getOverlayFrameworkIcon(item.id)} class="size-5" />
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
							</button>
						{/each}
					</div>
				</div>
			{/if}

			<div class="flex flex-wrap items-center justify-end gap-2 border-t border-rule pt-5">
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
		</Panel>
	</div>
</Container>
