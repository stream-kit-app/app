<script lang="ts">
	import { page } from '$app/state';

	import { AuthHeaderControls } from '$lib/components/core/auth';
	import { app } from '$lib/core';
	import { resolvePageTitle } from '$lib/core/page-header';

	const resolved = $derived(
		resolvePageTitle(page.url.pathname, app.menu.items, app.pluginMenuPages.entries)
	);

	const displayTitle = $derived(app.pageHeader.title ?? resolved.title);
	const displaySegments = $derived(
		app.pageHeader.segments.length > 0 ? app.pageHeader.segments : resolved.segments
	);
</script>

<header
	class="flex h-14 shrink-0 items-center justify-between gap-4 border-b border-dark-600 bg-background px-6"
>
	<nav aria-label="Page title" class="flex min-w-0 items-center gap-2 text-sm">
		{#each displaySegments as segment (segment)}
			<span class="truncate text-dark-200">{segment}</span>
			<span class="text-dark-500" aria-hidden="true">/</span>
		{/each}
		<span class="truncate font-medium text-foreground">{displayTitle}</span>
	</nav>
	<div class="ml-auto flex shrink-0 items-center gap-2">
		<AuthHeaderControls />
	</div>
</header>
