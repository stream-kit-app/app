<script lang="ts">
	import Icon from '@iconify/svelte';

	import { Badge } from '@stream-kit/ui/badge';
	import { Button } from '@stream-kit/ui/button';

	import {
		PLUGIN_CATEGORY_LABELS,
		type PluginCategory
	} from '$lib/plugins/marketplace';

	import StarRating from './star-rating.svelte';

	type Props = {
		plugin: {
			key: string;
			name: string;
			description?: string;
			icon: string;
			version: string;
			streamKitVersion?: string;
			downloadUrl?: string;
			category?: PluginCategory | null;
			averageRating?: number;
			ratingCount?: number;
		};
	};

	let { plugin }: Props = $props();
</script>

<article
	class="group/card flex h-full flex-col overflow-hidden rounded-xl border border-dark-600 bg-dark-800 transition-colors hover:border-dark-500"
>
	<a href="/plugins/{plugin.key}" class="flex flex-1 cursor-pointer flex-col p-4 pb-3">
		<div class="flex items-start gap-3">
			<div
				class="flex size-10 shrink-0 items-center justify-center rounded-lg bg-dark-700 text-primary"
				aria-hidden="true"
			>
				<Icon icon={plugin.icon} class="size-5" />
			</div>
			<div class="min-w-0 flex-1 space-y-2">
				<h2 class="min-w-0 truncate text-base font-semibold text-dark-50">{plugin.name}</h2>
				<div class="flex flex-wrap items-center gap-1.5">
					<Badge variant="default" size="sm">v{plugin.version}</Badge>
					{#if plugin.category}
						<Badge variant="secondary" size="sm">
							{PLUGIN_CATEGORY_LABELS[plugin.category]}
						</Badge>
					{/if}
				</div>
				{#if plugin.description}
					<p class="line-clamp-2 text-sm text-dark-300">{plugin.description}</p>
				{/if}
			</div>
		</div>

		<div class="mt-3 flex items-center gap-2 text-xs text-dark-300">
			<StarRating value={plugin.averageRating ?? 0} />
			{#if (plugin.ratingCount ?? 0) > 0}
				<span>
					{(plugin.averageRating ?? 0).toFixed(1)}
					({plugin.ratingCount})
				</span>
			{:else}
				<span>No ratings yet</span>
			{/if}
		</div>
	</a>

	{#if plugin.streamKitVersion}
		<div class="border-t border-dark-700/80 bg-dark-900/50 px-4 py-3 text-xs text-dark-300">
			Requires Stream Kit {plugin.streamKitVersion}
		</div>
	{/if}

	<div class="mt-auto flex flex-wrap items-center gap-2 border-t border-dark-700 p-3">
		<Button href="/plugins/{plugin.key}" size="sm" variant="ghost" class="flex-1">Details</Button>
		{#if plugin.downloadUrl}
			<Button
				href={plugin.downloadUrl}
				icon="mdi:download"
				size="sm"
				variant="outline"
				class="flex-1"
			>
				Download
			</Button>
		{/if}
	</div>
</article>
