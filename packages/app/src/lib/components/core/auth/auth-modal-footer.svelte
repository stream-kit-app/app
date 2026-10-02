<script lang="ts">
	import type { AuthModalForm } from './auth-modal-form.svelte';

	import { Button } from '@stream-kit/ui/button';

	import { useI18n } from '$lib/i18n';

	type Props = {
		form: AuthModalForm;
		submitLabel: string;
	};

	let { form, submitLabel }: Props = $props();

	const { t } = useI18n();
</script>

<div class="flex flex-wrap items-center justify-end gap-2">
	<Button variant="ghost" disabled={form.submitting} onclick={() => form.close()}>
		{t('Cancel')}
	</Button>
	<Button
		type="submit"
		form={form.formId}
		disabled={!form.canSubmit}
		isLoading={form.submitting}
	>
		{submitLabel}
	</Button>
</div>
