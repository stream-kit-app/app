<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';

	import { SettingsSectionForm } from '$lib/components/core/settings';
	import { app } from '$lib/core';

	const key = $derived(page.params.key);
	const section = $derived(key ? app.settings.find(key) : undefined);

	$effect(() => {
		if (!key && app.settings.items.length > 0) {
			void goto(`/settings/${app.settings.items[0].key}`, { replaceState: true });
		}
	});
</script>

<div class="rounded-xl shadow-sm">
	{#if section}
		<SettingsSectionForm {section} />
	{:else if app.settings.items.length === 0}
		<div class="flex h-full items-center justify-center p-6 text-dark-100">
			No settings have been registered yet.
		</div>
	{:else}
		<div class="flex h-full items-center justify-center p-6 text-dark-100">
			Select a settings section.
		</div>
	{/if}
</div>
