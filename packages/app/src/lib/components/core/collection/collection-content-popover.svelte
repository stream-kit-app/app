<script lang="ts">
	import type { CorePluginApi } from '$lib/types/core-plugin-api';
	import type { PluginAppApi } from '@stream-kit/plugin';

	import Icon from '@iconify/svelte';

	import { Button } from '@stream-kit/ui/button';
	import {
		Content as PopoverContent,
		Root as PopoverRoot,
		Trigger as PopoverTrigger
	} from '@stream-kit/ui/popover';
	import { ScrollArea } from '@stream-kit/ui/scroll-area';

	import { resolveApp } from '$lib/components/core/action/resolve-app';
	import { resolveTranslate, type TranslateFn } from '$lib/components/core/action/resolve-translate';
	import { cn } from '$lib/utils';

	type Props = {
		collectionName: string;
		app?: PluginAppApi;
		t?: TranslateFn;
	};

	let { collectionName, app: appProp, t: translateProp }: Props = $props();

	const app = $derived(resolveApp(appProp));
	const t = $derived(resolveTranslate(translateProp));

	let open = $state(false);

	const trimmedCollectionName = $derived(collectionName.trim());
	const collectionsApi = $derived(app.plugins.tryGet<CorePluginApi>('core')?.collections);
	const lifetime = $derived(
		trimmedCollectionName ? collectionsApi?.getLifetime(trimmedCollectionName) : undefined
	);
	const canView = $derived(Boolean(trimmedCollectionName && lifetime));
	const entries = $derived.by(() => {
		if (!open || !canView || !collectionsApi || !trimmedCollectionName) {
			return [];
		}

		return collectionsApi.listEntries(trimmedCollectionName);
	});
</script>

<PopoverRoot bind:open>
	<PopoverTrigger>
		{#snippet child({ props }: { props: Record<string, unknown> })}
			<Button
				{...props}
				type="button"
				variant="ghost"
				size="icon-sm"
				icon="ri:database-2-line"
				disabled={!canView}
				aria-label={t('View collection contents')}
				class="size-10 shrink-0 text-dark-400 hover:text-dark-100 disabled:opacity-40"
			/>
		{/snippet}
	</PopoverTrigger>
	<PopoverContent align="end" class="w-80 p-4">
		<div class="mb-3 flex flex-col gap-1">
			<p class="text-xs font-semibold text-dark-200">{t('Collection contents')}</p>
			{#if trimmedCollectionName}
				<p class="font-mono text-xs text-dark-400">
					{trimmedCollectionName}
					{#if lifetime}
						<span class="text-dark-500">
							· {lifetime === 'session' ? t('Session') : t('Persistent')}
						</span>
					{/if}
				</p>
			{/if}
		</div>

		{#if entries.length === 0}
			<p class="py-2 text-xs text-dark-400">{t('This collection has no entries yet.')}</p>
		{:else}
			<ScrollArea orientation="vertical" viewportClasses="max-h-56 overflow-hidden">
				<ul class="grid gap-1">
					{#each entries as entry (entry.key)}
						<li
							class={cn(
								'grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2 rounded-lg px-2.5 py-2 text-xs',
								'border border-transparent bg-dark-700/40'
							)}
						>
							<span
								class="min-w-0 truncate font-mono font-medium text-primary-100"
								title={entry.key}
							>
								{entry.key}
							</span>
							<Icon
								icon="ri:arrow-right-line"
								class="size-3.5 shrink-0 text-dark-500"
								aria-hidden="true"
							/>
							<span class="min-w-0 truncate text-dark-200" title={entry.value}>
								{entry.value || t('Empty value')}
							</span>
						</li>
					{/each}
				</ul>
			</ScrollArea>
		{/if}
	</PopoverContent>
</PopoverRoot>
