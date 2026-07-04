<script lang="ts">
	import type { SettingsContext } from '$lib/core/settings/context';
	import type { SettingsFieldInstance, SettingsFieldItem } from '$lib/core/settings/field';
	import type { SettingsFormErrors } from '$lib/core/settings/validate-settings';

	import SettingsFieldGroup from '$lib/components/core/settings/settings-field-group.svelte';
	import { Button } from '@stream-kit/ui/button';

	type Props = {
		context: SettingsContext;
		fieldItems: SettingsFieldItem[];
		getField: (key: string) => SettingsFieldInstance | undefined;
		getFieldError?: (fieldId: string) => string | undefined;
		onSave: () => void | Promise<void>;
		isSaving?: boolean;
		saveLabel?: string;
		class?: string;
	};

	let {
		context,
		fieldItems,
		getField,
		getFieldError,
		onSave,
		isSaving = false,
		saveLabel = 'Save',
		class: className
	}: Props = $props();
</script>

<div class={className ?? 'flex w-full flex-col gap-6'}>
	<SettingsFieldGroup {context} items={fieldItems} {getField} {getFieldError} />

	<div>
		<Button onclick={onSave} isLoading={isSaving}>{saveLabel}</Button>
	</div>
</div>
