<script lang="ts">
	import type { QueueEditForm } from './queue-edit.svelte';

	import { InputSwitch, InputText } from '@stream-kit/ui/input';

	import { useI18n } from '$lib/i18n';

	type Props = {
		form: QueueEditForm;
	};

	let { form }: Props = $props();

	const { t } = useI18n();
</script>

<div class="grid gap-5">
	<InputText
		label={t('Name')}
		required
		disabled={form.isDefaultQueue}
		value={form.name}
		oninput={(event) => (form.name = event.currentTarget.value)}
	/>
	<div class="grid gap-2">
		<InputSwitch label={t('Blocking')} bind:checked={form.blocking} />
		<p class="text-sm text-dark-300">
			{form.blocking
				? t('Run one action at a time. The next action starts when the current one finishes.')
				: t('Run queued actions at the same time.')}
		</p>
	</div>
	<InputText
		label={t('Max length')}
		type="number"
		min="1"
		step="1"
		placeholder={t('Unlimited')}
		value={form.maxLength}
		oninput={(event) => (form.maxLength = event.currentTarget.value)}
	/>
</div>
