<script lang="ts">
	import type { Tier } from '../lib/tier.svelte';

	import { InputText } from '@stream-kit/ui/input';

	import { getRankingsService } from '../lib/get-rankings';

	type Props = {
		tier: Tier;
	};

	let { tier }: Props = $props();
	const app = getRankingsService().requireApp();
	const t = app.i18n.t;
</script>

<form class="grid gap-6" onsubmit={(event: SubmitEvent) => event.preventDefault()}>
	<InputText
		label={t('Tier name')}
		required
		autocomplete="off"
		value={tier.name}
		error={tier.formErrors?.name}
		oninput={(event) => {
			tier.name = (event.currentTarget as HTMLInputElement).value;
		}}
	/>
</form>
