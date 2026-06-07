<script lang="ts">
	import Icon from '@iconify/svelte';

	import { PluginSettingsForm } from '$lib/components/core/plugins';
	import { Button } from '$lib/components/ui/button';
	import { Container } from '$lib/components/ui/container';
	import { Heading } from '$lib/components/ui/heading';
	import { InputSwitch } from '$lib/components/ui/input';
	import { app } from '$lib/core';

	let statusRevision = $state(0);

	function openSettings(pluginKey: string): void {
		const plugin = app.plugins.find(pluginKey);

		if (!plugin) {
			return;
		}

		app.createModal({
			id: `plugin-settings-${plugin.key}`,
			title: plugin.name,
			description: plugin.description,
			content: PluginSettingsForm,
			props: { plugin },
			size: 'lg'
		}).open();
	}

	async function setPluginEnabled(pluginKey: string, enabled: boolean): Promise<void> {
		const plugin = app.plugins.find(pluginKey);

		if (!plugin) {
			return;
		}

		await plugin.setEnabled(app, enabled);
		statusRevision += 1;

		app.toast.create({
			title: plugin.isEnabled ? 'Plugin enabled' : 'Plugin disabled',
			description: `${plugin.name} has been ${plugin.isEnabled ? 'enabled' : 'disabled'}.`,
			variant: 'success'
		});
	}

	$effect(() => {
		const disposers = app.plugins.items.flatMap((plugin) => {
			const unsubscribe = (
				plugin.api as { subscribe?: (listener: () => void) => () => void } | undefined
			)?.subscribe?.(() => {
				statusRevision += 1;
			});

			return unsubscribe ? [unsubscribe] : [];
		});

		return () => {
			for (const dispose of disposers) {
				dispose();
			}
		};
	});
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
					{@const missingDependencies = plugin.missingDependencies(app)}
					{@const disabledDependencies = plugin.disabledDependencies(app)}
					{@const hasMissingDependencies = missingDependencies.length > 0}
					{@const hasDisabledDependencies = disabledDependencies.length > 0}
					{@const isConfigured = plugin.isConfigured(app)}
					{@const _statusRevision = statusRevision}
					<section
						class="flex min-h-52 flex-col gap-4 rounded-lg border border-dark-600 bg-dark-800 p-4"
					>
						{#key _statusRevision}
							<span class="hidden">{_statusRevision}</span>
						{/key}

						<div class="flex items-start gap-3">
							<div
								class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-dark-700"
							>
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
								bind:checked={
									() => plugin.isEnabled,
									(value) => void setPluginEnabled(plugin.key, value)
								}
							/>
						</div>

						<div class="flex flex-col gap-2 text-sm">
							<div class="flex items-center justify-between gap-3">
								<span class="text-dark-100">Configured</span>
								<span class={isConfigured ? 'text-green-400' : 'text-dark-200'}>
									{isConfigured ? 'Configured' : 'Not configured'}
								</span>
							</div>
							{#if plugin.dependencies.length > 0}
								<div class="flex items-start justify-between gap-3">
									<span class="text-dark-100">Depends on</span>
									<span
										class={hasMissingDependencies || hasDisabledDependencies
											? 'text-red-300'
											: 'text-dark-50'}
									>
										{plugin.dependencies.join(', ')}
									</span>
								</div>
							{/if}
						</div>

						{#if hasMissingDependencies}
							<div class="rounded-lg border border-red-400/30 bg-red-400/10 p-3 text-sm text-red-200">
								Missing plugin: {missingDependencies.join(', ')}
							</div>
						{/if}

						{#if hasDisabledDependencies}
							<div class="rounded-lg border border-red-400/30 bg-red-400/10 p-3 text-sm text-red-200">
								Disabled plugin: {disabledDependencies.join(', ')}
							</div>
						{/if}

						<div class="mt-auto flex flex-wrap gap-2">
							{#if plugin.hasSettings}
								<Button variant="outline" onclick={() => openSettings(plugin.key)}>
									Configure
								</Button>
							{/if}
						</div>
					</section>
				{/each}
			</div>
		{/if}
	</div>
</Container>
