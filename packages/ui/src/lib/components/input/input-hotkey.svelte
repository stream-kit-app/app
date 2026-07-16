<script lang="ts">
	import type { KeyboardEventHandler } from 'svelte/elements';

	import Icon from '@iconify/svelte';
	import { useId } from 'bits-ui';

	import { cn } from '../../utils';
	import { inputFieldBorder, inputFieldErrorMessage } from './input-field-classes';
	import Label from './label.svelte';

	type Props = {
		label?: string;
		placeholder?: string;
		required?: boolean;
		error?: string;
		value?: string;
		captureLabel?: string;
		emptyLabel?: string;
	};

	let {
		label,
		placeholder = 'Click and press keys…',
		required = false,
		error,
		value = $bindable(''),
		captureLabel = 'Press shortcut…',
		emptyLabel = 'Not set'
	}: Props = $props();

	const id = useId();
	let capturing = $state(false);

	function codeToKey(code: string): string | null {
		if (code.startsWith('Key')) {
			return code.slice(3);
		}

		if (code.startsWith('Digit')) {
			return code.slice(5);
		}

		const special: Record<string, string> = {
			Space: 'Space',
			Enter: 'Enter',
			Escape: 'Escape',
			Tab: 'Tab',
			Backspace: 'Backspace',
			Delete: 'Delete',
			ArrowUp: 'ArrowUp',
			ArrowDown: 'ArrowDown',
			ArrowLeft: 'ArrowLeft',
			ArrowRight: 'ArrowRight',
			Home: 'Home',
			End: 'End',
			PageUp: 'PageUp',
			PageDown: 'PageDown'
		};

		if (special[code]) {
			return special[code];
		}

		if (/^F\d{1,2}$/.test(code)) {
			return code;
		}

		return null;
	}

	function formatFromKeyboardEvent(event: KeyboardEvent): string | null {
		if (event.key === 'Control' || event.key === 'Shift' || event.key === 'Alt' || event.key === 'Meta') {
			return null;
		}

		const modifiers: string[] = [];

		if (event.ctrlKey || event.metaKey) {
			modifiers.push('CommandOrControl');
		}

		if (event.altKey) {
			modifiers.push('Alt');
		}

		if (event.shiftKey) {
			modifiers.push('Shift');
		}

		const key = codeToKey(event.code);

		if (!key) {
			return null;
		}

		return [...modifiers, key].join('+');
	}

	function formatLabel(shortcut: string): string {
		if (!shortcut.trim()) {
			return '';
		}

		return shortcut
			.split('+')
			.map((part) => {
				if (part === 'CommandOrControl') {
					return 'Ctrl';
				}

				return part;
			})
			.join(' + ');
	}

	const displayValue = $derived(value.trim() ? formatLabel(value) : '');

	function startCapture(): void {
		capturing = true;
	}

	function stopCapture(): void {
		capturing = false;
	}

	const onKeydown: KeyboardEventHandler<HTMLButtonElement> = (event) => {
		if (!capturing) {
			return;
		}

		event.preventDefault();
		event.stopPropagation();

		if (event.key === 'Escape') {
			stopCapture();
			return;
		}

		const shortcut = formatFromKeyboardEvent(event);

		if (!shortcut) {
			return;
		}

		value = shortcut;
		stopCapture();
	};

	const onBlur = () => {
		stopCapture();
	};
</script>

<div class="grid w-full min-w-0 gap-2">
	{#if label}
		<Label for={id}>{label}</Label>
	{/if}

	<button
		{id}
		type="button"
		class={cn(
			'flex h-10 w-full items-center gap-2 rounded-xl border px-4 text-left text-sm',
			'bg-dark-800 focus:ring-2 focus:ring-ring focus:outline-none',
			capturing && 'ring-2 ring-ring',
			inputFieldBorder(error)
		)}
		onclick={startCapture}
		onkeydown={onKeydown}
		onblur={onBlur}
	>
		<Icon icon="ri:keyboard-line" class="size-4 shrink-0 text-dark-200" />
		<span class={cn('truncate font-mono', !displayValue && 'text-dark-300')}>
			{#if capturing}
				{captureLabel}
			{:else if displayValue}
				{displayValue}
			{:else}
				{placeholder || emptyLabel}
			{/if}
		</span>
	</button>

	{#if error}
		<p class={inputFieldErrorMessage}>{error}</p>
	{/if}
</div>
