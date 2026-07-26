<script lang="ts">
	import type { Snippet } from 'svelte';

	import { Button } from '../button';
	import type { FilePathFilter } from './file-path-types';
	import InputText from './input-text.svelte';

	/**
	 * File picker for uploads. Keeps Tauri/fs out of `@stream-kit/ui` — the caller
	 * supplies `onBrowse` / optional `onCloudBrowse`.
	 */
	type Props = {
		label?: string;
		placeholder?: string;
		required?: boolean;
		error?: string;
		/** Display label for the selected file (filename or short status). */
		value?: string;
		/** Optional accept filters for the caller's native picker. */
		filters?: FilePathFilter[];
		/**
		 * Open a file picker (and optionally upload). Return a display label, or
		 * `null`/`undefined` if cancelled.
		 */
		onBrowse: () => Promise<string | null | undefined>;
		/** Optional cloud library picker; return a display label when selected. */
		onCloudBrowse?: () => Promise<string | null | undefined>;
		onValueChange?: (value: string) => void;
		/** Clear the current selection. */
		onClear?: () => void;
		browseLabel?: string;
		cloudLabel?: string;
		clearLabel?: string;
		emptyLabel?: string;
		/** Optional preview (e.g. image thumbnail) shown above the field. */
		preview?: Snippet;
	};

	let {
		label,
		placeholder,
		required,
		error,
		value = '',
		onBrowse,
		onCloudBrowse,
		onValueChange,
		onClear,
		browseLabel = 'Upload',
		cloudLabel = 'Cloud',
		clearLabel = 'Clear',
		emptyLabel = 'No file selected',
		preview
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
	{#if preview}
		<div class="flex items-center gap-3">
			{@render preview()}
		</div>
	{/if}

	<InputText
		{label}
		placeholder={placeholder ?? emptyLabel}
		{required}
		{error}
		readonly
		value={value}
	/>

	<div class="flex flex-wrap items-center gap-2">
		<Button
			type="button"
			variant="outline"
			onclick={() => void runPicker(onBrowse)}
			disabled={isBusy}
			isLoading={isBusy}
			icon="ri:upload-2-line"
		>
			{browseLabel}
		</Button>
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
		{#if onClear && value}
			<Button type="button" variant="ghost" onclick={() => onClear()} icon="ri:close-line">
				{clearLabel}
			</Button>
		{/if}
	</div>
</div>
