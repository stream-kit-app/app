import type { Component } from 'svelte';

export type ModalProps = {
	id: string;
	title: string;
	description?: string;
	size?: 'sm' | 'md' | 'lg' | 'full';
	content: Component<any>;
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
