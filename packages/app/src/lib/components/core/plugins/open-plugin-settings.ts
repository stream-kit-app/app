import type { RegisteredPlugin } from '$lib/core/plugins';

import PluginSettingsForm from './plugin-settings-form.svelte';
import PluginSettingsFormFooter from './plugin-settings-form-footer.svelte';
import { getApp } from '$lib/core/registry';

/** Opens the plugin settings modal (fields in content, Cancel / Save in the footer). */
export function openPluginSettings(plugin: RegisteredPlugin): void {
	const modalId = `plugin-settings-${plugin.key}`;

	getApp()
		.createModal({
			id: modalId,
			title: plugin.name,
			description: plugin.description,
			content: PluginSettingsForm,
			footer: PluginSettingsFormFooter,
			props: { plugin, modalId },
			size: 'lg'
		})
		.open();
}
