import type { ToastItemProps, ToastVariant } from './toast-item.svelte';

import type { Component } from 'svelte';

import { SvelteMap } from 'svelte/reactivity';

import { ToastItem } from './toast-item.svelte';

export type ToastCreateProps = {
	id?: string;
	title: string;
	description?: string;
	variant?: ToastVariant;
	duration?: number;
	content?: Component<any>;
	props?: Record<string, unknown>;
};

export class Toast {
	public entries = new SvelteMap<string, ToastItem>();

	public create(props: ToastCreateProps): ToastItem {
		const id = props.id ?? crypto.randomUUID();

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
