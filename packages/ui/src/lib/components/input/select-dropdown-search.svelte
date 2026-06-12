<script lang="ts">
	import type { KeyboardEventHandler } from 'svelte/elements';

	import Icon from '@iconify/svelte';

	import { cn } from '../../utils';
	import { inputSizeClasses } from './input-size-classes';

	type Props = {
		query?: string;
		placeholder?: string;
		ariaLabel?: string;
		inputElement?: HTMLInputElement | null;
		class?: string;
	};

	let {
		query = $bindable(''),
		placeholder = 'Search values',
		ariaLabel = 'Search values',
		inputElement = $bindable(null),
		class: className
	}: Props = $props();

	const handleKeydown: KeyboardEventHandler<HTMLInputElement> = (event) => {
		if (event.key.length === 1 || event.key === 'Backspace' || event.key === 'Delete') {
			event.stopPropagation();
		}
	};
</script>

<div class={cn('sticky top-0 z-10 mb-[5px] shrink-0 border-b border-dark-600', className)}>
	<div class="relative flex items-center">
		<input
			type="search"
			bind:this={inputElement}
			bind:value={query}
			{placeholder}
			aria-label={ariaLabel}
			autocomplete="off"
			class={cn(
				'w-full rounded-lg text-dark-50 outline-none',
				inputSizeClasses.md,
				'focus:border-primary focus:ring-1 focus:ring-primary'
			)}
			onkeydown={handleKeydown}
			onclick={(event) => event.stopPropagation()}
		/>
	</div>
</div>
