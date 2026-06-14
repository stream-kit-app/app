<script lang="ts">
	import type { OverlayTemplateId } from '$lib/core/overlay';

	import { goto } from '$app/navigation';

	import { Button } from '@stream-kit/ui/button';
	import { Container } from '@stream-kit/ui/container';
	import { Heading } from '@stream-kit/ui/heading';
	import { InputSelect, InputText } from '@stream-kit/ui/input';

	import { app } from '$lib/core';
	import { OVERLAY_TEMPLATES } from '$lib/core/overlay';
	import { useI18n } from '$lib/i18n';
	import { slugify } from '$lib/utils';

	const { t } = useI18n();

	let name = $state('My Overlay');
	let template = $state<OverlayTemplateId>('blank');
	let isCreating = $state(false);

	const templateItems = OVERLAY_TEMPLATES.map((item) => ({
		value: item.id,
		label: item.name
	}));

	async function createOverlay(): Promise<void> {
		const trimmed = name.trim();

		if (!trimmed) {
			return;
		}

		isCreating = true;

		try {
			const id = slugify(trimmed);
			const record = await app.overlay.create({ id, name: trimmed, template });
			await goto(`/overlays/${record.id}`);
		} finally {
			isCreating = false;
		}
	}
</script>

<Container class="px-6 py-6" size="sm">
	<div class="flex flex-col gap-6">
		<div>
			<Heading level="1">{t('New overlay')}</Heading>
			<p class="mt-2 text-sm text-dark-100">
				{t('Create an OBS browser source overlay from a starter template.')}
			</p>
		</div>

		<section class="grid gap-5 rounded-lg border border-dark-600 bg-dark-800 p-5">
			<InputText
				label={t('Name')}
				value={name}
				required
				oninput={(event) => {
					name = event.currentTarget.value;
				}}
			/>

			<InputSelect
				type="single"
				label={t('Template')}
				items={templateItems}
				bind:value={template}
			/>

			<div class="flex flex-wrap gap-2">
				<Button
					onclick={createOverlay}
					disabled={isCreating || !name.trim()}
					isLoading={isCreating}
				>
					{t('Create overlay')}
				</Button>
				<Button variant="outline" onclick={() => goto('/overlays')}>{t('Cancel')}</Button>
			</div>
		</section>
	</div>
</Container>
