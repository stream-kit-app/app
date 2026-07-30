import type { Component } from 'svelte';

export type ToastVariant = 'default' | 'success' | 'error' | 'warning' | 'neutral';

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

export type ToastItemUpdateProps = {
	title?: string;
	description?: string;
	variant?: ToastVariant;
	duration?: number;
};

export class ToastItem {
	public id: string;
	public title = $state('');
	public description = $state<string | undefined>(undefined);
	public variant = $state<ToastVariant>('default');
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

		this.#scheduleAutoDismiss();
	}

	public update(props: ToastItemUpdateProps): void {
		if (props.title !== undefined) {
			this.title = props.title;
		}
		if (props.description !== undefined) {
			this.description = props.description;
		}
		if (props.variant !== undefined) {
			this.variant = props.variant;
		}
		if (props.duration !== undefined) {
			this.duration = props.duration;
			this.#scheduleAutoDismiss();
		}
	}

	public cancelAutoDismiss(): void {
		if (this.#timeoutId) {
			clearTimeout(this.#timeoutId);
			this.#timeoutId = undefined;
		}
	}

	#scheduleAutoDismiss(): void {
		this.cancelAutoDismiss();
		if (this.duration > 0) {
			this.#timeoutId = setTimeout(() => this.#onDismiss?.(), this.duration);
		}
	}
}
