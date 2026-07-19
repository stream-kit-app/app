<script lang="ts">
	import type { Quote } from '../lib/quote.svelte';

	import { InputText } from '@stream-kit/ui/input';

	import { getQuotesService } from '../lib/get-quotes';

	type Props = {
		quote: Quote;
	};

	let { quote }: Props = $props();
	const app = getQuotesService().requireApp();
	const t = app.i18n.t;
</script>

<form class="grid gap-6" onsubmit={(event: SubmitEvent) => event.preventDefault()}>
	{#if quote.id != null}
		<p class="text-sm text-dark-400">{t('Quote #{id}', { id: quote.id })}</p>
	{/if}

	<InputText
		label={t('Quote text')}
		required
		autocomplete="off"
		value={quote.text}
		error={quote.formErrors?.text}
		oninput={(event) => {
			quote.text = (event.currentTarget as HTMLInputElement).value;
		}}
	/>

	<InputText
		label={t('Author')}
		required
		autocomplete="off"
		placeholder={t('Who said this quote?')}
		value={quote.addedBy}
		error={quote.formErrors?.addedBy}
		oninput={(event) => {
			quote.addedBy = (event.currentTarget as HTMLInputElement).value;
		}}
	/>
</form>
