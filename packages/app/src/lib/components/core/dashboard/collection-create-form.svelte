<script lang="ts">
	import type { CollectionCreateFormModel } from './collection-create.svelte';

	import { InputSelect, InputText } from '@stream-kit/ui/input';

	import { useI18n } from '$lib/i18n';

	type Props = {
		form: CollectionCreateFormModel;
	};

	let { form }: Props = $props();

	const { t } = useI18n();

	const lifetimeItems = $derived([
		{ value: 'session', label: t('Session') },
		{ value: 'persistent', label: t('Persistent') }
	]);
</script>

<div class="grid gap-5">
	<InputText
		label={t('Collection name')}
		required
		placeholder="myCollection"
		value={form.collectionName}
		oninput={(event) => (form.collectionName = event.currentTarget.value)}
	/>
	<InputSelect
		label={t('Lifetime')}
		items={lifetimeItems}
		value={form.lifetime}
		onValueChange={(value: string) => {
			if (value === 'session' || value === 'persistent') {
				form.lifetime = value;
			}
		}}
	/>
	{#if form.lifetime === 'session'}
		<p class="text-sm text-dark-300">
			{t('Session collections are cleared when the app closes.')}
		</p>
	{/if}
</div>
