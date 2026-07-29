<script lang="ts">
	import type { CollectionCreateForm } from './collection-create.svelte';

	import { Button } from '@stream-kit/ui/button';

	type Props = {
		form: CollectionCreateForm;
	};

	let { form }: Props = $props();

	const t = $derived(form.app.i18n.t);
</script>

<div class="flex flex-wrap items-center justify-end gap-2">
	<Button variant="ghost" disabled={form.saving} onclick={() => form.close()}>
		{t('Cancel')}
	</Button>
	<Button disabled={!form.canSave} onclick={() => void form.create()}>
		{t('Create collection')}
	</Button>
</div>
