<script lang="ts">
	import type { FormEventHandler, KeyboardEventHandler } from 'svelte/elements';

	import { cn } from '../../utils';
	import { inputSizeClasses } from './input-size-classes';

	type Props = {
		query?: string;
		placeholder?: string;
		ariaLabel?: string;
		inputElement?: HTMLInputElement | null;
		autofocus?: boolean;
		onQueryChange?: (query: string) => void;
		class?: string;
	};

	let {
		query = $bindable(''),
		placeholder = 'Search values',
		ariaLabel = 'Search values',
		inputElement = $bindable(null),
		autofocus = false,
		onQueryChange,
		class: className
	}: Props = $props();

	// bits-ui Select typeahead listens on the trigger in the bubble phase; stop both
	// propagation paths so keystrokes stay in this field (especially in prod builds).
	const stopSelectKeydown: KeyboardEventHandler<HTMLElement> = (event) => {
		if (
			event.key.length === 1 ||
			event.key === 'Backspace' ||
			event.key === 'Delete' ||
			event.key === ' '
		) {
			event.stopPropagation();
			event.stopImmediatePropagation();
		}
	};

	const handleInput: FormEventHandler<HTMLInputElement> = (event) => {
		query = event.currentTarget.value;
		onQueryChange?.(query);
	};

	$effect(() => {
		if (!autofocus || !inputElement) {
			return;
		}

		inputElement.focus({ preventScroll: true });
	});
</script>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<div
	class={cn('sticky top-0 z-10 mb-[5px] shrink-0 border-b border-dark-600', className)}
	onkeydowncapture={stopSelectKeydown}
>
	<div class="relative flex items-center">
		<input
			type="text"
			inputmode="search"
			role="searchbox"
			bind:this={inputElement}
			value={query}
			{placeholder}
			aria-label={ariaLabel}
			autocomplete="off"
			spellcheck={false}
			class={cn(
				'w-full rounded-lg text-dark-50 outline-none',
				inputSizeClasses.md,
				'focus:border-primary focus:ring-1 focus:ring-primary'
			)}
			oninput={handleInput}
			onkeydown={stopSelectKeydown}
			onclick={(event) => event.stopPropagation()}
		/>
	</div>
</div>
