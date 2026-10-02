<script lang="ts">
	import type { ButtonSize, ButtonVariant } from '../button/button-variants';
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	import { onDestroy } from 'svelte';

	import { tooltip as tooltipAttachment } from '../../attachments';
	import { cn } from '../../utils';
	import Button from '../button/button.svelte';
	import { COPIED_ICON, COPY_ICON, CopyFeedback } from './copy-feedback.svelte';

	type Props = Omit<HTMLButtonAttributes, 'value' | 'children'> & {
		/** Text to copy, or a function that resolves it on click. */
		value: string | (() => string | undefined | Promise<string | undefined>);
		/** Tooltip and accessible label before copying. */
		label?: string;
		/** Tooltip after a successful copy. */
		copiedLabel?: string;
		/** Show `label` / `copiedLabel` as a tooltip. Defaults to true for icon-only buttons. */
		tooltip?: boolean;
		variant?: ButtonVariant;
		size?: ButtonSize;
		/** Optional visible text; without it the button is icon-only. */
		children?: Snippet;
		onCopied?: (text: string) => void;
		onCopyError?: () => void;
	};

	let {
		value,
		label = 'Copy',
		copiedLabel = 'Copied',
		tooltip,
		variant = 'ghost',
		size,
		children,
		onCopied,
		onCopyError,
		class: className,
		...restProps
	}: Props = $props();

	const feedback = new CopyFeedback();
	const copied = $derived(feedback.isCopied());
	const showTooltip = $derived(tooltip ?? !children);

	async function handleClick(event: MouseEvent): Promise<void> {
		// Copy buttons often sit inside clickable cards and links.
		event.preventDefault();
		event.stopPropagation();

		const text = typeof value === 'function' ? await value() : value;

		if (text === undefined) {
			return;
		}

		if (await feedback.copy(text, 'value')) {
			onCopied?.(text);
		} else {
			onCopyError?.();
		}
	}

	onDestroy(() => feedback.destroy());
</script>

<Button
	{...restProps}
	type="button"
	{variant}
	size={size ?? (children ? 'sm' : 'icon-sm')}
	icon={copied ? COPIED_ICON : COPY_ICON}
	aria-label={children ? undefined : copied ? copiedLabel : label}
	class={cn('transition-none', copied && 'text-success-400', className)}
	onclick={(event: MouseEvent) => void handleClick(event)}
	{@attach showTooltip ? tooltipAttachment(() => (copied ? copiedLabel : label)) : undefined}
>
	{#if children}
		{@render children()}
	{/if}
</Button>
