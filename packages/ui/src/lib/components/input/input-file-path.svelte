<script lang="ts">
	import { Button } from '../button';
	import type { FilePathFilter } from './file-path-types';
	import InputText from './input-text.svelte';

	type Props = {
		label?: string;
		placeholder?: string;
		required?: boolean;
		error?: string;
		mode: 'file' | 'folder';
		filters?: FilePathFilter[];
		value?: string;
		onValueChange?: (value: string) => void;
		onBrowse: () => Promise<string | null | undefined>;
		browseLabel?: string;
		emptyFileLabel?: string;
		emptyFolderLabel?: string;
		/** When set, show an Upload button (local pick → caller uploads). */
		onUpload?: () => Promise<string | null | undefined>;
		uploadLabel?: string;
		/** When set, show a Cloud button (browse remote library). */
		onCloudBrowse?: () => Promise<string | null | undefined>;
		cloudLabel?: string;
	};

	let {
		label,
		placeholder,
		required,
		error,
		mode,
		value = '',
		onValueChange,
		onBrowse,
		browseLabel = 'Browse',
		emptyFileLabel = 'No file selected',
		emptyFolderLabel = 'No folder selected',
		onUpload,
		uploadLabel = 'Upload',
		onCloudBrowse,
		cloudLabel = 'Cloud'
	}: Props = $props();

	let isBusy = $state(false);

	async function runPicker(
		picker: () => Promise<string | null | undefined>
	): Promise<void> {
		if (isBusy) {
			return;
		}

		isBusy = true;
		try {
			const selected = await picker();
			if (!selected) {
				return;
			}
			onValueChange?.(selected);
		} finally {
			isBusy = false;
		}
	}
</script>

<div class="grid gap-2">
	<InputText
		{label}
		placeholder={placeholder ?? (mode === 'folder' ? emptyFolderLabel : emptyFileLabel)}
		{required}
		{error}
		readonly
		value={value}
	/>

	<div class="flex flex-wrap items-center gap-2">
		{#if onUpload}
			<Button
				type="button"
				variant="outline"
				onclick={() => void runPicker(onUpload)}
				disabled={isBusy}
				isLoading={isBusy}
				icon="ri:upload-2-line"
			>
				{uploadLabel}
			</Button>
		{/if}
		{#if onCloudBrowse}
			<Button
				type="button"
				variant="outline"
				onclick={() => void runPicker(onCloudBrowse)}
				disabled={isBusy}
				isLoading={isBusy}
				icon="ri:cloud-line"
			>
				{cloudLabel}
			</Button>
		{/if}
		{#if !onUpload && !onCloudBrowse}
			<Button
				type="button"
				variant="outline"
				onclick={() => void runPicker(onBrowse)}
				disabled={isBusy}
				isLoading={isBusy}
				icon="ri:folder-open-line"
			>
				{browseLabel}
			</Button>
		{/if}
	</div>
</div>
