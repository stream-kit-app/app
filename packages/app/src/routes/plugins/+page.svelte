<script lang="ts">
	import { PluginCard } from '$lib/components/core/plugins';
	import { Container } from '$lib/components/ui/container';
	import { Heading } from '$lib/components/ui/heading';
	import { app } from '$lib/core';
</script>

<Container class="px-6 py-6">
	<div class="flex flex-col gap-6">
		<Heading level="1">Plugins</Heading>

		{#if app.plugins.items.length === 0}
			<div class="rounded-lg border border-dark-600 p-6 text-dark-100">
				No plugins have been registered yet.
			</div>
		{:else}
			<div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
				{#each app.plugins.items as plugin (plugin.key)}
					<PluginCard {plugin} />
				{/each}
			</div>
		{/if}
	</div>
</Container>
