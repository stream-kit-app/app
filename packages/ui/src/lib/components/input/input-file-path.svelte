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
		emptyFolderLabel = 'No folder selected'
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
	<div class="flex items-end gap-2">
		<div class="min-w-0 flex-1">
			<InputText
				{label}
				placeholder={placeholder ?? (mode === 'folder' ? emptyFolderLabel : emptyFileLabel)}
				{required}
				{error}
				readonly
				value={value}
			/>
		</div>
		<Button
			type="button"
			variant="outline"
			onclick={browse}
			disabled={isBrowsing}
			isLoading={isBrowsing}
			icon="ri:folder-open-line"
		>
			{browseLabel}
		</Button>
	</div>
</div>
