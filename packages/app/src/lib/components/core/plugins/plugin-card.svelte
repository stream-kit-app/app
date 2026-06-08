<script lang="ts">
	import type { RegisteredPlugin } from '$lib/core/plugins';

	import Icon from '@iconify/svelte';

	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import { InputSwitch } from '$lib/components/ui/input';
	import { app } from '$lib/core';
	import { cn } from '$lib/utils';

	import PluginSettingsForm from './plugin-settings-form.svelte';

	type Props = {
		plugin: RegisteredPlugin;
	};

	let { plugin }: Props = $props();
	let statusRevision = $state(0);

	const missingDependencies = $derived.by(() => {
		void statusRevision;

		return plugin.missingDependencies(app);
	});
	const disabledDependencies = $derived.by(() => {
		void statusRevision;

		return plugin.disabledDependencies(app);
	});
	const hasMissingDependencies = $derived(missingDependencies.length > 0);
	const hasDisabledDependencies = $derived(disabledDependencies.length > 0);
	const isConfigured = $derived.by(() => {
		void statusRevision;

		return plugin.isConfigured(app);
	});
	const hasDependencyIssues = $derived(hasMissingDependencies || hasDisabledDependencies);

	$effect(() => {
		const api = plugin.api as { subscribe?: (listener: () => void) => () => void } | undefined;

		return api?.subscribe?.(() => {
			statusRevision += 1;
		});
	});

	function openSettings(): void {
		app.createModal({
			id: `plugin-settings-${plugin.key}`,
			title: plugin.name,
			description: plugin.description,
			content: PluginSettingsForm,
			props: { plugin },
			size: 'lg'
		}).open();
	}

	async function setPluginEnabled(enabled: boolean): Promise<void> {
		await plugin.setEnabled(app, enabled);
		statusRevision += 1;

		app.toast.create({
			title: plugin.isEnabled ? 'Plugin enabled' : 'Plugin disabled',
			description: `${plugin.name} has been ${plugin.isEnabled ? 'enabled' : 'disabled'}.`,
			variant: 'success'
		});
	}
</script>

<section
	class={cn(
		'flex min-h-52 flex-col gap-4 rounded-lg p-4',
		hasDependencyIssues ? 'pointer-events-none bg-destructive-900 opacity-70' : 'bg-dark-800'
	)}
>
	<div class="flex items-start gap-3">
		<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-dark-700">
			<Icon icon={plugin.icon ?? 'ri:plug-line'} class="h-5 w-5" />
		</div>
		<div class="min-w-0 flex-1">
			<h2 class="font-semibold">{plugin.name}</h2>
			{#if plugin.description}
				<p class="mt-1 text-sm text-dark-100">{plugin.description}</p>
			{/if}
		</div>
		<InputSwitch
			class="shrink-0"
			bind:checked={() => plugin.isEnabled, (value) => void setPluginEnabled(value)}
		/>
	</div>

	<div class="flex flex-col gap-2 text-sm">
		<div class="flex items-center justify-between gap-3">
			<span class="text-dark-100">Configured</span>
			<Badge variant={isConfigured ? 'success' : 'default'}>
				{isConfigured ? 'Yes' : 'No'}
			</Badge>
		</div>
		{#if plugin.dependencies.length > 0}
			<div class="flex items-start justify-between gap-3">
				<span class="text-dark-100">Depends on</span>
				{#each plugin.dependencies as dependency}
					<Badge variant={hasDependencyIssues ? 'destructive' : 'success'}>
						{dependency}
					</Badge>
				{/each}
			</div>
		{/if}
	</div>

	<div class="mt-auto flex flex-wrap gap-2">
		{#if plugin.hasSettings}
			<Button variant="outline" onclick={openSettings}>Configure</Button>
		{/if}
	</div>
</section>
