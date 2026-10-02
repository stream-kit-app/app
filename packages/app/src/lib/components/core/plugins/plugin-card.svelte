<script lang="ts">
	import type { RegisteredPlugin } from '$lib/core/plugins';

	import Icon from '@iconify/svelte';

	import { tooltip } from '@stream-kit/ui/attachments';
	import { Button } from '@stream-kit/ui/button';
	import { InputSwitch } from '@stream-kit/ui/input';

	import { app } from '$lib/core';
	import { canApplyPluginUpdates } from '$lib/core/plugins/plugin-update';
	import { pluginUpdates } from '$lib/core/plugins/plugin-updates.svelte';
	import { useI18n } from '$lib/i18n';
	import { cn } from '$lib/utils';

	import {
		pluginDetailPath,
		pluginStatusDotClasses,
		pluginStatusLabels,
		resolvePluginStatus,
		setPluginEnabled,
		uninstallPlugin,
		updatePlugin
	} from './plugin-actions';

	type Props = {
		plugin: RegisteredPlugin;
	};

	let { plugin }: Props = $props();
	let { t } = useI18n();
	let statusRevision = $state(0);
	let isUpdating = $state(false);

	const pendingUpdate = $derived(pluginUpdates.getUpdate(plugin.key));
	const canInstallUpdates = $derived(canApplyPluginUpdates());
	const detailPath = $derived(pluginDetailPath(plugin));

	const status = $derived.by(() => {
		void statusRevision;

		return resolvePluginStatus(plugin);
	});
	const needsAttention = $derived(status === 'not-configured' || status === 'unavailable');
	const unavailableDependencies = $derived.by(() => {
		void statusRevision;

		return new Set([...plugin.missingDependencies(app), ...plugin.disabledDependencies(app)]);
	});

	$effect(() => {
		const api = plugin.api as { subscribe?: (listener: () => void) => () => void } | undefined;

		return api?.subscribe?.(() => {
			statusRevision += 1;
		});
	});

	async function toggleEnabled(enabled: boolean): Promise<void> {
		await setPluginEnabled(plugin, enabled);
		statusRevision += 1;
	}

	async function update(): Promise<void> {
		if (isUpdating) {
			return;
		}

		isUpdating = true;

		try {
			await updatePlugin(plugin);
			statusRevision += 1;
		} finally {
			isUpdating = false;
		}
	}
</script>

<div class="group/card flex h-full flex-col transition-colors hover:bg-dark-700/40">
	<div class="flex flex-1 flex-col gap-3 p-5">
		<div class="flex items-start gap-3">
			<a
				href={detailPath}
				class={cn(
					'relative flex size-10 shrink-0 items-center justify-center rounded-md border border-rule transition-colors',
					plugin.isEnabled ? 'text-primary' : 'text-dark-400'
				)}
				aria-hidden="true"
				tabindex="-1"
			>
				<Icon icon={plugin.icon ?? 'ri:plug-line'} class="size-5" />
				{#if needsAttention}
					<span
						class={cn(
							'absolute -top-1 -right-1 size-2.5 rounded-full ring-2 ring-background',
							pluginStatusDotClasses[status]
						)}
					></span>
				{/if}
			</a>
			<div class="min-w-0 flex-1">
				<a
					href={detailPath}
					class="block truncate text-base font-semibold text-dark-50 transition-colors hover:text-primary"
				>
					{plugin.name}
				</a>
				<p class="mt-1 flex min-w-0 items-center gap-1.5 font-mono text-[11px] text-dark-400">
					{#if plugin.version}
						<span class="truncate">v{plugin.version}</span>
						<span class="text-rule-strong">/</span>
					{/if}
					<span class="truncate">
						{plugin.source === 'installed' ? t('Installed') : t('Built-in')}
					</span>
					{#if pendingUpdate}
						<span
							class="inline-flex shrink-0 items-center gap-0.5 text-warning-100"
							{@attach tooltip(() => t('Update available'))}
						>
							<Icon icon="ri:arrow-up-line" class="size-3" />
							v{pendingUpdate.availableVersion}
						</span>
					{/if}
				</p>
			</div>
			<InputSwitch
				class="shrink-0"
				bind:checked={() => plugin.isEnabled, (value) => void toggleEnabled(value)}
			/>
		</div>

		{#if plugin.description}
			<p class="line-clamp-2 text-sm leading-relaxed text-dark-300">{plugin.description}</p>
		{/if}

		{#if plugin.dependencies.length > 0}
			<div class="mt-auto flex flex-wrap items-center gap-1">
				<span class="mr-0.5 font-mono text-[10px] tracking-[0.14em] text-dark-400 uppercase">
					{t('Requires')}
				</span>
				{#each plugin.dependencies as dependency (dependency)}
					<span
						class={cn(
							'rounded-md border px-1.5 py-px font-mono text-[11px]',
							unavailableDependencies.has(dependency)
								? 'border-destructive-200/40 text-destructive-100'
								: 'border-rule text-dark-200'
						)}
					>
						{dependency}
					</span>
				{/each}
			</div>
		{/if}
	</div>

	<div class="flex h-12 items-center gap-1 border-t border-rule pr-2 pl-5">
		<span
			class={cn(
				'flex min-w-0 flex-1 items-center gap-2 text-xs',
				status === 'not-configured' && 'font-medium text-warning-100',
				status === 'unavailable' && 'font-medium text-destructive-100',
				!needsAttention && 'text-dark-200'
			)}
		>
			{#if needsAttention}
				<Icon icon="ri:error-warning-line" class="size-4 shrink-0" />
			{:else}
				<span class={cn('size-1.5 shrink-0 rounded-full', pluginStatusDotClasses[status])}
				></span>
			{/if}
			<span class="truncate">{t(pluginStatusLabels[status])}</span>
		</span>

		{#if pendingUpdate && canInstallUpdates}
			<Button
				variant="ghost"
				size="icon-sm"
				icon="ri:refresh-line"
				class="text-warning-100"
				aria-label={t('Update plugin')}
				disabled={isUpdating}
				isLoading={isUpdating}
				onclick={() => void update()}
				{@attach tooltip(() => t('Update plugin'))}
			/>
		{/if}
		{#if plugin.source === 'installed'}
			<Button
				variant="ghost"
				size="icon-sm"
				icon="ri:delete-bin-line"
				class="text-dark-400 hover:text-destructive-100"
				aria-label={t('Remove')}
				onclick={() => void uninstallPlugin(plugin)}
				{@attach tooltip(() => t('Remove'))}
			/>
		{/if}
		<Button
			variant={status === 'not-configured' && plugin.hasSettings ? 'default' : 'ghost'}
			size="sm"
			href={detailPath}
			icon="ri:arrow-right-s-line"
			iconPosition="end"
			class={cn(
				!(status === 'not-configured' && plugin.hasSettings) &&
					'text-dark-200 hover:text-dark-50'
			)}
		>
			{plugin.hasSettings ? t('Configure') : t('Details')}
		</Button>
	</div>
</div>
