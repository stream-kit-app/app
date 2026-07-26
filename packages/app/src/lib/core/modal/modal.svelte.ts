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
 *   size: 'md', // 'xs' | 'sm' | 'md' | 'lg' | 'full'
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
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'full';
	/** Svelte component rendered as modal body. */
	content: Component<any>;
	/**
	 * Optional component that renders the full modal header, replacing the default
	 * title/description. Use it to control the entire header (e.g. title + Clone /
	 * Test buttons). When omitted, the shell renders `title` and `description`.
	 * Receives the same `props` as `content`.
	 */
	header?: Component<any>;
	/**
	 * Optional component rendered in a sticky footer that stays visible while the
	 * body scrolls (e.g. Delete / Cancel / Save buttons). Receives the same
	 * `props` as `content`.
	 */
	footer?: Component<any>;
	/**
	 * When `false`, the body is not wrapped in the outer ScrollArea so content can
	 * fill the modal height and manage its own scroll. Defaults to `true`.
	 */
	scrollBody?: boolean;
	/** Props forwarded to the `content`, `header`, and `footer` components. */
	props?: Record<string, unknown>;
	/**
	 * Which Svelte runtime renders `content`.
	 * Plugin APIs set this to `'plugin'` automatically.
	 */
	contentHost?: 'app' | 'plugin';
	/** Called when the modal is closed (cancel, escape, close button, or `close()`). */
	onClose?: () => void;
};

export class Modal {
	public isOpen: boolean = $state(false);

	public id: string;
	public title: string;
	public size: 'xs' | 'sm' | 'md' | 'lg' | 'full';
	public description?: string;
	public content: Component;
	public header?: Component;
	public footer?: Component;
	public scrollBody: boolean;
	public props: Record<string, unknown>;
	public contentHost: 'app' | 'plugin';
	public onClose?: () => void;

	constructor(props: ModalProps) {
		this.id = props.id;
		this.title = props.title;
		this.size = props.size ?? 'md';
		this.description = props.description ?? undefined;
		this.content = props.content;
		this.header = props.header;
		this.footer = props.footer;
		this.scrollBody = props.scrollBody !== false;
		this.props = props.props ?? {};
		this.contentHost = props.contentHost ?? 'app';
		this.onClose = props.onClose;
	}

	public open(): void {
		this.isOpen = true;
	}

	public close(): void {
		if (!this.isOpen) {
			return;
		}

		this.isOpen = false;
		this.onClose?.();
	}
}
