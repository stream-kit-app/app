<script lang="ts">
	import type { RegisteredPlugin } from '$lib/core/plugins';

	import SettingsFieldGroup from '$lib/components/core/settings/settings-field-group.svelte';
	import { app } from '$lib/core';

	type Props = {
		plugin: RegisteredPlugin;
	};

	let { plugin }: Props = $props();
	let revision = $state(0);

	// New identity only when the plugin API notifies, not on every keystroke; field
	// values are read reactively through `getValue`.
	const context = $derived.by(() => {
		void revision;

		return { ...plugin.createContext(app) };
	});

	$effect(() => {
		const api = plugin.api as { subscribe?: (listener: () => void) => () => void } | undefined;

		return api?.subscribe?.(() => {
			revision += 1;
		});
	});
</script>

<SettingsFieldGroup
	{context}
	items={plugin.fieldItems}
	getField={(key) => plugin.getField(key)}
	getFieldError={(fieldId) => plugin.getFieldError(fieldId, plugin.formErrors)}
/>
