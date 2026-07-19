<script lang="ts">
	import type { Quote } from '../lib/quote.svelte';

	import { Button } from '@stream-kit/ui/button';

	import { getQuotesService } from '../lib/get-quotes';

	type Props = {
		quote: Quote;
	};

	let { quote }: Props = $props();
	const app = getQuotesService().requireApp();
	const t = app.i18n.t;
</script>

<div class="flex flex-wrap items-center justify-end gap-2">
	<Button variant="ghost" type="button" onclick={() => quote.close()}>{t('Cancel')}</Button>
	<Button type="button" onclick={() => void quote.save()}>{t('Save')}</Button>
</div>
