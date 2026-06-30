<script lang="ts">
	import { Button } from '@stream-kit/ui/button';

	import { useI18n } from '$lib/i18n';

	type Props = {
		editMode?: boolean;
		onAddWidget?: () => void;
	};

	let { editMode = false, onAddWidget }: Props = $props();

	const { t } = useI18n();
</script>

<div class="rounded-lg border border-dark-600 bg-dark-800 p-6 text-center text-dark-100">
	<p class="font-semibold text-dark-50">{t('Your dashboard is empty')}</p>
	<p class="mt-1 text-sm">
		{t('Add widgets to build a personalized overview of your stream setup.')}
	</p>
	{#if editMode}
		<Button class="mt-4" icon="ri:add-line" onclick={() => onAddWidget?.()}>
			{t('Add your first widget')}
		</Button>
	{:else}
		<p class="mt-4 text-sm text-dark-300">{t('Switch to Customize to add widgets.')}</p>
	{/if}
</div>
