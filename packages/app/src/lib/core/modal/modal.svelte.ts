import type { Component } from 'svelte';

/**
 * Props for {@link Modal} and `app.modal.create`.
 *
 * Built-in npm plugins can pass Svelte components as `content`.
 * Zip-installed plugins should use declarative page blocks instead of modals with Svelte content.
 *
 * @example
 * ```ts
 * const modal = app.modal.create({
 *   id: 'details',
 *   title: 'Connection details',
 *   description: 'Review before connecting.',
 *   size: 'md',
 *   content: DetailsModal,
 *   props: { connectionId: 'ws-1' }
 * });
 * modal.open();
 * ```
 */
export type ModalProps = {
	/** Unique modal id used to track the open instance. */
	id: string;
	/** Modal title shown in the header. */
	title: string;
	/** Optional subtitle shown below the title. */
	description?: string;
	/** Modal width preset. Defaults to `'md'`. */
	size?: 'sm' | 'md' | 'lg' | 'full';
	/** Svelte component rendered as modal body. */
	content: Component<any>;
	/** Props forwarded to the `content` component. */
	props?: Record<string, unknown>;
};

export class Modal {
	public isOpen: boolean = $state(false);

	public id: string;
	public title: string;
	public size: 'sm' | 'md' | 'lg' | 'full';
	public description?: string;
	public content: Component;
	public props: Record<string, unknown>;

	constructor(props: ModalProps) {
		this.id = props.id;
		this.title = props.title;
		this.size = props.size ?? 'md';
		this.description = props.description ?? undefined;
		this.content = props.content;
		this.props = props.props ?? {};
	}

	public open(): void {
		this.isOpen = true;
	}

	public close(): void {
		this.isOpen = false;
	}
}
