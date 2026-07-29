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
	class="group/card flex h-full flex-col border-r border-b border-rule bg-background transition-colors hover:bg-dark-900/60"
>
	<a href="/plugins/{plugin.key}" class="flex flex-1 cursor-pointer flex-col p-4 pb-3">
		<div class="flex items-start gap-3">
			<div
				class="flex size-10 shrink-0 items-center justify-center border border-rule text-primary"
				aria-hidden="true"
			>
				<Icon icon={plugin.icon} class="size-5" />
			</div>
			<div class="min-w-0 flex-1 space-y-2">
				<h2 class="min-w-0 truncate text-base font-semibold text-foreground">{plugin.name}</h2>
				<div class="flex flex-wrap items-center gap-1.5">
					<Badge variant="default" size="sm">v{plugin.version}</Badge>
					{#if plugin.category}
						<Badge variant="secondary" size="sm">
							{PLUGIN_CATEGORY_LABELS[plugin.category]}
						</Badge>
					{/if}
				</div>
				{#if plugin.description}
					<p class="line-clamp-2 text-sm text-muted-foreground">{plugin.description}</p>
				{/if}
			</div>
		</div>

		<div class="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
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
		<div class="border-t border-rule bg-dark-900/40 px-4 py-3 font-mono text-[11px] text-muted-foreground">
			Requires Stream Kit {plugin.streamKitVersion}
		</div>
	{/if}

	<div class="mt-auto flex flex-wrap items-center gap-2 border-t border-rule p-3">
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
