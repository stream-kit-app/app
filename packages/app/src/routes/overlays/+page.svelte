<script lang="ts">
	import { goto } from '$app/navigation';

	import { Button } from '@stream-kit/ui/button';
	import { Container } from '@stream-kit/ui/container';
	import { Heading } from '@stream-kit/ui/heading';

	import { app } from '$lib/core';
	import { useI18n } from '$lib/i18n';

	const { t } = useI18n();

	async function copyUrl(overlayId: string): Promise<void> {
		await navigator.clipboard.writeText(app.overlay.getUrl(overlayId));
		app.toast.create({
			title: t('Copied browser source URL'),
			variant: 'success'
		});
	}
</script>

<Container class="px-6 py-6" size="md">
	<div class="flex flex-col gap-6">
		<div class="flex flex-wrap items-center justify-between gap-4">
			<div>
				<Heading level="1">{t('Overlays')}</Heading>
				<p class="mt-2 text-sm text-dark-100">
					{#if app.overlay.status.running}
						{t('Overlay server running at {url}', { url: app.overlay.status.baseUrl })}
					{:else}
						{t('Overlay server is stopped')}
					{/if}
				</p>
			</div>
			<div class="flex flex-wrap gap-2">
				{#if app.overlay.status.running}
					<Button variant="outline" onclick={() => app.overlay.stopServer()}>
						{t('Stop server')}
					</Button>
				{:else}
					<Button variant="outline" onclick={() => app.overlay.startServer()}>
						{t('Start server')}
					</Button>
				{/if}
				<Button onclick={() => goto('/overlays/new')}>{t('New overlay')}</Button>
			</div>
		</div>

		{#if app.overlay.items.length === 0}
			<div class="rounded-lg border border-dark-600 bg-dark-800 p-6 text-dark-100">
				{t('No overlays yet. Create one to get a browser source URL for OBS.')}
			</div>
		{:else}
			<div class="grid gap-4">
				{#each app.overlay.items as overlay (overlay.id)}
					<article class="rounded-lg border border-dark-600 bg-dark-800 p-4">
						<div class="flex flex-wrap items-start justify-between gap-4">
							<div class="min-w-0 flex-1">
								<h2 class="text-base font-semibold text-white">{overlay.name}</h2>
								<p class="mt-1 text-sm text-dark-100">
									{t('Template')}: {overlay.template} / {overlay.width}x{overlay.height}
								</p>
								<p class="mt-1 font-mono text-xs break-all text-dark-50">
									{app.overlay.getUrl(overlay.id)}
								</p>
							</div>
							<div class="flex flex-wrap gap-2">
								<Button
									size="sm"
									variant="outline"
									onclick={() => copyUrl(overlay.id)}
								>
									{t('Copy URL')}
								</Button>
								<Button
									size="sm"
									variant="secondary"
									onclick={() => goto(`/overlays/${overlay.id}`)}
								>
									{t('Edit')}
								</Button>
								<Button
									size="sm"
									variant="destructive"
									onclick={async () => {
										await app.overlay.remove(overlay.id);
									}}
								>
									{t('Delete')}
								</Button>
							</div>
						</div>
					</article>
				{/each}
			</div>
		{/if}
	</div>
</Container>
