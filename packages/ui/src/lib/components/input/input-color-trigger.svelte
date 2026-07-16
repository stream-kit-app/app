<script lang="ts">
	/**
	 * Trigger button for svelte-awesome-color-picker — matches InputText adornment chrome.
	 * Props must match the library's default Input component.
	 */
	type Props = {
		labelElement: HTMLLabelElement | undefined;
		hex: string | null;
		label: string;
		name?: string | undefined;
		dir: 'ltr' | 'rtl';
	};

	let { labelElement = $bindable(), hex, label, name = undefined, dir }: Props = $props();

	function preventDefault(e: MouseEvent) {
		e.preventDefault();
	}
</script>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions, a11y_click_events_have_key_events -->
<label
	bind:this={labelElement}
	class="color-trigger"
	onclick={preventDefault}
	onmousedown={preventDefault}
	{dir}
	aria-label={label}
>
	<input
		type="color"
		{name}
		value={hex ?? '#000000'}
		onclick={preventDefault}
		onmousedown={preventDefault}
		aria-haspopup="dialog"
		tabindex="-1"
	/>
	<span class="swatch" style:background={hex ?? 'transparent'}></span>
</label>

<style>
	.color-trigger {
		position: relative;
		display: grid;
		height: 100%;
		min-width: 2.5rem;
		place-items: center;
		cursor: pointer;
		user-select: none;
	}

	input {
		position: absolute;
		margin: 0;
		padding: 0;
		border: none;
		width: 1px;
		height: 1px;
		opacity: 0;
		pointer-events: none;
	}

	.swatch {
		display: block;
		width: 1.25rem;
		height: 1.25rem;
		border-radius: 0.375rem;
		border: 1px solid rgb(255 255 255 / 0.12);
		box-shadow: inset 0 0 0 1px rgb(0 0 0 / 0.2);
	}
</style>
