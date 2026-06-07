import type { Component } from 'svelte';

export type ToastVariant = 'default' | 'success' | 'error' | 'warning';

export type ToastItemProps = {
	id: string;
	title: string;
	description?: string;
	variant?: ToastVariant;
	duration?: number;
	content?: Component<any>;
	props?: Record<string, unknown>;
	onDismiss?: () => void;
};

export class ToastItem {
	public id: string;
	public title: string;
	public description?: string;
	public variant: ToastVariant;
	public duration: number;
	public content?: Component;
	public props: Record<string, unknown>;

	#timeoutId?: ReturnType<typeof setTimeout>;
	#onDismiss?: () => void;

	constructor(props: ToastItemProps) {
		this.id = props.id;
		this.title = props.title;
		this.description = props.description;
		this.variant = props.variant ?? 'default';
		this.duration = props.duration ?? 5000;
		this.content = props.content;
		this.props = props.props ?? {};
		this.#onDismiss = props.onDismiss;

		if (this.duration > 0) {
			this.#timeoutId = setTimeout(() => this.#onDismiss?.(), this.duration);
		}
	}

	public cancelAutoDismiss(): void {
		if (this.#timeoutId) {
			clearTimeout(this.#timeoutId);
			this.#timeoutId = undefined;
		}
	}
}
