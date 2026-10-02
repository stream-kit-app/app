<script lang="ts">
	import type { VariableAutocomplete } from './variable-autocomplete.svelte';

	import { Popover } from 'bits-ui';
	import { watch } from 'runed';

	import { cn } from '../../utils';
	import { variableOptionId } from './variable-autocomplete.svelte';

	type Props = {
		autocomplete: VariableAutocomplete;
		/** Listbox id referenced by the input's `aria-controls`. */
		id: string;
		/** Label for variables only set on some execution paths. */
		maybeLabel?: string;
	};

	const { autocomplete, id, maybeLabel = 'maybe' }: Props = $props();

	let listElement = $state<HTMLUListElement | null>(null);

	function showGroupHeader(index: number): boolean {
		if (autocomplete.query) {
			return false;
		}

		const group = autocomplete.matches[index]?.group;

		return Boolean(group) && autocomplete.matches[index - 1]?.group !== group;
	}

	function handleOpenChange(open: boolean): void {
		if (!open) {
			autocomplete.close();
		}
	}

	function ignoreAnchorInteraction(event: PointerEvent): void {
		if (event.target === autocomplete.element) {
			event.preventDefault();
		}
	}

	watch(
		() => autocomplete.highlightedIndex,
		(index) => {
			listElement
				?.querySelector(`#${CSS.escape(variableOptionId(id, index))}`)
				?.scrollIntoView({ block: 'nearest' });
		}
	);
</script>

<Popover.Root open={autocomplete.isOpen} onOpenChange={handleOpenChange}>
	<Popover.Portal>
		<Popover.Content
			customAnchor={autocomplete.element}
			side="bottom"
			align="start"
			sideOffset={4}
			collisionPadding={8}
			trapFocus={false}
			preventScroll={false}
			onOpenAutoFocus={(event) => event.preventDefault()}
			onCloseAutoFocus={(event) => event.preventDefault()}
			onInteractOutside={ignoreAnchorInteraction}
			class="z-[100] max-h-64 min-w-56 overflow-y-auto rounded-xl border border-dark-600 bg-dark-800 p-[5px] shadow-md outline-none"
			style="width: var(--bits-popover-anchor-width)"
		>
			<ul bind:this={listElement} {id} role="listbox">
				{#each autocomplete.matches as variable, index (variable.key)}
					{#if showGroupHeader(index)}
						<li
							role="presentation"
							class="px-3 pt-2 pb-1 text-xs font-semibold tracking-wide text-dark-300 uppercase"
						>
							{variable.group}
						</li>
					{/if}
					<li
						role="option"
						id={variableOptionId(id, index)}
						aria-selected={index === autocomplete.highlightedIndex}
						class={cn(
							'flex w-full cursor-pointer items-center justify-between gap-2 rounded-md px-3 py-1.5 text-left text-sm text-dark-50 transition-colors duration-150 hover:bg-dark-700',
							index === autocomplete.highlightedIndex && 'bg-dark-700'
						)}
						title={variable.description}
						onpointerdown={(event) => {
							// Keep focus (and the caret) in the input.
							event.preventDefault();
							autocomplete.select(variable.key);
						}}
						onpointerenter={() => (autocomplete.highlightedIndex = index)}
					>
						<span class="truncate font-mono">{`{${variable.key}}`}</span>
						<span class="flex shrink-0 items-center gap-2 text-dark-300">
							{#if variable.maybe}
								<span class="rounded border border-dark-500 px-1 text-xs"
									>{maybeLabel}</span
								>
							{/if}
							<span class="truncate">{variable.label}</span>
						</span>
					</li>
				{/each}
			</ul>
		</Popover.Content>
	</Popover.Portal>
</Popover.Root>
