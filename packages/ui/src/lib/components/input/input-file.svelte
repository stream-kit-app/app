<script lang="ts">
	import type { Snippet } from 'svelte';

	import { Button } from '../button';
	import type { FilePathFilter } from './file-path-types';
	import InputText from './input-text.svelte';

	/**
	 * File picker for uploads (local browse today; cloud upload later).
	 * Keeps Tauri/fs out of `@stream-kit/ui` — the caller supplies `onBrowse`.
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
		onValueChange?: (value: string) => void;
		/** Clear the current selection. */
		onClear?: () => void;
		browseLabel?: string;
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
		onValueChange,
		onClear,
		browseLabel = 'Browse',
		clearLabel = 'Clear',
		emptyLabel = 'No file selected',
		preview
	}: Props = $props();

	let isBrowsing = $state(false);

	async function browse(): Promise<void> {
		if (isBrowsing) {
			return;
		}

		isBrowsing = true;

		try {
			const selected = await onBrowse();

			if (!selected) {
				return;
			}

			onValueChange?.(selected);
		} finally {
			isBrowsing = false;
		}
	}
</script>

<div class="grid gap-2">
	{#if preview}
		<div class="flex items-center gap-3">
			{@render preview()}
		</div>
	{/if}

	<div class="flex items-end gap-2">
		<div class="min-w-0 flex-1">
			<InputText
				{label}
				placeholder={placeholder ?? emptyLabel}
				{required}
				{error}
				readonly
				value={value}
			/>
		</div>
		<Button
			type="button"
			variant="outline"
			onclick={() => void browse()}
			disabled={isBrowsing}
			isLoading={isBrowsing}
			icon="ri:upload-2-line"
		>
			{browseLabel}
		</Button>
		{#if onClear && value}
			<Button type="button" variant="ghost" onclick={() => onClear()} icon="ri:close-line">
				{clearLabel}
			</Button>
		{/if}
	</div>
</div>
