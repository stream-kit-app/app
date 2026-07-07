import { tick } from 'svelte';

/**
 * Smoothly scrolls a newly added trigger/handler card into view.
 *
 * Waits for the DOM to render the new item (which is matched by its
 * `data-chain-item-id`) and then scrolls the nearest scroll container so the
 * item becomes visible. Useful when the list is long and the new item would
 * otherwise be added out of view.
 */
export async function scrollChainItemIntoView(id: string): Promise<void> {
	if (!id || typeof document === 'undefined') {
		return;
	}

	await tick();

	requestAnimationFrame(() => {
		const element = document.querySelector(`[data-chain-item-id="${CSS.escape(id)}"]`);
		element?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
	});
}
