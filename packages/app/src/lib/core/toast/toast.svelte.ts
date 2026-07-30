import type { ToastItemUpdateProps, ToastVariant } from './toast-item.svelte';

import type { Component } from 'svelte';

import { SvelteMap } from 'svelte/reactivity';

import { ToastItem } from './toast-item.svelte';

/**
 * Options for `app.toast.create`.
 *
 * @example
 * ```ts
 * app.toast.create({
 *   title: 'Hello World',
 *   description: 'Triggered from a plugin page button.',
 *   variant: 'success'
 * });
 * ```
 */
export type ToastCreateProps = {
	/** Optional stable id. A UUID is generated when omitted. */
	id?: string;
	/** Primary toast message. */
	title: string;
	/** Optional secondary message shown below the title. */
	description?: string;
	/** Visual style. Defaults to `'default'`. */
	variant?: ToastVariant;
	/** Auto-dismiss delay in milliseconds. Use `0` to keep the toast until manually dismissed. Defaults to `5000`. */
	duration?: number;
	/** Optional custom Svelte content. Typically used by built-in npm plugins only. */
	content?: Component<any>;
	/** Props passed to the custom `content` component. */
	props?: Record<string, unknown>;
};

export class Toast {
	public entries = new SvelteMap<string, ToastItem>();

	public create(props: ToastCreateProps): ToastItem {
		const id = props.id ?? crypto.randomUUID();

		const existing = this.entries.get(id);
		if (existing) {
			existing.cancelAutoDismiss();
			this.entries.delete(id);
		}

		const item = new ToastItem({
			id,
			title: props.title,
			description: props.description,
			variant: props.variant,
			duration: props.duration,
			content: props.content,
			props: props.props,
			onDismiss: () => this.dismiss(id)
		});

		this.entries.set(id, item);

		return item;
	}

	/** Update an existing toast in place (reactive title/description/variant). */
	public update(id: string, props: ToastItemUpdateProps): ToastItem | undefined {
		const item = this.entries.get(id);
		if (!item) {
			return undefined;
		}
		item.update(props);
		return item;
	}

	public get(id: string): ToastItem | undefined {
		return this.entries.get(id);
	}

	public dismiss(id: string): void {
		const item = this.entries.get(id);
		if (!item) return;

		item.cancelAutoDismiss();
		this.entries.delete(id);
	}

	public dismissAll(): void {
		for (const id of this.entries.keys()) {
			this.dismiss(id);
		}
	}
}
